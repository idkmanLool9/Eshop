/* Blockforge — static Roblox model shop */

const PRODUCTS = [
  {
    id: 'low-poly-sword-pack',
    title: 'Low-Poly Sword Pack',
    category: 'Weapons',
    price: 9.99,
    description: '12 unique stylized swords. R6/R15 grip-rigged, MeshParts, < 1.2k tris each.',
    emoji: '⚔️',
    gradient: 'linear-gradient(135deg, #ff7a59, #ff3b81)',
    featured: true,
    new: false
  },
  {
    id: 'modern-city-kit',
    title: 'Modern City Building Kit',
    category: 'Kits',
    price: 24.99,
    description: '60+ modular building parts. Snap-to-grid, baked lighting, customizable materials.',
    emoji: '🏙️',
    gradient: 'linear-gradient(135deg, #00b4ff, #5f6dff)',
    featured: true,
    new: true
  },
  {
    id: 'sci-fi-blaster',
    title: 'Sci-Fi Plasma Blaster',
    category: 'Weapons',
    price: 7.49,
    description: 'Animated plasma blaster with muzzle flash, recoil, and configurable damage.',
    emoji: '🔫',
    gradient: 'linear-gradient(135deg, #00ffa3, #00b4ff)',
    featured: false,
    new: true
  },
  {
    id: 'sports-car-vehicle',
    title: 'Drift Sports Car',
    category: 'Vehicles',
    price: 14.99,
    description: 'Fully scripted A-Chassis drift car with custom interior and headlight lighting.',
    emoji: '🏎️',
    gradient: 'linear-gradient(135deg, #ff3b81, #b14aff)',
    featured: true,
    new: false
  },
  {
    id: 'fantasy-tree-pack',
    title: 'Fantasy Tree Pack',
    category: 'Nature',
    price: 4.99,
    description: '18 stylized trees + bushes + rocks. LOD-ready, perfect for open-world builds.',
    emoji: '🌳',
    gradient: 'linear-gradient(135deg, #5ce65c, #00ffa3)',
    featured: false,
    new: false
  },
  {
    id: 'medieval-castle',
    title: 'Medieval Castle Set',
    category: 'Kits',
    price: 19.99,
    description: 'Modular castle: walls, towers, gates, banners. Optimized for large multiplayer servers.',
    emoji: '🏰',
    gradient: 'linear-gradient(135deg, #8a6fff, #00b4ff)',
    featured: false,
    new: false
  },
  {
    id: 'animated-npc-pack',
    title: 'Animated NPC Pack',
    category: 'Characters',
    price: 12.99,
    description: '8 NPCs with idle, walk, talk and combat animations. Pre-wired dialogue script.',
    emoji: '🧙',
    gradient: 'linear-gradient(135deg, #b14aff, #ff3b81)',
    featured: false,
    new: true
  },
  {
    id: 'tycoon-starter-kit',
    title: 'Tycoon Starter Kit',
    category: 'Scripts',
    price: 29.99,
    description: 'Full tycoon framework — droppers, conveyors, purchase pads, leaderboard, DataStore.',
    emoji: '💸',
    gradient: 'linear-gradient(135deg, #00ffa3, #ffd84a)',
    featured: true,
    new: false
  },
  {
    id: 'horror-mansion',
    title: 'Haunted Mansion',
    category: 'Kits',
    price: 17.49,
    description: 'Three-story haunted mansion, flickering lights, ambient SFX. Spook ready.',
    emoji: '👻',
    gradient: 'linear-gradient(135deg, #5f6dff, #1a1a2e)',
    featured: false,
    new: false
  },
  {
    id: 'racing-track-builder',
    title: 'Racing Track Builder',
    category: 'Kits',
    price: 22.99,
    description: 'Modular track sections, checkpoints, lap-timer script, leaderboard integration.',
    emoji: '🏁',
    gradient: 'linear-gradient(135deg, #ff7a59, #ffd84a)',
    featured: false,
    new: true
  },
  {
    id: 'magic-spell-fx',
    title: 'Magic Spell FX Bundle',
    category: 'Effects',
    price: 8.99,
    description: '20 particle-based spell effects: fire, ice, lightning, heal. Drag-and-drop ready.',
    emoji: '✨',
    gradient: 'linear-gradient(135deg, #b14aff, #00b4ff)',
    featured: false,
    new: false
  },
  {
    id: 'pet-system',
    title: 'Pet System Framework',
    category: 'Scripts',
    price: 19.99,
    description: 'Server-authoritative pet system: hatching, equipping, abilities, save data.',
    emoji: '🐾',
    gradient: 'linear-gradient(135deg, #ff3b81, #ffd84a)',
    featured: true,
    new: false
  }
];

