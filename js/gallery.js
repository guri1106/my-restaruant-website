/**
 * BITE BISTRO - AMBIANCE GALLERY & LIGHTBOX
 * High-definition imagery showcase, category filtering,
 * and full-screen lightbox image viewer.
 */

const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'The Grand Dining Atrium',
    category: 'ambiance',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=85',
    caption: 'Bespoke crystal chandeliers, velvet seating, and acoustically tuned warm ambiance.'
  },
  {
    id: 2,
    title: 'The Open Hearth Kitchen',
    category: 'culinary',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=85',
    caption: 'Executive Chef Julian Vance orchestrating the pass under warm copper pendant heat lamps.'
  },
  {
    id: 3,
    title: 'A5 Wagyu Binchotan Sear',
    category: 'culinary',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=85',
    caption: 'Japanese A5 Wagyu striploin caramelized over traditional white charcoal coals.'
  },
  {
    id: 4,
    title: 'The Subterranean Wine Vault',
    category: 'wine',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=85',
    caption: 'Temperature-controlled reserve featuring over 1,800 rare Old and New World vintages.'
  },
  {
    id: 5,
    title: 'Candlelit Courtyard Terrace',
    category: 'ambiance',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85',
    caption: 'Al fresco dining surrounded by lush olive trees, water features, and open fire bowls.'
  },
  {
    id: 6,
    title: 'Smoked Botanical Libations',
    category: 'wine',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=85',
    caption: 'Handcrafted cocktail service with aromatic smoked rosemary and hand-carved crystal ice.'
  },
  {
    id: 7,
    title: 'Private Imperial Dining Salon',
    category: 'events',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85',
    caption: 'Exclusive private dining suite accommodating up to 22 guests with dedicated kitchen brigade.'
  },
  {
    id: 8,
    title: 'Artisan Pastry Plating',
    category: 'culinary',
    image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=1200&q=85',
    caption: 'Chef Élodie Laurent finishing the 24k Golden Dark Chocolate sphere with gold leaf accents.'
  }
];

let currentLightboxIndex = 0;
let currentGalleryFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  renderGallery();
  setupGalleryFilters();
});

function renderGallery() {
  const container = document.getElementById('gallery-grid-container');
  if (!container) return;

  const filtered = GALLERY_ITEMS.filter(item => {
    return currentGalleryFilter === 'all' || item.category === currentGalleryFilter;
  });

  container.innerHTML = filtered.map((item, index) => `
    <div class="group relative rounded-2xl overflow-hidden cursor-pointer h-72 bg-white/5 border border-white/10 hover:border-amber-500/40 transition-all duration-300"
         onclick="openLightbox(${item.id})">
      <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>
      
      <div class="absolute bottom-0 inset-x-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
        <span class="text-[10px] uppercase font-bold tracking-widest text-amber-400 mb-1 block">${item.category}</span>
        <h4 class="text-base font-serif font-bold text-white mb-1">${item.title}</h4>
        <p class="text-xs text-gray-300 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">${item.caption}</p>
      </div>

      <div class="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-white/20">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>
      </div>
    </div>
  `).join('');
}

function setupGalleryFilters() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('bg-amber-500', 'text-black', 'border-amber-400'));
      filterBtns.forEach(b => b.classList.add('bg-white/5', 'text-gray-300', 'border-white/10'));

      btn.classList.add('bg-amber-500', 'text-black', 'border-amber-400');
      btn.classList.remove('bg-white/5', 'text-gray-300', 'border-white/10');

      currentGalleryFilter = btn.getAttribute('data-filter') || 'all';
      renderGallery();
    });
  });
}

function openLightbox(itemId) {
  const item = GALLERY_ITEMS.find(i => i.id === itemId);
  if (!item) return;

  currentLightboxIndex = GALLERY_ITEMS.findIndex(i => i.id === itemId);

  const modal = document.getElementById('gallery-lightbox-modal');
  const imgEl = document.getElementById('lightbox-image');
  const titleEl = document.getElementById('lightbox-title');
  const captionEl = document.getElementById('lightbox-caption');

  if (!modal || !imgEl) return;

  imgEl.src = item.image;
  if (titleEl) titleEl.textContent = item.title;
  if (captionEl) captionEl.textContent = item.caption;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const modal = document.getElementById('gallery-lightbox-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }
}

function nextLightboxImage() {
  currentLightboxIndex = (currentLightboxIndex + 1) % GALLERY_ITEMS.length;
  openLightbox(GALLERY_ITEMS[currentLightboxIndex].id);
}

function prevLightboxImage() {
  currentLightboxIndex = (currentLightboxIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
  openLightbox(GALLERY_ITEMS[currentLightboxIndex].id);
}
