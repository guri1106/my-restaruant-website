/**
 * ===================================================================
 * SAKURA SUSHI - MAIN JAVASCRIPT FILE
 * Project: First-Year College Web Development Project
 * Author: Sakura Sushi Team
 * Technologies: HTML5, CSS3, Vanilla JavaScript (ES6+), LocalStorage
 * ===================================================================
 * 
 * VIVA EXPLANATION SUMMARY:
 * - This file handles data management, UI rendering, event listeners,
 *   LocalStorage persistence for shopping cart & orders, and form validation.
 * - All code runs directly in the browser without any external backend/database.
 */

/* ===================================================================
   1. MENU DATASET (22 Authentic Japanese Items)
   =================================================================== */
const MENU_ITEMS = [
  // --- SUSHI ROLLS ---
  {
    id: 'roll-1',
    name: 'California Roll',
    category: 'sushi-rolls',
    categoryLabel: 'Sushi Rolls',
    price: 249,
    description: 'Crab, avocado and cucumber rolled with seasoned rice and toasted sesame seeds.',
    longDescription: 'A world-famous classic crafted with tender crab meat, creamy Hass avocado, and crisp cucumber wrapped inside seasoned short-grain rice and nori, finished with toasted sesame.',
    image: 'images/california-roll.jpg',
    onlineImage: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fa/California_roll_from_Sarku_Japan_with_wasabi_and_ginger.jpg/960px-California_roll_from_Sarku_Japan_with_wasabi_and_ginger.jpg',
    badge: 'Popular',
    diet: 'non-veg',
    portion: '8 pieces',
    isPopular: true
  },
  {
    id: 'roll-2',
    name: 'Salmon Roll',
    category: 'sushi-rolls',
    categoryLabel: 'Sushi Rolls',
    price: 299,
    description: 'Fresh salmon with seasoned rice and cucumber.',
    longDescription: 'Slices of prime Atlantic salmon paired with refreshing cucumber, rolled inside vinegared sushi rice and crisp nori seaweed. Served with pickled ginger and wasabi.',
    image: 'images/salmon-roll.jpg',
    onlineImage: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Salmon_roll_sushi_with_lemon_garnish%2C_September_2008.jpg',
    badge: 'Best Seller',
    diet: 'non-veg',
    portion: '8 pieces',
    isPopular: true
  },
  {
    id: 'roll-3',
    name: 'Spicy Tuna Roll',
    category: 'sushi-rolls',
    categoryLabel: 'Sushi Rolls',
    price: 329,
    description: 'Tuna with spicy mayo, cucumber and sesame.',
    longDescription: 'Hand-chopped fresh yellowfin tuna tossed in our signature spicy sriracha mayo, rolled with crunchy cucumber and topped with toasted black and white sesame.',
    image: 'images/spicy-tuna-roll.jpg',
    onlineImage: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Makizushi_Tekkamaki_1.jpg',
    badge: "Chef's Special",
    diet: 'non-veg',
    portion: '8 pieces',
    isPopular: true
  },
  {
    id: 'roll-4',
    name: 'Dragon Roll',
    category: 'sushi-rolls',
    categoryLabel: 'Sushi Rolls',
    price: 379,
    description: 'Crispy chicken, avocado and cucumber with special sauce.',
    longDescription: 'Golden crispy chicken katsu and cucumber wrapped in rice, gracefully layered with thinly sliced ripe avocado resembling dragon scales, drizzled with sweet unagi glaze.',
    image: 'images/dragon-roll.jpg',
    onlineImage: 'https://images.unsplash.com/photo-1582450871972-ab5ca641643d?w=600&auto=format&fit=crop&q=80',
    badge: 'Signature',
    diet: 'non-veg',
    portion: '8 pieces',
    isPopular: false
  },
  {
    id: 'roll-5',
    name: 'Vegetable Sushi Roll',
    category: 'sushi-rolls',
    categoryLabel: 'Sushi Rolls',
    price: 229,
    description: 'Fresh cucumber, avocado, carrot and sesame.',
    longDescription: 'A crisp, garden-fresh roll combining julienned carrots, chilled English cucumber, and creamy avocado, gently rolled with seasoned Koshihikari sushi rice and roasted sesame.',
    image: 'images/vegetable-roll.jpg',
    onlineImage: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/02/Vegetarian_Sushi_Maki_roll.jpg/960px-Vegetarian_Sushi_Maki_roll.jpg',
    badge: 'Vegetarian',
    diet: 'veg',
    portion: '8 pieces',
    isPopular: false
  },

  // --- NIGIRI ---
  {
    id: 'nigiri-1',
    name: 'Salmon Nigiri',
    category: 'nigiri',
    categoryLabel: 'Nigiri',
    price: 299,
    description: 'Hand-pressed seasoned rice topped with fresh Atlantic salmon slice.',
    longDescription: 'Artisan hand-molded warm sushi rice delicately brushed with nikiri soy sauce and topped with a glistening, melt-in-the-mouth slice of raw Atlantic salmon.',
    image: 'images/salmon-nigiri.jpg',
    onlineImage: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Salmon_Nigiri_Sushi%2C_2008.jpg',
    badge: 'Top Pick',
    diet: 'non-veg',
    portion: '4 pieces',
    isPopular: false
  },
  {
    id: 'nigiri-2',
    name: 'Tuna Nigiri',
    category: 'nigiri',
    categoryLabel: 'Nigiri',
    price: 329,
    description: 'Hand-pressed seasoned rice with premium yellowfin tuna.',
    longDescription: 'Deep ruby-red cuts of sustainably caught yellowfin tuna resting atop seasoned rice pillows with a discreet touch of freshly grated wasabi beneath.',
    image: 'images/tuna-nigiri.jpg',
    onlineImage: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2d/Maguro_Akami_%28lean_tuna%29_Nigiri.jpg/960px-Maguro_Akami_%28lean_tuna%29_Nigiri.jpg',
    badge: 'Fresh Catch',
    diet: 'non-veg',
    portion: '4 pieces',
    isPopular: false
  },
  {
    id: 'nigiri-3',
    name: 'Prawn Nigiri',
    category: 'nigiri',
    categoryLabel: 'Nigiri',
    price: 319,
    description: 'Delicately poached tiger prawn over seasoned sushi rice.',
    longDescription: 'Butterflied black tiger prawn gently poached to sweet tenderness and draped over seasoned sushi rice, finished with a touch of citrus ponzu glaze.',
    image: 'images/prawn-nigiri.jpg',
    onlineImage: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Shrimpnigiri.jpg',
    badge: 'Traditional',
    diet: 'non-veg',
    portion: '4 pieces',
    isPopular: false
  },

  // --- SASHIMI ---
  {
    id: 'sashimi-1',
    name: 'Salmon Sashimi',
    category: 'sashimi',
    categoryLabel: 'Sashimi',
    price: 399,
    description: 'Five thick slices of prime Atlantic salmon served with wasabi.',
    longDescription: 'Ultra-fresh, sashimi-grade raw Atlantic salmon sliced by hand to reveal its buttery marbling. Served over shredded daikon radish with Shizuoka wasabi and pickled ginger.',
    image: 'images/salmon-sashimi.jpg',
    onlineImage: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d6/Salmon_sashimi.jpg/960px-Salmon_sashimi.jpg',
    badge: 'Premium',
    diet: 'non-veg',
    portion: '5 slices',
    isPopular: false
  },
  {
    id: 'sashimi-2',
    name: 'Tuna Sashimi',
    category: 'sashimi',
    categoryLabel: 'Sashimi',
    price: 429,
    description: 'Delicate slices of fresh yellowfin tuna with pickled ginger.',
    longDescription: 'Lean, velvety cuts of wild yellowfin tuna arranged with artistic precision. Clean, iron-rich flavor complemented by aged tamari soy sauce.',
    image: 'images/tuna-sashimi.jpg',
    onlineImage: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Sashimi_%28Fatty_tuna%29_-_Flickr_-_jetalone.jpg',
    badge: 'Chef Choice',
    diet: 'non-veg',
    portion: '5 slices',
    isPopular: false
  },

  // --- RAMEN ---
  {
    id: 'ramen-1',
    name: 'Chicken Ramen',
    category: 'ramen',
    categoryLabel: 'Ramen',
    price: 349,
    description: 'Rich savory chicken broth with ramen noodles, soft egg and scallions.',
    longDescription: 'Slow-simmered 12-hour chicken bone broth poured over springy handmade ramen noodles. Topped with sliced chicken chashu, ajitsuke tamago (soft-boiled seasoned egg), menma, and nori.',
    image: 'images/chicken-ramen.jpg',
    onlineImage: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1d/Tori-baitang_ramen.jpg/960px-Tori-baitang_ramen.jpg',
    badge: 'Comfort Food',
    diet: 'non-veg',
    portion: '1 large bowl',
    isPopular: false
  },
  {
    id: 'ramen-2',
    name: 'Vegetable Ramen',
    category: 'ramen',
    categoryLabel: 'Ramen',
    price: 299,
    description: 'Soy-miso broth with tofu, sweet corn, mushrooms and nori.',
    longDescription: 'Hearty golden broth infused with white miso and roasted kombu kelp, loaded with silken pan-seared tofu, sweet Hokkaido corn, shiitake mushrooms, and green scallions.',
    image: 'images/vegetable-ramen.jpg',
    onlineImage: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d6/Vegan_Tan_Tan_-_Goemon_Ramen_Bar.jpg/960px-Vegan_Tan_Tan_-_Goemon_Ramen_Bar.jpg',
    badge: 'Vegetarian',
    diet: 'veg',
    portion: '1 large bowl',
    isPopular: false
  },
  {
    id: 'ramen-3',
    name: 'Spicy Miso Ramen',
    category: 'ramen',
    categoryLabel: 'Ramen',
    price: 379,
    description: 'Fermented chili miso broth, tender bamboo shoots and roasted sesame.',
    longDescription: 'A fiery, deeply aromatic ramen built upon fermented red miso paste, Sichuan chili oil, springy noodles, bamboo shoots, wood-ear mushrooms, and roasted sesame seeds.',
    image: 'images/spicy-miso-ramen.jpg',
    onlineImage: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=600&auto=format&fit=crop&q=80',
    badge: 'Spicy',
    diet: 'non-veg',
    portion: '1 large bowl',
    isPopular: false
  },

  // --- APPETIZERS ---
  {
    id: 'app-1',
    name: 'Edamame',
    category: 'appetizers',
    categoryLabel: 'Appetizers',
    price: 149,
    description: 'Steamed young soybeans tossed in sea salt and roasted sesame oil.',
    longDescription: 'Tender, plump Japanese young soybean pods freshly steamed and tossed with crunchy Maldon sea salt crystals and a fragrant whisper of roasted sesame oil.',
    image: 'images/edamame.jpg',
    onlineImage: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/87/Edamame_on_a_bamboo_bowl_by_yomi955.jpg/960px-Edamame_on_a_bamboo_bowl_by_yomi955.jpg',
    badge: 'Vegan & Healthy',
    diet: 'veg',
    portion: '1 bowl',
    isPopular: false
  },
  {
    id: 'app-2',
    name: 'Vegetable Gyoza',
    category: 'appetizers',
    categoryLabel: 'Appetizers',
    price: 199,
    description: 'Pan-seared Japanese dumplings packed with cabbage, chives and ginger.',
    longDescription: 'Delicate handmade dumplings filled with finely shredded Savoy cabbage, garlic chives, carrots, and shiitake mushrooms, pan-crisped on the bottom and steamed soft. Served with chili-soy dip.',
    image: 'images/vegetable-gyoza.jpg',
    onlineImage: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&auto=format&fit=crop&q=80',
    badge: 'Crispy & Soft',
    diet: 'veg',
    portion: '6 pieces',
    isPopular: false
  },
  {
    id: 'app-3',
    name: 'Chicken Gyoza',
    category: 'appetizers',
    categoryLabel: 'Appetizers',
    price: 229,
    description: 'Crispy bottom dumplings filled with minced seasoned chicken and scallions.',
    longDescription: 'Juicy minced chicken infused with grated ginger, garlic, sesame oil, and spring onions, folded in paper-thin gyoza skins and seared to a golden brown lace crust.',
    image: 'images/chicken-gyoza.jpg',
    onlineImage: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/30/Japanese_pan_fried_gyoza.jpg/960px-Japanese_pan_fried_gyoza.jpg',
    badge: 'Crowd Favorite',
    diet: 'non-veg',
    portion: '6 pieces',
    isPopular: false
  },

  // --- DRINKS ---
  {
    id: 'drink-1',
    name: 'Matcha Latte',
    category: 'drinks',
    categoryLabel: 'Drinks',
    price: 179,
    description: 'Ceremonial grade Uji green tea whisked with silky steamed milk.',
    longDescription: 'Authentic stone-ground green tea from Uji, Kyoto, traditionally whisked and combined with creamy steamed milk and a hint of organic cane sweetener. Served iced or warm.',
    image: 'images/matcha-latte.jpg',
    onlineImage: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&auto=format&fit=crop&q=80',
    badge: 'Kyoto Special',
    diet: 'veg',
    portion: '350 ml',
    isPopular: false
  },
  {
    id: 'drink-2',
    name: 'Japanese Iced Tea',
    category: 'drinks',
    categoryLabel: 'Drinks',
    price: 129,
    description: 'Cold-brewed organic Sencha green tea with fresh mint leaves.',
    longDescription: 'Cold-steeped for 12 hours to bring out sweet vegetal notes without bitterness. Poured over ice blocks with fresh mint sprigs and lemon zest.',
    image: 'images/japanese-iced-tea.jpg',
    onlineImage: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop&q=80',
    badge: 'Refreshing',
    diet: 'veg',
    portion: '400 ml',
    isPopular: false
  },
  {
    id: 'drink-3',
    name: 'Fresh Lemon Soda',
    category: 'drinks',
    categoryLabel: 'Drinks',
    price: 99,
    description: 'Chilled sparkling soda infused with freshly squeezed citrus and mint.',
    longDescription: 'Effervescent club soda mixed with freshly squeezed lemons, a touch of rock salt, mint leaves, and subtle cane syrup. The ultimate palate cleanser.',
    image: 'images/lemon-soda.jpg',
    onlineImage: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80',
    badge: 'Chilled',
    diet: 'veg',
    portion: '400 ml',
    isPopular: false
  },

  // --- DESSERTS ---
  {
    id: 'dessert-1',
    name: 'Mochi Ice Cream',
    category: 'desserts',
    categoryLabel: 'Desserts',
    price: 199,
    description: 'Sweet glutinous rice dough wrapped around rich matcha and mango gelato.',
    longDescription: 'A trio of delicate, soft Japanese pounded rice dough pouches encasing premium artisan ice cream scoops in Matcha, Mango, and Vanilla flavors.',
    image: 'images/mochi-ice-cream.jpg',
    onlineImage: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/05/Mochi_Ice_Cream.jpg/960px-Mochi_Ice_Cream.jpg',
    badge: 'Authentic',
    diet: 'veg',
    portion: '3 pieces',
    isPopular: false
  },
  {
    id: 'dessert-2',
    name: 'Matcha Cheesecake',
    category: 'desserts',
    categoryLabel: 'Desserts',
    price: 229,
    description: 'Velvety Japanese cotton cheesecake layered with Kyoto green tea.',
    longDescription: 'Airy, souffle-style Japanese cheesecake infused with ceremonial green tea, baked gently for a cloud-like melt-in-mouth texture and garnished with powdered sugar.',
    image: 'images/matcha-cheesecake.jpg',
    onlineImage: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/17/Matcha_Cheese_Cake.jpg/960px-Matcha_Cheese_Cake.jpg',
    badge: 'Sweet Delight',
    diet: 'veg',
    portion: '1 slice',
    isPopular: false
  },

  // --- POPULAR SPECIAL / MAINS ---
  {
    id: 'special-1',
    name: 'Chicken Teriyaki',
    category: 'appetizers',
    categoryLabel: 'Mains & Grill',
    price: 349,
    description: 'Grilled tender chicken glazed in house-made sweet teriyaki glaze.',
    longDescription: 'Succulent boneless chicken thigh grilled to perfection, generously glazed with our reduction of soy, mirin, sake, and brown sugar. Served with steamed broccoli and sesame.',
    image: 'images/chicken-teriyaki.jpg',
    onlineImage: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8d/Pollo_teriyaki_de_Sarku_Japan_%28Colombia%29.jpg/960px-Pollo_teriyaki_de_Sarku_Japan_%28Colombia%29.jpg',
    badge: 'Popular Pick',
    diet: 'non-veg',
    portion: '1 serving',
    isPopular: true
  }
];

