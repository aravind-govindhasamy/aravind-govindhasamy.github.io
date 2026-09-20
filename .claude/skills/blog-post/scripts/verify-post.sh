#!/usr/bin/env bash
# Verify one blog post before committing.
# Usage: bash .claude/skills/blog-post/scripts/verify-post.sh <slug>
#
# Checks: image references resolve, no image used twice anywhere in the blog,
# no unused files left in the post folder, GPS metadata, and word count.

set -u
slug="${1:-}"
if [ -z "$slug" ]; then
  echo "usage: verify-post.sh <slug>   (e.g. back-at-the-podium)" >&2
  exit 2
fi

post="content/$slug.mdx"
dir="public/blog/$slug"
status=0

if [ ! -f "$post" ]; then
  echo "MISSING post: $post" >&2
  exit 1
fi

echo "== word count"
sed -n '/^---$/,$p' "$post" | tail -n +2 | wc -w

echo
echo "== image references in $post"
refs=$(grep -o '/blog/[A-Za-z0-9._/-]*\.[A-Za-z]*' "$post" | tr -d '\r' | sort -u)
for p in $refs; do
  if [ -f "public$p" ]; then
    echo "  ok       $p"
  else
    echo "  MISSING  $p"
    status=1
  fi
done

echo
echo "== images used more than once (across all posts)"
dupes=$(grep -ho '/blog/[A-Za-z0-9._/-]*\.[A-Za-z]*' content/*.mdx | tr -d '\r' | sort | uniq -d)
if [ -z "$dupes" ]; then
  echo "  none"
else
  echo "$dupes" | sed 's/^/  REUSED  /'
  status=1
fi

echo
echo "== files in $dir not referenced by any post"
if [ -d "$dir" ]; then
  for f in "$dir"/*; do
    [ -e "$f" ] || continue
    n=$(basename "$f")
    if ! grep -qr -- "$n" content/; then
      echo "  unused   $n"
    fi
  done
else
  echo "  (no folder yet)"
fi

echo
echo "== formats and GPS metadata"
for f in "$dir"/*; do
  [ -e "$f" ] || continue
  case "$f" in
    *.HEIC|*.heic) echo "  HEIC     $(basename "$f") - browsers cannot display this, convert it" ; status=1 ;;
  esac
done
if command -v exiftool >/dev/null 2>&1; then
  exiftool -q -if '$gpslatitude' -filename "$dir" 2>/dev/null | sed 's/^/  GPS  /' || true
else
  echo "  (exiftool not installed; PowerShell EXIF check in the skill covers this)"
fi

echo
if [ "$status" -eq 0 ]; then echo "OK"; else echo "PROBLEMS FOUND"; fi
exit "$status"
