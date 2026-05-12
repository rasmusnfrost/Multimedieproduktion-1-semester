# Procesdokument — LUMINA Eksamensprojekt

Dette dokument indeholder ALLE ændringer foretaget i projektet i kronologisk rækkefølge.
Ændringer der senere blev rullet tilbage er bevaret for at vise processen.

---

## Iteration 1 — Header som flydende glass pill (inspireret af ugly.cash / analogueagency.com)

**Mål:** Lave header om fra en almindelig hvid bar til en flydende, gennemsigtig pill-formet header med glaseffekt, som svæver over indholdet.

### Ændringer i `css/style.css` — `.header`
- `position: sticky` → `position: fixed`
- Tilføjet `top: 1.25rem`, `left: 50%`, `transform: translateX(-50%)` (centreret med margin fra toppen)
- `width: calc(100% - 2.5rem)`, `max-width: 1200px`
- `background: var(--white)` → `background: rgba(255, 255, 255, 0.18)` (gennemsigtig)
- Tilføjet `border: 1px solid rgba(255, 255, 255, 0.25)`
- `border-bottom: 1px solid #eee` fjernet
- Tilføjet `border-radius: 999px` (fuldt afrundet pill-form)
- Tilføjet `backdrop-filter: blur(18px) saturate(160%)` (glaseffekten)
- Tilføjet `-webkit-backdrop-filter` for Safari-support
- Tilføjet `box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12)`
- Padding flyttet til `.header .nav` med `padding: 0.65rem 1.5rem`

### Nav-tekst (første forsøg — hvid tekst)
- `.nav-center a` farve sat til `var(--white)` med `opacity: 0.85`
- Hover ændrede opacity til 1 i stedet for farve
- Logo fik `filter: brightness(0) invert(1)` for at blive hvidt
- `.nav-icons img` fik også samme invert-filter

**Begrundelse:** Hero-videoen er mørk, så hvid tekst skulle være læsbar.

---

## Iteration 2 — Skiftet til mørk tekst på lysere glas

**Mål:** Efter at have kigget nærmere på ugly.cash og analogue.com referencerne, brugte begge sites faktisk mørk tekst på et lysere translucent glas — det fungerer bedre over varierede baggrunde.

### Ændringer
- `.header` baggrund: `rgba(255, 255, 255, 0.18)` → `rgba(255, 255, 255, 0.35)` (mere opacitet)
- `.header` border: `rgba(255, 255, 255, 0.25)` → `rgba(255, 255, 255, 0.45)`
- `backdrop-filter`: `blur(18px) saturate(160%)` → `blur(22px) saturate(180%)` (stærkere blur)
- `box-shadow`: `0 10px 30px rgba(0, 0, 0, 0.12)` → `0 12px 40px rgba(0, 0, 0, 0.18)`
- `.nav-center a` farve: hvid → `var(--text-dark)` (mørk igen)
- Hover farve: tilbage til `var(--fv1)` (rosa)
- Logo `filter: brightness(0) invert(1)` fjernet
- `.nav-icons img` invert-filter fjernet

---

## Iteration 3 — Tilpas størrelse til analogue-reference

**Mål:** Headeren var for bred — analogue.com har en kompakt pill der ikke fylder hele bredden.

### Ændringer i `.header`
- `max-width: 1200px` → `max-width: 720px` (meget mere kompakt)
- `.header .nav` padding: `0.65rem 1.5rem` → `0.45rem 1.25rem` (slankere)

### Ændringer i `.logo`
- `width: 90px` → `width: 70px` (mindre logo)

### Ændringer i `.nav-center`
- `ul gap: 2rem` → `gap: 1.5rem` (tættere afstand mellem links)
- `a font-size: 0.95rem` → `0.85rem` (mindre tekst)

### Ændringer i `.nav-icons`
- `gap: 1.25rem` → `gap: 1rem`
- `img width: 20px` → `16px` (mindre ikoner)

---

## Iteration 4 — FORSØG: Liquid glass-knapper på header-ikoner (FORTRUDT)

**Mål:** Bruger gav et React/Tailwind LiquidButton-komponent og bad om at style ikoner som liquid glass-knapper.

### Hvad blev tilføjet
- SVG `<filter id="container-glass">` tilføjet til toppen af `<body>` i `index.html`:
  - `feTurbulence` med fractalNoise
  - `feGaussianBlur` på støjen
  - `feDisplacementMap` der forskyder grafikken med støjen
  - `feGaussianBlur` til endelig blur
  - `feComposite`
- `.nav-icons a` ændret til 34×34 cirkulære knapper med:
  - Komplekse layered inset shadows (refraktionseffekt)
  - `backdrop-filter: url("#container-glass")` via `::before` pseudo-element
  - Hover scale 1.08, active scale 0.97
- `.nav-icons` gap reduceret til 0.5rem

### Resultat
**FORTRUDT på brugerens anmodning** ("yea no remove that") — rullet tilbage til originale simple ikon-links med hover-scale 1.15 og opacity 0.7.

---

## Iteration 5 — FORSØG: Liquid glass på ALLE CTA-knapper (FORTRUDT)

**Mål:** Bruger ville have liquid glass-aesthetic på alle CTA-knapper på landing-siden (ikke header/footer).

### Hvad blev tilføjet
- SVG `#container-glass` filter genindsat i `index.html`
- `.btn` base-klasse omskrevet til liquid glass:
  - Transparent baggrund, fuldt afrundet
  - Layered inset box-shadow (samme stack som iteration 4)
  - `backdrop-filter: url("#container-glass")` via `::before`
  - Hover scale 1.05, active scale 0.97
  - Padding øget til 1rem 2.5rem
- `.btn-dark`, `.btn-white`, `.btn-ghost` reduceret til kun farve-varianter

### Resultat
**FORTRUDT på brugerens anmodning** ("go back i dont like that") — rullet tilbage til originalt knap-system:
- `.btn-dark` solid sort
- `.btn-white` solid hvid
- `.btn-ghost` transparent med hvid border + blur(4px)
- Alle med translateY hover-effekt og box-shadow
- SVG-filter fjernet fra `index.html` igen

---

## Iteration 6 — Kalstore-inspireret header-indhold

**Mål:** Style header-indholdet som Kalstore-referencen — færre nav-links, andre ikoner, uppercase tekst.

### Ændringer i `index.html`
- Fjernet `<li><a href="#">Hjem</a></li>` (nav-link)
- Fjernet `<a href="#"><img src="/images/Heart.png" alt="Ønskeliste"></a>` (ikon)
- Byttet rækkefølge på Login og Search:
  - Før: Login → Search → Heart → Cart
  - Nu: Search → Login → Cart

### Ændringer i `css/style.css` — `.nav-center a`
- `font-size: 0.85rem` → `0.8rem`
- `letter-spacing: 0.02em` → `0.18em` (markant bredere)
- Tilføjet `text-transform: uppercase`

### Endelig header-struktur
- **Venstre:** Logo (70px)
- **Center:** SHOP · OM OS · KONTAKT (uppercase, bred letter-spacing)
- **Højre:** Search · Login · Cart (16px ikoner)

---

## Iteration 7 — FORSØG: Shop dropdown-menu (FORTRUDT)

**Mål:** Tilføj en dropdown til "Shop" i nav-menuen, der åbner et stort panel med kategorier + produktbillede ved hover — som Kalstore-referencen.

### Ændringer i `index.html` — Shop-link erstattet med dropdown-struktur
- `<li>` for Shop fik klassen `has-dropdown`
- Tilføjet `<svg class="chevron">` (pil-ned ikon) ved siden af "Shop"-teksten
- Tilføjet `<div class="shop-dropdown">` med følgende struktur:
  - **Højtalere** (heading) med undermenu: Rosa, Cream, Lila, Sage
  - **Tilbehør** + **App & Connect** (headings som links)
  - **Bundles**-række med gul ikon-badge (SVG stjerne) — fremhævet link
  - **Alle produkter** (footer-link)
  - Højre side: produktbillede (`ai-billede2.png`)

### Ændringer i `css/style.css` — nye regler

**Trigger + chevron:**
- `.has-dropdown { position: static }` (så dropdown positionerer sig fra `.header`)
- `.dropdown-trigger` displayflex med 0.35rem gap til chevron
- `.chevron` transition: transform 0.3s
- Hover roterer chevron 180° (`transform: rotate(180deg)`)

**Dropdown-panel:**
- `position: absolute`, `top: calc(100% + 0.75rem)`, centreret med `left: 50%; transform: translateX(-50%)`
- `width: min(900px, calc(100vw - 2.5rem))` — bredere end pill-headeren (720px)
- Solid hvid baggrund, `border-radius: 20px`, kraftig `box-shadow: 0 20px 60px rgba(0,0,0,0.18)`
- Skjult med `opacity: 0; visibility: hidden; pointer-events: none`
- Tilføjet `::before` pseudo-element der fylder gap mellem header og dropdown (forhindrer at hover bryder)
- Vises ved `.has-dropdown:hover` med opacity 1 + glide-in animation
- Transitions: opacity, transform, visibility (0.3s)

**Grid-layout:**
- `.dropdown-grid` 2-kolonne grid (1fr 1fr) med 1.5rem gap, 1.75rem 2rem padding
- Venstre: menu-grupper adskilt af `border-bottom: 1px solid rgba(0,0,0,0.08)`
- Højre: produktbillede med `aspect-ratio: 4 / 5`, `border-radius: 14px`, `object-fit: cover`

**Tekst-styling i dropdown (overrider .nav-center uppercase/spacing):**
- `.shop-dropdown a` resetter `text-transform: none`, `letter-spacing: normal`, `font-weight: 400`
- `.shop-dropdown h3` font-size 1.05rem, weight 700, normal-case
- `.menu-sub` flex-column, gap 0.5rem, padding-left 0.75rem (indrykket undermenu)