/* ===================================================================
   2. LOCAL STORAGE & CART STATE MANAGEMENT
   =================================================================== */
const CART_STORAGE_KEY = 'sakura_sushi_cart';
const LAST_ORDER_KEY = 'sakura_sushi_last_order';
const FREE_DELIVERY_THRESHOLD = 799;
const STANDARD_DELIVERY_FEE = 40;

/**
 * Retrieves the current cart from browser LocalStorage.
 * @returns {Array} List of cart item objects.
 */
function getCart() {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    console.error('Error reading cart from LocalStorage:', err);
    return [];
  }
}

/**
 * Saves cart array to LocalStorage and updates cart indicators.
 * @param {Array} cart - Array of cart item objects.
 */
function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartBadge();
  } catch (err) {
    console.error('Error saving cart to LocalStorage:', err);
  }
}

/**
 * Adds an item to the shopping cart.
 * If item is already present, increases its quantity.
 * @param {string} itemId - The unique id of the menu item.
 * @param {number} quantity - Quantity to add (default is 1).
 */
function addToCart(itemId, quantity = 1) {
  const item = MENU_ITEMS.find(m => m.id === itemId);
  if (!item) {
    showToast('Item not found', 'error');
    return;
  }

  const cart = getCart();
  const existingIndex = cart.findIndex(c => c.id === itemId);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.categoryLabel,
      onlineImage: item.onlineImage,
      quantity: quantity
    });
  }

  saveCart(cart);
  showToast(`Added ${quantity > 1 ? quantity + 'x ' : ''}"${item.name}" to cart! 🍣`);
}

