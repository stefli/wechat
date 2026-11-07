#!/usr/bin/env bash
# Usage: burn_text.sh <in.mp4> <text> <out.mp4>
set -euo pipefail
IN=${1:?}; TEXT=${2:?}; OUT=${3:?}
FONT=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf
ffmpeg -y -i "$IN" \
  -vf "drawtext=fontfile=${FONT}:text='${TEXT}':fontsize=28:fontcolor=white:borderw=2:bordercolor=black:x=(w-text_w)/2:y=h-80" \
  -c:v libx264 -pix_fmt yuv420p -c:a copy "$OUT"
ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$OUT"
