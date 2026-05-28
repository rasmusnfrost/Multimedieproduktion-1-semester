/* ================================================================
   LUMINA — script.js
   Struktur (matcher DOM-rækkefølgen i index.html):
     1. Header — logo scroll-to-top + inline nav-search toggle
     2. Hero — Køb nu / Lær mere scroll-bindinger
     3. Showcase — farvevælger (dots + colorTiles + slider)
     4. Newsletter popup — luk-knap
   ================================================================ */


/* ============================================================
   1. HEADER — logo scroll-to-top + nav-search
   ============================================================ */

/* Logo: smooth scroll til toppen */
document.getElementById('logoLink').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* Inline nav-search (visuel toggle) */
const navEl = document.querySelector('.nav');
const navSearchTrigger = document.getElementById('searchTrigger');
const navSearchInput = document.getElementById('navSearchInput');
const navSearchClose = document.getElementById('navSearchClose');

function closeNavSearch() {
    navEl.classList.remove('isSearching');
    navSearchInput.value = '';
}

navSearchTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    navEl.classList.add('isSearching');
    setTimeout(() => navSearchInput.focus(), 50);
});

navSearchClose.addEventListener('click', closeNavSearch);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navEl.classList.contains('isSearching')) closeNavSearch();
});


/* ============================================================
   2. HERO — CTA scroll-bindinger
   ============================================================ */

function scrollToShowcase(e) {
    if (e) e.preventDefault();
    const showcase = document.querySelector('.showcase');
    if (showcase) showcase.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const heroBuyBtn = document.getElementById('heroBuyBtn');
const heroLearnBtn = document.getElementById('heroLearnBtn');
const navShop = document.getElementById('navShop');

if (heroBuyBtn) heroBuyBtn.addEventListener('click', scrollToShowcase);
if (navShop) navShop.addEventListener('click', scrollToShowcase);

if (heroLearnBtn) heroLearnBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const features = document.querySelector('.features');
    if (features) features.scrollIntoView({ behavior: 'smooth', block: 'start' });
});


/* ============================================================
   3. SHOWCASE — farvevælger (dots + colorTiles + slider)
   ============================================================ */

const slides = document.querySelector('.slides');
const dots = document.querySelectorAll('.dot');
const colorName = document.getElementById('colorName');
const colorTiles = document.querySelectorAll('.colorTile');
const showcaseCartBtn = document.getElementById('showcaseCartBtn');

const colorLabels = ['Sage', 'Lavendel', 'Blå-lilla', 'Cream'];
let index = 0;

function updateSlider() {
    slides.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    if (colorName) colorName.textContent = colorLabels[index];
}

function updateColorTiles() {
    colorTiles.forEach(tile => {
        const i = parseInt(tile.dataset.colorIndex, 10);
        tile.classList.toggle('isCurrent', i === index);
    });
}

function setColor(i) {
    index = i;
    updateSlider();
    updateColorTiles();
}

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => setColor(i));
});

colorTiles.forEach(tile => {
    tile.addEventListener('click', () => {
        const i = parseInt(tile.dataset.colorIndex, 10);
        setColor(i);
        document.querySelector('.showcase').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

if (showcaseCartBtn) showcaseCartBtn.addEventListener('click', e => e.preventDefault());

updateColorTiles();


/* ============================================================
   4. NEWSLETTER POPUP — luk-knap
   ============================================================ */

document.getElementById('newsletterClose').addEventListener('click', () => {
    document.getElementById('newsletterPopup').classList.add('isHidden');
});
