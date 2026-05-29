# LUMINA

Readme fil for **LUMINA** landing page og deres højtaler, LUMINA One - En let portable højtaler med tote bag og en tilhørende app

Projektet er fokuserer på design, brand-identitet, typografi, og kode

## Indhold

Siden består af følgende sektioner:

1. **Hero** — produktbillede med LUMINA ONE titel og CTA-knapper
2. **Produkt-showcase** — billedeslider med fire farvevarianter (sage, lavendel, blå-lilla, cream), en farvevælger og pris
3. **Andre farver** — visuel oversigt over alle de fire farvevarianter
4. **Detaljer** — split-layout med produkt billede og en features liste
5. **Features** — en grid med 6 nummererede produkt detaljer
6. **Lifestyle** — AI-genererede stemningsbilleder
7. **Connect-promo** — AI-genererede billede med tekst om app-funktioner i punktform
8. **Social Connect** — split-card med app-screenshot og oficielle download-CTA knapper fra apple store og google play i .svg format
9. **Fra fællesskabet** — kollage med billeder (#lumina-Instagram)
10. **Footer** — wordmark "LUMINA", en tagline, app-badges, links og en disclaimer

## Filstruktur

```
lumina-vs-code/
├── index.html          # Hovedside med alle sektioner
├── css/
│   └── style.css       # Komplet styling (CSS-variabler, layout, responsiv)
├── js/
│   └── script.js       # Interaktion: slider, farvevælger, popup, navigation
├── images/             # Produktbilleder, ikoner, avatars, logo-SVG'er
└── README.md           # Denne fil
```

## Tech stack

- **HTML5** — semantisk markup med `<section>`, `<article>`, `<header>`, `<footer>`
- **CSS3** — Grid, Flexbox, CSS Custom Properties, `clamp()` til responsiv typografi og `backdrop-filter` til glass-effekter
- **Vanilla JavaScript** — ingen frameworks eller biblioteker
- **SVG** — ikoner og logo for bedre opløsning på alle typer af skærme, i forskellige width og heights

## Design

### Farvepalette

| Variabel | Hex | Anvendelse |
|---|---|---|
| `--bg` | `#ffffff` | Sidebaggrund |
| `--fv4` | `#F1EDE2` | Cream — card-baggrunde |
| `--fv1Bright` | `#5c9a55` | Sage accent |
| `--fv2Bright` | `#9d6bc6` | Lavendel accent |
| `--fv3Bright` | `#6a5fb5` | Blå-lilla accent |
| `--cta` | `#EC4899` | Primær CTA / pink accent |
| `--textDark` | `#111` | Brødtekst |

### Typografi

- **Arial / Arial Black** — unified font-familie til både overskrifter og brødtekst
- Lowercase tekst i body for editorial-feel
- `clamp()`-baseret skalering for responsiv læsbarhed

### Layout-principper

- Card-baseret segmenter: alle sektioner ligger som et cream-card med afrundede kanter (`border-radius: 28px`) på en off-white baggrund
- Maks bredde `1200px`, centreret med 90%-bredde, udover hero sectionen
- Floating glass-navbar som er lavet med (`position: fixed`,) så den føger med scroll og (`backdrop-filter: blur`) for bedre kontrast og readability

## Interaktivitet i designet

Implementeret i `js/script.js`:

- Klik på color tiles i showcase-sektion for at skifte produktbillede og farvenavn
- Logo i navbar er klikbart og scroller til sidens top
- Søgeikon som åbner søgefelt
- Newsletter-popup som vises når man åbner siden. popup funktionen kan lukkes i exit funktionen (krydset)
- Color tile slider i produkt-showcase segmentet

## Validation

![html validation](<./validation/html-validation.png>)
![css validation](<./validation/css-validation.png>)

## Forfatter

**Rasmus Frost** — eksamensprojekt 2026
