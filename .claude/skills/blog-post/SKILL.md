---
name: blog-post
description: Write, rewrite and publish posts for this portfolio blog (content/*.mdx with images in public/blog/<slug>/). Use this whenever the user wants a new post, wants an existing post restructured or reworded, drops in event photos or a slide deck link for a post, or asks about post frontmatter, blog images, or the blog's voice — including when they just paste raw notes, phone photos, or an AI-written draft and say "make this a blog" or "write this up".
---

# Blog posts for this site

The author writes first-person posts about his PhD at PSG CAS, his work as a
developer, and his life. The posts are plain, short-sentenced and honest. The
fastest way to get the voice wrong is to write like a LinkedIn post or like an
essay; the fastest way to get the facts wrong is to invent a detail that sounds
plausible. Both failures are avoidable, and this skill is mostly about avoiding
them.

## Before writing

Read the source material first. Posts are built from real evidence, and the
evidence usually answers questions you would otherwise be tempted to guess.

- **Read every photo** with the Read tool. Phone photos here often carry a
  burned-in GPS Map Camera watermark with the date, time, place and sometimes
  the weekday. Event posters carry the title, venue, timings and the names of
  the people to thank. This is where the true timeline comes from — a date
  someone recalls in chat is often wrong, a watermark is not.
- **Read the existing posts** in `content/` for voice, and `src/data/resume.tsx`
  for employers, roles and dates before stating any of them.
- **If a slide deck is linked, read it.** `scripts/extract-deck.js` decodes the
  deck payload (the decks live on a Next.js site, so the slide text is in the
  page payload, not the visible HTML). A talk deck usually contains the author's
  own stories told in his own words — far better material than a summary.
- **If the user pastes an AI-written draft**, treat it as a brief, not a source.
  Those drafts invent specifics. Check each one against the photos and the
  resume, and say plainly which parts were wrong.

## Voice

Match the published posts. What that means concretely:

- Short sentences. Short paragraphs, often one line each. Fragments are fine.
- No emoji, and no motivational-speaker phrasing ("believe in yourself",
  "everything happens for a reason", "your best chapter is yet to come").
- Dry humour, understated, never forced. "The system knows my face. It just has
  no record that I was there." is the register.
- Plain words. Avoid literary flourishes ("anniversary with existence",
  "labyrinth", "the real work is done in the dark"). If a sentence sounds like
  it was written to be admired, cut it.
- Personal posts use contractions and run warmer; PhD-diary and event posts are
  more matter-of-fact. Both stay concrete.
- Technical detail is welcome and specific: name the protocol, the board, the
  number. Vague praise is not.

## Structure

```markdown
---
title: "Short Title: A Clarifying Half"
publishedAt: "YYYY-MM-DD"
summary: "One or two sentences, concrete, naming the things that make someone click."
image: "/blog/<slug>/<hero>.png"
---

Opening line or two. No heading before it.

---

## Section Heading

Body.

---

*Written on D Month YYYY.*
```

- `publishedAt` is the date of the events, not the day of writing; the closing
  italic line carries the writing date when they differ.
- `---` between sections renders as a styled divider.
- Event and diary posts often close with a "Where Things Stand" bullet list —
  a short status summary. It suits this blog; use it where it fits.
- Link to sibling posts by slug: `[day two](/blog/second-day-phd-scholar)`.

## Images

Layout: every post's images live in `public/blog/<slug>/`, named descriptively
in kebab-case (`memento-sathyam-hall.jpg`, not `IMG_3172.HEIC`). Rename with
`git mv` when the files are already tracked, so history follows them.

Rules that matter here:

- **Never use the same image twice.** The frontmatter `image` renders at the top
  of the article, so a hero that also appears inline is a visible repeat. Two
  files showing the same thing (a HEIC and its JPEG conversion, a portrait
  poster and a landscape version of it) count as the same image.
- **Every image needs real alt text** describing what is in it.
- **HEIC will not display** in Chrome or Firefox. Convert with
  `scripts/heic-to-jpg.ps1` (Windows imaging; no ImageMagick needed here) and
  keep only the JPEG.
- **Check EXIF for GPS before publishing** photos taken at home. Signal strips
  metadata; other sources may not. `scripts/verify-post.sh` reports it.
- Display size is already capped in code by the `img` mapping in
  `src/mdx-components.tsx` — fix sizing there, not per-post.

## Facts and honesty

Only the author knows most of this material, so anything invented ships as if
it were true. Two habits prevent that:

1. Prefer the evidence. If the photo says 1:48 PM on a Friday, the post says
   Friday. If nothing says why he arrived at 9 AM, either ask or leave it out.
2. When handing back the draft, list the lines you wrote rather than sourced —
   inferred dates, imagined details, filled-in reasons — so he can correct or
   cut them. Also flag any contradiction you noticed between sources (a deck
   saying one thing, the resume another) instead of quietly picking one.

Names of real people (an HOD, a colleague, a partner) appear only when the
source material names them, and it is worth asking before publishing something
personal about someone else.

## Publishing

- Verify before committing: `bash .claude/skills/blog-post/scripts/verify-post.sh <slug>`
  checks that every image reference resolves, that no image is used twice, that
  nothing in the folder is unused, and prints the word count.
- Run `pnpm build` for anything that touches `src/` or adds a post.
- Commit in the repo's conventional-commit style (`feat(blog):`, `content(blog):`,
  `refactor(blog):`). Push only when asked, and say which branch it went to —
  work happens on `2026`, and the live site may build from `main`.

## Two traps in this repo

- **Markdown joins single newlines.** There is no `remark-breaks`, so lines meant
  to stand alone need a blank line between them.
- **Windows PowerShell 5.1 mangles quotes** passed to `git commit -m`. Use the
  Bash tool with `git commit -F -` and a heredoc. Long MDX bodies are safest
  written with the Write tool — Bash heredocs here have eaten backslashes and
  broken on apostrophes.
