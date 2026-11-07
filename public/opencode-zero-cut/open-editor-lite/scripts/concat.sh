#!/usr/bin/env bash
# Usage: concat.sh <out.mp4> <in1.mp4> [in2.mp4 ...]
set -euo pipefail
OUT=${1:?}; shift
LIST=$(mktemp)
for f in "$@"; do printf "file '%s'\n" "$(realpath "$f")" >> "$LIST"; done
ffmpeg -y -f concat -safe 0 -i "$LIST" -c:v libx264 -pix_fmt yuv420p -c:a aac "$OUT"
rm -f "$LIST"
ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$OUT"
