#!/usr/bin/env bash
# Sync one or more review slugs into public/ and deploy to Netlify.
# Usage:
#   scripts/publish.sh gpui-rust-printer-agent
#   REVIEW_ROOT=/workspace/reviews scripts/publish.sh <slug> ...
# Env:
#   NETLIFY_AUTH_TOKEN  — preferred for permanent site (netlify deploy --prod --dir=public)
#   NETLIFY_SITE_ID     — existing site after claim
# Without token: anonymous deploy (claim within 1h or site may be removed).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REVIEW_ROOT="${REVIEW_ROOT:-/workspace/reviews}"
PUB="$ROOT/public"
mkdir -p "$PUB"
if [[ $# -lt 1 ]]; then
  echo "usage: $0 <slug> [slug...]" >&2
  exit 1
fi
for slug in "$@"; do
  src="$REVIEW_ROOT/$slug/COPY-standalone.html"
  if [[ ! -f "$src" ]]; then
    echo "missing $src" >&2
    exit 1
  fi
  mkdir -p "$PUB/$slug"
  cp -a "$src" "$PUB/$slug/index.html"
  # keep canonical under pages/
  mkdir -p "$ROOT/pages/$slug"
  cp -a "$src" "$ROOT/pages/$slug/COPY-standalone.html"
  echo "synced $slug"
done
# refresh listing
{
  echo '<!DOCTYPE html><html lang="zh-CN"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>'
  echo '<meta name="robots" content="noindex,nofollow"/><title>WeChat COPY pages</title>'
  echo '<style>body{font-family:system-ui;max-width:40rem;margin:2rem auto;padding:0 1rem}a{color:#07c}</style></head><body>'
  echo '<h1>WeChat COPY pages</h1><ul>'
  for d in "$PUB"/*/; do
    [[ -d "$d" ]] || continue
    name=$(basename "$d")
    echo "<li><a href=\"./$name/\">$name</a></li>"
  done
  echo '</ul></body></html>'
} > "$PUB/index.html"
printf 'User-agent: *\nDisallow: /\n' > "$PUB/robots.txt"

NETLIFY_BIN="${NETLIFY_BIN:-}"
if [[ -z "$NETLIFY_BIN" ]]; then
  if command -v netlify >/dev/null 2>&1; then NETLIFY_BIN=netlify
  elif [[ -x /tmp/nl-deploy/node_modules/.bin/netlify ]]; then NETLIFY_BIN=/tmp/nl-deploy/node_modules/.bin/netlify
  else
    echo "netlify CLI not found; install: npm i -g netlify-cli@26" >&2
    exit 1
  fi
fi

if [[ -n "${NETLIFY_AUTH_TOKEN:-}" && -n "${NETLIFY_SITE_ID:-}" ]]; then
  "$NETLIFY_BIN" deploy --prod --dir="$PUB" --site="$NETLIFY_SITE_ID" --no-build --json
elif [[ -n "${NETLIFY_AUTH_TOKEN:-}" ]]; then
  "$NETLIFY_BIN" deploy --prod --dir="$PUB" --no-build --json
else
  echo "No NETLIFY_AUTH_TOKEN — anonymous deploy (claim within ~1h)." >&2
  "$NETLIFY_BIN" deploy --dir="$PUB" --no-build --allow-anonymous --json
fi
