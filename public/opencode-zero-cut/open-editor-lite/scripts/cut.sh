#!/usr/bin/env bash
# Usage: cut.sh <in.mp4> <start_sec> <end_sec> <out.mp4>
set -euo pipefail
IN=${1:?}; SS=${2:?}; TO=${3:?}; OUT=${4:?}
ffmpeg -y -ss "$SS" -to "$TO" -i "$IN" -c:v libx264 -pix_fmt yuv420p -c:a aac "$OUT"
ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$OUT"
