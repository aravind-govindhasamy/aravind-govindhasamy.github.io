// Extract slide text from a ppt.budeglobal.in deck.
//
// The decks are a Next.js app: the visible HTML holds only the outline, while
// the slide text sits in the RSC payload inside self.__next_f.push(...) calls.
// This decodes that payload and prints every slide in order.
//
// Usage:
//   curl -sL "<deck url>" -o deck.html
//   node extract-deck.js deck.html
//
// No regex literals or escape characters below on purpose: heredocs in this
// environment have been known to eat backslashes.

const fs = require("fs");

const file = process.argv[2];
if (!file) {
  console.error("usage: node extract-deck.js <deck.html>");
  process.exit(2);
}

const html = fs.readFileSync(file, "utf8");
const Q = String.fromCharCode(34);
const BS = String.fromCharCode(92);

// 1. Concatenate the flight payload chunks.
let payload = "";
const marker = "self.__next_f.push([1,";
const parts = html.split(marker);
for (let i = 1; i < parts.length; i++) {
  const p = parts[i];
  let j = 1;
  while (j < p.length) {
    const c = p[j];
    if (c === BS) { j += 2; continue; }
    if (c === Q) break;
    j++;
  }
  try { payload += JSON.parse(p.slice(0, j + 1)); } catch (e) { /* chunk not a string */ }
}

// 2. Pull out each slide object and print it.
const needle = "{" + Q + "kind" + Q + ":";
const slides = [];
let idx = 0;
while ((idx = payload.indexOf(needle, idx)) !== -1) {
  let depth = 0, inStr = false, i = idx;
  for (; i < payload.length; i++) {
    const c = payload[i];
    if (inStr) {
      if (c === BS) { i++; continue; }
      if (c === Q) inStr = false;
      continue;
    }
    if (c === Q) { inStr = true; continue; }
    if (c === "{") depth++;
    else if (c === "}") { depth--; if (depth === 0) { i++; break; } }
  }
  try { slides.push(JSON.parse(payload.slice(idx, i))); } catch (e) { /* not a slide */ }
  idx = i;
}

slides.forEach((s, n) => {
  console.log("--- " + (n + 1) + " [" + s.kind + "] " + (s.heading || ""));
  if (s.subheading && s.subheading !== "$undefined") console.log("    sub: " + s.subheading);
  (s.body || []).forEach((b) => console.log("    " + b));
  (s.bullets || []).forEach((b) => console.log("    - " + b));
});
console.error("slides: " + slides.length);