/**
 * Updates the quantity of an item in the cart.
 * @param {string} itemId - The ID of the item.
 * @param {number} delta - Change in quantity (+1 or -1).
 */
function updateQuantity(itemId, delta) {
  let cart = getCart();
  const item = cart.find(c => c.id === itemId);

  if (!item) return;

  const newQty = item.quantity + delta;
  if (newQty <= 0) {
    removeFromCart(itemId);
    return;
  }

  item.quantity = newQty;
  saveCart(cart);

  // If currently on cart page, re-render cart
  if (document.getElementById('cart-items-container')) {
    renderCartPage();
  }
}

/**
 * Removes an item completely from the cart.
 * @param {string} itemId - The ID of the item to remove.
 */
function removeFromCart(itemId) {
  let cart = getCart();
  const target = cart.find(c => c.id === itemId);
  const name = target ? target.name : 'Item';

  cart = cart.filter(c => c.id !== itemId);
  saveCart(cart);
  showToast(`Removed "${name}" from cart`, 'info');

  if (document.getElementById('cart-items-container')) {
    renderCartPage();
  }
}

/**
 * Clears the entire cart.
 */
function clearCart() {
  if (confirm('Are you sure you want to clear your cart?')) {
    localStorage.removeItem(CART_STORAGE_KEY);
    updateCartBadge();
    if (document.getElementById('cart-items-container')) {
      renderCartPage();
    }
    showToast('Cart cleared', 'info');
  }
}

