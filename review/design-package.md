> Opomba (20. september 2026, SEO): naslov, opis, H1 (druga vrstica z imenom in obrtjo), H2 odsekov, alt besedila, strukturirani podatki, sitemap, robots, favicon in pisave (lokalno gostovane, z metrično prilagojenimi nadomestnimi pisavami) so bili posodobljeni za iskalnike. Fotografije imajo WebP različice v treh širinah. Majhne sive oznake (dt, noga) so z ink-3 prešle na ink-2 zaradi kontrasta.
>
> Opomba (september 2026): glavni kontakt je zdaj 070 712 665 in turkmeli@gmail.com, Damirjev 070 197 107 in damir.mestric@gmail.com ostaja kot rezerva. V podjetju dela tudi Sara, zato besedilo govori v dvojini, Damir ostaja glavna oseba. Fotografije v odseku Kaj delava so cele (3:4, brez izreza), dodan je blok Adaptacija hiše (fotografija 442) in dve vprašanji v FAQ.
>
> Opomba: ta paket opisuje prvo različico z drsečim videom v heroju. Na željo naročnika je bil video odstranjen, hero je zdaj statičen z dvema fotografijama, dodana sta odsek O nas in odsek za Google oceno. Barve, pisave, svetlobna linija, kopija odsekov in testi veljajo še naprej.

# Design package — Meštrić, Brežice

Tier 1, one continuous scroll journey. Every line of copy here ships verbatim.

## 1. Brand premise

**Zadnji sloj.** At a renovation, the last layer is the one people actually live with: the wire closed into the wall, the paint over it, the tile beside it, the light above it. Damir does those three layers himself, so there is no seam between tradesmen, which is exactly where renovations go wrong. The whole site teaches that one idea and sells it.

Real business, real photos of his own work. No fictional-brand disclosure needed. No AI imagery on the page.

## 2. Palette (sampled from his photographs)

Deviation stated out loud: the hero is BRIGHT footage with DARK type and LIGHT scrims, an inversion of the usual dark-scrim system. His rooms are white walls, marble and daylight, and the user asked for precise and bright. Light canvas with a warm amber taken from his step lights; no serif display and no terracotta, so it stays clear of the cream-serif-terracotta template.

```css
:root{
  --canvas:#F1F0EC;        /* plaster, never pure white */
  --canvas-2:#E6E4DE;      /* recessed bands */
  --paper:#FAF9F6;         /* cards */
  --ink:#16181A;           /* the black railing metal */
  --ink-2:#5B5C58;
  --ink-3:#7A7B75;         /* hairline decorative only */
  --line:#D6D3CA;
  --oak:#B98A5A;
  --accent:#C2691A;        /* the warm glow of his step lights */
  --accent-deep:#9C520F;   /* accent at small text sizes */
  --glow:rgba(240,170,80,.55);
}
```

Measured: ink on canvas 15.8:1, ink-2 on canvas 6.0:1, accent-deep on canvas 5.1:1, accent on canvas 3.5:1 (large text and borders only), paper on ink 16:1.

## 3. Type trio

- Display: **Bricolage Grotesque** 600/700/800, variable optical size. Not Inter, not Roboto, not a serif.
- Body: **Instrument Sans** 400/500.
- Mono: **Martian Mono** 400/500, only for 11px uppercase kickers with 0.12em tracking.

All three carry latin-ext, verified, so š, č and ž render.

## 4. Band map (hero 700vh, scroll range 600vh)

| Band | Range (starting point) | Footage moment | Copy (verbatim) | Entrance | Side |
|---|---|---|---|---|---|
| 1 | 0.000–0.190 | ceiling with soft light shadows, top of the reclaimed-wood wall, black railing right | kicker `01 — ELEKTRIKA`; h `Najprej gre žica v steno.`; p `Potem je nikoli več ne vidite. Vidite samo luč.` | blur-to-sharp, light coming into focus, with the one-time load ramp | left |
| 2 | 0.245–0.435 | drift down a freshly painted wall to the oak stairs and two recessed wall lights | kicker `02 — PLESKANJE`; h `Potem stena dobi barvo.`; p `Robovi so ravni, ker jih vleče ista roka.` | drift-down per word, the roller stroke | right |
| 3 | 0.490–0.680 | arriving in the tiled bathroom, marble, window, round mirror | kicker `03 — ZAKLJUČNA DELA`; h `Na koncu ostane samo prostor.`; p `Keramika, laminat, silikon. Sloj, ki ga vsak dan vidite in se ga dotikate.` | grid snap-align, characters set like tiles | left |
| 4 | 0.740–1.000 | resting on the finished vanity, marble wall left | h `Tri obrti. En mojster.`; p `Damir Meštrić, Brežice. Elektroinštalacije, pleskarstvo in zaključna dela.`; CTA `Pokličite 070 197 107`; secondary `Poglejte dela` | word-by-word rise into a staged settle | left |

