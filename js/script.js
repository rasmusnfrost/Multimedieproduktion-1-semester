document.getElementById('newsletterClose').addEventListener('click', () => {
    document.getElementById('newsletterPopup').classList.add('isHidden');
});

document.getElementById('logoLink').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* === Inline nav search (visuel toggle) === */
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

/* === CTA scroll helpers === */
function scrollToShowcase(e) {
    if (e) e.preventDefault();
    const showcase = document.querySelector('.showcase');
    if (showcase) showcase.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const heroBuyBtn = document.getElementById('heroBuyBtn');
const heroLearnBtn = document.getElementById('heroLearnBtn');
const showcaseCartBtn = document.getElementById('showcaseCartBtn');

if (heroBuyBtn) heroBuyBtn.addEventListener('click', scrollToShowcase);

const navShop = document.getElementById('navShop');
if (navShop) navShop.addEventListener('click', scrollToShowcase);

if (heroLearnBtn) heroLearnBtn.addEventListener('click', e => {
    e.preventDefault();
    const features = document.querySelector('.features');
    if (features) features.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

if (showcaseCartBtn) showcaseCartBtn.addEventListener('click', e => e.preventDefault());

/* === Showcase farvevælger + slider === */
const slides = document.querySelector('.slides');
const dots = document.querySelectorAll('.dot');
const colorName = document.getElementById('colorName');
const colorLabels = ['Sage', 'Lavendel', 'Blå-lilla', 'Cream'];
let index = 0;

function updateSlider() {
  slides.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
  if (colorName) colorName.textContent = colorLabels[index];
}

const colorTiles = document.querySelectorAll('.colorTile');

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

updateColorTiles();