/**
 * Computes subtotal, delivery fee, and grand total.
 * Delivery Fee Rule: ₹40 standard, FREE if subtotal > ₹799.
 * @returns {Object} { subtotal, deliveryFee, grandTotal, totalCount, isFreeDelivery }
 */
function calculateTotals() {
  const cart = getCart();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  let deliveryFee = 0;
  if (subtotal > 0) {
    deliveryFee = subtotal > FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_DELIVERY_FEE;
  }
  
  const grandTotal = subtotal + deliveryFee;
  const isFreeDelivery = subtotal > FREE_DELIVERY_THRESHOLD;
  const amountNeededForFree = Math.max(0, FREE_DELIVERY_THRESHOLD + 1 - subtotal);

  return {
    subtotal,
    deliveryFee,
    grandTotal,
    totalCount,
    isFreeDelivery,
    amountNeededForFree
  };
}

/**
 * Updates the navbar cart badge count across all pages.
 */
function updateCartBadge() {
  const cart = getCart();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badges = document.querySelectorAll('.cart-badge');
  
  badges.forEach(badge => {
    badge.textContent = totalCount;
    if (totalCount > 0) {
      badge.classList.remove('badge-hidden');
    } else {
      badge.classList.add('badge-hidden');
    }
  });
}

/* ===================================================================
   3. TOAST NOTIFICATION SYSTEM
   =================================================================== */
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast-item toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
    <span class="toast-msg">${message}</span>
  `;

  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => {
    toast.classList.add('toast-visible');
  }, 10);

  // Auto remove after 3.2 seconds
  setTimeout(() => {
    toast.classList.remove('toast-visible');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3200);
}

/* ===================================================================
   4. FOOD DETAILS MODAL
   =================================================================== */
let currentModalItem = null;
let currentModalQuantity = 1;

function setupFoodModal() {
  const modal = document.getElementById('food-modal');
  if (!modal) return;

  const closeBtn = document.getElementById('modal-close-btn');
  const backdrop = document.getElementById('modal-backdrop');
  const minusBtn = document.getElementById('modal-qty-minus');
  const plusBtn = document.getElementById('modal-qty-plus');
  const addBtn = document.getElementById('modal-add-btn');

  if (closeBtn) closeBtn.addEventListener('click', closeFoodModal);
  if (backdrop) backdrop.addEventListener('click', closeFoodModal);

  if (minusBtn) {
    minusBtn.addEventListener('click', () => {
      if (currentModalQuantity > 1) {
        currentModalQuantity--;
        updateModalQuantityDisplay();
      }
    });
  }

  if (plusBtn) {
    plusBtn.addEventListener('click', () => {
      currentModalQuantity++;
      updateModalQuantityDisplay();
    });
  }

  if (addBtn) {
    addBtn.addEventListener('click', () => {
      if (currentModalItem) {
        addToCart(currentModalItem.id, currentModalQuantity);
        closeFoodModal();
      }
    });
  }

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('modal-open')) {
      closeFoodModal();
    }
  });
}

function openFoodModal(itemId) {
  const item = MENU_ITEMS.find(m => m.id === itemId);
  if (!item) return;

  currentModalItem = item;
  currentModalQuantity = 1;

  const modal = document.getElementById('food-modal');
  if (!modal) return;

  const modalImg = document.getElementById('modal-image');
  if (modalImg) {
    modalImg.src = item.image;
    modalImg.alt = item.name;
    modalImg.onerror = function() {
      this.onerror = null;
      this.src = item.onlineImage || 'images/california-roll.jpg';
    };
  }
  document.getElementById('modal-title').textContent = item.name;
  document.getElementById('modal-category').textContent = item.categoryLabel;
  document.getElementById('modal-badge').textContent = item.badge;
  document.getElementById('modal-price').textContent = `₹${item.price}`;
  document.getElementById('modal-portion').textContent = `Portion: ${item.portion}`;
  document.getElementById('modal-desc').textContent = item.longDescription || item.description;

  const dietTag = document.getElementById('modal-diet');
  if (dietTag) {
    dietTag.className = `diet-indicator diet-${item.diet}`;
    dietTag.textContent = item.diet === 'veg' ? 'VEG' : 'NON-VEG';
  }

  updateModalQuantityDisplay();

  modal.classList.add('modal-open');
  document.body.style.overflow = 'hidden'; // prevent scroll
}

function updateModalQuantityDisplay() {
  const qtyEl = document.getElementById('modal-qty-value');
  const priceEl = document.getElementById('modal-total-price');
  if (qtyEl) qtyEl.textContent = currentModalQuantity;
  if (priceEl && currentModalItem) {
    priceEl.textContent = `₹${currentModalItem.price * currentModalQuantity}`;
  }
}

function closeFoodModal() {
  const modal = document.getElementById('food-modal');
  if (!modal) return;
  modal.classList.remove('modal-open');
  document.body.style.overflow = '';
  currentModalItem = null;
  currentModalQuantity = 1;
}

/* ===================================================================
   5. MENU PAGE: RENDERING & CATEGORY FILTERING
   =================================================================== */
function setupMenuPage() {
  const menuContainer = document.getElementById('menu-items-grid');
  if (!menuContainer) return;

  const filterBtns = document.querySelectorAll('.category-filter-btn');
  const searchInput = document.getElementById('menu-search-input');
  const dietFilter = document.getElementById('diet-filter-select');

  let activeCategory = 'all';
  let searchQuery = '';
  let activeDiet = 'all';

  function renderFilteredMenu() {
    let filtered = MENU_ITEMS.filter(item => {
      const matchesCategory = (activeCategory === 'all') || (item.category === activeCategory);
      const matchesDiet = (activeDiet === 'all') || (item.diet === activeDiet);
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesDiet && matchesSearch;
    });

    if (filtered.length === 0) {
      menuContainer.innerHTML = `
        <div class="no-results-box">
          <div class="no-results-icon">🍱</div>
          <h3>No matching dishes found</h3>
          <p>Try searching with another keyword or select a different category.</p>
          <button class="btn btn-secondary" id="reset-filter-btn">Reset Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById('reset-filter-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          activeCategory = 'all';
          searchQuery = '';
          activeDiet = 'all';
          if (searchInput) searchInput.value = '';
          if (dietFilter) dietFilter.value = 'all';
          filterBtns.forEach(b => b.classList.toggle('active', b.dataset.category === 'all'));
          renderFilteredMenu();
        });
      }
      return;
    }

    menuContainer.innerHTML = filtered.map(item => `
      <article class="food-card" data-id="${item.id}">
        <div class="food-card-img-wrapper" onclick="openFoodModal('${item.id}')" title="Click to view details">
          <img src="${item.image}" alt="${item.name}" loading="lazy" class="food-card-img" onerror="this.onerror=null; this.src='${item.onlineImage || 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop&q=80'}'">
          <span class="food-badge">${item.badge}</span>
          <span class="food-diet-tag diet-${item.diet}">${item.diet === 'veg' ? '● Veg' : '▲ Non-Veg'}</span>
        </div>
        <div class="food-card-body">
          <div class="food-card-header">
            <span class="food-category-label">${item.categoryLabel}</span>
            <span class="food-portion-label">${item.portion}</span>
          </div>
          <h3 class="food-card-title" onclick="openFoodModal('${item.id}')">${item.name}</h3>
          <p class="food-card-desc">${item.description}</p>
          <div class="food-card-footer">
            <div class="food-price-wrap">
              <span class="food-price">₹${item.price}</span>
            </div>
            <div class="food-actions">
              <button class="btn-quick-view" onclick="openFoodModal('${item.id}')" title="Quick View" aria-label="Quick View">
                🔍 Details
              </button>
              <button class="btn btn-primary btn-add-cart" onclick="addToCart('${item.id}', 1)">
                + Add
              </button>
            </div>
          </div>
        </div>
      </article>
    `).join('');
  }

  // Category filter button click events
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.category;
      renderFilteredMenu();
    });
  });

  // Search input live filtering
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderFilteredMenu();
    });
  }

  // Diet select filter
  if (dietFilter) {
    dietFilter.addEventListener('change', (e) => {
      activeDiet = e.target.value;
      renderFilteredMenu();
    });
  }

  // Check URL query param (e.g. menu.html?category=ramen)
  const urlParams = new URLSearchParams(window.location.search);
  const paramCategory = urlParams.get('category');
  if (paramCategory) {
    const targetBtn = Array.from(filterBtns).find(b => b.dataset.category === paramCategory);
    if (targetBtn) {
      filterBtns.forEach(b => b.classList.remove('active'));
      targetBtn.classList.add('active');
      activeCategory = paramCategory;
    }
  }

  renderFilteredMenu();
}