const CURRENCY = '€';

/* ---------- State ---------- */
const state = {
  filter: 'All',
  sort: 'featured',
  search: '',
  cart: loadCart()
};

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem('blockforge:cart') || '{}');
  } catch {
    return {};
  }
}
function saveCart() {
  localStorage.setItem('blockforge:cart', JSON.stringify(state.cart));
}

/* ---------- Rendering ---------- */
const grid = document.getElementById('productGrid');
const filtersEl = document.getElementById('filters');
const emptyEl = document.getElementById('emptyState');

function categories() {
  return ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];
}

function renderFilters() {
  filtersEl.innerHTML = '';
  for (const cat of categories()) {
    const btn = document.createElement('button');
    btn.className = 'chip' + (state.filter === cat ? ' active' : '');
    btn.textContent = cat;
    btn.addEventListener('click', () => {
      state.filter = cat;
      renderFilters();
      renderGrid();
    });
    filtersEl.appendChild(btn);
  }
}

function filteredProducts() {
  let list = PRODUCTS.slice();
  if (state.filter !== 'All') list = list.filter(p => p.category === state.filter);
  if (state.search) {
    const q = state.search.toLowerCase();
    list = list.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }
  switch (state.sort) {
    case 'price-asc': list.sort((a, b) => a.price - b.price); break;
    case 'price-desc': list.sort((a, b) => b.price - a.price); break;
    case 'new': list.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0)); break;
    default: list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }
  return list;
}

function productCard(p) {
  const card = document.createElement('article');
  card.className = 'card';
  card.innerHTML = `
    <div class="card-media" style="background:${p.gradient}">
      ${p.new ? '<span class="badge">New</span>' : p.featured ? '<span class="badge">Featured</span>' : ''}
      <span aria-hidden="true">${p.emoji}</span>
    </div>
    <div class="card-body">
      <span class="card-cat">${p.category}</span>
      <h3 class="card-title">${p.title}</h3>
      <p class="card-desc">${p.description}</p>
      <div class="card-foot">
        <span class="price">${CURRENCY}${p.price.toFixed(2)}</span>
        <button class="add-btn" data-add="${p.id}">Add to cart</button>
      </div>
    </div>
  `;
  return card;
}

function renderGrid() {
  const list = filteredProducts();
  grid.innerHTML = '';
  if (!list.length) {
    emptyEl.hidden = false;
    return;
  }
  emptyEl.hidden = true;
  for (const p of list) grid.appendChild(productCard(p));
}

/* ---------- Cart ---------- */
const cartBtn = document.getElementById('cartBtn');
const cartDrawer = document.getElementById('cartDrawer');
const cartItemsEl = document.getElementById('cartItems');
const cartCountEl = document.getElementById('cartCount');
const cartTotalEl = document.getElementById('cartTotal');

function cartCount() {
  return Object.values(state.cart).reduce((s, n) => s + n, 0);
}
function cartTotal() {
  return Object.entries(state.cart).reduce((s, [id, n]) => {
    const p = PRODUCTS.find(x => x.id === id);
    return p ? s + p.price * n : s;
  }, 0);
}

