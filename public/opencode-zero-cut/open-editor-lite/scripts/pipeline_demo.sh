#!/usr/bin/env bash
# Demo pipeline: drop middle dead air (keep 0-8 + 20-30 of a 30s rough),
# prepend 2s title card, burn subtitle, write out/final.mp4
set -euo pipefail
ROOT=${1:-.}
RAW="$ROOT/raw/rough-30s.mp4"
OUTDIR="$ROOT/out"
SK="$(cd "$(dirname "$0")" && pwd)"
mkdir -p "$OUTDIR"
"$SK/cut.sh" "$RAW" 0 8 "$OUTDIR/keep-a.mp4"
"$SK/cut.sh" "$RAW" 20 30 "$OUTDIR/keep-c.mp4"
"$SK/titlecard.sh" 2 "ZERO CUT DEMO" "$OUTDIR/title.mp4" 0D9488
"$SK/concat.sh" "$OUTDIR/joined.mp4" "$OUTDIR/title.mp4" "$OUTDIR/keep-a.mp4" "$OUTDIR/keep-c.mp4"
"$SK/burn_text.sh" "$OUTDIR/joined.mp4" "open-editor-lite / not Editor V1" "$OUTDIR/final.mp4"
echo "DONE $OUTDIR/final.mp4"
ffprobe -v error -show_entries format=duration,size -of default=noprint_wrappers=1 "$OUTDIR/final.mp4"