/* ===================================================================
   6. HOME PAGE: POPULAR PICKS RENDERING
   =================================================================== */
function setupHomePage() {
  const popularContainer = document.getElementById('popular-picks-grid');
  if (!popularContainer) return;

  // The 4 popular picks specified in prompt:
  // Salmon Sushi Roll, California Roll, Spicy Tuna Roll, Chicken Teriyaki
  const popularIds = ['roll-2', 'roll-1', 'roll-3', 'special-1'];
  const popularItems = MENU_ITEMS.filter(m => popularIds.includes(m.id));

  popularContainer.innerHTML = popularItems.map(item => `
    <article class="food-card popular-card" data-id="${item.id}">
      <div class="food-card-img-wrapper" onclick="openFoodModal('${item.id}')" title="Click to view details">
        <img src="${item.image}" alt="${item.name}" loading="lazy" class="food-card-img" onerror="this.onerror=null; this.src='${item.onlineImage || 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop&q=80'}'">
        <span class="food-badge">${item.badge}</span>
        <span class="food-diet-tag diet-${item.diet}">${item.diet === 'veg' ? '● Veg' : '▲ Non-Veg'}</span>
      </div>
      <div class="food-card-body">
        <div class="food-card-header">
          <span class="food-category-label">${item.categoryLabel}</span>
          <span class="food-portion-label">${item.portion}</span>
        </div>
        <h3 class="food-card-title" onclick="openFoodModal('${item.id}')">${item.name}</h3>
        <p class="food-card-desc">${item.description}</p>
        <div class="food-card-footer">
          <div class="food-price-wrap">
            <span class="food-price">₹${item.price}</span>
          </div>
          <div class="food-actions">
            <button class="btn-quick-view" onclick="openFoodModal('${item.id}')" title="Quick View">
              🔍 Details
            </button>
            <button class="btn btn-primary btn-add-cart" onclick="addToCart('${item.id}', 1)">
              + Add
            </button>
          </div>
        </div>
      </div>
    </article>
  `).join('');
}

