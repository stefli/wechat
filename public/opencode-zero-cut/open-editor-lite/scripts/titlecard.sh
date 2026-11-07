#!/usr/bin/env bash
# Usage: titlecard.sh <seconds> <text> <out.mp4> [bg_hex]
set -euo pipefail
DUR=${1:?}; TEXT=${2:?}; OUT=${3:?}; BG=${4:-0D9488}
FONT=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf
ffmpeg -y -f lavfi -i "color=c=#${BG}:s=1280x720:d=${DUR}" -f lavfi -i "anullsrc=r=44100:cl=stereo" \
  -vf "drawtext=fontfile=${FONT}:text='${TEXT}':fontsize=52:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2" \
  -c:v libx264 -pix_fmt yuv420p -c:a aac -shortest -t "$DUR" "$OUT"
