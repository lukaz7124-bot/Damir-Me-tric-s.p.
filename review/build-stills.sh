#!/usr/bin/env bash
# Rebuilds every image in assets/ from the originals in foto-original/. ffmpeg auto-rotates the phone photos.
# File names describe the photo in Slovenian (they are part of image SEO); one file serves every place the photo appears.
set -e
FF="${FFMPEG:-ffmpeg}"
S="$(cd "$(dirname "$0")/.." && pwd)"; O="$S/foto-original"; A="$S/assets"
GR="eq=contrast=1.05:saturation=0.95:gamma=1.02,colorbalance=rs=0.02:bs=-0.03:rm=0.015:bm=-0.02"
GR2="eq=contrast=1.07:saturation=0.93:gamma=1.05:brightness=0.012,colorbalance=rs=0.025:bs=-0.032:rm=0.018:bm=-0.022"
cut () { "$FF" -y -loglevel error -i "$O/$1.jpg" -vf "crop=$2:$3:$4:$5,scale=$6:-2:flags=lanczos,$7" -q:v 4 "$A/$8.jpg"; }
full () { "$FF" -y -loglevel error -i "$O/$1.jpg" -vf "scale=$2:-2:flags=lanczos,${4:-$GR}" -q:v 4 "$A/$3.jpg"; }
rm -f "$A"/*.jpg "$A"/*.webp
full 443 1200 hrastove-stopnice-stikalo-lesena-obloga            # hero, 01 elektroinštalacije, galerija
full 441 1100 kopalnica-keramika-velikega-formata                 # hero (druga slika), galerija
full 440 1200 pleskanje-sten-hrastovo-stopnisce "$GR2"            # 02 pleskarstvo, galerija
full 445 1200 kopalnica-odprt-tus-hrastova-omarica                # 03 zaključna dela, galerija
full 444 1100 kopalnica-tus-kabina-osvetljena-omarica             # galerija
full 442 1200 adaptacija-hise-notranjost-hrastove-stopnice        # adaptacija hiše, galerija
full 446 1100 ozka-kopalnica-osvetljeno-ogledalo                  # o nas, galerija
cut 443 2400 1800   60 2000 1400 "$GR" osvetlitev-stopnic-stikalo-lesena-obloga   # 4:3, odsek Svetloba
cut 441 3060 1721    0 1500 1600 "$GR" kopalnica-lebdeci-umivalnik-keramika        # 16:9, kontakt in og:image
# WebP variants for every jpg (480, 800 and full width), used with srcset
for j in "$A"/*.jpg; do n="${j%.jpg}"; for w in 480 800; do "$FF" -y -loglevel error -i "$j" -vf "scale='min($w,iw)':-2:flags=lanczos" -c:v libwebp -quality 76 "$n-$w.webp"; done; "$FF" -y -loglevel error -i "$j" -c:v libwebp -quality 80 "$n-full.webp"; done
ls -la "$A"