/* ===================================================================
   7. CART PAGE RENDERING & DYNAMIC TOTALS
   =================================================================== */
function renderCartPage() {
  const container = document.getElementById('cart-items-container');
  const summaryBox = document.getElementById('cart-summary-box');
  const emptyState = document.getElementById('cart-empty-state');
  const cartContent = document.getElementById('cart-content-wrapper');

  if (!container) return;

  const cart = getCart();

  if (cart.length === 0) {
    if (cartContent) cartContent.style.display = 'none';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (cartContent) cartContent.style.display = 'grid';
  if (emptyState) emptyState.style.display = 'none';

  // Render items table/list
  container.innerHTML = cart.map(item => `
    <div class="cart-item-row" data-id="${item.id}">
      <div class="cart-item-img-box">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.onerror=null; this.src='${item.onlineImage || 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop&q=80'}'">
      </div>
      <div class="cart-item-info">
        <h3 class="cart-item-title">${item.name}</h3>
        <span class="cart-item-category">${item.category}</span>
        <span class="cart-item-unit-price">₹${item.price} each</span>
      </div>
      <div class="cart-item-qty-controls">
        <button class="qty-btn" onclick="updateQuantity('${item.id}', -1)" aria-label="Decrease quantity" title="Decrease">−</button>
        <span class="qty-count">${item.quantity}</span>
        <button class="qty-btn" onclick="updateQuantity('${item.id}', 1)" aria-label="Increase quantity" title="Increase">+</button>
      </div>
      <div class="cart-item-subtotal">
        <span class="item-subtotal-price">₹${item.price * item.quantity}</span>
      </div>
      <div class="cart-item-remove">
        <button class="btn-remove-item" onclick="removeFromCart('${item.id}')" title="Remove item" aria-label="Remove item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        </button>
      </div>
    </div>
  `).join('');

  // Update totals
  const totals = calculateTotals();
  const subtotalEl = document.getElementById('summary-subtotal');
  const deliveryEl = document.getElementById('summary-delivery');
  const grandTotalEl = document.getElementById('summary-grand-total');
  const freeDeliveryBanner = document.getElementById('free-delivery-banner');

  if (subtotalEl) subtotalEl.textContent = `₹${totals.subtotal}`;
  
  if (deliveryEl) {
    if (totals.deliveryFee === 0) {
      deliveryEl.innerHTML = '<span class="free-tag">FREE</span>';
    } else {
      deliveryEl.textContent = `₹${totals.deliveryFee}`;
    }
  }

  if (grandTotalEl) grandTotalEl.textContent = `₹${totals.grandTotal}`;

  if (freeDeliveryBanner) {
    if (totals.isFreeDelivery) {
      freeDeliveryBanner.className = 'delivery-progress-banner qualified';
      freeDeliveryBanner.innerHTML = `
        <span class="banner-icon">🎉</span>
        <div class="banner-text">
          <strong>Congratulations!</strong> You have unlocked <strong>FREE Delivery</strong>!
        </div>
      `;
    } else {
      const percentage = Math.min(100, Math.round((totals.subtotal / FREE_DELIVERY_THRESHOLD) * 100));
      freeDeliveryBanner.className = 'delivery-progress-banner in-progress';
      freeDeliveryBanner.innerHTML = `
        <div class="banner-text">
          Add <strong>₹${totals.amountNeededForFree}</strong> more to get <strong>FREE Delivery</strong>!
        </div>
        <div class="progress-bar-wrap">
          <div class="progress-bar-fill" style="width: ${percentage}%"></div>
        </div>
      `;
    }
  }
}

/* ===================================================================
   8. CHECKOUT PAGE LOGIC & FORM VALIDATION
   =================================================================== */
function setupCheckoutPage() {
  const checkoutForm = document.getElementById('checkout-form');
  const summaryItemsList = document.getElementById('checkout-summary-items');
  const emptyNotice = document.getElementById('checkout-empty-notice');
  const checkoutContainer = document.getElementById('checkout-grid');

  const cart = getCart();

  if (cart.length === 0) {
    if (checkoutContainer) checkoutContainer.style.display = 'none';
    if (emptyNotice) emptyNotice.style.display = 'block';
    return;
  }

  if (checkoutContainer) checkoutContainer.style.display = 'grid';
  if (emptyNotice) emptyNotice.style.display = 'none';

  // Render order mini-summary in checkout sidebar
  const totals = calculateTotals();
  if (summaryItemsList) {
    summaryItemsList.innerHTML = cart.map(item => `
      <div class="checkout-item-mini">
        <span class="mini-name">${item.name} <span class="mini-qty">× ${item.quantity}</span></span>
        <span class="mini-price">₹${item.price * item.quantity}</span>
      </div>
    `).join('');
  }

  const subtotalEl = document.getElementById('checkout-subtotal');
  const deliveryEl = document.getElementById('checkout-delivery');
  const grandTotalEl = document.getElementById('checkout-grand-total');

  if (subtotalEl) subtotalEl.textContent = `₹${totals.subtotal}`;
  if (deliveryEl) {
    deliveryEl.textContent = totals.deliveryFee === 0 ? 'FREE' : `₹${totals.deliveryFee}`;
  }
  if (grandTotalEl) grandTotalEl.textContent = `₹${totals.grandTotal}`;

  // Form Submission
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', handleCheckoutSubmit);
  }
}