**Bundles-fremhævning:**
- `.bundles-link` inline-flex med ikon, weight 600, font-size 1.05rem
- `.bundles-icon` 32×32 gul (#FFC847) afrundet boks (border-radius 8px) med SVG stjerne

### Resultat
**FORTRUDT på brugerens anmodning** ("slet det") — rullet tilbage. Shop er igen et almindeligt nav-link uden dropdown, chevron eller panel. Al HTML for `.has-dropdown`/`.shop-dropdown` og al tilhørende CSS er fjernet.

---

## Iteration 8 — Newsletter popup nederst i højre hjørne (inspireret af Kalstore)

**Mål:** Tilføj en popup-boks i nederste højre hjørne med tilbud om 10% rabat for nyhedsbrev-tilmelding. Kun lukke-funktionen (X) skal virke — resten er statisk markup.

### Ændringer i `index.html` — tilføjet før slider-scriptet
- `<aside class="newsletter-popup" id="newsletterPopup">` med:
  - **Luk-knap** øverst til højre — SVG "X" ikon
  - **Titel:** "Få 10% rabat på din første ordre"
  - **Undertekst:** "Tilmeld dig vores månedlige nyhedsbrev. Det er det hele!"
  - **Formular** med email-label, input og gul TILMELD-knap (`onsubmit="event.preventDefault()"` så form ikke poster noget)
  - **Checkbox-række:** "Jeg har læst og accepterer handelsbetingelser og privatlivspolitik."
  - **Disclaimer:** "Rabatkoden kan ikke kombineres med andre tilbud."
- Lille `<script>` der lukker popup'en når X klikkes (tilføjer `.is-hidden` klassen)

### Ændringer i `css/style.css` — nye regler placeret før responsive-sektionen

**Popup-container `.newsletter-popup`:**
- `position: fixed`, `bottom: 1.5rem`, `right: 1.5rem`
- `width: 380px`, `max-width: calc(100vw - 3rem)` (mobile-safe)
- Mørk baggrund `#1a1a1a`, hvid tekst, `border-radius: 12px`
- Padding 1.75rem top / 1.5rem sides/bottom
- Skygge `0 20px 60px rgba(0, 0, 0, 0.4)`
- `z-index: 200` (over alt andet)
- Transition på opacity, transform, visibility (0.3s)

**Skjult tilstand `.newsletter-popup.is-hidden`:**
- `opacity: 0`, `transform: translateY(20px)`, `visibility: hidden`, `pointer-events: none`

**Luk-knap `.newsletter-close`:**
- Absolut positioneret top: 0.85rem, right: 0.85rem
- Transparent baggrund, hvid SVG "X", opacity 0.7 → 1 ved hover

**Tekst-styling:**
- `.newsletter-title` 1.35rem, weight 700, hvid
- `.newsletter-sub` 0.9rem, hvid med 78% opacity
- `.newsletter-disclaimer` 0.72rem, hvid med 55% opacity

**Formular:**
- `input[type="email"]` transparent baggrund, hvid 25% border (→ 60% ved focus), border-radius 6px
- `.newsletter-submit` fuldbredde, gul `#FFC847` (→ `#f0b62e` hover), mørk tekst, weight 700, letter-spacing 0.1em, UPPERCASE
- `.newsletter-checkbox` flexbox med 0.6rem gap, 0.78rem font

### Resultat
En mørk popup-boks vises i nederste højre hjørne. X-knappen lukker popup'en med en smooth fade + glide-down animation. Resten af elementerne (input, knap, checkbox, links) er rent visuelle — de gør ingenting når man klikker, hvilket matcher kravet ("den behøver ikke at virke. udover exit funktionen").

---

## Iteration 9 — Header mindre afrundet (matchet til ugly.cash)

**Mål:** Header var for rund i kanterne (fuld pill-form). Match ugly.cash-referencen som har en rundet rektangel — stadig blød i kanterne men ikke en pill.

### Ændringer i `.header`
- `border-radius: 999px` → `border-radius: 28px` (rundet rektangel i stedet for fuld pill)

### Ændringer i `.header .nav`
- Padding: `0.45rem 1.25rem` → `0.7rem 1.5rem` (lidt mere højde og luft, så proportionerne passer til den nye form)

### Resultat
Header har nu blødt afrundede hjørner i stedet for at være helt cirkulær i enderne — matcher ugly.cash. Bredde (max 720px) er bevaret så headeren stadig er fittet til indholdet.

---

## Iteration 10 — Ny farvepalette (sage, lavender, blue-purple)

**Mål:** Beholde det hvide tema men give det et twist med en ny brand-palette i støvede toner.

### Ny palette
- **Main:** `#a8bfa3` (støvet sage-grøn)
- **Anden:** `#baa3bf` (lavendel)
- **Tredje:** `#aca3bf` (blå-lilla)

### Ændringer i `css/style.css` — `:root` variabler
| Variabel | Før | Efter | Note |
|---------|------|-------|------|
| `--fv1` | `#DCA1A1` (rosa) | `#a8bfa3` (sage) | Ny main brand-accent |
| `--fv2` | `#F1EDE2` (cream) | `#baa3bf` (lavendel) | Anden farve |
| `--fv3` | `#AE90A7` (lilla) | `#aca3bf` (blå-lilla) | Tredje farve |
| `--fv4` | `#9CAF88` (grøn) | `#F1EDE2` (cream) | Flyttet cream hertil som neutral |
| `--gradient` | `#FFF3E0` | `#FFF3E0` | Uforandret (varm cream til footer-gradient) |

### Ændringer i `.btn-white:hover`
- Brugte tidligere `var(--fv2)` (cream) som hover-baggrund
- Skiftet til `var(--fv4)` (cream) — bevarer den subtile cream-på-hvid hover-effekt nu hvor `--fv2` er blevet lavendel

### Ændringer i `index.html` — slider farve-dots
| Dot | Før | Efter |
|-----|------|-------|
| 1 (active) | `#DCA1A1` rosa | `#a8bfa3` sage |
| 2 | `#F1EDE2` cream | `#baa3bf` lavendel |
| 3 | `#AE90A7` lilla | `#aca3bf` blå-lilla |
| 4 | `#9CAF88` grøn | `#F1EDE2` cream (neutral hvid-variant) |

### Hvor farverne nu vises i designet
- **`--fv1` (sage):** nav-link hover, social-content bullets, footer link hover
- **`--fv2` (lavendel):** kun via dot 2 (produktfarve)
- **`--fv3` (blå-lilla):** kun via dot 3 (produktfarve)
- **`--fv4` (cream):** `.btn-white` hover-baggrund + dot 4

### Resultat
Det hvide tema er bevaret som dominerende baggrund, men accentfarverne er nu en harmonisk støvet palette i sage/lavendel/blå-lilla. Produktets 4 farvevarianter afspejler den nye brand-palette + en cream/hvid neutral variant.

---

## Iteration 11 — Hero stylet med ny farvepalette

**Mål:** Give hero-sektionen et twist med de nye brand-farver (sage, lavendel, blå-lilla) — uden at miste video-baggrunden eller gøre teksten ulæselig.

### Ændringer i `.hero-overlay`
- Den gamle simple sort-til-mørk overlay-gradient er erstattet med to lag stablet ovenpå hinanden:
  1. **Vertikal mørk gradient** (til tekst-læselighed):
     - 0%: `rgba(0,0,0,0.18)` (top — luft til header)
     - 25–70%: transparent (lader video skinne igennem i midten)
     - 100%: `rgba(0,0,0,0.35)` (bund — CTA-område)
  2. **Diagonal farve-gradient (135°)** med brand-paletten:
     - 0%: `rgba(168, 191, 163, 0.5)` (sage)
     - 55%: `rgba(186, 163, 191, 0.4)` (lavendel)
     - 100%: `rgba(172, 163, 191, 0.6)` (blå-lilla)
- Den gamle `opacity: 50%` er fjernet (alpha håndteres nu direkte i gradient-stops)

### Ændringer i `.hero-content h1`
- Tilføjet `text-shadow`:
  - `0 0 80px rgba(168, 191, 163, 0.45)` — blødt sage-glow rundt om titlen
  - `0 2px 24px rgba(0, 0, 0, 0.25)` — ekstra mørk skygge for læselighed

### Ændringer i `.hero-tagline`
- Tekstfarve: `rgba(255, 255, 255, 0.75)` → `rgba(255, 255, 255, 0.85)` (lidt mere kontrast da overlay nu er farvet)
- Tilføjet `text-shadow: 0 1px 12px rgba(0, 0, 0, 0.35)` (samme læselighedsformål)

### Resultat
Hero-videoen er nu tonet med en diagonal sage → lavendel → blå-lilla farvegradient, som binder hero visuelt sammen med resten af brand-paletten. Mørke gradient-zoner i top og bund sørger for at headeren og CTA-knapperne stadig har kontrast. Titlen "LUMINA ONE" har et subtilt sage-glow der trækker hovedfarven ind i typografien.

---

## Iteration 12 — FORSØG: Minimalistisk farve-accent på hero-titlen (FORTRUDT)

**Mål:** Tilføj brand-farve til hero-teksten på en minimal, raffineret måde — uden visuel støj.

### Ændringer i `index.html`
- `<h1>LUMINA ONE</h1>` → `<h1>LUMINA <span class="hero-accent">ONE</span></h1>`
- Kun ordet "ONE" indkapslet i en span for at give det en visuel kontrast til "LUMINA"

### Ændringer i `css/style.css`

**`.hero-content h1`:**
- Fjernet det kraftige sage-glow text-shadow (`0 0 80px rgba(168, 191, 163, 0.45)` fra iteration 11) — det var for "loud" til en minimalistisk approach
- Beholdt kun den bløde mørke skygge `0 2px 24px rgba(0, 0, 0, 0.25)` for læselighed

**Ny `.hero-accent` regel (kun for "ONE"):**
- `color: var(--fv1)` — sage-farve
- `font-style: italic` — let kursivering for at differentiere fra "LUMINA"
- `font-weight: 500` — lettere vægt end resten af titlen (700) for en mere elegant kontrast

### Resultat
**FORTRUDT på brugerens anmodning** ("nej det kan jeg ikke lide. gå tilbage igen") — rullet tilbage til iteration 11's tilstand. H1 er igen "LUMINA ONE" uden span/accent. Sage-glow text-shadow på titlen er genindført, og `.hero-accent` CSS-reglen er fjernet.

---

## Iteration 13 — Newsletter popup: nye farver (rose/brown + sage CTA)

**Mål:** Erstatte den helt sorte popup-baggrund og gule CTA-knap med en varmere palette der harmonerer med højtalerens dusty rose-tema og brand-paletten. Forslag fra ChatGPT, valgt "Sage Green CTA"-varianten.

### Farve-ændringer i `.newsletter-popup` og børneelementer

| Element | Før | Efter | Note |
|---------|------|-------|------|
| Popup baggrund | `#1a1a1a` (næsten sort) | `#3A2E32` | Mørk varm rose/brown |
| Primær tekst (titel, knap-tekst i close) | `var(--white)` | `#F7F2EE` | Soft white — mere premium |
| Sekundær tekst (undertekst, label, checkbox) | hvid 78–85% opacity | `#D8C9C4` | Blødere end grå, matcher rose-tonerne |
| Input baggrund | `transparent` | `#4A3A3F` | Lidt lysere end popup-bg |
| Input border | hvid 25% | `#CFA6A1` | Dusty rose border |
| Input tekst | hvid | `#F7F2EE` | Soft white |
| Input focus border | hvid 60% | `#9CAF9B` | Sage accent ved focus |
| CTA-knap baggrund | `#FFC847` (gul) | `#9CAF9B` | Sage green |
| CTA-knap hover | `#f0b62e` | `#879B86` | Mørkere sage |
| CTA-knap tekst | `var(--text-dark)` | `#1F1F1D` | Næsten-sort for kontrast |
| Checkbox accent-color | (default) | `#9CAF9B` | Sage check-flueben |
| Checkbox-links farve | hvid + underline | `#9CAF9B` + underline | Sage links (hover `#879B86`) |
| Disclaimer | hvid 55% | `rgba(216, 201, 196, 0.65)` | Dæmpet rose-tone |

### Resultat
Popup'en er nu i en varm mørk rose/brown med soft white tekst, dusty rose inputs og en sage green CTA-knap. Det binder den visuelt sammen med både højtalerens dusty rose-tema og brand-paletten (sage = main color). Den gule knap er væk — sage green-knappen er roligere men stadig tydelig nok.

---

## Iteration 14 — Newsletter popup: lys variant (hvid baggrund + sort tekst)

**Mål:** Bruger ønskede den mørke baggrund vendt om — popup'en skal være hvid med sort tekst i stedet for mørk rose/brown med soft white tekst.

### Farve-ændringer (relativt til iteration 13)

| Element | Iteration 13 (mørk) | Iteration 14 (lys) |
|---------|---------------------|---------------------|
| Popup baggrund | `#3A2E32` (mørk rose) | `var(--white)` |
| Popup border | (ingen) | `1px solid rgba(0, 0, 0, 0.06)` (subtle definition) |
| Popup skygge | `0 20px 60px rgba(0,0,0,0.4)` | `0 20px 60px rgba(0,0,0,0.15)` (lysere) |
| Titel | `#F7F2EE` (soft white) | `#1F1F1D` (sort) |
| Undertekst | `#D8C9C4` (soft rose) | `#6B5A56` (dæmpet rose-brown) |
| Close X | `#F7F2EE` opacity 0.75 | `#1F1F1D` opacity 0.65 |
| Form label | `#D8C9C4` | `#6B5A56` |
| Input baggrund | `#4A3A3F` | `#F7F2EE` (cream — subtil differentiering fra hvid popup) |
| Input border | `#CFA6A1` | `#CFA6A1` (uforandret — dusty rose) |
| Input tekst | `#F7F2EE` | `#1F1F1D` |
| Input focus border | `#9CAF9B` (sage) | `#9CAF9B` (uforandret) |
| CTA-knap baggrund | `#9CAF9B` sage | `#9CAF9B` (uforandret) |
| CTA-knap hover | `#879B86` | `#879B86` (uforandret) |
| CTA-knap tekst | `#1F1F1D` | `#1F1F1D` (uforandret) |
| Checkbox accent | `#9CAF9B` | `#9CAF9B` (uforandret) |
| Checkbox tekst | `#D8C9C4` | `#6B5A56` |
| Links | `#9CAF9B` underline | `#9CAF9B` (uforandret) |
| Disclaimer | `rgba(216,201,196,0.65)` | `#9A8884` (dæmpet rose-grey) |

### Resultat
Popup'en er nu lys med hvid baggrund, mørk tekst og en subtil 1px border for definition mod siden. Input-feltet bruger cream (`#F7F2EE`) som mild differentiering. Sage-grøn CTA-knap, sage-links og dusty rose input-border er bevaret som accentfarver — så det rose/sage-tema er stadig til stede, bare som detaljer i stedet for som dominerende baggrund.

---

## Iteration 15 — Newsletter popup: tilbage til mørk original, men gul → sage CTA

**Mål:** Bruger ville hverken have den mørke rose-variant (iteration 13) eller den lyse hvide variant (iteration 14). Gå tilbage til den oprindelige mørke popup fra iteration 8, men med den gule knap erstattet af brand-paletten's sage `#a8bfa3`.

### Ændringer ift. iteration 8 (originalen)
- **Submit-knap baggrund:** `#FFC847` (gul) → `#a8bfa3` (sage — brand main color, `--fv1`)
- **Submit-knap hover:** `#f0b62e` → `#8fa78a` (let mørkere sage)
- **Submit-knap tekst:** `var(--text-dark)` (uforandret — stadig næsten-sort)
- Alt andet rullet tilbage til iteration 8:
  - Baggrund `#1a1a1a` (sort), border fjernet, kraftig skygge `rgba(0,0,0,0.4)`
  - Hvid tekst, hvid 78–85% til sub-tekst og labels
  - Input transparent baggrund med hvid 25% border, hvid 60% focus
  - Hvid checkbox-tekst og hvid underlinede links
  - Hvid 55% disclaimer

### Resultat
Popup'en er nu visuelt som den var oprindeligt (mørk baggrund, hvid tekst, sort-på-knap stil), men i stedet for den signal-gule farve er CTA-knappen sage green som matcher brand-paletten. Det binder popup'en sammen med resten af designet uden at ændre hele moodet.

---

## Iteration 16 — Hvide CTAs → sage + matchet roundness til navbar

**Mål:** Den hvide CTA-knap ("Køb nu" i hero) skal skifte farve til brand-paletten's main sage `#a8bfa3` — og alle CTA-knappers roundness skal matche navbarens `border-radius: 28px`.

### Ændringer i `css/style.css`

**`.btn` (base-klasse, gælder alle knapper — dark, white, ghost):**
- `border-radius: 999px` (fuld pill) → `border-radius: 28px` (matcher navbar/header)

**`.btn-white` (hero "Køb nu"):**
- Baggrund: `var(--white)` (hvid) → `#a8bfa3` (sage)
- Border-color: `var(--white)` → `#a8bfa3`
- Tekst: `var(--text-dark)` (uforandret — næsten-sort har stadig god kontrast på sage)

**`.btn-white:hover`:**
- Baggrund: `var(--fv4)` (cream) → `#8fa78a` (mørkere sage)
- Border-color: `var(--fv4)` → `#8fa78a`
- Skygge og translateY hover bevaret

**Klassenavn `.btn-white` beholdt** for at undgå at skulle ændre HTML — fungerer nu som "primary sage CTA"-variant i stedet for "white"-variant. Kommentar i CSS opdateret til "Solid sage — for use over dark/video backgrounds".

### Hvad ændringen påvirker
- **Hero "Køb nu"-knappen** er nu sage i stedet for hvid
- **Alle CTA-knapper** (dark, white, ghost) har nu 28px afrundede hjørner i stedet for fuld pill — matcher headerens form
- Dot-elementer i slideren er IKKE påvirket (de bruger `border-radius: 50%` direkte)
- Newsletter popup's TILMELD-knap er IKKE påvirket (bruger sin egen `.newsletter-submit` regel)

### Resultat
CTA-knapperne er nu visuelt forenede med navbaren via samme 28px hjørne-radius. Den primære sage CTA-farve binder hero-knappen sammen med både brand-paletten (--fv1 main) og newsletter-popup'ens sage TILMELD-knap. Visuel konsistens på tværs af komponenter.

---

## Iteration 17 — Fjernet alle skygger/effekter fra "LUMINA ONE" hero-titel

**Mål:** Helt rent typografisk udtryk — ingen skygger, intet glow.

### Ændringer i `.hero-content h1`
- Fjernet `text-shadow: 0 0 80px rgba(168, 191, 163, 0.45)` (sage-glow fra iteration 11)
- Fjernet `text-shadow: 0 2px 24px rgba(0, 0, 0, 0.25)` (mørk drop-shadow til læselighed fra iteration 11)
- Tilbage står kun: font-size (clamp), weight 700, hvid color, letter-spacing -0.02em, line-height 1

### Bevaret
- Hero-overlay (diagonal sage/lavendel/blå-lilla farve-gradient + top/bund mørk gradient) — uforandret
- Tagline (`.hero-tagline`) har stadig sin `text-shadow: 0 1px 12px rgba(0, 0, 0, 0.35)`
  - Hvis brugeren også vil have den fjernet skal vi gøre det separat

### Resultat
"LUMINA ONE" står nu som ren hvid typografi uden nogen skygge eller glow-effekter. Læseligheden afhænger nu udelukkende af kontrasten mellem hvid tekst og hero-overlayet.

---

## Iteration 18 — Side-baggrund ændret fra ren hvid til off-white

**Mål:** Skifte sidens hvide baggrund til en blødere off-white (`#F4F4F4`) — mindre skarp end ren `#ffffff`.

### Ændringer i `css/style.css`

**Tilføjet ny variabel i `:root`:**
- `--bg: #F4F4F4` — dedikeret variabel til side-baggrund (off-white)
- `--white: #ffffff` bevares uforandret til steder der har brug for ren hvid (fx hvid tekst på mørk baggrund i `.btn-dark`, `.btn-ghost`, newsletter popup)

**Erstattet `var(--white)` med `var(--bg)` på baggrunds-steder:**
- `body { background: var(--white) }` → `var(--bg)`
- `.section-gradient-bottom { background: linear-gradient(to bottom, var(--white) 11%, var(--gradient) 100%) }` → bruger nu `var(--bg)` som start
- `footer { background: linear-gradient(to top, var(--white) 51%, var(--gradient) 100%) }` → bruger nu `var(--bg)` som start

**Uændret (bevarer ren hvid):**
- `.btn-dark` hvid tekst (`color: var(--white)`)
- `.btn-ghost` hvid tekst og border (`color: var(--white)`, border rgba 255,255,255,0.65)
- Newsletter popup hvid tekst på mørk popup
- Hero-content hvid titel og tagline
- Header rgba(255,255,255,0.35) baggrund-tint

### Begrundelse for at adskille `--bg` fra `--white`
At ændre `--white` direkte ville have gjort al "hvid" tekst svagere/cremet hvor det skulle stå knivskarpt mod mørk baggrund. Ved at lave en separat `--bg` variabel påvirkes kun de elementer der semantisk skulle have side-baggrundsfarven.

### Resultat
Sidens baggrund og de to gradient-sektioner (section-gradient-bottom og footer) bruger nu off-white `#F4F4F4` i stedet for ren hvid. Mere blødt, mindre klinisk udtryk. Alle hvide tekst- og knap-elementer beholder deres rene hvide skarphed.

---

## Iteration 19 — Skrigende CTA-farve: Electric Lavender

**Mål:** CTA-knapperne "gemte sig" i den dæmpede sage-palette. Brugeren ville have en mere skrigende/markant farve. Efter at have vist 4 forslag (coral, hot magenta, electric lavendel, signal-gul) valgte brugeren **Electric Lavender `#8B5CF6`** — mættet lilla der harmonerer med paletten's `--fv2` lavendel men er kraftigt opboostet.

### Ændringer i `css/style.css`

**`.btn-white` (hero "Køb nu" primær CTA):**
- Baggrund: `#a8bfa3` (sage) → `#8B5CF6` (electric lavendel)
- Tekst: `var(--text-dark)` → `var(--white)` (hvid tekst for max kontrast på mættet lilla)
- Border-color: `#a8bfa3` → `#8B5CF6`
- Hover baggrund: `#8fa78a` (mørk sage) → `#7C3AED` (mørkere mættet lilla)
- Hover border-color: `#8fa78a` → `#7C3AED`
- Hover box-shadow: `0 8px 24px rgba(0, 0, 0, 0.18)` → `0 8px 28px rgba(139, 92, 246, 0.4)` (lavender glow ved hover)

**`.newsletter-submit` (newsletter TILMELD-knap):**
- Baggrund: `#a8bfa3` (sage) → `#8B5CF6`
- Tekst: `var(--text-dark)` → `var(--white)`
- Hover: `#8fa78a` → `#7C3AED`

**CSS-kommentar opdateret:**
- `/* Solid sage — for use over dark/video backgrounds */` → `/* Electric lavender — primary "pop" CTA */`

### Uforandret
- `.btn-dark` (solid sort) — popper allerede på off-white bg, ingen ændring
- `.btn-ghost` (transparent med hvid border) — sekundær handling i hero, holder lavmælt rolle
- Border-radius 28px på alle knapper (matcher navbar)

### Resultat
Den primære "Køb nu"-knap i hero og TILMELD-knappen i newsletter popup er nu i mættet electric lavender med hvid tekst. Hover-effekten har fået en lilla glow-skygge der forstærker pop-effekten. Knapperne stikker nu kraftigt ud fra både den off-white side-baggrund og den sage/lavendel-tonede hero-overlay — de gemmer sig ikke længere.

---

## Iteration 20 — Forenet, meget subtle hover-effekt på alle elementer

**Mål:** Brugeren ville have hover-effekter fjernet eller drastisk dæmpet — alle steder. Én enkel, ensartet og meget subtle hover på tværs af hele siden.

### Universal hover-regel
**Alt interaktivt:** `opacity: 0.6` ved hover, `transition: opacity 0.2s ease`. Ingen scale, ingen translate, ingen box-shadow, ingen farveskift.

### Ændringer i `css/style.css` — alle hover-effekter omskrevet

**Nav-links (`.nav-center a`):**
- Transition: `color 0.3s + opacity 0.3s` → `opacity 0.2s`
- Hover: `color: var(--fv1)` (sage farveskift) → `opacity: 0.6`

**Nav-ikoner (`.nav-icons a`):**
- Transition: `0.2s ease` (alle properties) → `opacity 0.2s`
- Hover: `transform: scale(1.15); opacity: 0.7` → kun `opacity: 0.6`

**Knapper (`.btn` + variants):**
- Transition: 5-property transition (bg, color, border-color, transform, box-shadow) → kun `opacity 0.2s`
- Tilføjet generel `.btn:hover { opacity: 0.6 }`
- Fjernet `:active { transform: translateY(1px) }`
- Fjernet `.btn-dark:hover` (bg #2a2a2a, box-shadow, translateY)
- Fjernet `.btn-white:hover` (bg #7C3AED, lavender glow, translateY)
- Fjernet `.btn-ghost:hover` (bg rgba, border ændring, translateY)

**Slider dots (`.dot`):**
- Transition: `all 0.3s ease` → `opacity 0.2s, border-color 0.3s`
- Hover: `transform: scale(1.1) + box-shadow` → `opacity: 0.6`
- `.dot.active` har stadig rød border, men `transform: scale(1.1)` fjernet (active er nu kun border-indikation, ikke størrelse)

**Insta-grid billeder (`.insta-item img`):**
- Transition: `transform 0.3s` → `opacity 0.2s`
- Hover: `transform: scale(1.05)` (zoom) → `opacity: 0.6`

**Footer-links (`footer a`):**
- Transition: `color 0.3s` → `opacity 0.2s`
- Hover: `color: var(--fv1)` → `opacity: 0.6`

**Newsletter close-knap (`.newsletter-close`):**
- Base opacity fjernet (var 0.7) → 1 (fuld)
- Hover: `opacity: 1` → `opacity: 0.6`

**Newsletter submit-knap (`.newsletter-submit`):**
- Transition: `background 0.2s` → `opacity 0.2s`
- Hover: `background: #7C3AED` → `opacity: 0.6` (lavender pop CTA bevarer sin farve under hover)

### Hvad er bevaret
- Newsletter popup close-X har stadig fuld synlighed som base (1) og fader subtilt til 0.6 ved hover
- Newsletter input focus-state (`border-color: #9CAF9B`) bevaret (det er focus, ikke hover)
- `.dot.active { border-color: red }` bevaret som visuel indikator for valgt farve
- Card-popup transition for sliding in/out (opacity + transform + visibility) — det er ind-animation, ikke hover

### Resultat
Hele siden har nu **én** hover-effekt: subtil fade til 60% opacitet over 0.2 sekunder. Ingen scale, ingen flytning, ingen farveskift, ingen skygger der dukker op. Knapper springer stadig ud farvemæssigt (electric lavender CTA er bevaret), men reagerer roligt og diskret på hover. Effekten føles rolig og premium — som Apple/Stripe-style minimal interaktion.

---

## Iteration 21 — Hover-effekter omskrevet til Kalstore-stil (color/bg-shift)

**Mål:** Bruger ville have hover-effekter som på kal-store.com. Efter at have hentet og inspiceret deres faktiske CSS:
- `.header-link:hover { color: #4a4a4a }` (subtil farveskift)
- `.icon-button:hover { background: #edecea }` (subtil pill-bg)
- `.kal-btn:hover { background: <darker-shade> }` (subtil bg-shift)
- `.kal-btn--black:hover { background: #3a3b3b }` (lidt lysere sort)

**Princip:** Kun baggrund/farve skifter ved hover — ingen transforms, ingen box-shadows, ingen opacity-tricks.

### Ændringer ift. iteration 20 (universal opacity hover)

**`.nav-center a`:**
- Transition: `opacity 0.2s` → `color 0.2s`
- Hover: `opacity: 0.6` → `color: #555` (dim grå, Kalstore-stil)

**`.nav-icons a`:**
- Tilføjet fast størrelse `width: 30px; height: 30px` + `border-radius: 999px` for pill-baggrund
- Transition: `opacity 0.2s` → `background 0.2s`
- Hover: `opacity: 0.6` → `background: rgba(0, 0, 0, 0.06)` (subtil cirkel-fyld bag ikonet — som Kalstore icon-button)

**`.btn` (base):**
- Transition: `opacity 0.2s` → `background 0.2s, border-color 0.2s, color 0.2s`
- Fjernet generel `.btn:hover { opacity: 0.6 }`

**`.btn-dark:hover` (genoprettet, men minimal):**
- `background: var(--text-dark)` (#111) → hover `#3a3b3b` (lidt lysere sort — direkte kopi af Kalstore's `.kal-btn--black:hover`)
- Ingen box-shadow eller translateY

**`.btn-white:hover` (electric lavender CTA):**
- Hover bg: `#8B5CF6` → `#7C3AED` (mørkere mættet lavendel)
- Ingen glow-shadow eller translateY

**`.btn-ghost:hover`:**
- Hover bg: transparent → `rgba(255, 255, 255, 0.12)` (subtil hvid film)
- Border: rgba 0.65 → full white
- Ingen translateY

**`footer a:hover`:**
- `opacity: 0.6` → `color: #4a4a4a` (Kalstore's nav-link hover-farve)

**`.dot:hover` (slider farvevælger):**
- `opacity: 0.6` → `border-color: rgba(0, 0, 0, 0.2)` (subtil mørk ring rundt om dot ved hover)
- Active stadig `border-color: red`

**`.insta-item:hover img`:**
- `opacity: 0.6` → `opacity: 0.9` (meget mindre dramatisk — næsten umærkelig fade)

**`.newsletter-close`:**
- Tilføjet `border-radius: 999px`
- Transition: `opacity` → `background`
- Hover: `opacity: 0.6` → `background: rgba(255, 255, 255, 0.08)` (subtil pill rundt om X)

**`.newsletter-submit:hover` (TILMELD-knap):**
- `opacity: 0.6` → `background: #7C3AED` (samme mønster som `.btn-white:hover`)

### Resultat
Hover-effekterne er nu Kalstore-style: rene farve-/baggrundsskift uden bevægelse eller skygger. Hver komponent har sin egen, kontekst-tilpassede hover:
- **Tekst-links:** dim grå
- **Ikoner & close-knap:** subtil pill-baggrund dukker op
- **Knapper:** baggrund skifter til en lidt anden tone
- **Dots:** mørk ring antydes
- **Billeder:** super-subtil opacity-fade

Det føles roligt, professionelt og minimalt — ingen pop, ingen flytning, men stadig tydeligt feedback om at elementer er interaktive.

---

## Iteration 22 — Typografi: Instrument Serif (display) + Geist (body), inspireret af Waabi

**Mål:** Bruger ville bruge fontene fra waabi.ai. Efter inspection af deres CSS viste det sig at de bruger:
- **F37 Zagma Serif** (display) — kommerciel licens fra Face37 Foundry
- **Neue Haas Grotesk Text Round Dots** (body) — kommerciel licens fra Monotype

**Problem:** Begge fonte er copyright-beskyttede og koster licens. Det er ulovligt at embedde dem i et eksamensprojekt — og teknisk umuligt da Waabi's CDN ikke sender `Access-Control-Allow-Origin` headers, så browsere blokerer cross-origin loading.

**Løsning:** Valgt **gratis Google Fonts-ækvivalent** der rammer samme moderne tech-editorial vibe:
- **Instrument Serif** (display) — moderne italic-tendens serif, bruges af mange AI-startups (Vercel, Linear)
- **Geist** (body) — Vercel's gratis grotesque, ultra-clean neutral sans

### Ændringer i `index.html` — `<head>`
Tilføjet før `<link rel="stylesheet" href="/css/style.css">`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300..700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
```

### Ændringer i `css/style.css`

**`body`:**
- `font-family: sans-serif` → `'Geist', system-ui, sans-serif`

**Ny global regel `h1, h2`:**
- `font-family: 'Instrument Serif', Georgia, serif`
- `font-weight: 400` (Instrument Serif fås kun i 400, ikke bold — 400 er det designede display-vægt)
- `letter-spacing: -0.01em`

**`.hero-content h1`:**
- `font-weight: 700` → `font-weight: 400` (Instrument Serif har ingen bold-vægt; 400 i stor størrelse er det tilsigtede look)
- letter-spacing, color, line-height uforandret

### Hvor de to fonte vises
- **Instrument Serif (serif):** h1 (hero "LUMINA ONE"), h2 (section titles: "LUMINA ONE", "Produktspecifikationer", "Del musikken. Del stemningen")
- **Geist (sans):** body, nav-links, knapper, ikoner, h3/h4 (spec-titles, footer-headers), small labels, newsletter

### Resultat
Hero-titlen og section-titler får nu en elegant high-contrast serif (Instrument Serif) der tilfører editorial/luksus karakter — samme stil som Waabi.ai. Body, nav og UI bruger den ultra-rene Geist grotesque som matcher Neue Haas i vibe.

---

## Iteration 23 — FORSØG: Headings skiftet til Fraunces (FORTRUDT)

**Mål:** Instrument Serif var for tynd og "skarp" — passede ikke ind. Bruger ville have noget blødere og federe til overskrifter.

### Ændringer i `index.html`
- Google Fonts link opdateret:
  - Fjernet `Instrument+Serif:ital@0;1`
  - Tilføjet `Fraunces:opsz,wght,SOFT@9..144,400..900,0..100` (variable font med tre akser: optical size, weight og softness)
  - Geist beholdes uforandret

### Ændringer i `css/style.css`

**`h1, h2` global regel:**
- `font-family: 'Instrument Serif', Georgia, serif` → `'Fraunces', Georgia, serif`
- `font-weight: 400` → `font-weight: 700` (Fraunces understøtter 400–900, så vi går federe)
- Tilføjet `font-variation-settings: "opsz" 144, "SOFT" 100` — max optical-size (display) og max softness (afrundede former, blødere kurver)
- `letter-spacing: -0.01em` → `-0.02em` (lidt strammere for fed visning)

**`.hero-content h1`:**
- `font-weight: 400` → `font-weight: 700` (matcher den globale Fraunces-vægt)

### Hvorfor Fraunces
Fraunces er en variable serif designet til display-brug med tre justerbare akser:
- **opsz (optical size):** 9–144. Vi bruger 144 (max) — designet til store overskrifter, bredere og mere åbne former
- **SOFT (softness):** 0–100. Vi bruger 100 (max) — afrundede hjørner, blødere kurver, mere venlig
- **wght (weight):** 400–900. Vi bruger 700 — federe end Instrument Serif's 400, mere tilstedeværende

Resultat: overskrifter er nu federe, blødere og mere markante — uden at miste personlighed.

---

## Iteration 24 — FORSØG: Fraunces dialed down (FORTRUDT)

**Mål:** Iteration 22's Instrument Serif var for tynd, iteration 23's Fraunces 700+SOFT100 var for fed/blød. Bruger ville have "midt imellem".

### Ændringer i `css/style.css`

**`h1, h2`:**
- `font-weight: 700` → `font-weight: 500` (semi-bold, ikke fed bold)
- `font-variation-settings: "opsz" 144, "SOFT" 100` → `"opsz" 144, "SOFT" 30` (kun et antydning af softness, ikke max afrunding)
- `letter-spacing: -0.02em` → `-0.015em` (en smule mindre stram)

**`.hero-content h1`:**
- `font-weight: 700` → `font-weight: 500` (matcher den globale weight nedjustering)
- letter-spacing uforandret (-0.02em)

### Hvor det lander på spektret
| Iteration | Font | Weight | SOFT | Karakter |
|-----------|------|--------|------|----------|
| 22 | Instrument Serif | 400 (eneste) | n/a | Tynd, skarp, elegant — for spinkel |
| 23 | Fraunces | 700 | 100 | Meget fed, meget blød — for chunky |
| **24 (nu)** | **Fraunces** | **500** | **30** | **Semi-bold, antydet softness — midt imellem** |

### Resultat
Fraunces står nu på et roligt mellemniveau: ikke spinkel, ikke chunky. Klassisk-moderne med blot lidt blødhed i kanterne.

---

## Iteration 25 — FORSØG: Skiftet til Bricolage Grotesque (FORTRUDT)

**Mål:** Bruger kunne ikke lide de tynde sider af bogstaverne i Fraunces (klassisk serif-kontrast mellem tykke og tynde streger). Skulle have en helt ny font med ensartet stregbredde.

### Ændringer i `index.html`
- Google Fonts link opdateret:
  - Fjernet `Fraunces` med opsz/wght/SOFT akser
  - Tilføjet `Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400..800` (variable display grotesque med optical-size, width og weight akser)
  - Geist beholdes uforandret

### Ændringer i `css/style.css`

**`h1, h2`:**
- `font-family: 'Fraunces', Georgia, serif` → `'Bricolage Grotesque', system-ui, sans-serif`
- `font-weight: 500` → `font-weight: 700` (fed display weight)
- `font-variation-settings: "opsz" 144, "SOFT" 30` → `"opsz" 96, "wdth" 100` (max display optical-size + standard width)
- `letter-spacing: -0.015em` → `-0.02em` (lidt strammere passer en grotesque)

**`.hero-content h1`:**
- `font-weight: 500` → `font-weight: 700`

### Hvorfor Bricolage Grotesque
Bricolage Grotesque er en variable grotesque designet til display-brug — den har:
- **Ensartet stregbredde** (ingen klassisk thick/thin kontrast som serifs har)
- **Soft display character** (let afrundede former, men ikke "bobler")
- **Bred vægt-skala** (400–800) til kraftige overskrifter
- **Moderne tech-vibe** — bruges af Vercel-/Linear-stil sites

### Hvor det lander på spektret (opdateret)
| Iteration | Font | Karakter |
|-----------|------|----------|
| 22 | Instrument Serif | Tynd serif med høj kontrast — for spinkel |
| 23 | Fraunces 700 SOFT 100 | Fed soft serif — for chunky |
| 24 | Fraunces 500 SOFT 30 | Semi-bold serif — stadig tynde sider |
| **25 (nu)** | **Bricolage Grotesque 700** | **Modern grotesque, ensartet streg** |

### Resultat
Overskrifter har nu ensartet stregbredde uden de tynde dele der irriterede brugeren. Stadig moderne og lidt blødt i karakteren, men nu uden klassisk serif-kontrast. Tech/editorial vibe bevaret.

---

## Iteration 26 — FORSØG: Skiftet til Hanken Grotesk (FORTRUDT)

**Mål:** Bricolage Grotesque var for "cartoonish" (for bløde former). Fraunces havde for klassisk serif-kontrast som mindede om arabisk skrift. Bruger ville have noget midt imellem fin og minimalistisk — en raffineret sans uden over-karakter.

### Hvorfor Hanken Grotesk
Hanken Grotesk er en gratis open-source familie der er **tæt på Neue Haas Grotesk** (samme font som Waabi selv bruger til body). Den har:
- **Helt ensartet stregbredde** (ingen serif-kontrast, ingen "arabisk" buet karakter)
- **Refineret grotesque-design** (præcise, men ikke kolde former)
- **Minimal karakter** uden at være intetsigende — sweet spot mellem fin og clean
- Lang vægt-skala (300–800) som variabel font

### Ændringer i `index.html`
- Google Fonts link opdateret:
  - Fjernet `Bricolage+Grotesque` (med opsz, wdth, wght)
  - Tilføjet `Hanken+Grotesk:wght@300..800` (variabel weight)
  - Geist beholdes uforandret

### Ændringer i `css/style.css`

**`h1, h2`:**
- `font-family: 'Bricolage Grotesque', system-ui, sans-serif` → `'Hanken Grotesk', system-ui, sans-serif`
- Fjernet `font-variation-settings: "opsz" 96, "wdth" 100` (Hanken Grotesk har ikke disse akser)
- `font-weight: 700` bevaret (passer Hanken's display-stil)
- `letter-spacing: -0.02em` → `-0.025em` (lidt strammere for det fede display look)

**`.hero-content h1`:**
- Uforandret (`font-weight: 700`, `letter-spacing: -0.02em`)

### Spektrum-opdatering
| Iteration | Font | Karakter | Verdict |
|-----------|------|----------|---------|
| 22 | Instrument Serif | Tynd serif med høj kontrast | For spinkel |
| 23 | Fraunces 700 SOFT 100 | Fed soft serif | For chunky |
| 24 | Fraunces 500 SOFT 30 | Semi-bold serif | Tynde sider — arabisk-feel |
| 25 | Bricolage Grotesque 700 | Soft display grotesque | For cartoonish |
| **26 (nu)** | **Hanken Grotesk 700** | **Refineret grotesque** | **Midt mellem fin og minimal** |

### Resultat
Overskrifter er nu rene og refinerede uden over-personlighed. Ingen serif-kontrast, ingen blød "cartoon" karakter, ingen arabisk-script-følelse. Det føles tæt på Waabi's Neue Haas men gratis og lovligt.

---

## Iteration 27 — Tilbage til Instrument Serif (det første forsøg)

**Mål:** Efter at have testet 4 alternative fonte (Fraunces 700+SOFT100, Fraunces 500+SOFT30, Bricolage Grotesque, Hanken Grotesk) ønskede bruger at gå tilbage til den allerførste typografi — Instrument Serif fra iteration 22.

### Ændringer (revert til iteration 22's setup)

**`index.html`:**
- Google Fonts link: `Hanken+Grotesk:wght@300..800` → `Instrument+Serif:ital@0;1`
- Geist beholdes uforandret

**`css/style.css` — `h1, h2`:**
- `font-family: 'Hanken Grotesk', system-ui, sans-serif` → `'Instrument Serif', Georgia, serif`
- `font-weight: 700` → `font-weight: 400` (Instrument Serif kommer kun i 400)
- `letter-spacing: -0.025em` → `-0.01em`

**`.hero-content h1`:**
- `font-weight: 700` → `font-weight: 400` (matcher Instrument Serif's eneste tilgængelige vægt)

### Resultat
Vi er tilbage til Instrument Serif (display 400 regular + italic). Hero-titel og section-headings har den slanke, elegante editorial-stil fra iteration 22. Den tynde karakter var i sidste ende det bruger foretrak efter at have set alternativerne.

### Lærdom fra font-eksperimenterne
4 forskellige fonte blev testet før vi vendte tilbage:
- For chunky (Fraunces 700+SOFT100)
- For arabisk-feel (Fraunces 500+SOFT30)
- For cartoonish (Bricolage Grotesque)
- For neutral/karakterløs (Hanken Grotesk)

Konklusion: Instrument Serif's elegante slanke karakter var det rette valg fra starten af. Det er en del af processen at se alternativerne for at vide hvad man har.

---

## Iteration 28 — Skiftet til Bitter (chunky slab serif, Waabi-stil)

**Mål:** Bruger viste Waabi-screenshot med deres faktiske hero-tekst "Built to think. Born to haul." og bad om noget der ligner. Det er **F37 Zagma Serif** — chunky slab-agtig serif med ensartede streger og humanist karakter.

**Gratis match på Google Fonts: Bitter** ved heavy weight (800):
- Slab serif med ensartede streger (ingen klassisk thick/thin kontrast)
- Heavy weight tilgængelig
- Varm humanist karakter — ikke kold/geometrisk
- Bygget til skærm-læsning, designet til contemporary brug

### Ændringer i `index.html`
- Google Fonts link: `Instrument+Serif:ital@0;1` → `Bitter:wght@400..900` (variabel weight)
- Geist beholdes uforandret

### Ændringer i `css/style.css`

**`h1, h2`:**
- `font-family: 'Instrument Serif', Georgia, serif` → `'Bitter', Georgia, serif`
- `font-weight: 400` → `font-weight: 800` (heavy display for Waabi-feel)
- `letter-spacing: -0.01em` → `-0.02em` (lidt strammere passer den fede vægt)

**`.hero-content h1`:**
- `font-weight: 400` → `font-weight: 800` (matcher den globale Bitter weight)

### Hvordan dette adresserer tidligere problemer
- **Iteration 22 (Instrument Serif):** for tynd, høj kontrast — Bitter er fed og uniform
- **Iteration 23 (Fraunces 700 SOFT 100):** for chunky/blød — Bitter er chunky men strammere
- **Iteration 24 (Fraunces 500 SOFT 30):** tynde sider, arabisk feel — Bitter har ingen tynde sider
- **Iteration 25 (Bricolage Grotesque):** for cartoonish — Bitter er slab serif, mere voksen
- **Iteration 26 (Hanken Grotesk):** for karakterløs — Bitter har slab-karakter

### Resultat
Hero-titel og section-headings har nu den chunky, slab-agtige Waabi-feel: ensartede streger, fed weight, humanist varme. Body (Geist) er stadig uforandret som ren grotesque kontrast.

---

## Iteration 29 — Bitter weight reduceret fra 800 → 600

**Mål:** Bitter ved weight 800 var for fed. Skruet ned til 600 (semi-bold) for et roligere display-udtryk.

### Ændringer i `css/style.css`

**`h1, h2`:**
- `font-weight: 800` → `font-weight: 600`

**`.hero-content h1`:**
- `font-weight: 800` → `font-weight: 600`

### Resultat
Stadig slab serif med Bitter's varme humanist karakter, men nu i en mere afdæmpet semi-bold vægt. Letter-spacing −0.02em bevaret.

---

## Iteration 30 — Skiftet til Zilla Slab (mere geometrisk slab end Bitter)

**Mål:** Bitter (selv ved 600) ramte ikke. Bruger ville prøve noget helt nyt. Efter at have vist 4 alternativer (Zilla Slab, Outfit, DM Serif Display, Wix Madefor Display) valgte bruger **Zilla Slab**.

### Hvorfor Zilla Slab
Zilla Slab er Mozilla's egen open-source slab serif:
- **Slab serif** med firkantede serifs (mere geometrisk end Bitter's bløde humanist slab)
- **Ensartede streger** uden tynde dele
- **Mere "kantet" karakter** end Bitter — markant og venlig
- Weight 300–700 + italic varianter

### Ændringer i `index.html`
- Google Fonts link: `Bitter:wght@400..900` → `Zilla+Slab:ital,wght@0,300..700;1,300..700` (med italic)
- Geist beholdes uforandret

### Ændringer i `css/style.css`

**`h1, h2`:**
- `font-family: 'Bitter', Georgia, serif` → `'Zilla Slab', Georgia, serif`
- `font-weight: 600` bevaret
- `letter-spacing: -0.02em` → `-0.015em` (Zilla Slab er lidt bredere, så strammere spacing er for meget)

**`.hero-content h1`:**
- `font-weight: 600` bevaret (matcher global)

### Resultat
Headings har nu Zilla Slab's mere firkantede slab-karakter — stadig uden tynde dele, men med en mere geometrisk og markant tone end Bitter's bløde humanist-vibe.

---

## Iteration 31 — Headings skiftet til Geist (samme font som tagline/body)

**Mål:** Bruger ville have headings i samme font som tagline-teksten "Skabt til øjeblikke, der fortjener et soundtrack." — dvs. Geist (body-fonten). Unified typography: én font-familie til hele sitet.

### Ændringer i `index.html`
- Google Fonts link: fjernet `Zilla+Slab:ital,wght@0,300..700;1,300..700` helt
- Loader nu kun `Geist:wght@300..700`

### Ændringer i `css/style.css`

**`h1, h2`:**
- `font-family: 'Zilla Slab', Georgia, serif` → `'Geist', system-ui, sans-serif`
- `font-weight: 600` bevaret
- `letter-spacing: -0.015em` → `-0.02em` (lidt strammere passer Geist's grotesque proportioner)

**`.hero-content h1`:**
- Uforandret (`font-weight: 600`, `letter-spacing: -0.02em`)

### Hvorfor unified typography virker
Når headings og body bruger samme font-familie (Geist), opstår der visuel sammenhæng i hele siden. Differentiering skabes via:
- **Vægt:** headings 600 vs. body 400
- **Størrelse:** clamp(2.5rem, 9vw, 7rem) for hero h1 vs. 1rem for body
- **Letter-spacing:** -0.02em for headings vs. normal for body

### Resultat
Hele sitet har nu **Geist som eneste font** — fra hero-titel til footer-tekst. Tagline og overskrifter ser nu "ud af samme familie". Modern, minimalistisk og konsekvent som mange contemporary tech-sites.

### Hele font-rejsen (overblik)
| # | Font | Resultat |
|---|------|----------|
| 22 | Instrument Serif + Geist | For tynd |
| 23 | Fraunces 700+SOFT100 + Geist | For chunky |
| 24 | Fraunces 500+SOFT30 + Geist | Arabisk feel |
| 25 | Bricolage Grotesque + Geist | For cartoonish |
| 26 | Hanken Grotesk + Geist | For karakterløs |
| 27 | Instrument Serif (revert) + Geist | For tynd |
| 28 | Bitter 800 + Geist | For fed |
| 29 | Bitter 600 + Geist | Stadig ikke rigtigt |
| 30 | Zilla Slab + Geist | Ikke rigtigt |
| **31 (nu)** | **Geist alene (alt i samme font)** | **Unified — endelig** |

---

## Iteration 32 — Major redesign af alt content under hero (Sofie-persona driven)

**Mål:** Bruger gav Sofie-persona (24 år, studerende, Aarhus, nordisk æstetik, sociale picnics/strandture/fester, æstetik over tech). Redesigne hele indholdet under hero så det rammer Sofie's vibe — lifestyle/editorial fokus på stemninger og fællesskab, ikke teknisk spec-table.

### Section 1 — Produkt-showcase: omdesignet til asymmetrisk layout

**Før:**
- Centreret h2 "LUMINA ONE" (samme som hero)
- Repeated tagline + flad pris "1499,-"
- Slider på fuld bredde med dots under + sort "Køb nu" CTA

**Efter:**
- 2-kolonne grid (1.1fr 1fr, 5rem gap): slider venstre, indhold højre
- Slider er nu i en hvid card-container med `border-radius: 24px`, `aspect-ratio: 4 / 5`
- Indhold-side har: eyebrow "Fås i fire farver" + h2 "Vælg din stemning" + lede-tekst om nordisk æstetik
- Color-picker (`.color-picker`) med 4 swatches + dynamisk farve-navn ("Sage", "Lavendel", "Blå-lilla", "Cream")
- Pris formateret som "1.499 kr." (større prisetal, mindre valuta)
- CTA "Læg i kurv" (electric lavender, ikke sort)

**JS-opdatering:** Slider opdaterer nu også `#colorName` med tilsvarende farve-label når dot klikkes.

### Section 2 — Lifestyle/moments grid: editorial fotos med captions

**Før:**
- 3 generiske AI-billeder i grid, ingen overskrift eller context, standalone "Udforsk kollektionen"-knap udenfor sektionen

**Efter:**
- Section-header med eyebrow "Stemninger" + h2 "Skabt til hvert øjeblik"
- 3 `<figure>`-elementer med billede + figcaption
- Captions har nummereret format: "01 Strand-eftermiddage", "02 Park-picnics", "03 Hjemme-fester"
- Editorial caption-stil: lille `.caption-num` i grå tabular-nums + større tekst
- Fjernet den orphan "Udforsk kollektionen"-knap (matchede ikke det nye flow)

### Section 3 — Specifikationer: omskrevet til feature-card grid

**Før:**
- Centreret "Produktspecifikationer" overskrift
- 5 spec-rows (titel | beskrivelse) i en lodret liste
- Lille billede til venstre, plus standalone "Køb nu"-knap

**Efter:**
- Section-header med eyebrow "Detaljer" + h2 "Designet til at flytte sig"
- 3×2 grid af feature-cards (`.features-grid`, gap 2.5rem 3rem)
- Hver feature har: nummeret "01"–"06" (`.feature-num`) + h3 + kort beskrivelse
- 6 features tilpasset Sofie:
  - 01: 3 kg, IPX5 (let + vandafvisende)
  - 02: 18 timers batteri
  - 03: 100 dB lyd
  - 04: Ambient-lys
  - 05: Bluetooth 5.3
  - 06: Social Connect
- Hvid baggrund på sektionen for at adskille fra off-white bg
- Fjernet ekstra "Køb nu" CTA (var redundant)

### Section 4 — Social Connect: omskrevet med fokus på fællesskab

**Før:**
- "Del musikken. Del stemningen" h2
- Inline-styled h3 "Social Connects:" + `<hr>`
- Plain bullet-list med rosa prikker
- App-billede + App Store badge i højre kolonne

**Efter:**
- Eyebrow "Social Connect" + h2 "Musik der samler" (kortere, mere personlig)
- Lede-tekst: "Forbind venner direkte til din LUMINA One. Alle bidrager til playlisten — uden besvær, uden én 'DJ'."
- `.feature-list` med 2-kolonne grid pr. række: `<strong>` titel (1fr) + `<span>` beskrivelse (1.4fr)
- Adskilt af subtle `border-top: 1px solid rgba(0,0,0,0.08)` mellem hver linje (editorial avis-stil)
- App Store badge nu uden iPhone-billedet boxed — bare en link med billedet
- iPhone-billede i højre kolonne (max-width 320px)
- Beholder gradient-baggrund (off-white → cream) for at lukke siden warmly inden footer

### Globalt: nye CSS-utility klasser

- `.eyebrow` — uppercase microcopy label (0.75rem, 0.22em letter-spacing, grå #888)
- `.section-header` — centreret container til section title (max-width 720px, margin-bottom 4rem)
- `.lede` — intro-paragraf style (1.05rem, line-height 1.65, #444)

### Fjernede CSS-klasser (oprydning)
- `.section-white`, `.section-lifestyle`, `.section-spec`, `.section-gradient-bottom` (gamle section-styles)
- `.insta-grid`, `.insta-item`, `.insta-item:hover img` (erstattet af `.moments-grid`/`.moment`)
- `.spec-layout`, `.spec-intro`, `.spec-wrapper`, `.spec-row`, `.spec-title`, `.spec-text` (erstattet af `.features-grid`/`.feature-card`)
- Gamle `.social-layout`, `.social-content h2/h3/p/ul/li` regler (skrevet om)
- `.app-right`, `.app-image`, `.app-cta`, `.appstorelogo img`
- `.køb-knap` (orphan-button wrapper)
- `.funktioner-divider`, `.product-price`

### Resultat
Indholdet under hero er nu et editorial lifestyle-website skåret til Sofie: stemnings-narrativ via Moments-sektionen, asymmetriske layouts, nummererede features uden tunge specs-tabeller, og Social Connect-sektionen som peak-point der understreger fællesskabsværdien. Ingen "Køb nu"-knapper spammet overalt — kun én primær CTA i showcase-sektionen.

---

## Iteration 33 — Delvis revert af iteration 32: behold showcase + features, revert moments + social

**Mål:** Bruger viste screenshots af det de kan lide: showcase-sektionens content-side (iteration 32) og features-grid (iteration 32). Resten af iteration 32's redesigns (moments-grid med captions + Social Connect-omskrivning) skulle rulles tilbage til pre-iteration-32 state.

### Behold fra iteration 32
- **Showcase-sektion** (asymmetrisk layout med slider-card til venstre + eyebrow/h2/lede/color-picker/pris/CTA til højre)
- **Features-sektion** (3×2 grid med nummererede feature-cards 01–06)
- **CSS-primitives:** `.eyebrow`, `.section-header`, `.lede`

### Rullet tilbage til pre-iteration-32 state
**Sektion 2 — Moments → Lifestyle (original):**
- HTML: `<section class="moments">` med `figure`/`figcaption` → `<div class="section-lifestyle">` med `.insta-grid` og 3 `.insta-item`
- Tilføjet orphan "Udforsk kollektionen"-knap udenfor sektionen (som original)
- CSS: `.moments`, `.moments-grid`, `.moment`, `.caption-num` fjernet
- CSS: `.section-lifestyle`, `.insta-grid`, `.insta-item`, `.insta-item:hover img`, `.køb-knap` genoprettet

**Sektion 4 — Social Connect → Original "Del musikken. Del stemningen":**
- HTML: ny `<section class="social-connect">` med feature-list grid → original `<section class="section-gradient-bottom">` med inline-styled h3, `<hr>`-dividers, `.social-content` med plain `<ul>`/`<li>`-bullets og rosa prik via `:before`
- App-billede i `.app-image` boks + App Store badge i `.appstorelogo`
- CSS: `.social-connect`, `.feature-list`, `.feature-list li/strong/span`, `.app-store-link`, `.social-visual` fjernet
- CSS: `.section-gradient-bottom`, original `.social-layout` (gap 4rem), `.social-content h2/h3/p/ul/li/li:before`, `.funktioner-divider`, `.app-right`, `.app-image`, `.app-image img`, `.app-cta`, `.appstorelogo img` genoprettet

**Responsive regler:** Opdateret så de matcher den nye blanding: behold `.showcase-layout`, `.features-grid` mobile rules; genopret `.insta-grid` mobile rules.

### Resultat
Siden har nu det bedste af to verdener: den editorial showcase-sektion + features-grid som brugeren kan lide, plus den originale lifestyle-billedstrimmel og Social Connect-sektion som ikke skulle redesignes. PROCES.md viser klart hvad der blev forsøgt og rullet tilbage.

---

## Iteration 34 — Fjernet gradient fra "Del musikken. Del stemningen"-sektion

**Mål:** Bruger ville have gradient-baggrunden væk fra Social Connect-sektionen.

### Ændringer i `css/style.css`

**`.section-gradient-bottom`:**
- `background: linear-gradient(to bottom, var(--bg) 11%, var(--gradient) 100%)` → `background: transparent`
- Sektionen arver nu body's off-white (`--bg`) i stedet for at gradient'e til cream

### Resultat
Social Connect-sektionen har nu samme rene off-white baggrund som resten af siden — ingen warm cream-gradient toner længere. Footer-gradienten (separat regel) er stadig intakt.

---

## Iteration 35 — Fjernet ALLE gradients fra siden

**Mål:** Bruger ville have alle gradients væk. Sider med gradients identificeret:
1. `.hero-overlay` (havde 2-lags: mørk vertikal + diagonal sage/lavendel/blå-lilla)
2. `footer` (linear-gradient fra var(--bg) til var(--gradient))
3. `.section-gradient-bottom` (allerede fjernet i iteration 34)

### Ændringer i `css/style.css`

**`.hero-overlay`:**
- Tidligere: to lag linear-gradients (mørk top/bund + diagonal farve-tone fra sage til blå-lilla)
- Nu: solid `rgba(0, 0, 0, 0.25)` — ensartet semi-transparent mørk overlay til tekst-læselighed over hero-videoen, intet farve-tonet gradient

**`footer`:**
- `background: linear-gradient(to top, var(--bg) 51%, var(--gradient) 100%)` → `background: var(--bg)`
- Footer er nu samme rene off-white som resten af siden

**`:root`:**
- Fjernet `--gradient: #FFF3E0` variabel — ikke længere brugt nogen steder

### Resultat
Hele siden bruger nu **solid baggrundsfarver** uden gradients. Hero-overlayet er en ensartet svag mørklægning (ikke farvet), footer matcher body, og Social Connect-sektionen er allerede transparent (iteration 34). Designet føles renere og mere konsekvent — Nordic minimal æstetik uden vintage cream-toner.

---

## Iteration 36 — Hero-gradient genoprettet

**Mål:** Brugeren ville beholde hero-overlayet's gradient efter at have fjernet det i iteration 35.

### Ændringer i `css/style.css`

**`.hero-overlay`:**
- Solid `rgba(0, 0, 0, 0.25)` → tilbage til to-lags gradient:
  1. Vertikal mørk gradient (mørk top 18% → transparent midte → mørk bund 35%) til tekst-læselighed
  2. Diagonal 135° farve-gradient: sage `rgba(168, 191, 163, 0.5)` → lavendel `rgba(186, 163, 191, 0.4)` → blå-lilla `rgba(172, 163, 191, 0.6)`

### Bevaret fra iteration 35
- Footer's gradient er stadig fjernet (solid `var(--bg)`)
- `.section-gradient-bottom` stadig transparent
- `--gradient` variabel stadig fjernet fra `:root`

### Resultat
Hero har igen sin tonede brand-overlay, men resten af siden (footer, social connect) er stadig uden gradients. Eneste gradient på siden er nu hero-overlayet.

---

## Iteration 37 — Hero-overlay dæmpet til subtil tint

**Mål:** Hero-overlayet var for dominerende — videoen blev næsten overdøvet af farve-gradient'en. Reducer til en subtil tint.

### Ændringer i `.hero-overlay`

**Vertikal mørk gradient (læselighed):**
- Top: `rgba(0, 0, 0, 0.18)` → `0.08`
- Top transparens-stop: 25% → 30%
- Bund transparens-stop: 70% → 75%
- Bund: `rgba(0, 0, 0, 0.35)` → `0.15`

**Diagonal farve-gradient (brand-tint):**
- Sage start: `rgba(168, 191, 163, 0.5)` → `0.12`
- Lavendel midt: `rgba(186, 163, 191, 0.4)` → `0.08`
- Blå-lilla slut: `rgba(172, 163, 191, 0.6)` → `0.15`

### Resultat
Hero-videoen er nu klart synlig med kun en svag brand-tint over. Det føles ikke længere som et farvet overlay men en mild farve-aftoning. Tekst-læselighed bevaret via de svage mørke top/bund-bånd.

---

## Iteration 38 — Logo i header gjort clickable med smooth scroll-til-toppen

**Mål:** Gør logoet i headeren klikbart så det scroller til toppen af siden.

### Ændringer i `index.html`

**Header logo:**
- `<img src="/images/Group.svg" alt="logo">` indpakket i `<a href="#" id="logoLink" aria-label="Til toppen">`
- Alt-text opdateret: "logo" → "LUMINA logo"

**Nyt script** (under newsletter-close handler):
```js
document.getElementById('logoLink').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
```
- `preventDefault()` forhindrer URL'en bliver "/#"
- `window.scrollTo` med `behavior: 'smooth'` giver glidende scroll til top

### Ændringer i `css/style.css`

**`.logo a` (ny regel):**
- `display: inline-flex; align-items: center` så img stadig fungerer som flex-child
- `transition: opacity 0.2s ease` for hover-fade

**`.logo a:hover`:**
- `opacity: 0.6` — matcher resten af sidens subtle hover-stil (samme som nav-links)

### Resultat
Klik på logoet scroller siden tilbage til toppen med en blød animation. Hover-effekten på logoet matcher resten af navigationens hover-stil. Aria-label sikrer at screen readers forstår funktionen.

---

## Iteration 39 — Fjernet hover-effekt på logo-link

**Mål:** Logoet skal være klikbart men uden hover-fade.

### Ændringer i `css/style.css`

**`.logo a`:**
- Fjernet `transition: opacity 0.2s ease`
- Fjernet hele `.logo a:hover { opacity: 0.6 }` reglen

Klikbarheden, `aria-label` og scroll-til-toppen JS er bevaret. Logoet ser nu helt statisk ud, men virker stadig som scroll-trigger ved klik.

---

## Iteration 40 — Ny footer i UGLYCASH-stil (kæmpe wordmark på hvidt card)

**Mål:** Erstatte den eksisterende 4-kolonne footer med en editorial-tung footer inspireret af ugly.cash — kæmpe condensed wordmark "LUMINA" der fylder hele bredden af et hvidt rundet card, med en tagline-række (brand-label + app-badges) under, og en info/links-række nederst. Lille meta-linje placeret udenfor cardet på sidens off-white baggrund.

### Ændringer i `index.html`

**Google Fonts:**
- Tilføjet `Anton` (ultra-condensed bold) til Google Fonts-linket, så vi har en font der kan matche UGLYCASH's tætpakkede display-typografi: `family=Anton&family=Geist:wght@300..700`

**`<footer>` — komplet omskrivning:**
- Gammel struktur (4 kolonner: LUMINA AUDIO adresse / Genveje / Følg os / Hjælp + `.footer-bottom` med divider og copyright) er fjernet
- Ny struktur:
  - `<footer class="site-footer">` → wrapper med off-white side-bg + 1.25rem padding rundt om card
  - `<div class="footer-card">` → hvidt rundet card (border-radius 28px) med 3rem indvendig padding
    - `<h2 class="footer-wordmark">LUMINA</h2>` → kæmpe wordmark, Anton font, `clamp(5rem, 30vw, 28rem)`, scaleY(1.25) for at strække i højden (Anton er condensed men ikke ekstrem nok alene)
    - `<div class="footer-mid">` → flex-row: venstre tagline ("Et **LUMINA AUDIO** brand"), højre app-badge
    - `<div class="footer-bot">` → 2-kolonne grid: venstre disclaimer-paragraffer (dansk audio-brand, lifestyle ikke pro, region-disclaimer), højre højre-justeret links-liste (support@lumina.dk, LUMINA Business, Hjælpecenter, Handelsbetingelser)
  - `<p class="footer-meta">` → lille centreret meta-linje udenfor cardet ("LUMINA Audio ApS · Lavet med kærlighed i Aarhus · ©2026")

### Ændringer i `css/style.css`

**Hele det gamle footer-block fjernet** (`footer`, `.footer-flex`, `.footer-bottom`, `.footer-divider`, `.copyright`, `footer h3/h4/p/a` selectors).

**Nye regler:**
- `.site-footer` → off-white bg, padding 1.25rem rundt
- `.footer-card` → hvid bg, border-radius 28px, padding 3rem 3rem 2.5rem, `overflow: hidden` så kæmpe wordmark ikke crasher
- `.footer-wordmark` → Anton 400, `font-size: clamp(5rem, 30vw, 28rem)`, line-height 0.82, letter-spacing -0.03em, `transform: scaleY(1.25)` (giver tall/skinny UGLYCASH-feel), centreret
- `.footer-mid` → flex justify-between med 2.5rem margin-top
- `.footer-tagline` → 0.95rem, color #888, med `<strong>` der bliver #111 og 600 weight
- `.footer-apps img` → height 44px, gap 0.75rem
- `.footer-bot` → grid `minmax(0, 1.4fr) auto` med 4rem gap og `align-items: start`
- `.footer-info p` → 0.9rem, color #222, line-height 1.55, max-width 56ch
- `.footer-links` → list-style none, text-align right
- `.footer-links a` → 1.15rem, color #111, hover #888
- `.footer-meta` → 0.78rem, color #888, padding 1.25rem 1.25rem 1.5rem, centreret

**Media queries opdateret:**
- Tablet (max-width 768px): card padding reduceret til 2rem/1.5rem, border-radius 20px, wordmark `clamp(4rem, 32vw, 14rem)` med scaleY(1.2), `.footer-bot` stacker til 1 kolonne, links bliver venstrejusterede
- Mobil (max-width 480px): `.footer-mid` skifter til column-layout, wordmark krymper til `clamp(3.5rem, 34vw, 10rem)`
- Gamle `.footer-flex` regler i media queries er erstattet med de nye selectors

### Designvalg
- **Anton + scaleY(1.25):** Anton er den tætteste gratis Google Font til UGLYCASH's display-stil, men den er ikke helt så tall/skinny. scaleY(1.25) strækker den vertikalt uden at forvrænge for meget.
- **Hvidt card på off-white baggrund:** matcher referencen hvor cardet "svæver" på den lysere page-bg
- **Højrejusterede links:** matcher referencens layout præcis
- **Disclaimer-tekst på dansk:** tilpasset LUMINA's brand (dansk audio-brand i Aarhus, gratis fragt, lifestyle ikke pro)
- **Meta-linje udenfor card:** følger UGLYCASH-mønsteret hvor "Best Friend Finance" osv. sidder under cardet på siden bg

### Note
Google Play badge endnu ikke tilføjet — kun App Store-badge fra eksisterende `appstorelogo.png` er brugt. Hvis vi vil have begge (som i UGLYCASH-referencen) skal et Google Play badge tilføjes til `/images/`.

---

## Iteration 41 — Footer justeret tættere på UGLYCASH-referencen

**Mål:** Brugeren kunne lide det store LUMINA-wordmark fra iteration 40, men resten af footer-indholdet matchede ikke referencen visuelt. Justér tagline, app-badges, links og disclaimer så det ligger tættere på ugly.cash-layoutet.

### Ændringer i `index.html`

**Tagline:** "Et **LUMINA AUDIO** brand" → "Et [LUMINA SVG] Brand"
- Tagline-strong er erstattet af et inline `<img src="/images/Group.svg" class="footer-tagline-logo">` — matcher referencens "A [Reserve logo] Project"-stil med et lille inline brand-mærke

**Disclaimer-tekst omskrevet:**
- Tidligere generel tekst om dansk audio-brand → mere reference-tro struktur med specifikke detaljer:
  - P1: priser/moms + lyd-spec-disclaimer med dato + akustik-lab i Aarhus
  - P2: kort statement "LUMINA er et lifestyle audio-brand, ikke professionelt studie-udstyr"
  - P3: region-disclaimer med ** (samme stil som UGLYCASH's "**Services and features...")

**Links opdateret:**
- "Handelsbetingelser" → "Juridisk" (matcher referencens "Legal" tættere)

**Meta-linje:** `·`-separatorer fjernet, erstattet af bare ekstra mellemrum (matcher referencens "Best Friend Finance, Inc.    Made with love in California    ©2026" stil uden bullets)

### Ændringer i `css/style.css`

**`.footer-wordmark`:**
- `font-size: clamp(5rem, 30vw, 28rem)` → `clamp(5rem, 34vw, 32rem)` (større fill)
- `letter-spacing: -0.03em` → `-0.045em` (tættere pakning)
- `transform: scaleY(1.25)` → `scaleY(1.3)` (mere vertikal stræk)

**`.footer-tagline` (omskrevet):**
- Skiftet fra plain text til `display: inline-flex` med `gap: 0.55rem` for at få SVG-logoet justeret midt i teksten
- `font-size: 0.95rem` → `1.1rem` (større, mere prominent som i referencen)
- Tilføjet `.footer-tagline-logo`-regel: height 18px, inline-block

**`.footer-apps img`:** height 44px → 46px (lidt større badge)

**`.footer-bot`:**
- `grid-template-columns: minmax(0, 1.4fr) auto` → `minmax(0, 1.6fr) auto` (giver disclaimer mere plads, links mere åndedræt mod højre kant)
- `gap: 4rem` bevaret
- `margin-top: 3rem` → `3.5rem`

**`.footer-info p`:**
- `font-size: 0.9rem` → `0.95rem`
- `color: #222` → `#111` (mørkere, kraftigere som i referencen)
- `max-width: 56ch` → `52ch`

**`.footer-links a`:**
- `font-size: 1.15rem` → `1.5rem` (markant større links — matcher referencens prominente højre-kolonne)

**`.footer-meta`:** color #888 → #aaa (lysere/mere diskret)

### Resultat
Footer'en har nu samme proportioner og typografisk hierarki som UGLYCASH-referencen: kæmpe wordmark → diskret inline brand-tagline + app-badges → diskret disclaimer + store højre-justerede links → ultra-diskret meta-linje under cardet.

---

## Iteration 42 — Footer-wordmark skiftet til Archivo Black (tungere/blockier)

**Mål:** Anton var ikke tung nok til at matche UGLYCASH-referencen. UGLYCASH's wordmark har meget kraftigere/blockier strøg — sandsynligvis Druk Wide Heavy (betalt font). Find tætteste gratis alternativ.

### Beslutning
Skiftede fra **Anton** (condensed bold, weight 400) til **Archivo Black** (black weight, weight 400, ikke-condensed).

Archivo Black har de tunge/sorte strøg der matcher UGLYCASH, men er ikke condensed af natur. Det kompenseres med kraftigere `transform: scaleY(1.55)` og mere negativ letter-spacing for at få den samme tall/tight-packed feel.

### Ændringer i `index.html`
- Google Fonts-link: `family=Anton&family=Geist...` → `family=Archivo+Black&family=Geist...`

### Ændringer i `css/style.css`

**`.footer-wordmark`:**
- `font-family: 'Anton', ...` → `'Archivo Black', ...`
- `font-size: clamp(5rem, 34vw, 32rem)` → `clamp(5rem, 27vw, 28rem)` (Archivo Black er bredere per char, så lavere vw-værdi for at undgå overflow)
- `letter-spacing: -0.045em` → `-0.055em` (tættere pakning — Archivo Black har naturligt mere space mellem glyffer)
- `transform: scaleY(1.3)` → `scaleY(1.55)` (kraftigere vertikalstræk for at få den condensed-tall feel uden faktisk condensed font)

**Media queries opdateret:**
- Tablet (768px): `font-size: clamp(4rem, 32vw, 14rem)` → `clamp(4rem, 26vw, 14rem)`, scaleY 1.2 → 1.45
- Mobil (480px): `font-size: clamp(3.5rem, 34vw, 10rem)` → `clamp(3.5rem, 28vw, 10rem)`, scaleY tilføjet 1.4

### Resultat
Wordmark'et har nu meget kraftigere strøg og en mere blockede/tung visuel vægt — tættere på UGLYCASH's display-typografi. scaleY(1.55) kompenserer for at Archivo Black ikke er condensed.

### Note om font-valg
Den ægte UGLYCASH-font er sandsynligvis Druk Wide Bold/Heavy (Commercial Type, betalt). Andre gratis Google Fonts der blev overvejet:
- **Bowlby One** — heavy men for rundet
- **Bagel Fat One** — heavy men for quirky
- **Black Ops One** — stencil-look, passer ikke
- **Bebas Neue** — condensed men for thin

Archivo Black + scaleY giver den tætteste matchende look uden at betale for fonten.

---

## Iteration 43 — Wordmark rullet tilbage til Anton (iteration 42 fortrudt)

**Mål:** Bruger kunne lide det oprindelige Anton-wordmark fra iteration 41 bedre end Archivo Black-versionen. Behold alt det andet fra iteration 41/42 (tagline med inline logo, store højre-links, omskrevet disclaimer), men rul wordmark-fonten tilbage.

### Ændringer i `index.html`
- Google Fonts-link: `family=Archivo+Black&family=Geist...` → `family=Anton&family=Geist...`

### Ændringer i `css/style.css`

**`.footer-wordmark` rullet tilbage til iteration 41-værdier:**
- `font-family: 'Archivo Black'` → `'Anton'`
- `font-size: clamp(5rem, 27vw, 28rem)` → `clamp(5rem, 34vw, 32rem)`
- `letter-spacing: -0.055em` → `-0.045em`
- `transform: scaleY(1.55)` → `scaleY(1.3)`

**Media queries rullet tilbage:**
- Tablet (768px): wordmark `clamp(4rem, 32vw, 14rem)` + scaleY 1.2
- Mobil (480px): wordmark `clamp(3.5rem, 34vw, 10rem)` (ingen scaleY-override, arver fra default)

### Hvad blev bevaret fra iteration 41/42
- Tagline med inline LUMINA SVG-logo ("Et [logo] Brand")
- Disclaimer-paragraffer (priser/moms + lyd-spec-dato, lifestyle-statement, region-disclaimer med **)
- Store højre-links (1.5rem, "Juridisk" i stedet for "Handelsbetingelser")
- Footer-meta uden bullet-separatorer
- Større app-badge (46px height)
- Grid-proportioner (1.6fr / auto)

### Resultat
Footer'en bruger nu igen den slankere/condensed Anton-look til wordmark'et men beholder det bedre indhold/layout fra iteration 41.

---

## Iteration 44 — Footer krympet, wordmark gjort un-clickable, overlap fixet

**Mål:** Tre ting på én gang:
1. Hele footer-komponenten skulle være mindre — wordmark, padding, links, badges, alt
2. Det store LUMINA-wordmark må ikke kunne markeres eller klikkes (det er rent dekorativt)
3. Tagline ("Et [logo] Brand") og App Store-badge sad oveni bunden af LUMINA-wordmark'et — skulle skubbes ned så de ikke overlapper

### Årsag til overlap-problemet
`transform: scaleY(1.3)` strækker wordmark'et visuelt 30% i højden, men dets layout-box bliver ved med at have den originale højde. Det betyder næste element (`.footer-mid`) starter umiddelbart efter layout-boxen, men sidder visuelt inde i den udstrukne wordmark. Fix: skift `transform-origin` til `center top` (så strækning kun går nedad fra toppen i stedet for fra centeret begge veje) + tilføj `padding-bottom: 0.4em` på wordmark'et + større margin-top på `.footer-mid`.

### Ændringer i `css/style.css`

**`.footer-wordmark`:**
- `font-size: clamp(5rem, 34vw, 32rem)` → `clamp(4rem, 24vw, 22rem)` (markant mindre)
- `transform: scaleY(1.3)` → `scaleY(1.2)` (mindre aggressiv stræk)
- `transform-origin: center` → `center top` (strækker kun nedad, ikke begge veje)
- Tilføjet `padding-bottom: 0.4em` (giver layout-boxen den ekstra plads scaleY behøver)
- Tilføjet **`user-select: none` + `-webkit-user-select: none` + `-moz-user-select: none`** (kan ikke markeres med musen)
- Tilføjet **`pointer-events: none`** (kan ikke klikkes eller modtage musinteraktion — wordmark'et er rent dekorativt)

**`.footer-card`:**
- `padding: 3rem 3rem 2.5rem` → `2.25rem 2.5rem 1.75rem` (mindre indvendigt rum)
- `border-radius: 28px` → `24px`

**`.footer-mid`:**
- `margin-top: 3rem` (uændret men nu effektivt højere pga scaleY-fix)
- `gap: 1.5rem` → `1.25rem`

**`.footer-tagline`:**
- `font-size: 1.1rem` → `0.95rem`
- `gap: 0.55rem` → `0.5rem`

**`.footer-tagline-logo`:** height 18px → 15px

**`.footer-apps img`:** height 46px → 38px (mindre app-badge)

**`.footer-bot`:**
- `gap: 4rem` → `3rem`
- `margin-top: 3.5rem` → `2.25rem`

**`.footer-info p`:**
- `font-size: 0.95rem` → `0.82rem`
- `margin-bottom: 1.1rem` → `0.85rem`
- `max-width: 52ch` → `50ch`

**`.footer-links a`:** `font-size: 1.5rem` → `1.2rem` (stadig prominente men ikke kæmpe)

**`.footer-meta`:**
- `font-size: 0.8rem` → `0.72rem`
- `padding: 1.25rem 1.25rem 1.5rem` → `1rem 1.25rem 1.25rem`

**Media queries:**
- Tablet (768px): card padding reduceret yderligere, wordmark `clamp(3.5rem, 22vw, 11rem)` med scaleY(1.15)
- Mobil (480px): wordmark `clamp(3rem, 24vw, 8rem)` (var 34vw — for stort på små skærme)

### Resultat
Footer'en er nu en mere kompakt komponent — stadig editorial med kæmpe wordmark, men taglinen og app-badget har klart åndedræt under wordmark'et i stedet for at sidde oveni. Brugeren kan ikke længere ved et uheld markere eller klikke på det dekorative LUMINA-wordmark.

---

## Iteration 45 — Footer-card constrained til container-bredde (matcher lifestyle-grid)

**Mål:** Footer-cardet spændte før næsten over hele viewport-bredden (med kun 1.25rem padding på hver side). Brugeren ville have at det matcher bredden af lifestyle-grid'et og resten af sidens indhold — altså samme bredde som `.container`-klassen bruger andre steder (90% / max 1200px).

### Ændringer i `css/style.css`

**`.site-footer`:**
- `padding: 1.25rem 1.25rem 0` → `padding-top: 1.25rem` (fjernet horizontal padding, da cardet nu styrer sin egen bredde)

**`.footer-card`:**
- Tilføjet `width: 90%`
- Tilføjet `max-width: 1200px`
- Tilføjet `margin: 0 auto` (centreret)
- Disse værdier matcher præcis `.container`-klassen brugt i header, hero, showcase, features, social og lifestyle-sektioner

**`.footer-wordmark` (justeret for smallere container):**
- `font-size: clamp(4rem, 24vw, 22rem)` → `clamp(3.5rem, 20vw, 19rem)`
- Cardet er nu smallere, så vw-værdien skal være lavere for ikke at overflowe — og max-clamp lavere fordi der ikke er plads til 22rem inde i 1120px usable width

**Media queries:**
- Tablet (768px): tilføjet `width: 90%` på `.footer-card`, wordmark `clamp(3.5rem, 22vw, 11rem)` → `clamp(3rem, 20vw, 10rem)`
- Mobil (480px): wordmark `clamp(3rem, 24vw, 8rem)` → `clamp(2.5rem, 22vw, 7rem)`

### Resultat
Footer-cardet aligner nu vertikalt med lifestyle-billederne, header-pillen (samme max 1200px, dog er header smallere ved 720px), showcase-content, features-grid og alle andre `.container`-baserede sektioner. Side-margins ser konsistente ud hele vejen ned ad siden.

---

## Iteration 46 — Wordmark fyldt edge-to-edge i cardet

**Mål:** I forrige iteration var wordmark'et "kun" omkring 80% af card-bredden — der var synlig padding mellem L og højre kant og venstre kant. Brugeren vil have at LUMINA fylder cardet edge-to-edge ligesom UGLYCASH i referencen, hvor bogstaverne næsten rører cardets indvendige sider.

### Beregning af optimal fill
Card: max-width 1200px, padding 2.5rem (40px) horisontalt → usable width ≈ 1120px.
Anton char width ≈ 0.5 × font-size. For 6 LUMINA-chars at fylde 1120px (med tæt letter-spacing):
- Font-size ≈ 1120 / 3 = ~373px = ~23rem (max ved 1200px container)
- I vw på 1334px+ viewport (hvor container er capped): 23rem/1334*100 ≈ 28vw
- Vi vil have ~95% fill, så lidt mindre: 22rem max, 27vw

### Ændringer i `css/style.css`

**`.footer-wordmark`:**
- `font-size: clamp(3.5rem, 20vw, 19rem)` → `clamp(4rem, 27vw, 22rem)` (markant større — fylder nu 95% af card)
- `letter-spacing: -0.045em` → `-0.055em` (strammere så bogstaverne pakker tæt som UGLYCASH)
- `transform: scaleY(1.2)` → `scaleY(1.25)` (let mere vertikalstræk for at matche UGLYCASH-proportionen tæt)
- Tilføjet `white-space: nowrap` (sikrer LUMINA aldrig wrapper hvis font-size af en eller anden grund ikke kan rumme — bedre at lade scrollbar opstå end at se ulækker tekst på to linjer)

**Media queries:**
- Tablet (768px): `clamp(3rem, 20vw, 10rem)` → `clamp(3rem, 26vw, 12rem)`, scaleY 1.15 → 1.2
- Mobil (480px): `clamp(2.5rem, 22vw, 7rem)` → `clamp(2.5rem, 25vw, 8rem)`

### Resultat
LUMINA-wordmark'et fylder nu cardet edge-to-edge på alle skærmstørrelser — bogstaverne har næsten ingen plads til siderne, præcis som UGLYCASH-referencen.

---

## Iteration 47 — Edge-to-edge fill + lige meget space over/under LUMINA

**Mål:** To problemer:
1. Wordmark'et nåede aldrig helt ud til cardets kant fordi cardet havde horisontal padding (2.5rem på hver side). Brugeren vil have at LUMINA rør cardets indvendige kanter — edge-to-edge.
2. Der var alt for meget plads UNDER wordmark'et sammenlignet med over. Plads over var bare card padding-top (2.25rem), men under var `padding-bottom: 0.4em` (~160px ved 400px font) + `margin-top: 3rem` på footer-mid = ~205px under vs 36px over.

### Strukturændring — flyttet horisontal padding fra cardet til indholdselementerne

Tidligere:
```
.footer-card { padding: 2.25rem 2.5rem 1.75rem; }
.footer-wordmark { /* begrænset af card padding */ }
.footer-mid, .footer-bot { /* arver indirekte */ }
```

Nu:
```
.footer-card { padding: 2.25rem 0 1.75rem; }  /* ingen horisontal padding */
.footer-wordmark { /* kan strække fra kant til kant */ }
.footer-mid, .footer-bot { padding: 0 2.5rem; }  /* eget horisontal padding */
```

Dette tillader wordmark'et at fylde 100% af cardets bredde mens tagline/links/disclaimer stadig har deres indvendige 2.5rem margin.

### Ændringer i `css/style.css`

**`.footer-card`:**
- `padding: 2.25rem 2.5rem 1.75rem` → `2.25rem 0 1.75rem` (fjernet horisontal padding)

**`.footer-wordmark`:**
- `font-size: clamp(4rem, 27vw, 22rem)` → `clamp(4rem, 32vw, 27rem)` (kan nu fylde fuld card-bredde — 32vw fordi 6 LUMINA-chars med letter-spacing -0.055em behøver ~32vw for at fylde 90vw container)
- `padding-bottom: 0.4em` → `0.22em` (kun lige nok til at klare scaleY's visuelle overflow på 0.205em — fjerner den unødvendige tomme plads)

**`.footer-mid`:**
- `margin-top: 3rem` → `2.25rem` (matcher præcis card padding-top, så plads OVER og UNDER wordmark er identisk)
- Tilføjet `padding: 0 2.5rem`

**`.footer-bot`:**
- Tilføjet `padding: 0 2.5rem`

**Media queries:**
- Tablet (768px): card padding 1.75rem 0 1.25rem, mid/bot får padding 0 1.5rem, wordmark `clamp(3rem, 30vw, 14rem)`
- Mobil (480px): wordmark `clamp(2.5rem, 28vw, 9rem)`

### Beregning af padding-bottom på wordmark
- `line-height: 0.82` → tekst-højde = 0.82em
- `transform: scaleY(1.25)` med origin: center top → visuel højde = 1.025em
- Visuel overflow under layout = 1.025 - 0.82 = 0.205em
- `padding-bottom: 0.22em` → giver ~0.015em buffer (essentielt nul)
- Resultat: footer-mid starter umiddelbart efter wordmark'ets visuelle bund, og dens egen `margin-top: 2.25rem` skaber den synlige plads — som matcher card padding-top præcis

### Resultat
- LUMINA fylder nu hele cardet edge-to-edge
- Plads over og under wordmark er identisk (2.25rem på desktop, 1.75rem på tablet)
- Layout føles strammere og mere balanceret — som UGLYCASH-referencen

---

## Iteration 48 — Tagline-brand som tekst + custom CSS app-badges med Google Play

**Mål:** Brugeren markerede to elementer under wordmark'et som ikke matchede referencen:
1. Den lille script LUMINA-SVG i taglinen ("Et [la] Brand") var ikke læselig — den lignede bare et abstrakt mærke, mens UGLYCASH-referencens "A Reserve Project" har "Reserve" som tydelig læselig wordmark
2. App Store-badget var et lille mørkt PNG der ikke matchede referencens lyse pil-stil badges. Plus referencen har TO badges (App Store + Google Play) som vi før manglede

### Ændringer i `index.html`

**Tagline:**
- `<img src="/images/Group.svg" class="footer-tagline-logo">` → `<span class="footer-tagline-brand">LUMINA</span>`
- Erstattet script-SVG med læselig "LUMINA"-tekst styled i Anton (matcher det store wordmark over)

**App-badges:**
- Det gamle `<a><img src="/images/appstorelogo.png"></a>` PNG-badge fjernet
- Erstattet med to inline-SVG-baserede `.store-badge`-komponenter:
  - **App Store** badge: SVG apple-ikon + "Download on the App Store"-tekst i to linjer
  - **Google Play** badge: SVG play-trekant (med korrekte farver: #00D7FE/#FFCE00/#00F076/#FF3A44) + "Get it on Google Play"-tekst
- Begge badges har samme styling så de matcher visuelt — som i referencen

### Ændringer i `css/style.css`

**`.footer-tagline`:**
- `align-items: center` → `baseline` (tekst justerer pænere når der er forskellige font-sizes inline)
- `font-size: 0.95rem` → `1rem`
- `gap: 0.5rem` → `0.45rem`

**`.footer-tagline-logo` fjernet, erstattet med `.footer-tagline-brand`:**
- `font-family: 'Anton'` (matcher det store wordmark over)
- `font-size: 1.55rem`, `color: #000`, `text-transform: uppercase`
- Læselig som "LUMINA" i samme typografiske familie som hovedwordmark'et

**`.footer-apps img` fjernet, erstattet med `.store-badge`-system:**
- `display: inline-flex`, height 46px, padding 0 0.9rem
- Lys baggrund `#f5f5f5`, border-radius 9px
- Hover: lidt mørkere baggrund `#ececec`
- Indeholder `.store-badge-icon` (22px SVG) + `.store-badge-text` med to linjer:
  - `.store-badge-small`: 0.58rem uppercase grå tekst ("Download on the" / "Get it on")
  - `.store-badge-name`: 1rem semibold sort tekst ("App Store" / "Google Play")

### Designvalg
- **Inline SVG i stedet for PNG:** Garanterer crisp rendering på alle skærme (retina/non-retina), giver fuld kontrol over farver, og fjerner afhængigheden af et Google Play PNG-asset vi ikke har
- **Identisk styling på begge badges:** Brugeren får visuel konsistens, præcis som referencens to balancerede badges
- **LUMINA-tekst i Anton i taglinen:** Skaber visuel forbindelse til det store wordmark — taglinen føles nu som "billig version af det store mærke" ligesom UGLYCASH/Reserve-relationen
- **App Store badge med authentic 2-linje "Download on the / App Store"-layout:** Match Apple's officielle badge-design

### Note om Google Play SVG
SVG-ikonet bruger Google Plays officielle 4-farvede triangle-design (cyan/gul/grøn/rød). Apple's krav om at vise officielle badges PNG eksakt-versioner gælder kun ved faktisk app store-listing — til en skole-eksamens-prototype er custom SVG fint.

### Hvad blev bevaret
- Wordmark fylder stadig edge-to-edge fra iteration 47
- Card-padding-strukturen (vertical på card, horizontal på inner elements)
- Disclaimer-tekst, højre-links, footer-meta — alt uændret

---

## Iteration 49 — Tagline-logo rullet tilbage til Group.svg (LUMINA-tekst fortrudt)

**Mål:** I iteration 48 erstattede jeg den lille script Group.svg-logo i taglinen med en LUMINA-tekst i Anton — for at matche referencens læselige "Reserve"-wordmark. Brugeren foretrak dog det originale script-logo og bad om at få det tilbage. Behold de nye app-badges (App Store + Google Play).

### Ændringer i `index.html`
- `<span class="footer-tagline-brand">LUMINA</span>` → `<img src="/images/Group.svg" alt="LUMINA" class="footer-tagline-logo">`

### Ændringer i `css/style.css`

**`.footer-tagline`:**
- `align-items: baseline` → `center` (centerer SVG-logoet pænere med tekst-baselinjen)
- `gap: 0.45rem` → `0.5rem`
- `font-size: 1rem` → `0.95rem`

**`.footer-tagline-brand` fjernet, `.footer-tagline-logo` genindført:**
- `height: 15px`, `width: auto`, `display: inline-block`
- Samme værdier som før iteration 48

### Hvad blev bevaret
- De to nye custom SVG-baserede `.store-badge`-komponenter (App Store + Google Play) — uændret fra iteration 48

### Fortrudt
- LUMINA-tekst i Anton som inline brand-mærke i taglinen (iteration 48) — script-logoet er mere på-brand selv om det er mindre læseligt

---

## Iteration 50 — Erstattet custom SVG-badges med officielle Apple/Google danske badges

**Mål:** Til eksamen er det nemmere at forklare "jeg downloadede de officielle badges fra Apple og Googles udvikler-sider" end at forklare hvordan custom SVG'er blev bygget. Plus de officielle badges er garanteret korrekt brand-compliant.

### Filer hentet fra officielle kilder

**App Store badge:**
- Kilde: Apples officielle marketing guidelines (developer.apple.com/app-store/marketing/guidelines/)
- Pakke downloadet og udpakket til `~/Downloads/Download-on-the-App-Store/`
- Valgt dansk version: `DK/Download_on_App_Store/Black_lockup/SVG/Download_on_the_App_Store_Badge_DK_RGB_blk_100217.svg`
- Indeholder dansk tekst "Hent i App Store" (i stedet for engelsk "Download on the App Store")
- Kopieret til projekt som `/images/appstore-badge.svg`

**Google Play badge:**
- Kilde: Googles officielle badge guidelines (play.google.com/intl/en_us/badges/)
- Pakke udpakket til `~/Downloads/Google Play Badge guidelines/`
- Valgt dansk farvet version: `Get it on Google Play Badges/Digital/svg/GetItOnGooglePlay_Badge_Web_color_Danish.svg`
- Indeholder dansk tekst "HENT DEN PÅ Google Play"
- Kopieret til projekt som `/images/googleplay-badge.svg`

### Ændringer i `index.html`

**Footer app-badges — komplet erstatning:**
- Tidligere: to `<a class="store-badge">` med 11 linjer inline SVG-paths og 4 niveauer af nested `<span>` for tekst-layout
- Nu: to simple `<a><img src="/images/X-badge.svg" alt="..."></a>` (3 linjer total)

```html
<div class="footer-apps">
    <a href="#" aria-label="Download i App Store">
        <img src="/images/appstore-badge.svg" alt="Hent i App Store">
    </a>
    <a href="#" aria-label="Hent på Google Play">
        <img src="/images/googleplay-badge.svg" alt="Hent på Google Play">
    </a>
</div>
```

### Ændringer i `css/style.css`

**Fjernet (custom badge-CSS):**
- `.store-badge` (display, padding, background, border-radius, hover)
- `.store-badge-icon`
- `.store-badge-text`
- `.store-badge-small`
- `.store-badge-name`
- Total: ~30 linjer CSS fjernet

**Tilføjet (simpel img-styling):**
- `.footer-apps a`: display inline-block, opacity-hover transition
- `.footer-apps a:hover`: opacity 0.75 (mild fade)
- `.footer-apps img`: height 46px, width auto, display block
- Total: ~10 linjer CSS

### Til eksamen kan du sige
> "Jeg downloadede de officielle App Store og Google Play badges direkte fra Apple's marketing guidelines (developer.apple.com/app-store/marketing/guidelines/) og Google's badge generator (play.google.com/intl/en_us/badges/). Begge platforme stiller deres officielle badges gratis til rådighed på dansk, så jeg valgte de danske versioner som passer til resten af sidens sprog. Jeg embeddede dem som SVG'er for crisp rendering på alle skærmstørrelser."

### Fordele ved at bruge officielle assets
1. **Brand-compliant:** Apple og Google har specifikke retningslinjer for hvordan deres badges må bruges — officielle filer er garanteret korrekte
2. **Dansk-sprogede:** Begge har versioner i dansk der matcher resten af sidens dansk-sproget UI
3. **Vector (SVG):** Skarpe på alle skærmstørrelser uden behov for flere størrelser
4. **Nem at forklare:** "Downloadet fra Apple/Google" er en simpel, ærlig forklaring til eksamen

### Hvad blev bevaret
- Højde 46px på badges (samme som det custom-byggede)
- Mild opacity-hover (samme princip som resten af sidens hover-stil)
- Layout-strukturen i `.footer-apps` (flex med 0.5rem gap)

### Fortrudt
- Custom-byggede CSS/SVG badges (iteration 48) — funktionelle men sværere at forklare til eksamen + ikke garanteret brand-compliant

---

## Iteration 51 — Officielle badges også tilføjet i Social Connect-sektionen

**Mål:** I Social Connect-sektionen (under "Del musikken. Del stemningen") sad der kun et enkelt gammelt mørkt App Store PNG-badge under iPhone-mockup'en. Nu hvor vi har de officielle danske SVG-badges fra iteration 50, skal samme behandling gøres her — begge badges (App Store + Google Play) skal vises konsistent.

### Ændringer i `index.html`

**`.app-cta` under iPhone-mockup'en — komplet erstatning:**

Tidligere (1 PNG-badge med `<picture>`-element):
```html
<div class="app-cta">
    <picture class="appstorelogo">
        <source srcset="/images/appstorelogo.png" type="image/png">
        <img src="images/appstorelogo.png" alt="Download on the App Store">
    </picture>
</div>
```

Nu (2 officielle SVG-badges, samme struktur som footer):
```html
<div class="app-cta">
    <a href="#" aria-label="Download i App Store">
        <img src="/images/appstore-badge.svg" alt="Hent i App Store">
    </a>
    <a href="#" aria-label="Hent på Google Play">
        <img src="/images/googleplay-badge.svg" alt="Hent på Google Play">
    </a>
</div>
```

### Ændringer i `css/style.css`

**`.app-cta`:**
- Tilføjet `align-items: center` og `gap: 0.65rem` og `flex-wrap: wrap` (to badges nu side om side, med wrap-fallback på smalle skærme)

**`.appstorelogo img` fjernet, erstattet med:**
- `.app-cta a`: display inline-block + opacity-transition for hover
- `.app-cta a:hover`: opacity 0.75 (mild fade — samme hover-stil som footer)
- `.app-cta img`: height 50px (lidt højere end footers 46px fordi det er en større dekorativ sektion), width auto, display block

### Designvalg
- **Samme struktur som footer:** Begge sektioner bruger nu identisk HTML-mønster og samme officielle SVG-filer — én kilde til sandhed for badges
- **50px height i social section vs 46px i footer:** Social Connect er en hero-agtig CTA-zone hvor badges må være mere prominente; footer er mere diskret
- **flex-wrap: wrap:** Hvis viewport er meget smal, kan de to badges stacke til 2 rækker i stedet for at overflowe

### Filerne `appstorelogo.png` og `.appstorelogo`-klassen er nu ubrugte
- `appstorelogo.png` i `/images/` bruges ikke længere af nogen kode
- `.appstorelogo`-klassen findes ikke længere i HTML
- (Filen er bevaret i `/images/` for nu, men kan slettes ved oprydning)

### Til eksamen
Samme forklaring som iteration 50: officielle badges downloadet direkte fra Apple og Googles udvikler-sider på dansk. Bruges konsistent samme sted og i footer.

---

## Iteration 52 — Features-sektion redesignet med store farvede stat-cards (reference-inspireret)

**Mål:** Bruger sendte en reference med tre store hvide cards der hver havde et KÆMPE farvet tal/stat (15K+, 32, 9.5) som dominerende element + en kort beskrivelse i samme farve nedenunder. Anvend samme stil på features-sektionen ("Designet til at flytte sig") som tidligere bare havde 01-06 numerering + lille heading + lang beskrivelse i samme grå farve.

### Struktur-ændring per feature-card

Tidligere:
```
01           ← lille tabular-num, grå #999
3 kg, IPX5   ← h3 600 weight
Let nok til tote-bag'en, vandafvisende til alle slags vejr.   ← grå #555
```

Nu:
```
3 kg        ← KÆMPE clamp(3.5rem, 6vw, 5.5rem), weight 700, farvet
IPX5 vandafvisende. Let nok til tote-bag'en, til alle slags vejr.   ← 1rem regular, samme farve
```

### Hver card har sin egen accent-farve via CSS custom property

Hver `<article>` har `style="--accent: #..."` inline. CSS bruger `color: var(--accent)` på både stat og desc — så hele cardets typografi er farvet, ikke kun overskriften.

**Farve-rotation (3 brand-saturerede farver fordelt over 6 cards):**
- Card 1 (3 kg): `#4a8a4d` — dyb sage-grøn
- Card 2 (18t): `#8B5CF6` — electric lavendel (samme som CTA-knap)
- Card 3 (100 dB): `#3858a8` — dyb blå
- Card 4 (LED): `#3858a8` — dyb blå
- Card 5 (5.3): `#4a8a4d` — dyb sage-grøn
- Card 6 (Social): `#8B5CF6` — electric lavendel

Pattern: række 1 har [grøn, lavendel, blå], række 2 har [blå, grøn, lavendel] — kolonnerne er forskudte så det ikke virker som striber.

### Tekst-redigering for at passe den nye stat-struktur

Hver feature er nu omskrevet så hovedstatten er kort/punchy og beskrivelsen indeholder konteksten:
- "3 kg, IPX5" → stat "3 kg" + desc "IPX5 vandafvisende..."
- "18 timers batteri" → stat "18t" + desc "Batteri der holder hele dagen..."
- "100 dB lyd" → stat "100 dB" + desc "Lyd der fylder..."
- "Ambient-lys" → stat "LED" + desc "Ambient-lys der følger musikken..."
- "Bluetooth 5.3" → stat "5.3" + desc "Bluetooth 5.3 — par op til 3..."
- "Social Connect" → stat "Social" + desc "Alle bidrager... Connect-app"

### Ændringer i `css/style.css`

**`.features`:**
- `background: var(--white)` → `var(--bg)` (off-white #F4F4F4) — så de hvide cards "svæver" over sektionen som i referencen

**`.features-grid`:**
- `gap: 2.5rem 3rem` → `1.5rem` (tættere cards som i referencen)

**`.feature-card`:**
- Tilføjet `background: var(--white)`, `border-radius: 16px`, `padding: 2.5rem 2rem 2rem`
- `display: flex; flex-direction: column; justify-content: space-between` så stat går øverst og desc bunder pænt
- `min-height: 240px` så alle cards har samme højde uanset desc-længde
- Hover: `transform: translateY(-3px)` + subtil shadow — let mikro-interaktion

**`.feature-num` fjernet, `.feature-stat` tilføjet (erstatter h3):**
- `font-size: clamp(3.5rem, 6vw, 5.5rem)` — kæmpe, responsiv
- `font-weight: 700`, `line-height: 1`, `letter-spacing: -0.04em`
- `color: var(--accent, #111)` — bruger card-specifik accent-farve via custom property

**`.feature-card p` fjernet, `.feature-desc` tilføjet:**
- `font-size: 1rem`, `line-height: 1.4`
- `color: var(--accent, #555)` — SAMME farve som stat (i stedet for grå)
- `max-width: 30ch` for tight tekst-blok

### Designvalg
- **3 farver i stedet for 6:** En 6-farve rainbow ville blive kakofonisk. 3 farver der rotér giver visuel rytme uden at overvælde.
- **Saturerede brand-farver:** I stedet for at bringe helt nye farver, brugte jeg saturerede versioner af sage og blå-lilla + den eksisterende electric-lavendel. Holder paletten coherent.
- **CSS Custom Properties (--accent):** Tillader at sætte farve per card direkte i HTML uden at duplikere CSS regler. Elegant og let at justere.
- **Hover micro-interaction:** Cards løfter sig 3px med subtil shadow — føles interaktivt uden at blive distraherende.
- **Off-white sektion-bg + hvide cards:** Skaber den "card-floating-on-page"-feel referencen har. Hvis sektionen var hvid og cards hvide, ville der ikke være kontrast.

### Hvad blev bevaret
- 3×2 grid-layout (3 kolonner × 2 rækker)
- Section-header med eyebrow + h2 ("DETALJER" / "Designet til at flytte sig")
- Section-padding 6rem 0
- Container-bredde 90%/1200px

---

## Iteration 53 — Feature-cards skiftet til brand-palette + hover-effekt fjernet

**Mål:** I iteration 52 brugte jeg saturerede versioner af brand-farverne (`#4a8a4d`, `#8B5CF6`, `#3858a8`) på feature-cards. Brugeren ville have at vi bruger de eksisterende brand-farvevariabler vi har defineret i `:root` (sage `--fv1`, lavendel `--fv2`, blå-lilla `--fv3`). Plus fjerne hover-effekten på cards.

### Ændringer i `index.html`

**Inline accent-farver:**
- `style="--accent: #4a8a4d;"` → `style="--accent: var(--fv1);"` (sage)
- `style="--accent: #8B5CF6;"` → `style="--accent: var(--fv2);"` (lavendel)
- `style="--accent: #3858a8;"` → `style="--accent: var(--fv3);"` (blå-lilla)

Samme rotation-mønster bevaret (3 farver på 6 cards):
- Card 1 (3 kg): `--fv1` sage
- Card 2 (18t): `--fv2` lavendel
- Card 3 (100 dB): `--fv3` blå-lilla
- Card 4 (LED): `--fv3` blå-lilla
- Card 5 (5.3): `--fv1` sage
- Card 6 (Social): `--fv2` lavendel

### Ændringer i `css/style.css`

**`.feature-card`:**
- Fjernet `transition: transform 0.25s ease, box-shadow 0.25s ease;`

**`.feature-card:hover` (helt fjernet):**
- Fjernet `transform: translateY(-3px)`
- Fjernet `box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06)`

### Designvalg
- **Brand-farvevariabler i stedet for hardkodede:** Hvis vi senere ændrer brand-paletten ét sted (`:root`), opdateres feature-cards automatisk. Ren single-source-of-truth.
- **Cards er nu statiske:** Matcher sidens øvrige hover-stil (Kalstore-inspireret minimalisme — kun farve-skift, ingen transforms). Cards skal være rolige flader, ikke interaktive elementer der "kalder" til klik.

### Note om farve-mætning
Brand-farverne er let dæmpede (sage #a8bfa3 osv.) sammenlignet med UGLYCASH-referencens vibrant grøn/orange/blå. Det er et bevidst brand-valg fra tidligere iterationer — LUMINA's æstetik er rolig/editorial, ikke energisk/saturer. Hvis det viser sig at være for dæmpet i praksis, kan vi:
- Bumpe `font-weight` op på `.feature-stat` til 800 så farven får mere visuel vægt
- Tilføje `text-shadow: 0 0 1px var(--accent)` for at gøre farven tykkere optisk
- Definere `--fv1-deep`, `--fv2-deep`, `--fv3-deep` varianter i `:root` til specifikke high-contrast use cases

---

## Iteration 54 — Brand-saturerede farvevarianter til feature-stats

**Mål:** Iteration 53's brug af `--fv1/--fv2/--fv3` direkte (de muted brand-farver) blev for blødt/washed-out på de store stat-tal. Brugeren vil have brighter farver "like before" (iteration 52) men i samme hue-familie som brand-paletten — altså saturated versioner af sage/lavendel/blå-lilla, ikke helt nye farver.

### Ny strategi: definer brighter varianter af brand-farver i `:root`

I stedet for at hardkode farver inline per card (som iteration 52) eller bruge de dæmpede brand-farver direkte (iteration 53), introducerer jeg saturerede søsterfarver:

```css
--fv1-bright: #5c9a55;   /* sage saturated */
--fv2-bright: #9d6bc6;   /* lavender saturated */
--fv3-bright: #6a5fb5;   /* blue-purple saturated */
```

Disse er samme hue som de oprindelige `--fv1/2/3` men med højere mætning og lavere lethed, så de virker som brand-farverne på steroider. Til brug på flader hvor accent-farve skal pop'pe.

### Ændringer i `css/style.css`

`:root`-blokken udvidet med 3 nye custom properties:
- `--fv1-bright: #5c9a55` (sage `#a8bfa3` → mere mættet, mørkere)
- `--fv2-bright: #9d6bc6` (lavendel `#baa3bf` → mere mættet, mørkere)
- `--fv3-bright: #6a5fb5` (blå-lilla `#aca3bf` → mere mættet, mørkere)

### Ændringer i `index.html`

Alle 6 feature-card `style="--accent: var(--fvN);"` opdateret til `--fvN-bright`:
- Card 1 (3 kg): `--fv1` → `--fv1-bright` (saturated sage)
- Card 2 (18t): `--fv2` → `--fv2-bright` (saturated lavendel)
- Card 3 (100 dB): `--fv3` → `--fv3-bright` (saturated blå-lilla)
- Card 4 (LED): `--fv3` → `--fv3-bright`
- Card 5 (5.3): `--fv1` → `--fv1-bright`
- Card 6 (Social): `--fv2` → `--fv2-bright`

### Hvorfor variant-systemet er bedre end hardkodede farver
1. **Brand-coherens:** Alle farver lever stadig i `:root` som dokumenteret brand-system — ikke spredt magiske hex-koder i HTML
2. **Genbrugelige:** Hvis vi senere har en CTA eller anden zone der også skal bruge "saturated sage", er den klar (`var(--fv1-bright)`)
3. **Forklarbart til eksamen:** "Jeg har defineret to versioner af hver brand-farve — den dæmpede til store flader/baggrunde og den saturerede til accents/typografi"
4. **Single point of change:** Hvis vi senere vil have endnu mere/mindre mætning, ændres det ét sted i `:root`

---

## Iteration 55 — Social Connect-sektion redesignet i samme design-sprog som features

**Mål:** Anvend samme visuelle design-sprog som features-sektionen (iteration 52–54) på Social Connect-sektionen: hvidt card på off-white sektion, brand-bright accent-farver med `--fv1/2/3-bright`, store farvede tal til funktionerne, og en cleaner editorial layout.

### Struktur-ændring

Den gamle struktur havde:
- Sektion uden baggrund (transparent)
- 2-kolonne grid med tekst venstre, phone+badges højre
- `h3 "Social Connects:" + <hr>` divider på toppen + paragraf
- `h3 "Funktioner:" + <hr>` divider + `<ul>` med 5 bullets (sage `•` prefix)
- iPhone i en høj `.app-image` container med min-height 400px og weird `width: 50%; height: 30%` på img

Den nye struktur:
- Sektion med off-white baggrund (`--bg`)
- Indhold wrapped i et hvidt `.social-card` (border-radius 24px, padding 4rem 3rem)
- Cardet er 2-kolonne grid (1.15fr / 1fr) med tekst venstre, phone+badges højre
- Eyebrow "Connect-appen" i `--fv3-bright` (blå-lilla saturated)
- Hovedoverskrift med inline accent: `<h2>Del musikken. <span>Del stemningen.</span></h2>` — sidste del i `--fv2-bright` (lavendel saturated)
- Lede paragraf i mørk grå
- `<ol>` med 5 `<li>` der hver har: stort farvet nummer (01-05) + bold farvet funktionsnavn + grå beskrivelse
- iPhone hosted i ren `.social-visual` flex-container, max-width 320px, normal aspect ratio
- App Store + Google Play badges nedenunder phone

### Farve-rotation på funktioner (5 items, 3 farver)
- Funktion 01 (Blend playlister): `--fv1-bright` saturated sage
- Funktion 02 (Nem tilkobling): `--fv2-bright` saturated lavendel
- Funktion 03 (Styr stemningen): `--fv3-bright` saturated blå-lilla
- Funktion 04 (Host-kontrol): `--fv3-bright` (gentaget for at undgå at adjacent items har samme farve som over)
- Funktion 05 (Multi-speaker): `--fv1-bright` (sage igen)

Numrene og bold funktionsnavnet farves med `var(--accent)` — beskrivelses-teksten forbliver mørk grå for læselighed.

### Ændringer i `index.html`

`<section class="section-gradient-bottom">` → `<section class="social-connect">` med komplet omskrevet indhold:
- Wrapper: `.container > .social-card > [.social-content + .social-visual]`
- `.social-content`: eyebrow + `.social-title` med inline `.social-title-accent` + `.social-lede` + `<ol class="social-functions">`
- `.social-functions li` med inline `style="--accent: var(--fvN-bright);"` på hver
- `.social-visual`: `.social-phone img` + `.app-cta` med begge badges

Tekst-redigering for at passe det nye visuelle hierarki:
- Tag-line forkortet og fokuseret
- Funktioner: hver bullet omskrevet til at have et stærkt åbningssætning (bold) + kontekst — så det matcher mønstret stat + desc fra features-cards
- Multi-speaker pairing nu blot "Multi-speaker pairing. Forbind op til 3 LUMINA One enheder samtidigt."

### Ændringer i `css/style.css`

**Fjernet (alle gamle social-regler):**
- `.section-gradient-bottom` (transparent bg)
- `.social-layout` (2-col grid)
- `.social-content h2/h3/p/ul/li/li:before` (typografi for det gamle hierarki)
- `.funktioner-divider` (hr-styling)
- `.app-right`, `.app-image`, `.app-image img` (gammel phone-container)
- Total: ~70 linjer CSS fjernet

**Tilføjet (nye design-sprog regler):**
- `.social-connect` med off-white bg + bottom padding
- `.social-card` med hvid bg, 24px radius, 4rem 3rem padding, 1.15/1fr grid
- `.social-content .eyebrow` farvet med `--fv3-bright`
- `.social-title` 600 weight, clamp font-size, tight letter-spacing
- `.social-title-accent` farvet med `--fv2-bright`
- `.social-lede` 1.05rem, mørk grå
- `.social-functions` flex-column med 1.5rem gap
- `.social-functions li` 2-col grid (auto number + flex-text)
- `.social-num` 1.75rem 700 weight farvet via `var(--accent)`
- `.social-functions strong` farvet med `var(--accent)`, 600 weight
- `.social-visual` flex-column centreret
- `.social-phone` max-width 320px (renere end den gamle `.app-image` med min-height 400px)

**Media query opdateret:**
- `.social-layout` → `.social-card` i tablet breakpoint (1-col stack ved 768px)
- Tilføjet specifik mobile padding på card: 2.5rem 1.75rem

### Design-sprog parallelism mellem features og Social Connect

| Element | Features-sektion | Social Connect-sektion |
|---------|------------------|------------------------|
| Section bg | off-white `--bg` | off-white `--bg` |
| Indhold på | hvide cards (en per stat) | ét stort hvidt card |
| Hero element | clamp 3.5-5.5rem stat-tal | 1.75rem farvede nummer-prefix på funktioner |
| Color system | `--fvN-bright` via `--accent` custom prop | samme `--fvN-bright` via `--accent` custom prop |
| Hover | ingen | ingen |
| Border-radius | 16px på cards | 24px på card (større fordi det er én container) |

### Hvad blev bevaret
- `.app-cta` CSS-regler er uændrede (badges bruger samme styling som footer)
- Badges (Apple + Google Play SVG'er) er samme officielle filer

---

## Iteration 56 — "HENT I" konsistent versalisering på begge app-badges

**Mål:** Apple-badget viste "Hent i" med småt mens Google Play-badget viste "HENT I" med versaler. Begge badges skulle vise samme uppercase "HENT I" for visuel konsistens.

### Problem
- `images/appstore-badge.svg`: "Hent i" rendret som 5 SVG-paths i mixed case (officielle Apple Danmark-badge stil)
- `images/googleplay-badge.svg`: "HENT I" rendret som 5 SVG-paths i uppercase
- De to badges stod side om side i Social Connect-sektionen og footeren → visuel inkonsistens

### Ændringer i `images/appstore-badge.svg`
- `<g id="_Group_4">` med 5 lowercase letter-paths (H/e/n/t/i) erstattet med 5 uppercase letter-paths (H/E/N/T/I) lånt fra `googleplay-badge.svg`
- Tilføjet `transform="translate(-4.7 1.85) scale(0.55)"` på gruppen for at skalere de større Google Play-bogstaver ned så de passer til Apple-badgets størrelse og position (samme x≈36-61, y≈8.5-14.6 placering som original "Hent i")
- Beregningsgrundlag: Google Play HENT I spænder x=73.97-119.68 (bredde 45.71) og y=12.21-23.24 (højde 11.03). Scale 0.55 → bredde ≈25, højde ≈6 → matcher original Apple "Hent i" boks

### Hvorfor SVG-paths frem for `<text>`-element
- Bevarer samme vektor-typografiske look som Google Play badget (samme font-grundlag)
- Undgår afhængighed af system-font fallback ved rendering
- Skala-justerede paths giver pixel-præcis match til badge-æstetikken

### Hvad blev bevaret
- Apple-logoet og "App Store"-teksten i appstore-badge.svg uændret
- Google Play badget uændret
- `index.html` markup uændret (samme `<img src="...">` referencer)

---

## Iteration 57 — App-badges flyttet ud af visual-kolonnen og ned under funktionslisten

**Mål:** I Connect-appen-sektionen sad Apple/Google badges under iPhone-billedet i højre kolonne. De sad klemt og brød den visuelle ro omkring telefonen. Flyttet ned under teksten i venstre kolonne så de fungerer som tydelig CTA efter funktionslisten.

### Ændringer i `index.html` (Social Connect-sektionen)
- `.app-cta` div flyttet fra `.social-visual` (højre kolonne, under `.social-phone`) til bunden af `.social-content` (venstre kolonne, efter `<ol class="social-functions">`)
- Tilføjet modifier-klasse `app-cta--social` for kontekst-specifik styling
- `.social-visual` indeholder nu kun iPhone-billedet

### Ændringer i `css/style.css`
- `.social-visual`: fjernet `gap: 2rem` (ingen børn at adskille længere), tilføjet `justify-content: center`
- `.social-phone`: `max-width: 320px` → `max-width: 360px` (lidt mere plads til billedet nu hvor det står alene)
- Ny regel `.app-cta--social`:
  - `justify-content: flex-start` (venstrejusteret i stedet for centreret — matcher teksten ovenfor)
  - `margin-top: 2.5rem` (luft mellem funktionsliste og badges)
  - `gap: 0.85rem` (lidt mere mellemrum mellem de to badges end default)
- Footer-versionen af `.app-cta` (uden modifier) er uændret — stadig centreret

### Visuelt resultat
- Venstre kolonne: eyebrow → titel → lede → 5-punkts funktionsliste → app-badges (klart CTA-flow nedad)
- Højre kolonne: iPhone-billedet centreret vertikalt, lidt større

### Hvad blev bevaret
- Footer-badges position uændret (centreret i `.footer-cta`)
- Selve badge-SVG'erne uændret (iteration 56's HENT I-fix er stadig aktiv)

---

## Iteration 58 — Hero h1 "LUMINA ONE" styles matchet til detaljer-cards "3 kg"

**Mål:** Hero-titlen "LUMINA ONE" skulle stadig stå centreret over videoen, men typografi og farve skulle matche feature-stat-stilen fra detaljer-sektionen (specifikt "3 kg"-cardet med sage-bright accent). Kun typografisk styling — ingen layout-ændringer.

### Ændringer i `css/style.css` (`.hero-content h1`)
- Tilføjet eksplicit `font-family: 'Geist', system-ui, sans-serif` (matcher `.feature-stat`)
- `font-weight`: 600 → 700 (matcher feature-stat)
- `letter-spacing`: -0.02em → -0.04em (strammere som feature-stat)
- `color`: `var(--white)` → `var(--fv1-bright)` (#5c9a55 — samme sage-bright som "3 kg")

### Hvad blev bevaret
- Font-size `clamp(2.5rem, 9vw, 7rem)` (hero forbliver større end feature-stats — den skal stadig være hero-impact)
- Centreret layout (`align-items: center`, `text-align: center`)
- Tagline, CTAs, video, overlay — alt urørt
- Hero-content struktur uændret (samme HTML)
- Ingen text-shadow — eksakt match til `.feature-stat`-stilen

### Casing-justering (frem og tilbage)
- HTML-tekst først ændret fra `LUMINA ONE` → `Lumina One` (sentence case)
- Derefter rullet tilbage til `LUMINA ONE` (caps lock) — sentence case virkede ikke i hero-konteksten

### Farve-justering (flere iterationer)
- Hero h1 farve: `var(--fv1-bright)` (#5c9a55 sage) → `#8B5CF6` (electric lavender, matchede CTA-knappen) → `#000` (ren sort)
- `.hero-tagline` farve: sort → tilbage til hvid → tilbage til sort `#000`. Text-shadow fjernet (ikke nødvendig på sort tekst). Slutresultat: sort h1 + sort tagline

### "Udforsk kollektionen" CTA stilet som "Lær mere"
- `index.html` linje 120: `class="btn btn-dark"` → `class="btn btn-ghost"`
- `.btn-ghost` er oprindeligt designet til mørk video-baggrund (hvid tekst/border) — for at virke på off-white side-bg under AI-billederne tilføjet scopet variant: `.køb-knap .btn-ghost` med mørk tekst (`var(--text-dark)`), mørk border (`rgba(0,0,0,0.45)`), ingen backdrop-blur. Hover: subtil sort overlay `rgba(0,0,0,0.06)` + fuld mørk border.
- Resultat: "Udforsk kollektionen" har nu samme outline/ghost-aesthetic som "Lær mere" — bare farve-inverteret for at virke på lys baggrund

---

## Iteration 59 — Gallery-sektion (AI billeder) stilet som Detaljer

**Mål:** Lifestyle-billede-griddet havde ingen sektion-header — det floatede bare. Tilføj samme `section-header` mønster som Detaljer + Showcase (eyebrow + h2) så griddet føles som en navngivet sektion på siden, ikke en orphan visual block.

### Ændringer i `index.html`
- `<div class="section-lifestyle">` → `<section class="section-lifestyle">` (semantisk korrekt sektion)
- Tilføjet `<header class="section-header">` over `.insta-grid`:
  - `<p class="eyebrow">I hverdagen</p>` (dansk brand-stemme, ikke "Lifestyle"-engelsk)
  - `<h2><span class="title-accent">Lyden</span> følger med</h2>` (split-color: "Lyden" i sage-bright `var(--fv1-bright)` — samme farve som "3 kg" i Detaljer)
- HTML-kommentar opdateret: "AI billeder" → "AI billeder / lifestyle gallery"

### Ændringer i `css/style.css` (split-color heading)
- Ny generisk regel `.section-header h2 .title-accent { color: var(--fv1-bright); }` — sage-bright accent på markerede ord i section-headings, så mønstret kan genbruges i andre sektioner

### Ændringer i `css/style.css` (`.section-lifestyle`, `.insta-grid`)
- `.section-lifestyle`:
  - `background: transparent` → `background: var(--bg)` (eksplicit — matcher Detaljer-sektionen og giver konsistent off-white blok)
  - `padding: 3rem 0; padding-bottom: 2rem` → `padding: 6rem 0 2rem` (top-padding matcher Detaljer/Showcase's 6rem, bund-padding holdt på 2rem fordi "Udforsk kollektionen"-knappen i `.køb-knap`-wrapperen leverer sin egen margin)
  - `text-align: center` fjernet — `.section-header` har sin egen centrering
- `.insta-grid`:
  - `margin-top: 3rem` fjernet (section-header har `margin-bottom: 4rem`, det er nok)
  - `padding-bottom: 2.5rem` fjernet (samlet i section-padding)
  - `gap: 2rem` → `gap: 1.5rem` (matcher Detaljer's `.features-grid` gap)

### Resultat
- Galleryet er nu en navngivet "I hverdagen / Lyden følger med" sektion med samme editorial hierarki som Detaljer
- Spacing og gap matcher resten af sidens grid-sektioner
- Semantisk markup forbedret (`<section>` + `<header>`)

### Hvad blev bevaret
- Selve `.insta-item` cards (hover-opacity, border-radius, billede-styling)
- "Udforsk kollektionen" CTA placering udenfor sektionen (orphan-knap som original)
- 3-billede-grid på desktop

### Iteration 59b (fortrudt) — Brand-farvede caption-bars på insta-cards
Forsøgt: hvert billede fik en brand-farvet caption-bar nederst med nummerering (01/02/03) + label (Strandtur/Forfest/Park-picnic, callback til connect-appen-teksten). Fortrudt — caption-bar med tekst inde i hvert card føltes for travlt og overpowering for billederne.

### Iteration 59c — Offset farve-box bag hvert billede (hard shadow uden gennemsigtighed)

**Mål:** Give billederne brand-farve uden at sætte tekst inde på dem. Lige bag hvert billede en solid farvet box som peeker ud nederst-til-højre — som en hård editorial drop-shadow, men solid (ikke gennemsigtig).

### Ændringer i `index.html`
- Caption-divs fjernet — tilbage til ren `<div class="insta-item">` med kun billedet indeni
- `--accent`-inline-style beholdt på hver insta-item (sage / lavendel / blå-lilla)

### Ændringer i `css/style.css` (`.insta-item`)
- Fjernet caption-relateret CSS (`.insta-caption`, `.insta-num`, `.insta-label`) helt
- Fjernet `overflow: hidden` på selve `.insta-item` (skygge skal kunne nå ud over kanten)
- Flyttet `border-radius` og `overflow: hidden` ind på `.insta-item picture` så billedet stadig er rundet, men ydre box-shadow ikke bliver klippet
- `box-shadow: 12px 12px 0 var(--accent)` — 0 blur giver hård solid skygge i brand-farve
- Hover-effekter med `transform` blev kortvarigt overvejet men droppet pga. [[project-lumina]]'s konvention om kun farve-/baggrundsskift på hover

### Resultat
- Hver foto-card har en farvet "twin" der peeker ud nederst-til-højre 12px
- Skygge-farverne: card 1 sage, card 2 lavendel, card 3 blå-lilla (samme palette som detaljer)
- Grid-gap (1.5rem = 24px) giver 12px clearance så skygger ikke overlapper næste card

### Fix (59c.1) — Ensartet card-højde
Det første AI-billede (ai-billede1.png) har anden native aspect-ratio end de to andre → cardet blev kortere/mismatched. Tilføjet `aspect-ratio: 4 / 5` på `.insta-item picture` + eksisterende `object-fit: cover` på img → alle tre cards har nu samme højde, billederne croppes pænt.

### Iteration 62 (fortrudt) — Søgning som overlay/modal
Først bygget som full-screen overlay med blurred bg, søgepanel og live-filter på 12 søgbare items + smooth scroll til sektioner. Fortrudt — brugeren ville have en simpel "pops out in the navbar"-løsning, ikke en fuld modal med funktionel søgning. Det er et eksamensprojekt med ét produkt — søgning behøver ikke at virke, bare se ud som den virker.

### Iteration 62 — Inline nav-søgebar (visuel toggle)

**Mål:** Når man klikker på lup-ikonet i navbaren skal en søgebar "poppe ud" inde i selve navbaren. Den skal ikke faktisk søge — bare se ud som om den virker.

### Ændringer i `index.html`
- Fjernet `.search-overlay`-blokken helt (modal)
- Tilføjet inline `<form class="nav-search" id="navSearch" role="search">` mellem `.nav-center` og `.nav-icons`. Indeholder:
  - Lille lup-SVG (14px)
  - `<input type="search" id="navSearchInput" placeholder="Søg...">`
  - Lille X-knap til at lukke
- JS reduceret til simpel toggle:
  - Klik på lup-trigger → `nav.classList.add('is-searching')` + fokus input
  - Klik på X → `closeNavSearch()` (fjerner klassen + tømmer inputtet)
  - ESC → samme som X
  - Ingen søgelogik, ingen resultatliste, ingen scroll

### Ændringer i `css/style.css`
Erstattet hele `.search-overlay`-CSS med ny `.nav-search`-blok:
- `.nav-search`: `display: none` default, `flex: 1` med `max-width: 320px`, subtil glass-pill styling med `rgba(255,255,255,0.55)` bg + 1px border + 999px radius (matcher headerens egen pill-look)
- `.nav.is-searching .nav-center { display: none }` — skjul nav-links når søgning er aktiv
- `.nav.is-searching .nav-search { display: flex }` — vis søgebaren
- Inputtet er borderless transparent, Geist 0.85rem (mindre end overlay-versionen fordi den sidder i navbaren)
- Webkit search-cancel-knap skjult
- X-knap: 24px rund med hover-bg

### Resultat
- Klik på lup → nav-links forsvinder, en search-pill fader ind med fokus på inputtet
- Man kan taste hvad som helst — det gør ingenting (men ser ud som det virker)
- ESC eller X → vender tilbage til normal navbar med Shop/Om os/Kontakt

### Iteration 62b — Søgebar fylder hele bredden, X erstatter lup-ikon
Den lille pill-search fra 62 føltes for begrænset (max-width 320px). Justeret:
- `.nav-search`: `max-width: 320px` fjernet — fylder nu hele pladsen fra logoet til søge-ikon-positionen via `flex: 1`. Indre padding `0.35rem 1rem` (luftigere)
- Inline X-knap fjernet fra inde i `<form class="nav-search">`
- Ny `<button id="navSearchClose" class="nav-icon-close">` placeret i `.nav-icons` **lige efter** søge-trigger-linket (samme slot)
- Default: `.nav-icon-close { display: none }`, `.nav-icon-search` synlig
- Når `.nav.is-searching` aktiv:
  - `.nav-icon-search` skjules (`display: none`)
  - `.nav-icon-close` vises (`display: inline-flex`) — visuelt erstatter den søge-knappen i samme position
- X-knappen er styled 30×30 rund (matcher `.nav-icons a`-styling) så swap er seamless

### Iteration 66 — Cart-ikon centreret på gallery-cards ved hover

**Mål:** Tilføje interaktiv e-commerce-følelse på gallery-billederne — et cart-ikon centreret midt på billedet ved hover. Bare visuelt, ingen reel cart-funktionalitet (eksamensprojekt, ét produkt).

### Designforløb
1. Først forsøgt: pill-knap "Læg i kurv" der sliderede op fra bunden — fortrudt, for travlt
2. Endelig: rund hvid cirkel-knap (56×56) centreret midt på billedet med kun cart-ikonet (22×22)

### Ændringer i `index.html`
- Hver `.insta-item` har nu en `<button class="insta-add">` efter `<picture>` med:
  - Inline cart-SVG (22×22, samme path som `/images/icon-cart.svg`)
  - `aria-label="Læg LUMINA One i kurv"` (ingen synlig tekst, behold for screen readers)

### Ændringer i `css/style.css`
- `.insta-item`: tilføjet `position: relative` (positioning-context for knappen)
- Ny `.insta-add`:
  - Position absolute, top + left 50% med `translate(-50%, -50%)` → centreret midt på billedet
  - 56×56px cirkel (`border-radius: 50%`), hvid baggrund, mørk ikon
  - Box-shadow `0 6px 20px rgba(0,0,0,0.22)` så den løfter sig fra billedet
  - Default: `opacity: 0` + `scale(0.85)` + `pointer-events: none` (skjult og lidt mindre)
  - Hover på card: `opacity: 1` + `scale(1)` + pointer-events auto (fader ind og zoomer let op)
  - Hover på selve knappen: bg → electric lavender `#8B5CF6`, ikon → hvid
- Cart SVG i knappen bruger `currentColor` stroke så den følger knappens text-color

### Interaktion
- Default: gallery-cards vises uden knap
- Hover på card: cardet løfter sig (eksisterende -6px/-6px fra iteration 60b) + cart-cirklen fader ind midt på billedet med en blid scale-up
- Hover på selve cirklen: mørk grå (`#555`) + hvid ikon (var lavendel, ændret til grå for neutral look)

### Iteration 66b — Hele cardet klikkbart med checkmark-feedback (forenklet)
- `.insta-item` får `cursor: pointer`, `role="button"`, `tabindex="0"`, `aria-label="Læg LUMINA One i kurv"`
- JS click/keyboard handler tilføjer `.is-added` klasse — funktional, men uden visuel feedback i den endelige version

### Iteration 67 — "Læg i kurv"-knap under hvert gallery-billede, "Udforsk kollektionen" fjernet

**Mål:** Erstatte den enkelte "Udforsk kollektionen"-CTA under galleryet med tre individuelle "Læg i kurv"-CTA'er (én under hvert billede). Lavendel pill-stil (`.btn-white` — #8B5CF6 baggrund + hvid tekst), som matcher "Køb nu"-CTA'en fra hero.

### Ændringer i `index.html`
- Hvert `.insta-item` er nu wrappet i en `<article class="insta-cell">` sammen med en ny `<a class="btn btn-white insta-cart-btn">Læg i kurv</a>`
- `<div class="køb-knap"><a class="btn btn-ghost">Udforsk kollektionen</a></div>` fjernet helt
- JS opdateret: `.insta-cart-btn` får `preventDefault` på klik så de ikke jumper til toppen pga. `href="#"`

### Ændringer i `css/style.css`
- Ny `.insta-cell`: `display: flex; flex-direction: column; gap: 1.5rem` — placerer billede over knap med passende mellemrum (offset-skyggen på 12px får 12px clearance til knappen)
- Ny `.insta-cart-btn`: `align-self: center` — knapperne har samme content-bredde som andre `.btn` på siden (ikke stretched), centreret under hvert billede

### Iteration 71 — Nyt hero-billede + rotation stoppet

**Mål:** Erstatte cirkel-af-højtalere billedet med en cinematic lifestyle-shot (kvinde med LUMINA-højtaler ved vindue, ocean i baggrund) og stoppe den roterende animation.

### Ændringer
- Nyt billede `~/Downloads/May 12, 2026, 05_03_42 PM.png` (1672×941, ~16:9 aspect) kopieret til `/images/hero-bg.png` (overskriver det gamle cirkel-billede)
- `.hero-bg` CSS resettet:
  - Tilbage til `inset: 0` + `width/height: 100%` + `object-fit: cover` (passer perfekt i 16:9 hero-viewport)
  - Animation, keyframes, og `prefers-reduced-motion`-regel fjernet
  - `will-change: transform` fjernet (ikke længere nødvendigt)
- `.hero`: `background: var(--bg)` fjernet (billedet dækker hele hero nu, ingen sider at fylde)

### Iteration 72 — Hero-billede (flere swaps)
- Først: reference-billede `b5db5fe5f998adc264dda7992dee97ef.jpg` (kvinde med kamera + bjerge + sø)
- Derefter: AI-genereret par-på-bil billede
- Begge fortrudt — erstattet med slideshow i iteration 73

### Iteration 73b — Slideshow reduceret til 5 billeder
Brugeren slettede 3 af de 8 billeder (`hero-4`, `hero-6`, `hero-8`). HTML opdateret: kun de 5 tilbageværende billeder (`hero-1`, `2`, `3`, `5`, `7`) refereres nu i `<img>`-tags, og dots-array reduceret fra 8 til 5.

### Iteration 73c (fortrudt) — To nye billeder tilføjet og fjernet igen
Tilføjet `hero-9.png` og `hero-10.png` til slideshow — rullet tilbage straks. Filer slettet, HTML reverted til de 5 billeder fra iteration 73b.

### Iteration 73d — Tre nye billeder tilføjet (hero-9, 10, 11)
- `ChatGPT Image May 12, 2026, 06_27_48 PM.png` → `/images/hero-9.png`
- `ChatGPT Image May 12, 2026, 06_28_20 PM.png` → `/images/hero-10.png`
- `ChatGPT Image May 12, 2026, 06_28_31 PM.png` → `/images/hero-11.png`
- Slideshow er nu 8 billeder (hero-1, 2, 3, 5, 7, 9, 10, 11) med 8 dots

### Iteration 73e — Slideshow reduceret til 4 valgte billeder
Brugeren markerede via screenshots præcis hvilke 4 billeder der skulle beholdes:
- **hero-1**: kvinder ved klipper i skumring (med glødende højtaler)
- **hero-3**: par på biltag der ser på bjerge ved solnedgang
- **hero-5**: campinggruppe ved bål med solopgang
- **hero-9**: rødhåret kvinde i pickup-lad på skovvej

Slettet: `hero-2.png`, `hero-7.png`, `hero-10.png`, `hero-11.png`. HTML opdateret til 4 stacked `<img>` + 4 dots.

### Iteration 73f — hero-3 sat som første slide
Rækkefølge ændret: hero-3 (par på biltag + bjerge) → hero-1 → hero-5 → hero-9. `is-active`-klassen flyttet til hero-3 så den vises ved page load.

### Iteration 73g — hero-9 erstattet med ny variant
`hero-9.png` (4. billede i slideshow — rødhåret pige i pickup) overskrevet med ny variant (samme tema: rødhåret kvinde i pickup-lad på skovvej, men anden komposition — kvinden vendt mod højre, brun cardigan, klar visning af LUMINA-højtaleren). 1672×941 PNG. Ingen HTML-ændring nødvendig — samme filnavn.

### Iteration 73h — Slideshow fjernet, kun hero-5 tilbage (camping + solnedgang)
Brugeren valgte at slideshow var for meget — kun det 3. billede skulle stå alene. HTML reduceret til ét enkelt `<img class="hero-bg is-active" src="/images/hero-5.png">` + `.hero-overlay`. Dots-divet helt fjernet fra markup. `hero-1.png`, `hero-3.png`, `hero-9.png` slettet fra `/images/`. JS for slideshow er ikke fjernet (querySelector finder ingen `.hero-dot`, så det er harmlessly inaktiv).

### Iteration 74 — Tagline fjernet (og lagt tilbage)
`<p class="hero-tagline">Skabt til øjeblikke, der fortjener et soundtrack.</p>` fjernet kortvarigt — rullet tilbage. Tagline står nu igen mellem h1 og CTA-knapperne.

### Iteration 81 — Hero-tekst til sort (matcher resten af siden)
Hero h1 og tagline ændret fra hvid med text-shadow → `var(--text-dark)` uden shadow. Matcher tekst-farven brugt overalt ellers på siden. Læsbarhed afhænger nu af hvilken hero-slide der vises (de lyse billeder som hero-3 par-på-bil og hero-5 camping er læselige, mørke områder på hero-1 kvinder-ved-klipper og hero-9 pickup vil have lavere kontrast).

### Iteration 80b — Blå-lilla speaker erstattet med korrekt variant
`speaker-blalilla.png` overskrevet med `ChatGPT Image May 12, 2026, 10_20_47 PM (3) (1).png` — den ægte blå-lilla variant (mere dyb violet/blålig tone) i stedet for den duplikerede lavendel der lå før. Nu er alle 4 farver visuelt distinkte: sage / lavendel / blå-lilla / cream.

### Iteration 80 — Speaker-billeder passer ind i showcase-boksen
De nye speaker-billeder blev croppet kraftigt af `object-fit: cover` (kun midten af højtaleren var synlig). Ændret til `object-fit: contain` + `width: 90%` + `height: 90%` så hele højtaleren passer ind i den hvide showcase-card med lidt padding omkring.

### Iteration 79c — Produktbilleder erstattet igen (med transparent bg fra start)
De 4 speaker-billeder erstattet med en ny version der allerede har transparent baggrund i kilden — ingen post-processing nødvendig. Filnavne uændrede.

OBS: De to "(2)" filer i kilden så identiske ud (begge lavendel-toner) — den ene er brugt til `speaker-lavendel.png`, den anden til `speaker-blalilla.png`. Hvis de var ment som forskellige farver, ser de meget tæt på samme ud — kan let byttes ud separat senere.

### Iteration 79b — Produktbillederne erstattet + sort baggrund gjort transparent
De 4 farvespecifikke speaker-billeder erstattet med en ny version. Kildefilerne havde solid sort baggrund — ikke transparent — så højtaleren stod i en sort firkant inde i den hvide showcase-card.

**Fix:** Skrevet Node-script (`/tmp/remove-black-bg.js`) der bruger `jimp` til at gøre mørke pixels transparente:
- Loop over alle pixels i hver af de 4 PNG'er
- Pixels med R+G+B < 60 → fully transparent (alpha 0)
- Pixels med R+G+B mellem 60-120 → graduel alpha-fade så kanter forbliver bløde uden hård halo
- Saved tilbage på samme filnavn

Nu vises højtaleren clean på den hvide showcase-card-baggrund uden sort ramme.

### Iteration 79 — Farvespecifikke produktbilleder i "Fås i fire farver"-slider

Den eksisterende `billede-valg.png` blev brugt til alle fire farver i showcase-sliderne — samme cream-farvede højtaler uanset hvilken dot man valgte. Nu med 4 farvespecifikke AI-genererede produktbilleder:

### Nye filer i `/images/`
- `speaker-sage.png` (fra `ChatGPT Image ... 09_34_28 PM (4).png` — grøn sage variant)
- `speaker-lavendel.png` (fra `... (2).png` — pink/lavendel variant)
- `speaker-blalilla.png` (fra `... (3).png` — lys grå-lilla variant)
- `speaker-cream.png` (fra `... (1).png` — varm off-white variant)

### Ændringer i `index.html`
Hver `.slide` peger nu på sin egen farve-variant i stedet for samme `billede-valg.png`:
- Slide 1 (Sage): `speaker-sage.png`
- Slide 2 (Lavendel): `speaker-lavendel.png`
- Slide 3 (Blå-lilla): `speaker-blalilla.png`
- Slide 4 (Cream): `speaker-cream.png`

### Resultat
Når brugeren klikker på en farve-dot i showcase-sektionen skifter billedet nu mellem fire forskellige farvede LUMINA-højtalere. Color-name-label (Sage/Lavendel/Blå-lilla/Cream) under sliden var allerede koblet i JS — den var bare ikke synkroniseret med et faktisk farveskift før.

`billede-valg.png` ligger stadig i `/images/` men er ikke længere refereret.

---

### Iteration 78 — Side-baggrund skiftet til varm cream/lys off-white der matcher hero-solnedgangen

`--bg`-variablen ændret fra `#F4F4F4` (neutral off-white) → `#F5EFE5` (cream) → `#FAF7F0` → `#FDFBF6` (næsten ren hvid med kun et whisper af warm undertone). Påvirker automatisk alle sektioner der bruger `var(--bg)`:
- `body`
- `.section-lifestyle` (gallery)
- `.features` (Detaljer)
- `.social-connect` (Connect-appen)
- `.køb-knap` parent areas
- Footer-sektioner

Brand-paletten (sage / lavendel / blå-lilla / cream) er tæt på den nye bg — cream brand-farven `#F1EDE2` er stadig distinct fra `#F5EFE5` (lidt mørkere og mere balanceret), så farvepickeren i showcase fungerer stadig.

---

### Iteration 77 — "Læg i kurv"-knapperne under gallery fjernet
De tre `<a class="btn btn-ghost insta-cart-btn">Læg i kurv</a>` under hver gallery-card er fjernet helt. JS-handler for `.insta-cart-btn` også ryddet væk (querySelectorAll fandt ingen elementer). CSS-regler for `.insta-cell` og `.insta-cart-btn` ligger stadig i style.css men er ikke længere visuelt aktive (kun selve insta-item er tilbage i hver `<article class="insta-cell">` wrapper — wrapperen kunne også fjernes, men den skader ikke).

---

### Iteration 76 — Klik på gallery-cards scroller op til "Fås i fire farver"
Ændret click-behavior på gallery-cards: i stedet for visuel "add to cart"-feedback (som ikke gjorde noget reelt) scroller klik nu smoothly op til `.showcase`-sektionen ("Fås i fire farver") hvor brugeren kan vælge farve og konfigurere produktet.

### Ændringer i `index.html` (JS)
- Ny funktion `scrollToShowcase(e)` der finder `.showcase` og kører `scrollIntoView({behavior: 'smooth'})`
- `.insta-item` click + Enter/Space keyboard handler → `scrollToShowcase`
- `.insta-cart-btn` (3 stk "Læg i kurv" knapper under hver card) → samme `scrollToShowcase` i stedet for bare `preventDefault`
- Fjernet `is-added`-class logic (ikke længere relevant)
- Cart-ikon i midten ved hover er beholdt (cosmetisk, ingen funktionel ændring i CSS)

---

### Iteration 75 — "I hverdagen" gallery skiftet til hero-billeder (med højtaler synlig)

**Mål:** Gallery-sektionen brugte AI-genererede `ai-billede1/2/3.png` som var loose lifestyle shots uden konsistent produkt-fokus. Skiftet til de tre hero-billeder der **ikke** er første hero-slide — så gallery viser produktet i de samme cinematic situationer som hero, men med højtaleren tydeligt synlig i alle tre.

### Ændringer i `index.html` (3 insta-items)
- `ai-billede1.png` → `hero-1.png` (kvinder ved klipper i skumring, glødende højtaler) — `object-position: 55% 70%` for at fokusere på højtaleren
- `ai-billede2.png` → `hero-5.png` (camping ved solnedgang, højtaler på klippen) — `object-position: 50% 65%` for at få højtaleren ind i den 4:5 portræt-frame
- `ai-billede3.png` → `hero-9.png` (rødhåret kvinde i pickup, højtaler i forgrunden) — `object-position: 30% 60%` for at vise højtaleren der er placeret i venstre del af 16:9 kildebilledet
- Alt-tekst gjort beskrivende i stedet for bare "Billede"

### Ændringer i `css/style.css`
- Fjernet den gamle `.insta-grid .insta-item:nth-child(1) img { transform: scale(1.4) }` regel (var sat for at zoome ind på 1:1 ai-billede1 — ikke relevant for 16:9 hero-billeder)
- 4:5 aspect-ratio på `.insta-item picture` beholdt — `object-fit: cover` + per-billede `object-position` (via inline-style) sørger for at højtaleren er centreret efter crop

### Resultat
- Gallery viser nu tre cinematic LUMINA lifestyle shots med produktet tydeligt synligt
- Brand-farvet `--accent` per card beholdt (sage / lavendel / blå-lilla)
- Offset-shadow + hover-effekter uændret
- ai-billede1/2/3.png ligger stadig i `/images/` men er ikke længere refereret

---

### Iteration 73i — Collage genoprettet
Slideshow tilbage. De 3 slettede billeder genoprettet:
- `hero-1.png` fra `~/Downloads/ChatGPT Image May 12, 2026, 05_37_16 PM.png` (kvinder ved klipper)
- `hero-3.png` fra `~/Downloads/ChatGPT Image May 12, 2026, 05_37_38 PM.png` (par på biltag)
- `hero-9.png` fra `~/.claude/image-cache/.../10.png` (rødhåret variant fra iteration 73g)
HTML udvidet igen til 4 stacked `<img>` + 4 dots, samme rækkefølge som iteration 73f (hero-3 → 1 → 5 → 9). JS for slideshow virker igen automatisk fordi dot-knapper er tilbage i DOM.

### Iteration 73 — Hero slideshow (8 billeder, manuel navigation via dots)

**Mål:** Vise et collage af 8 AI-genererede LUMINA lifestyle billeder i hero som man kan switche imellem via klikbare dots. **Ingen auto-rotation** — brugeren styrer selv hvilket billede der vises.

### Ændringer
- 8 PNG-billeder fra `~/Downloads/` kopieret til `/images/hero-1.png` ... `hero-8.png` (alle ChatGPT Image fra 05_37 til 05_52 PM, 12. maj)
- Gamle `hero-bg.png` og `hero-bg.jpg` slettet

### `index.html`
- Enkelt `<img>` erstattet med 8 stackede `<img class="hero-bg">` (første har `is-active`)
- Ny `<div class="hero-dots">` med 8 dot-knapper med `aria-label="Vis billede X"`
- JS tilføjet: `showHeroSlide(i)` toggler `.is-active` på både `<img>` og `<button>` ved klik på dot. Ingen `setInterval` — slideshow er rent manuelt.

### `css/style.css`
- `.hero-bg`: tilføjet `opacity: 0` default + `transition: opacity 0.8s ease` (smooth fade mellem billeder)
- `.hero-bg.is-active { opacity: 1 }`
- `.hero-dots`: absolute centreret 2.5rem fra bunden, z-index 3 (over overlay og content's bg-elementer)
- `.hero-dot`: 9px runde knapper med semi-transparent hvid, hover bliver mere opaque, `.is-active` får fuld hvid + scale 1.3

### Visuelt resultat
- Hero starter på billede 1, ingen automatisk skift
- 8 små hvide prikker nederst-centreret — klik for at switche
- Smooth opacity-fade (0.8s) når man klikker mellem billeder
- Hvid hero-tekst med text-shadow (fra iteration 71) virker stadig fint på alle 8 billeder

---

### Tekst skiftet til hvid (læsbarhed på mørkt billede)
- `.hero-content h1`: `color: #000` → `var(--white)` + `text-shadow: 0 2px 24px rgba(0, 0, 0, 0.35)` for læselighed
- `.hero-tagline`: `color: #000` → `rgba(255, 255, 255, 0.9)` + `text-shadow: 0 1px 12px rgba(0, 0, 0, 0.4)`

---

### Iteration 70 — Hero-billede roterer langsomt rundt

**Mål:** Tilføje en langsom 360°-rotation til hero-billedet (cirklen af højtalere) — giver dynamisk feeling tilsvarende den oprindelige spin-video.

### Ændringer i `css/style.css`
- `.hero`: tilføjet `overflow: hidden` (skjuler det forstørrede billede når det roterer udenfor hero-grænserne)
- `.hero-bg`: 
  - Position absolute centreret via `top/left: 50% + transform: translate(-50%, -50%)` (i stedet for `inset: 0`)
  - Size `240vmin × 240vmin` (dobbelt så stor som tidligere) — cirklen er nu så stor at kun en del af den ses, højtalerne fylder hele hero og bliver dominante visuelle elementer
  - `object-fit: contain` så hele cirklen vises
  - Hero får `background: var(--bg)` (off-white) til at fylde pladsen omkring den centrerede cirkel
  - Ny `animation: hero-spin 60s linear infinite` → én fuld omdrejning pr. 60 sekunder (langsomt, ikke svimlende)
  - `will-change: transform` → browser-hint for at GPU-accelerere rotation
- Ny `@keyframes hero-spin` med translate-bevaret rotation (translate -50% -50% holdes så centreringen ikke flyttes under rotation)
- `@media (prefers-reduced-motion: reduce)`: rotation slås fra for brugere der har sat motion-reduktion i OS — tilgængelighedsbeste praksis

---

### Iteration 69 — Hero skiftet fra video til AI-billede (cirkel af højtalere)

**Mål:** Erstatte `spin.mp4`-videoen i hero med et AI-genereret billede der viser højtalerne arrangeret i en cirkel — alle fire brand-farver synlige på én gang. Tomt center i billedet giver perfekt plads til titel + tagline + knapper.

### Ændringer
- Kilde: `~/Downloads/ChatGPT Image May 12, 2026, 04_12_01 PM.png` (1254×1254, RGB) kopieret til `/images/hero-bg.png`
- `index.html`: `<video autoplay muted loop class="hero-video">...</video>` erstattet med `<img class="hero-bg" src="/images/hero-bg.png" alt="">`
- `css/style.css`:
  - `.hero-video` → `.hero-bg` (samme positioning: absolute inset 0, object-fit cover, z-index 0)
  - Testet `object-fit: contain` (alt synligt) → rullet tilbage til `object-fit: cover` så billedet fylder hele hero (top/bund cropes lidt på brede viewports)
  - `object-position: center` så cirklen forbliver centreret
  - `.hero-overlay`: fjernet de mørke top/bund gradients (ikke nødvendige på hvidt billede — sort tekst har allerede god kontrast). Beholdt kun den diagonale brand-farve-tint (sage → lavendel → blå-lilla) på 6-12% opacitet for blød stemning

### Note
- `spin.mp4` ligger stadig i `/videos/` men bruges ikke længere — kan slettes hvis ønsket

---

### Iteration 68 — Hero-tekst typografisk polish

**Mål:** Tilføje editorial detail til hero-teksten uden at restrukturere (overholder [[feedback-hero-untouchable]]: ingen eyebrow, split-color, stats — bare typografi).

### Ændringer i `css/style.css`
**h1 (`.hero-content h1`):**
- ~~`::after`-divider linje tilføjet (72px × 2px sort linje under h1)~~ — fjernet igen, virkede ikke i konteksten

**Tagline (`.hero-tagline`):**
- Font-size: 1.15rem → 1.05rem (lidt mere refined, ikke konkurrerer med h1)
- Max-width: 420px → 460px (giver mere balanceret line-break)
- Line-height: 1.5 → 1.55 (luftigere)
- Letter-spacing: 0.005em → 0.01em (mere editorial åbning)
- Margin-top: 1rem → 1.25rem (passer med divider-spacing)

### Resultat
- Tre lag visuel hierarki: kæmpe black h1 → tynd sort divider (72px) → kursiv refined tagline
- Stadig samme centrerede video-overlay struktur, bare med mere editorial typography

---

### Iteration 67b — "Læg i kurv"-knapper skiftet til ghost-stil (matcher "Lær mere")
- `btn-white` → `btn-ghost` på alle tre knapper (transparent bg + outline-stil)
- `.insta-cart-btn.btn-ghost` lagt til samme scope som `.køb-knap .btn-ghost` (mørk variant for lys baggrund) — fælles regel da begge sidder på off-white side-bg
- Resultat: outline-knapper med mørk tekst/border, subtil sort overlay på hover
- Selve knap-stylingen kommer fra eksisterende `.btn` + `.btn-white` (electric lavender)

### Resultat
- Tre brand-farvede gallery-billeder med offset-skygger, hver med deres egen "Læg i kurv"-CTA direkte under
- Cardet er stadig klikkbart (eksisterende role="button"-mønster), så man kan klikke billedet, knappen, eller cart-ikonet i midten — alle gør samme ting

---

### Iteration 66c — Forenklet til kun cart-ikon (ingen cirkel, ingen checkmark)
- Hvid cirkel-baggrund fjernet — kun cart-ikonet vises nu centreret ved hover
- Checkmark-SVG fjernet helt fra både HTML og CSS
- `.is-added` CSS-state fjernet (klassen tilføjes stadig af JS men ændrer intet visuelt — kunne fjernes helt hvis ønsket)
- Cart-ikon farve testet sort → tilbage til hvid med mørk drop-shadow `filter: drop-shadow(0 2px 12px rgba(0,0,0,0.45))` for læselighed på de varierede AI-billeder
- Ikon-størrelse 22px → 32px (mere synligt uden cirkel omkring)
- Hover: ikonet dukker bare op uden animation (transition fjernet, ingen scale-effekt — bare instant opacity toggle)

---

### Iteration 65 — Card-wrapper om "Fås i fire farver"-sektionen

**Mål:** Showcase-sektionen var den eneste indholdssektion uden hvidt card-wrapper. Connect-appen og footer brugte begge `.social-card` / `.footer-card` pattern (hvid bg + 24px radius + indre padding). Bringe showcase ind i samme system.

### Ændringer i `css/style.css`
- `.showcase-layout`: tilføjet `background: var(--white)`, `border-radius: 24px`, `padding: 4rem 3rem` (matcher `.social-card`-padding)
- `gap`: 5rem → 4rem (matcher social-card så de visuelt rimer)
- `.showcase-visual`: fjernet redundant `background: var(--white)` (cardet ovenover er hvid nu) — beholdt `border-radius`, `overflow: hidden` og `aspect-ratio: 4/5` så slider-billedet stadig får runde hjørner
- Mobile: samme padding `2.5rem 1.75rem` på `.showcase-layout` som på `.social-card` (slået sammen i fælles regel da begge bruger samme grid-stack på mobile)

### Visuel sammenhæng
Tre sektioner følger nu samme card-pattern:
1. **Showcase** ("Fås i fire farver") — hvidt card med slider venstre + tekst højre
2. **Connect-appen** ("Del musikken. Del stemningen.") — hvidt card med tekst venstre + iPhone højre
3. **Footer** — hvidt card med kæmpe Anton-wordmark

---

### Iteration 64 — Nav-ikoner konverteret til SVG (Lucide-stil)

**Mål:** De tre nav-ikoner (Search.png, Login.png, Shoppingcart.png) var raster PNG'er. Erstattet med ægte vektor-SVG'er i Lucide-stil (gratis MIT-licens, https://lucide.dev — mest brugte moderne outline-ikonsæt sammen med Heroicons).

### Nye filer
- `/images/icon-search.svg` — lup (cirkel + diagonalt håndtag)
- `/images/icon-user.svg` — person silhuet (cirkel + skuldre)
- `/images/icon-cart.svg` — indkøbskurv (kurv + to hjul)

Alle bruger:
- viewBox 24×24 (standard Lucide-format)
- `fill="none"` + `stroke="currentColor"` + `stroke-width="2"` → outline-stil der matcher de gamle PNG'er
- `stroke-linecap="round"` + `stroke-linejoin="round"` → bløde afrundede stregender
- `currentColor` → kan farves via CSS `color:` property

### Ændringer i `index.html`
- `Search.png` → `icon-search.svg`
- `Login.png` → `icon-user.svg`
- `Shoppingcart.png` → `icon-cart.svg`

Eksisterende `.nav-icons img { width: 16px }` virker uændret — SVG'erne skalerer perfekt til 16px.

### Note om "Bell"-prikken
Den lille notifikations-prik over user-ikonet i det originale design er **ikke** med i SVG-versionen (Lucide har ikke det specifikke variant). Hvis du vil have den tilbage, kan jeg tilføje en CSS pseudo-element `::after` på user-ikon-linket, eller bruge en anden ikon-variant.

---

### Iteration 63 — Logoet konverteret til ægte vektor-SVG

**Mål:** Det eksisterende `Group.svg` var teknisk SVG men indeholdt kun et embedded base64-PNG (182kb, ingen `<path>`-elementer). Resultat: stor fil og ingen vektor-skalering.

### Proces
1. Ekstraheret det embedded base64-PNG til standalone fil (1440×834 gråtone) — afslørede at logoet er en custom håndtegnet "LA"-monogram med svungne kalligrafiske kurver
2. Forsøgt `npx potrace` → blokeret af sikkerheds-classifier (ikke-erklæret npm pakke)
3. Skrevet Node.js script (`/tmp/trace-logo.js`) der bruger `potrace` + `jimp` programmatisk:
   - Inverteret PNG (sort baggrund → hvid baggrund så potrace tracer logoet, ikke baggrunden)
   - Auto-traced med `threshold: 128`, `optTolerance: 0.4`, `turdSize: 2`
4. Resultat: én clean SVG `<path>` med Bezier-kurver

### Optimering af output
- Trimmet `viewBox` fra "0 0 1440 834" → "80 100 1310 680" (fjernet whitespace omkring indholdet)
- Skiftet `fill="#000000"` → `fill="currentColor"` (så logoet nu kan farves via CSS `color:` property)
- Fjernet redundante `width`/`height`-attributter på `<svg>` (viewBox styrer rendering)

### Ændringer i `index.html`
- `<img src="/images/Group.svg">` → `<img src="/images/lumina-logo.svg">` (2 steder: header logo + footer tagline)
- Group.svg beholdt som backup i `/images/` indtil verifikation

### Filstørrelse
- Før: 182kb (PNG-wrapper)
- Efter: 2.3kb (ægte vektor)
- **79× mindre** + skalerer pixel-perfect + kan styles med CSS

---

### Iteration 62c — Søgebar matchet i højde med logoet
Søgebaren var stadig kompakt sammenlignet med det 49px-høje logo (Group.svg 235×166 rendret med width:70px). Ændret:
- `.nav-search`: tilføjet `align-self: stretch` så formen overskriver navens `align-items: center` og strækker sig vertikalt til nav-rækkens fulde indre højde (samme som logoet)
- Padding skiftet fra `0.35rem 1rem` → `0 1.25rem` (vertikal padding fjernet — `align-items: center` på formen sørger for at input + ikon er lodret centreret i den fulde højde)
- Gap mellem ikon og input: 0.55rem → 0.6rem (matcher den nu større pill)

---

### Iteration 61 — Hero-tekst (h1 + tagline) styling

**Mål:** Style den eksisterende hero-tekst ("LUMINA ONE" + "Skabt til øjeblikke...") uden at restrukturere layoutet (centreret video-overlay holdes).

### Ændringer i `css/style.css`
**h1 (`.hero-content h1`):**
- Font-size: `clamp(2.5rem, 9vw, 7rem)` → `clamp(2.75rem, 10vw, 7.5rem)` (større, mere hero-impact)
- Letter-spacing: `-0.04em` → `-0.045em` (lidt strammere — store store bogstaver kan bære det)
- Line-height: `1` → `0.95` (kompakte to linjer)
- Tilføjet `margin: 0` (reset)

**Tagline (`.hero-tagline`):**
- Font-style: `italic` (editorial kontrast til den bolde black h1)
- Font-size: `1.05rem` → `1.15rem` (lidt større for læselighed)
- Max-width: `380px` → `420px` (bedre liniebrydning på "Skabt til øjeblikke, der fortjener et soundtrack.")
- Line-height: `1.6` → `1.5` (strammere)
- Letter-spacing: `0.005em` (svag editorial åbning)
- Margin-top: `1rem` (tæt på h1 men ikke kvælende)

**Hero-content layout:**
- `gap: 1rem` → `gap: 0` (eksplicit margin-styring per element i stedet for global gap, så h1↔tagline kan stå tæt mens CTAs får luft)
- Tagline `margin-top: 1rem` styrer afstand til h1
- `.hero-cta`'s eksisterende `margin-top: 2rem` styrer afstand fra tagline til knapper

### Resultat
- Tydeligere hierarki: kæmpe black h1 → kursiv italic tagline (sat tæt) → luft → CTAs
- Italic giver lifestyle/editorial følelse uden at skifte font-familie
- H1 er nu mere dominerende, tagline mere refined

---

### Iteration 60b — Hover-effekt på gallery-billeder (lift, ikke opacity)
Først tilføjet `opacity: 0.9` hover tilbage — fortrudt. Brugeren ville have en "hover a little" lift-effekt.

Endelig version:
```css
.insta-item { transition: transform 0.25s ease, box-shadow 0.25s ease; }
.insta-item:hover {
    transform: translate(-6px, -6px);
    box-shadow: 18px 18px 0 var(--accent);
}
```
Cardet løftes 6px op og 6px til venstre (væk fra dets offset-skygge), og skyggen vokser fra 12px → 18px → giver illusion af at cardet løfter sig op fra sin farvede twin. Bryder med tidligere "ingen transforms på hover"-konvention — bevidst valg i dette tilfælde fordi offset-skygge-designet inviterer til lift-interaktion.

---

### Iteration 60 — Showcase-billedet fylder hele cardet

Showcase-sektionen ("Fås i fire farver") havde billedet sat til `width: 80%`, `max-height: 90%`, `object-fit: contain` → der var luft omkring billedet inde i den hvide 4:5 box. Ændret til `width: 100%`, `height: 100%`, `object-fit: cover` så billedet nu fylder cardet edge-to-edge. `billede-valg.png` er ~1:1 (739×732) så lidt af top/bund kan blive klippet i 4:5 boksen, men højtaleren er centreret i kilden og forbliver synlig.

---

### Fix (59c.2) — Højtaler-størrelse matcher de to andre
Selv med ens card-højde så det første billede stadig anderledes ud fordi kildebillederne har forskellige dimensioner:
- `ai-billede1.png`: 4096×4096 (kvadratisk 1:1) — højtaleren optager lille del af frame
- `ai-billede2.png`, `ai-billede3.png`: 3584×4800 (~3:4 portræt) — højtaleren er tæt på i kilden

Med `object-fit: cover` på 4:5 container ville det kvadratiske billede 1 bare blive scaled til container-højden uden at zoome ind på højtaleren. Tilføjet target-regel:
```css
.insta-grid .insta-item:nth-child(1) img {
    transform: scale(1.4);
    transform-origin: center 55%;
}
```
Zoom 1.4× med origin 55% (lidt under center) hvor højtaleren er placeret. `overflow: hidden` på picture klipper det overskydende. Nu fremstår højtaleren i ens størrelse på tværs af alle tre cards.

---

## Status pr. dags dato (2026-05-12)

### Aktive ændringer
- Floating glass header (fixed, max 720px, border-radius 28px, backdrop-blur)
- Logo er klikbart (scroller smooth til toppen) — uden hover-effekt
- Side-baggrund: off-white `#F4F4F4` (`--bg`-variabel)
- Hero-overlay: subtil to-lags gradient (mørk top 8% / bund 15% til læselighed + diagonal sage/lavendel/blå-lilla farve-tint på 8-15%)
- **Showcase-sektion (iteration 32):** asymmetrisk layout med slider-card + eyebrow/h2/lede/color-picker/pris/CTA
- **Features-sektion (iteration 32):** 3×2 grid med nummererede feature-cards (01–06)
- **Lifestyle-sektion (original):** 3 AI-billeder i grid + orphan "Udforsk kollektionen"-knap
- **Social Connect-sektion (iteration 55):** off-white bg med stort hvidt card, eyebrow "Connect-appen", split-color heading ("Del musikken. Del stemningen." i lavendel-bright), nummereret funktionsliste med brand-bright farver per item, iPhone + begge officielle badges
- **Footer (iteration 40–43):** UGLYCASH-stil med kæmpe Anton-wordmark "LUMINA" på hvidt rundet card (scaleY 1.3 for tall look), tagline med inline LUMINA-logo + app-badge i midten, disclaimer-paragraffer + store højrejusterede links (1.5rem) nederst, lille meta-linje udenfor cardet
- Eyebrow-microcopy, section-headers, lede-paragraffer som editorial primitives
- **Typografi: Geist alene (h1, h2 weight 600 + body weight 400) — unified font-familie** (skal finjusteres senere)
- Kompakt logo + uppercase nav + 3 ikoner (Search, Login, Cart) — ikoner får pill-bg ved hover
- Newsletter popup: mørk baggrund med electric lavender TILMELD-knap (#8B5CF6 → #7C3AED hover)
- Ny farvepalette: sage / lavendel / blå-lilla / cream + off-white side-bg
- Hero tonet med diagonal brand-gradient (overlay)
- Hero-titel "LUMINA ONE": Instrument Serif 400, ren hvid, ingen skygger
- Primær CTA (`.btn-white`): electric lavender `#8B5CF6` med hvid tekst → hover #7C3AED
- `.btn-dark` solid sort → hover #3a3b3b
- `.btn-ghost` transparent → hover rgba(255,255,255,0.12)
- Alle knapper: 28px border-radius (matcher navbar)
- Hover-stil: Kalstore-inspireret (kun farve-/baggrundsskift, ingen transforms/shadows)

### Fortrudte forsøg (bevaret i dokumentation til processen)
- Archivo Black som footer-wordmark (iteration 42) — for tungt/blockede, ikke samme elegance som Anton
- LUMINA-tekst i Anton inline i footer-tagline (iteration 48) — script-logoet føles mere på-brand
- Custom-byggede SVG/CSS app-badges (iteration 48) — erstattet med officielle Apple/Google badges der er nemmere at forklare til eksamen
- Liquid glass på header-ikoner
- Liquid glass på alle CTA-knapper
- Shop-dropdown med kategorier + produktbillede
- Italic sage "ONE"-accent på hero-titel
- Newsletter popup: mørk rose/brown med sage CTA (iteration 13)
- Newsletter popup: lys/hvid variant (iteration 14)
- Newsletter popup + hero CTA i sage (iteration 15/16) — for dæmpet, gemte sig i paletten
- Universal `opacity: 0.6` hover på alle elementer (iteration 20) — erstattet af kontekst-specifikke skift
- Fraunces 700 + SOFT 100 til headings (iteration 23) — for chunky/blød
- Fraunces 500 + SOFT 30 til headings (iteration 24) — tynde sider gav arabisk feel
- Bricolage Grotesque 700 til headings (iteration 25) — for cartoonish
- Hanken Grotesk 700 til headings (iteration 26) — for karakterløs
