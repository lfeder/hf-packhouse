#!/usr/bin/env bash
# Stamp each shared file a page loads with a hash of its contents, so a changed drawing is
# fetched fresh instead of served from GitHub Pages' or the browser's cache. Run before
# committing a change to packhouse-layouts.js, topo-site.js or site-plan-option5.jpg.
set -euo pipefail
cd "$(dirname "$0")"
for a in packhouse-layouts.js topo-site.js site-plan-option5.jpg; do
  v="$(shasum "$a" | cut -c1-8)"; e="${a//./\\.}"
  sed -i '' -E "s/${e}(\?v=[0-9a-f]+)?\"/${a}?v=${v}\"/g" *.html
done