/**
 * Validates checkout form fields and processes demo order.
 */
function handleCheckoutSubmit(e) {
  e.preventDefault();

  const cart = getCart();
  if (cart.length === 0) {
    showToast('Your cart is empty. Add items before placing an order.', 'error');
    return;
  }

  // Clear previous errors
  clearFormErrors();

  const fullNameInput = document.getElementById('customer-name');
  const phoneInput = document.getElementById('customer-phone');
  const emailInput = document.getElementById('customer-email');
  const addressInput = document.getElementById('customer-address');
  const cityInput = document.getElementById('customer-city');
  const pincodeInput = document.getElementById('customer-pincode');
  const paymentMethodInput = document.querySelector('input[name="paymentMethod"]:checked');
  const orderNotesInput = document.getElementById('customer-notes');

  let isValid = true;
  let firstErrorField = null;

  // 1. Full Name Validation
  const nameVal = fullNameInput.value.trim();
  if (!nameVal || nameVal.length < 3) {
    setFieldError(fullNameInput, 'Please enter your full name (minimum 3 characters)');
    isValid = false;
    if (!firstErrorField) firstErrorField = fullNameInput;
  }

  // 2. Phone Number Validation (Indian 10-digit format)
  const phoneVal = phoneInput.value.trim().replace(/\D/g, '');
  const indianPhoneRegex = /^[6-9]\d{9}$/;
  if (!indianPhoneRegex.test(phoneVal)) {
    setFieldError(phoneInput, 'Please enter a valid 10-digit Indian phone number (starts with 6, 7, 8, or 9)');
    isValid = false;
    if (!firstErrorField) firstErrorField = phoneInput;
  }

  // 3. Email Validation
  const emailVal = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailVal)) {
    setFieldError(emailInput, 'Please enter a valid email address');
    isValid = false;
    if (!firstErrorField) firstErrorField = emailInput;
  }

  // 4. Address Validation
  const addressVal = addressInput.value.trim();
  if (!addressVal || addressVal.length < 8) {
    setFieldError(addressInput, 'Please enter your complete delivery street address');
    isValid = false;
    if (!firstErrorField) firstErrorField = addressInput;
  }

  // 5. City Validation
  const cityVal = cityInput.value.trim();
  if (!cityVal || cityVal.length < 2) {
    setFieldError(cityInput, 'Please enter your city');
    isValid = false;
    if (!firstErrorField) firstErrorField = cityInput;
  }

  // 6. Pincode Validation (6 Digits)
  const pincodeVal = pincodeInput.value.trim();
  const pincodeRegex = /^\d{6}$/;
  if (!pincodeRegex.test(pincodeVal)) {
    setFieldError(pincodeInput, 'Please enter a valid 6-digit postal pincode');
    isValid = false;
    if (!firstErrorField) firstErrorField = pincodeInput;
  }

  if (!isValid) {
    if (firstErrorField) firstErrorField.focus();
    return;
  }

  // Generate simple demo Order ID (e.g. SS10245)
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  const orderId = `SS${randomNum}`;

  const totals = calculateTotals();
  const paymentMethod = paymentMethodInput ? paymentMethodInput.value : 'Cash on Delivery';

  const orderData = {
    orderId: orderId,
    customerName: nameVal,
    phone: phoneVal,
    email: emailVal,
    address: addressVal,
    city: cityVal,
    pincode: pincodeVal,
    notes: orderNotesInput ? orderNotesInput.value.trim() : '',
    paymentMethod: paymentMethod,
    items: [...cart],
    subtotal: totals.subtotal,
    deliveryFee: totals.deliveryFee,
    grandTotal: totals.grandTotal,
    date: new Date().toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }),
    estimatedTime: '25–35 minutes'
  };

  // Save to LocalStorage
  try {
    localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(orderData));
  } catch (err) {
    console.error('Failed to save order to LocalStorage:', err);
  }

  // Clear current cart
  localStorage.removeItem(CART_STORAGE_KEY);
  updateCartBadge();

  // Redirect to order-success.html
  window.location.href = 'order-success.html';
}

