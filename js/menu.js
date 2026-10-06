/**
 * BITE BISTRO - CULINARY MENU & ORDERING CATALOG
 * High-definition dishes, dietary tags, category & search filtering,
 * interactive dish modal, and quick add-to-cart integration.
 */

const MENU_ITEMS = [
  // STARTERS & SMALL PLATES
  {
    id: 'starter-1',
    name: 'Seared Hokkaido Scallops',
    category: 'starters',
    price: 28,
    calories: '340 kcal',
    tags: ['gf', 'chef'],
    description: 'Caramelized cauliflower velouté, black winter truffle pearls, crispy Iberian prosciutto chip.',
    pairing: 'Chablis Premier Cru 2021',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80',
    ingredients: 'Fresh Hokkaido Diver Scallops, Organic Cauliflower, Perigord Black Truffle, Jamón Ibérico, Micro Greens'
  },
  {
    id: 'starter-2',
    name: 'Wagyu Beef Tartare',
    category: 'starters',
    price: 32,
    calories: '410 kcal',
    tags: ['chef'],
    description: 'A5 Miyazakigyu tenderloin, cured quail egg yolk, shallot brunoise, caperberries, toasted brioche tuile.',
    pairing: 'Barolo DOCG 2018',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    ingredients: 'A5 Japanese Wagyu, Organic Quail Egg, French Capers, French Shallots, House Mustard emulsion, Artisan Brioche'
  },
  {
    id: 'starter-3',
    name: 'Heirloom Burrata & Roasted Fig',
    category: 'starters',
    price: 24,
    calories: '390 kcal',
    tags: ['veg', 'gf'],
    description: 'Pugliese creamy burrata, caramelized mission figs, 25-year aged Modena balsamic, crushed pistachio dust.',
    pairing: 'Sancerre Sauvignon Blanc',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985c?auto=format&fit=crop&w=800&q=80',
    ingredients: 'Artisanal Burrata, Mission Figs, Wild Arugula, 25-Year Modena Balsamic, Sicilian Pistachios, Cold-Pressed Olive Oil'
  },
  {
    id: 'starter-4',
    name: 'Wild Forest Morel Tartlet',
    category: 'starters',
    price: 26,
    calories: '320 kcal',
    tags: ['veg'],
    description: 'Flaky herb puff pastry, sautéed French morels, leek confit, Gruyère cheese crème, shaved burgundy truffle.',
    pairing: 'Burgundy Pinot Noir',
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=800&q=80',
    ingredients: 'Burgundy Wild Morels, Gruyère Reserve, Leeks, Thyme, Handcrafted Puff Pastry, Black Truffle'
  },

  // ARTISANAL MAINS & SEAFOOD
  {
    id: 'main-1',
    name: 'Glacier 51 Chilean Sea Bass',
    category: 'mains',
    price: 54,
    calories: '560 kcal',
    tags: ['gf', 'chef'],
    description: 'Miso-mirin glazed toothfish, charred bok choy, lemongrass-dashi emulsion, lotus root crisps.',
    pairing: 'Meursault 2020',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    ingredients: 'Wild Caught Patagonian Toothfish, Organic Red Miso, Mirin, Dashi, Baby Bok Choy, Pickled Lotus'
  },
  {
    id: 'main-2',
    name: 'Crispy Skin Duck Breast à l’Orange',
    category: 'mains',
    price: 46,
    calories: '680 kcal',
    tags: ['gf'],
    description: 'Dry-aged Moulard duck breast, blood orange gastrique, heritage parsnip mousseline, spiced kumquats.',
    pairing: 'Côte de Nuits Rouge',
    image: 'https://images.unsplash.com/photo-1514944298352-1fc4579c4021?auto=format&fit=crop&w=800&q=80',
    ingredients: 'Aged Duck Breast, Blood Orange, Parsnip, Thyme, Grand Marnier Glaze, Star Anise'
  },
  {
    id: 'main-3',
    name: 'Pan-Roasted Atlantic Turbot',
    category: 'mains',
    price: 52,
    calories: '490 kcal',
    tags: ['gf'],
    description: 'Braised baby fennel, wild sea asparagus, saffron bouillabaisse reduction, caviar butter foam.',
    pairing: 'Puligny-Montrachet',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    ingredients: 'Fresh Turbot Fillet, Spanish Saffron, Osetra Caviar, Normandy Butter, Baby Fennel, Sea Asparagus'
  },

  // PRIME STEAKS & CHOPS
  {
    id: 'steak-1',
    name: 'A5 Kagoshima Wagyu Striploin (6oz)',
    category: 'steaks',
    price: 115,
    calories: '780 kcal',
    tags: ['gf', 'chef'],
    description: 'Melt-in-your-mouth BMS 11 beef grilled over binchotan charcoal, bone marrow glaze, smoked Maldon salt flakes.',
    pairing: 'Château Margaux 2015',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80',
    ingredients: 'Authentic Kagoshima A5 Wagyu, Roasted Garlic Cloves, Binchotan Charcoal Sear, Maldon Smoked Sea Salt'
  },
  {
    id: 'steak-2',
    name: 'Prime Dry-Aged Tomahawk (38oz for Two)',
    category: 'steaks',
    price: 165,
    calories: '1850 kcal',
    tags: ['gf', 'chef'],
    description: '45-day Himalayan salt aged USDA Prime ribeye, roasted black garlic butter, rosemary smoked table-side.',
    pairing: 'Napa Valley Cabernet Sauvignon Reserve',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    ingredients: '38oz Bone-in Ribeye, Fermented Black Garlic, Herb Butter, Fresh Rosemary, Truffle Salt'
  },
  {
    id: 'steak-3',
    name: 'Herb-Crusted Colorado Lamb Rack',
    category: 'steaks',
    price: 58,
    calories: '720 kcal',
    tags: ['gf'],
    description: 'Dijon & pistachio herb crust, fondant potatoes, glazed baby carrots, minted lamb jus.',
    pairing: 'Brunello di Montalcino 2017',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    ingredients: 'Colorado Lamb Rack, Sicilian Pistachio, French Dijon, Yukon Gold Fondant Potatoes, Fresh Mint Jus'
  },

  // HANDCRAFTED PASTAS
  {
    id: 'pasta-1',
    name: 'Black Truffle & Ricotta Agnolotti',
    category: 'pastas',
    price: 38,
    calories: '540 kcal',
    tags: ['veg', 'chef'],
    description: 'Handmade yolk pasta stuffed with whipped buffalo ricotta, brown butter sauce, freshly shaved Norcia black truffles.',
    pairing: 'Gavi di Gavi',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
    ingredients: '00 Italian Flour, Free-Range Egg Yolks, Buffalo Milk Ricotta, Beurre Noisette, Fresh Winter Truffles'
  },
  {
    id: 'pasta-2',
    name: 'Lobster & Saffron Tagliolini',
    category: 'pastas',
    price: 44,
    calories: '610 kcal',
    tags: ['chef'],
    description: 'Butter-poached Maine lobster knuckle, sweet datterini tomatoes, saffron strand pasta, tarragon bisque reduction.',
    pairing: 'Etna Bianco',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    ingredients: 'Fresh Maine Lobster, Hand-Extruded Saffron Tagliolini, San Marzano Datterini, Tarragon, Cognac Bisque'
  },

  // PLANT-BASED CREATIONS
  {
    id: 'plant-1',
    name: 'Roasted King Oyster Mushroom Scallops',
    category: 'plant',
    price: 32,
    calories: '310 kcal',
    tags: ['veg', 'gf'],
    description: 'Thick scored king oyster mushroom medallions, sunchoke puree, wilted rainbow chard, hazelnut vinaigrette.',
    pairing: 'Biodynamic Chenin Blanc',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    ingredients: 'King Oyster Mushrooms, Jerusalem Artichoke (Sunchoke), Toasted Hazelnuts, Garlic Confit, Organic Chard'
  },
  {
    id: 'plant-2',
    name: 'Charred Heirloom Cauliflower Steak',
    category: 'plant',
    price: 29,
    calories: '280 kcal',
    tags: ['veg', 'gf'],
    description: 'Golden turmeric & chimichurri marinade, pomegranate arils, whipped tahini yogurt, roasted pine nuts.',
    pairing: 'Spanish Albariño',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=800&q=80',
    ingredients: 'Organic Romanesco & Cauliflower, Pomegranate, Tahini, Pine Nuts, Fresh Mint & Chimichurri'
  },

  // DECADENT DESSERTS
  {
    id: 'dessert-1',
    name: 'The Golden Dark Chocolate Sphere',
    category: 'desserts',
    price: 22,
    calories: '490 kcal',
    tags: ['veg', 'chef'],
    description: '70% Valrhona Guanaja shell melted table-side with warm salted caramel, espresso mousse, edible 24k gold leaf.',
    pairing: 'Taylor Fladgate 20-Year Tawny Port',
    image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80',
    ingredients: 'Valrhona 70% Dark Chocolate, 24k Gold Leaf, Tahitian Vanilla Bean, Espresso, Maldon Sea Salt Caramel'
  },
  {
    id: 'dessert-2',
    name: 'Madagascan Vanilla Bean Mille-Feuille',
    category: 'desserts',
    price: 19,
    calories: '420 kcal',
    tags: ['veg'],
    description: 'Caramelized puff pastry layers, silky diplomat cream, wild wild raspberry coulis, spun sugar nest.',
    pairing: 'Château d’Yquem Sauternes',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80',
    ingredients: 'Caramelized French Feuilletage, Madagascan Vanilla Diplomat, Organic Raspberries, Powdered Sugar'
  },

  // SIGNATURE COCKTAILS & CELLAR WINE
  {
    id: 'drink-1',
    name: 'Bite Bistro Smoked Old Fashioned',
    category: 'drinks',
    price: 24,
    calories: '190 kcal',
    tags: ['chef'],
    description: 'WhistlePig 10-Yr Rye, demerara, Angostura & orange bitters, smoked with cherrywood smoke inside cloche.',
    pairing: 'Appetizers & Steaks',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    ingredients: 'Aged Rye Whiskey, Cherrywood Smoke, Blood Orange Peel, Artisanal Bitters, Large Clear Ice Sphere'
  },
  {
    id: 'drink-2',
    name: 'The Midnight Truffle Martini',
    category: 'drinks',
    price: 25,
    calories: '180 kcal',
    tags: ['chef'],
    description: 'Black truffle infused Belvedere vodka, dry vermouth, blue cheese hand-stuffed Castelvetrano olives.',
    pairing: 'Caviar & Oysters',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    ingredients: 'Truffle-Washed Belvedere Vodka, Dolin Dry Vermouth, Sicilian Green Olives, Roquefort'
  }
];

