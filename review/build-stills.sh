#!/usr/bin/env bash
# Rebuilds every image in assets/ from the originals in foto-original/. ffmpeg auto-rotates the phone photos.
set -e
FF="${FFMPEG:-ffmpeg}"
S="$(cd "$(dirname "$0")/.." && pwd)"; O="$S/foto-original"; A="$S/assets"
GR="eq=contrast=1.05:saturation=0.95:gamma=1.02,colorbalance=rs=0.02:bs=-0.03:rm=0.015:bm=-0.02"
GR2="eq=contrast=1.07:saturation=0.93:gamma=1.05:brightness=0.012,colorbalance=rs=0.025:bs=-0.032:rm=0.018:bm=-0.022"
cut () { "$FF" -y -loglevel error -i "$O/$1.jpg" -vf "crop=$2:$3:$4:$5,scale=$6:-2:flags=lanczos,$7" -q:v 4 "$A/$8.jpg"; }
full () { "$FF" -y -loglevel error -i "$O/$1.jpg" -vf "scale=$2:-2:flags=lanczos,${4:-$GR}" -q:v 4 "$A/$3.jpg"; }
full 443 1200 delo-elektrika                          # whole photo, the switch on the wood wall
full 440 1200 delo-barva "$GR2"                       # whole photo, painted walls and the staircase
full 445 1200 delo-zakljucna                          # whole photo, finished bathroom
full 442 1200 adaptacija                              # whole photo, the renovated house interior
cut 443 2400 1800   60 2000 1400 "$GR"  svetloba            # 4:3, the dimmer photo
cut 441 3060 1721    0 1500 1600 "$GR"  kontakt             # 16:9, the finished vanity
full 443 1200 hero-main
full 441  900 hero-second
full 446 1100 onas
for f in 443 440 442 441 444 445 446; do full $f 1100 gal-$f; done
ls -la "$A"