function renderCart() {
  cartCountEl.textContent = cartCount();
  cartTotalEl.textContent = `${CURRENCY}${cartTotal().toFixed(2)}`;
  cartItemsEl.innerHTML = '';
  const ids = Object.keys(state.cart);
  if (!ids.length) {
    cartItemsEl.innerHTML = '<div class="cart-empty">Your cart is empty.<br/>Browse the catalog to get started.</div>';
    return;
  }
  for (const id of ids) {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) continue;
    const qty = state.cart[id];
    const line = document.createElement('div');
    line.className = 'cart-line';
    line.innerHTML = `
      <div class="thumb" style="background:${p.gradient}">${p.emoji}</div>
      <div class="info">
        <strong>${p.title}</strong>
        <small>${CURRENCY}${p.price.toFixed(2)} each</small>
        <div class="cart-qty">
          <button data-dec="${p.id}" aria-label="Decrease">−</button>
          <span>${qty}</span>
          <button data-inc="${p.id}" aria-label="Increase">+</button>
        </div>
      </div>
      <div>
        <div class="line-price">${CURRENCY}${(p.price * qty).toFixed(2)}</div>
        <button class="remove" data-remove="${p.id}">Remove</button>
      </div>
    `;
    cartItemsEl.appendChild(line);
  }
}

function addToCart(id) {
  state.cart[id] = (state.cart[id] || 0) + 1;
  saveCart();
  renderCart();
  showToast('Added to cart');
}
function decFromCart(id) {
  if (!state.cart[id]) return;
  state.cart[id] -= 1;
  if (state.cart[id] <= 0) delete state.cart[id];
  saveCart();
  renderCart();
}
function removeFromCart(id) {
  delete state.cart[id];
  saveCart();
  renderCart();
}

function openCart() {
  cartDrawer.classList.add('open');
  cartDrawer.setAttribute('aria-hidden', 'false');
}
function closeCart() {
  cartDrawer.classList.remove('open');
  cartDrawer.setAttribute('aria-hidden', 'true');
}

/* ---------- Toast ---------- */
const toastEl = document.getElementById('toast');
let toastTimer;
function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 1800);
}

/* ---------- Event wiring ---------- */
grid.addEventListener('click', e => {
  const t = e.target.closest('[data-add]');
  if (t) addToCart(t.dataset.add);
});
cartItemsEl.addEventListener('click', e => {
  const inc = e.target.closest('[data-inc]');
  const dec = e.target.closest('[data-dec]');
  const rm = e.target.closest('[data-remove]');
  if (inc) addToCart(inc.dataset.inc);
  else if (dec) decFromCart(dec.dataset.dec);
  else if (rm) removeFromCart(rm.dataset.remove);
});
cartBtn.addEventListener('click', openCart);
document.querySelectorAll('[data-close-cart]').forEach(el =>
  el.addEventListener('click', closeCart)
);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeCart();
});

document.getElementById('searchInput').addEventListener('input', e => {
  state.search = e.target.value.trim();
  renderGrid();
});
document.getElementById('sortSelect').addEventListener('change', e => {
  state.sort = e.target.value;
  renderGrid();
});

document.getElementById('checkoutBtn').addEventListener('click', () => {
  if (!cartCount()) {
    showToast('Cart is empty');
    return;
  }
  const summary = Object.entries(state.cart)
    .map(([id, n]) => {
      const p = PRODUCTS.find(x => x.id === id);
      return `• ${p.title} × ${n}`;
    })
    .join('\n');
  alert(
    `Demo checkout\n\n${summary}\n\nTotal: ${CURRENCY}${cartTotal().toFixed(2)}\n\n` +
    `Wire this to Stripe, Gumroad or your payment provider of choice.`
  );
});

/* ---------- Init ---------- */
document.getElementById('statCount').textContent = PRODUCTS.length;
document.getElementById('year').textContent = new Date().getFullYear();
renderFilters();
renderGrid();
renderCart();