Ramps 0.02 of progress (12vh) each side; plateaus land at roughly 90vh, 90vh, 90vh and 132vh. Validated later by the flick test.

## 5. Static-hero copy block (phones, reduced motion)

Background is photo 443 in its native portrait crop, not a cropped video frame.

- kicker `BREŽICE IN OKOLICA — OD 2022`
- h `Tri obrti. En mojster.`
- p `Elektroinštalacije, pleskarstvo in zaključna dela. Od žice v steni do zadnjega silikona.`
- CTA `Pokličite 070 197 107`

## 6. Below-fold outline

Every section funnels to the one call to action: the phone call.

**A. Trije sloji** (`#delo`)
kicker `KAJ DELAM`; h `Tri obrti, ki se med sabo držijo`; lede `Pri prenovi se največ napak zgodi na stiku med obrtniki. Kdo je pustil luknjo, kdo jo mora zapreti, kdo je zamudil. Pri meni tega stika ni, ker vse tri sloje naredim sam.`

1. `Elektroinštalacije` — `Nova napeljava in obnova stare. Razdelilne omarice, vtičnice in stikala tam, kjer jih res rabite. Razsvetljava, LED trakovi, osvetlitev stopnic.`
2. `Pleskarstvo in dekorativna dela` — `Priprava podlage, kitanje, brušenje. Barvanje sten in stropov, barvanje lesa in kovine. Dekorativni nanosi, če jih želite.`
3. `Zaključna dela` — `Keramika, laminat, vinil. Adaptacije kopalnic, stanovanj in mansard. Hidroizolacija kleti in temeljev.`

**B. Kako poteka** (`#potek`) — a different skeleton, a horizontal rail the light line runs through
h `Štirje koraki, brez presenečenj`
1. `Pokličete` — `Poveste, kaj potrebujete. Povem, ali je delo zame in kdaj lahko pridem.`
2. `Ogled na naslovu` — `Pridem pogledat prostor in obstoječo napeljavo. Brez ogleda ni poštene cene.`
3. `Ponudba` — `Cena po postavkah, preden se delo začne. Če se med delom kaj pokaže, se slišiva prej.`
4. `Izvedba in predaja` — `Delo pripeljem do konca in za sabo počistim.`

**C. The one interactive moment: the dimmer** (`#svetloba`)
h `Luč ni dodatek. Je zadnji sloj.`; lede `Pridržite gumb in poglejte, kaj naredi svetloba, ki je vgrajena na pravo mesto.`; button `Pridržite`
Photo brightens and warms while the visitor holds; releasing early eases it back down. At full, three lines light up in sequence:
- `Osvetlitev stopnic, ki gori takrat, ko po njih hodite.`
- `Vgradne luči v steni namesto lestenca na sredini sobe.`
- `Stikalo tam, kjer roka pride do njega.`
Reduced motion gets the finished state with no hold.

**D. Galerija** (`#dela`) — asymmetric grid, lightbox
h `Iz njegovih projektov`; lede `Vse fotografije so z njegovih gradbišč.`
Captions: 443 `Stara lesena obloga, nove stopnice, stikalo na dosegu.` / 440 `Stopnišče iz hrasta in kovine, vgradni luči v steni.` / 442 `Notranjost s hrastovimi stopnicami in osvetlitvijo.` / 441 `Kopalnica s keramiko velikega formata.` / 444 `Kopalnica s tuš kabino in osvetljeno omarico.` / 445 `Kopalnica z odprtim tušem in lučjo nad ogledalom.` / 446 `Ozka kopalnica z osvetljenim ogledalom.`