function setFieldError(inputEl, message) {
  inputEl.classList.add('input-error');
  const errorMsgEl = inputEl.parentElement.querySelector('.form-error-msg');
  if (errorMsgEl) {
    errorMsgEl.textContent = message;
    errorMsgEl.style.display = 'block';
  }
}

function clearFormErrors() {
  document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
  document.querySelectorAll('.form-error-msg').forEach(el => {
    el.textContent = '';
    el.style.display = 'none';
  });
}

/* ===================================================================
   9. ORDER SUCCESS PAGE
   =================================================================== */
function setupOrderSuccessPage() {
  const container = document.getElementById('order-success-details');
  const noOrderNotice = document.getElementById('order-not-found');

  if (!container) return;

  let orderData = null;
  try {
    const raw = localStorage.getItem(LAST_ORDER_KEY);
    if (raw) orderData = JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }

  if (!orderData) {
    if (container) container.style.display = 'none';
    if (noOrderNotice) noOrderNotice.style.display = 'block';
    return;
  }

  if (noOrderNotice) noOrderNotice.style.display = 'none';
  container.style.display = 'block';

  // Populate data
  const nameEl = document.getElementById('order-client-name');
  const idEl = document.getElementById('order-display-id');
  const timeEl = document.getElementById('order-prep-time');
  const dateEl = document.getElementById('order-display-date');
  const paymentEl = document.getElementById('order-display-payment');
  const addressEl = document.getElementById('order-display-address');
  const phoneEl = document.getElementById('order-display-phone');
  const itemsContainer = document.getElementById('order-receipt-items');
  const subtotalEl = document.getElementById('receipt-subtotal');
  const deliveryEl = document.getElementById('receipt-delivery');
  const grandTotalEl = document.getElementById('receipt-grand-total');

  if (nameEl) nameEl.textContent = orderData.customerName;
  if (idEl) idEl.textContent = orderData.orderId;
  if (timeEl) timeEl.textContent = orderData.estimatedTime || '25–35 minutes';
  if (dateEl) dateEl.textContent = orderData.date;
  if (paymentEl) paymentEl.textContent = orderData.paymentMethod;
  if (addressEl) addressEl.textContent = `${orderData.address}, ${orderData.city} - ${orderData.pincode}`;
  if (phoneEl) phoneEl.textContent = `+91 ${orderData.phone}`;

  if (itemsContainer && orderData.items) {
    itemsContainer.innerHTML = orderData.items.map(item => `
      <div class="receipt-item-row">
        <span class="receipt-item-name">${item.name} <span class="receipt-item-qty">× ${item.quantity}</span></span>
        <span class="receipt-item-price">₹${item.price * item.quantity}</span>
      </div>
    `).join('');
  }

  if (subtotalEl) subtotalEl.textContent = `₹${orderData.subtotal}`;
  if (deliveryEl) {
    deliveryEl.textContent = orderData.deliveryFee === 0 ? 'FREE' : `₹${orderData.deliveryFee}`;
  }
  if (grandTotalEl) grandTotalEl.textContent = `₹${orderData.grandTotal}`;
}

/* ===================================================================
   10. CONTACT PAGE FORM VALIDATION
   =================================================================== */
function setupContactPage() {
  const contactForm = document.getElementById('contact-form');
  const feedbackBox = document.getElementById('contact-feedback');

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');

    let isValid = true;

    // Clear previous inline errors
    document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
    document.querySelectorAll('.form-error-msg').forEach(el => el.style.display = 'none');

    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      setFieldError(nameInput, 'Please enter your name');
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      setFieldError(emailInput, 'Please enter a valid email address');
      isValid = false;
    }

    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      setFieldError(messageInput, 'Message should be at least 10 characters');
      isValid = false;
    }

    if (!isValid) return;

    // Show simulated success feedback
    if (feedbackBox) {
      feedbackBox.className = 'contact-feedback-box success-active';
      feedbackBox.innerHTML = `
        <div class="feedback-icon">✓</div>
        <div class="feedback-body">
          <h4>Thank you, ${nameInput.value.trim()}!</h4>
          <p>Your message has been successfully received. We will respond to <strong>${emailInput.value.trim()}</strong> shortly.</p>
          <small class="college-demo-tag">ℹ This is a simulated demo submission for our 1st-year college web development project.</small>
        </div>
      `;
      feedbackBox.style.display = 'flex';
      feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    contactForm.reset();
    showToast('Message sent successfully!');
  });
}

/* ===================================================================
   11. MOBILE NAVBAR & GLOBAL NAVIGATION
   =================================================================== */
function setupNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close when clicking any nav link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Active page indicator
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ===================================================================
   12. DOM CONTENT LOADED INITIALIZATION
   =================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  updateCartBadge();
  setupFoodModal();

  // Route-specific setups based on page elements
  if (document.getElementById('popular-picks-grid')) {
    setupHomePage();
  }

  if (document.getElementById('menu-items-grid')) {
    setupMenuPage();
  }

  if (document.getElementById('cart-items-container')) {
    renderCartPage();
  }

  if (document.getElementById('checkout-form')) {
    setupCheckoutPage();
  }

  if (document.getElementById('order-success-details')) {
    setupOrderSuccessPage();
  }

  if (document.getElementById('contact-form')) {
    setupContactPage();
  }
});