let currentCategory = 'all';
let currentSearch = '';
let activeDietaryFilters = new Set();

document.addEventListener('DOMContentLoaded', () => {
  renderMenu();
  setupFilterListeners();
  setupSearchListener();
});

function renderMenu() {
  const container = document.getElementById('menu-grid-container');
  if (!container) return;

  const filtered = MENU_ITEMS.filter(item => {
    // Category match
    const categoryMatch = (currentCategory === 'all') || (item.category === currentCategory);
    
    // Search match
    const searchMatch = !currentSearch || 
      item.name.toLowerCase().includes(currentSearch) ||
      item.description.toLowerCase().includes(currentSearch) ||
      item.ingredients.toLowerCase().includes(currentSearch);

    // Dietary match
    let dietaryMatch = true;
    if (activeDietaryFilters.size > 0) {
      activeDietaryFilters.forEach(tag => {
        if (!item.tags.includes(tag)) {
          dietaryMatch = false;
        }
      });
    }

    return categoryMatch && searchMatch && dietaryMatch;
  });

  const countEl = document.getElementById('menu-results-count');
  if (countEl) {
    countEl.textContent = `Showing ${filtered.length} culinary creation${filtered.length === 1 ? '' : 's'}`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-16 px-4 bg-white/[0.02] rounded-3xl border border-white/5">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </div>
        <h3 class="text-xl font-serif font-bold text-white mb-2">No matching dishes found</h3>
        <p class="text-sm text-gray-400 max-w-md mx-auto mb-6">We couldn't find any dishes matching your selected filter. Please reset or try a different term.</p>
        <button onclick="resetMenuFilters()" class="btn-outline-gold text-xs">Reset All Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const tagBadges = item.tags.map(t => {
      if (t === 'veg') return '<span class="badge-tag veg">Vegetarian</span>';
      if (t === 'gf') return '<span class="badge-tag gf">Gluten Free</span>';
      if (t === 'chef') return '<span class="badge-tag chef">Chef’s Signature</span>';
      return '';
    }).join(' ');

    return `
      <div class="group relative rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-500/40 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl hover:-translate-y-1">
        <div>
          <!-- Image Banner -->
          <div class="img-zoom-container h-52 w-full relative cursor-pointer" onclick="openDishModal('${item.id}')">
            <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover" loading="lazy" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div class="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30 text-amber-300 font-serif font-bold text-sm">
              $${item.price.toFixed(2)}
            </div>
            <div class="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
              ${tagBadges}
            </div>
          </div>

          <!-- Card Content -->
          <div class="p-5">
            <div class="flex items-start justify-between gap-2 mb-2">
              <h3 class="text-lg font-serif font-bold text-white group-hover:text-amber-300 transition-colors cursor-pointer" onclick="openDishModal('${item.id}')">
                ${item.name}
              </h3>
            </div>
            <p class="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
              ${item.description}
            </p>
            <div class="text-[11px] text-amber-200/70 flex items-center gap-1.5 italic mb-1">
              <span>Sommelier Pairing:</span>
              <span class="text-gray-300 not-italic font-medium">${item.pairing}</span>
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="px-5 pb-5 pt-2 flex items-center justify-between border-t border-white/5 mt-auto">
          <button onclick="openDishModal('${item.id}')" class="text-xs text-gray-400 hover:text-white transition-colors underline decoration-dotted underline-offset-4">
            Details & Allergens
          </button>
          <button onclick="Cart.addItem({ id: '${item.id}', name: '${item.name.replace(/'/g, "\\'")}', price: ${item.price}, image: '${item.image}', category: '${item.category}' })" 
                  class="btn-gold !py-2 !px-4 !text-xs !rounded-lg flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            Add to Order
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function setupFilterListeners() {
  const categoryButtons = document.querySelectorAll('.category-filter-btn');
  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryButtons.forEach(b => b.classList.remove('bg-amber-500', 'text-black', 'border-amber-400'));
      categoryButtons.forEach(b => b.classList.add('bg-white/5', 'text-gray-300', 'border-white/10'));

      btn.classList.add('bg-amber-500', 'text-black', 'border-amber-400');
      btn.classList.remove('bg-white/5', 'text-gray-300', 'border-white/10');

      currentCategory = btn.getAttribute('data-category') || 'all';
      renderMenu();
    });
  });

  const dietaryCheckboxes = document.querySelectorAll('.dietary-filter-checkbox');
  dietaryCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const tag = cb.value;
      if (cb.checked) {
        activeDietaryFilters.add(tag);
      } else {
        activeDietaryFilters.delete(tag);
      }
      renderMenu();
    });
  });
}

function setupSearchListener() {
  const searchInput = document.getElementById('menu-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.toLowerCase().trim();
      renderMenu();
    });
  }
}

function resetMenuFilters() {
  currentCategory = 'all';
  currentSearch = '';
  activeDietaryFilters.clear();

  const searchInput = document.getElementById('menu-search-input');
  if (searchInput) searchInput.value = '';

  const dietaryCheckboxes = document.querySelectorAll('.dietary-filter-checkbox');
  dietaryCheckboxes.forEach(cb => cb.checked = false);

  const categoryButtons = document.querySelectorAll('.category-filter-btn');
  categoryButtons.forEach((btn, index) => {
    if (index === 0) {
      btn.classList.add('bg-amber-500', 'text-black', 'border-amber-400');
      btn.classList.remove('bg-white/5', 'text-gray-300', 'border-white/10');
    } else {
      btn.classList.remove('bg-amber-500', 'text-black', 'border-amber-400');
      btn.classList.add('bg-white/5', 'text-gray-300', 'border-white/10');
    }
  });

  renderMenu();
}

// Interactive Dish Modal View
function openDishModal(dishId) {
  const item = MENU_ITEMS.find(i => i.id === dishId);
  if (!item) return;

  const modal = document.getElementById('dish-detail-modal');
  const content = document.getElementById('dish-detail-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="rounded-xl overflow-hidden h-64 md:h-full relative">
        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover" />
        <div class="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-medium text-white">
          ${item.calories}
        </div>
      </div>
      <div class="flex flex-col justify-between py-2">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs uppercase tracking-widest text-amber-400 font-semibold">${item.category}</span>
            <span class="text-2xl font-serif font-bold text-amber-400">$${item.price.toFixed(2)}</span>
          </div>
          <h3 class="text-2xl font-serif font-bold text-white mb-3">${item.name}</h3>
          <p class="text-sm text-gray-300 leading-relaxed mb-4">${item.description}</p>
          
          <div class="space-y-3 bg-white/5 p-4 rounded-xl border border-white/5 mb-6 text-xs">
            <div>
              <span class="text-amber-400 font-semibold uppercase tracking-wider block mb-1">Key Ingredients & Origin:</span>
              <span class="text-gray-300">${item.ingredients}</span>
            </div>
            <div>
              <span class="text-amber-400 font-semibold uppercase tracking-wider block mb-1">Sommelier Cellar Pairing:</span>
              <span class="text-gray-300 italic">${item.pairing}</span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-4 pt-4 border-t border-white/10">
          <button onclick="Cart.addItem({ id: '${item.id}', name: '${item.name.replace(/'/g, "\\'")}', price: ${item.price}, image: '${item.image}', category: '${item.category}' }); closeDishModal();" 
                  class="btn-gold flex-1 py-3 text-sm">
            Add to Order • $${item.price.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closeDishModal() {
  const modal = document.getElementById('dish-detail-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }
}