**E. Mnenje** (`#mnenja`) — one quote block, nothing invented
h `Kaj pravi stranka`
quote `Vse je bilo hitro končano, naredili so tudi tisto, kar sem posebej prosila.`
attribution `Ida M., pleskanje stanovanja, april 2024` + source line `Javno mnenje na Mojmojster.net`

**F. Pogosta vprašanja** (`#vprasanja`) — accordion, answering the objections found in research
1. `Koliko stane prenova kopalnice?` — `Odvisno od kvadrature, materiala in stanja napeljave. Zato cene ne ugibam po telefonu. Pridem pogledat in dobite ceno po postavkah.`
2. `Ali cena drži?` — `Kar je na ponudbi, to velja. Če se med rušenjem pokaže nekaj, česar prej ni bilo mogoče videti, se slišiva, preden nadaljujem.`
3. `Ali res vse naredite sami?` — `Elektroinštalacije, pleskarska dela in zaključna dela delam sam. Za vodovod, mizarstvo in podobno vam povem vnaprej, kaj bo treba urediti posebej.`
4. `Kje delate?` — `Brežice in Posavje, za večja dela po vsej Sloveniji.`
5. `Ali izdate račun?` — `Da. Nisem zavezanec za DDV, zato je na računu cena brez DDV.`
6. `Kdaj lahko pridete?` — `Odvisno od tega, kaj je trenutno v delu. Pokličite in povejte, do kdaj bi radi imeli končano.`
7. `Kaj pa prah in nered?` — `Prostor za sabo počistim. Prahu pri rezanju in vrtanju se ne da povsem izogniti, da pa se ga omejiti.`

**G. Zaključni klic** (`#kontakt`)
h `Povejte, kaj je treba narediti.`; p `Najhitreje me dobite po telefonu. Če raje pišete, mi pošljite nekaj vrstic in fotografijo prostora.`
primary `Pokličite 070 197 107` (tel:+38670197107)
Form handling on a static site: mailto. Fields `Ime`, `Telefon`, `Kaj potrebujete`; button `Pripravi sporočilo`; microcopy `Gumb odpre vaš e-poštni program z že vpisanim sporočilom na damir.mestric@gmail.com.`

**H. Footer**
`Elektro, pleskarska in zaključna dela, Damir Meštrić s.p.` / `Marof 20, 8250 Brežice` / `Matična številka 9161180000` / `Davčna številka 95566414, nisem zavezanec za DDV` / `070 197 107` / `damir.mestric@gmail.com` / `Fotografije so posnetki lastnih del.`

## 7. Vector layer plan

- **Signature: svetlobna linija.** A hand-drawn SVG hairline running from below the hero to the footer, drawn by scroll progress with `stroke-dasharray`. A node sits at each section anchor; when a section enters view its node lights amber and a short branch draws toward the section title, like a riser diagram of a wiring plan. Mobile keeps a thinner line at the left edge. Reduced motion shows it fully drawn with every node lit.
- **Environment layer.** One fixed background behind everything: a very slow warm radial drift on a 90s cycle plus a faint plaster grain, so scrolling feels like moving through one room rather than past stacked sections.
- **Whisper-level life, one per section.** Node glow pulse, a slow sheen across the step-rail, image scale on hover in the gallery.
- All of it honors reduced motion: final states shown, drives stopped.

## 8. Engineering list

Streamed Blob fetch with the loading ring and the 20s watchdog, poster painted first from JS inside the gated path, dt-normalized lerp in a resting rAF loop, gated seeks with the error-path deadlock escape, delta-gated DOM writes, band pacing validated by the flick test, the four-layer legibility system in its light-scrim inversion, the five static-hero gates kept live with change listeners, complete-without-video, `overflow-x: clip` on html and body, reduced motion honored live in both directions, and the whole quality floor.

## 9. Copy gate

Every viewer-facing line above ships verbatim. The built page must pass the grep gate before anyone sees it: zero em dashes, zero stock words, plus the body-copy sweep for AI tells. The designed triplet `Elektrika. Barva. Zaključek.` and the staccato `Tri obrti. En mojster.` are deliberate brand devices and stay.
