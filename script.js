/* Blockforge — static Roblox model shop */

const PRODUCTS = [
  {
    id: 'low-poly-sword-pack',
    title: 'Low-Poly Sword Pack',
    category: 'Weapons',
    price: 9.99,
    description: '12 stylized swords. R6/R15 rigged, under 1.2k tris each.',
    emoji: '⚔️',
    gradient: 'linear-gradient(135deg, #1a0f0f 0%, #3d1818 50%, #6b1f1f 100%)',
    featured: true
  },
  {
    id: 'modern-city-kit',
    title: 'Modern City Kit',
    category: 'Kits',
    price: 24.99,
    description: '60+ modular building parts with snap-to-grid alignment.',
    emoji: '🏙️',
    gradient: 'linear-gradient(135deg, #0a1428 0%, #1a3a5c 50%, #2d6396 100%)',
    featured: true,
    new: true
  },
  {
    id: 'sci-fi-blaster',
    title: 'Plasma Blaster',
    category: 'Weapons',
    price: 7.49,
    description: 'Animated blaster with muzzle flash, recoil and damage script.',
    emoji: '🔫',
    gradient: 'linear-gradient(135deg, #001a14 0%, #00382c 50%, #00604c 100%)',
    new: true
  },
  {
    id: 'sports-car-vehicle',
    title: 'Drift Sports Car',
    category: 'Vehicles',
    price: 14.99,
    description: 'A-Chassis drift car with interior, lights and exhaust FX.',
    emoji: '🏎️',
    gradient: 'linear-gradient(135deg, #1f0a14 0%, #4a1f3a 50%, #7e2e60 100%)',
    featured: true
  },
  {
    id: 'fantasy-tree-pack',
    title: 'Fantasy Trees',
    category: 'Nature',
    price: 4.99,
    description: '18 stylized trees, bushes and rocks. LOD-ready.',
    emoji: '🌳',
    gradient: 'linear-gradient(135deg, #0a1f14 0%, #1a4a2e 50%, #2e7a4a 100%)'
  },
  {
    id: 'medieval-castle',
    title: 'Medieval Castle Set',
    category: 'Kits',
    price: 19.99,
    description: 'Modular castle: walls, towers, gates and banners.',
    emoji: '🏰',
    gradient: 'linear-gradient(135deg, #14142e 0%, #2e2e5c 50%, #4a4a96 100%)'
  },
  {
    id: 'animated-npc-pack',
    title: 'Animated NPC Pack',
    category: 'Characters',
    price: 12.99,
    description: '8 NPCs with idle, walk and combat animations + dialogue.',
    emoji: '🧙',
    gradient: 'linear-gradient(135deg, #1f1428 0%, #4a2e60 50%, #7a4a96 100%)',
    new: true
  },
  {
    id: 'tycoon-starter-kit',
    title: 'Tycoon Starter Kit',
    category: 'Scripts',
    price: 29.99,
    description: 'Full tycoon framework. Droppers, pads, leaderboard, DataStore.',
    emoji: '💸',
    gradient: 'linear-gradient(135deg, #1f1a0a 0%, #4a3e1a 50%, #96802e 100%)',
    featured: true
  },
  {
    id: 'horror-mansion',
    title: 'Haunted Mansion',
    category: 'Kits',
    price: 17.49,
    description: 'Three-story horror build with flickering lights and SFX.',
    emoji: '👻',
    gradient: 'linear-gradient(135deg, #14142e 0%, #1a1a3d 50%, #0a0a14 100%)'
  },
  {
    id: 'racing-track-builder',
    title: 'Racing Track Builder',
    category: 'Kits',
    price: 22.99,
    description: 'Modular sections, checkpoints and lap-timer script.',
    emoji: '🏁',
    gradient: 'linear-gradient(135deg, #281f0a 0%, #604a1a 50%, #96732e 100%)',
    new: true
  },
  {
    id: 'magic-spell-fx',
    title: 'Magic Spell FX',
    category: 'Effects',
    price: 8.99,
    description: '20 particle effects: fire, ice, lightning, heal and more.',
    emoji: '✨',
    gradient: 'linear-gradient(135deg, #1f0a28 0%, #4a1f5c 50%, #2e3a96 100%)'
  },
  {
    id: 'pet-system',
    title: 'Pet System Framework',
    category: 'Scripts',
    price: 19.99,
    description: 'Server-authoritative pets: hatching, equipping, abilities.',
    emoji: '🐾',
    gradient: 'linear-gradient(135deg, #28140a 0%, #5c2e1f 50%, #96522e 100%)',
    featured: true
  }
];

const CURRENCY = '€';

const state = {
  filter: 'All',
  sort: 'featured',
  search: '',
  cart: loadCart()
};

function loadCart() {
  try { return JSON.parse(localStorage.getItem('blockforge:cart') || '{}'); }
  catch { return {}; }
}
function saveCart() {
  localStorage.setItem('blockforge:cart', JSON.stringify(state.cart));
}

/* ---------- Elements ---------- */
const grid = document.getElementById('productGrid');
const filtersEl = document.getElementById('filters');
const emptyEl = document.getElementById('emptyState');
const cartBtn = document.getElementById('cartBtn');
const cartDrawer = document.getElementById('cartDrawer');
const cartItemsEl = document.getElementById('cartItems');
const cartCountEl = document.getElementById('cartCount');
const cartCountInline = document.getElementById('cartCountInline');
const cartTotalEl = document.getElementById('cartTotal');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');

/* ---------- Filters ---------- */
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

/* ---------- Products ---------- */
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
  const badge = p.new
    ? '<span class="badge new">New</span>'
    : p.featured
      ? '<span class="badge">Featured</span>'
      : '';
  card.innerHTML = `
    <div class="card-media" style="background:${p.gradient}">
      ${badge}
      <span class="emoji" aria-hidden="true">${p.emoji}</span>
    </div>
    <div class="card-body">
      <span class="card-cat">${p.category}</span>
      <div class="card-row">
        <h3 class="card-title">${p.title}</h3>
        <span class="card-price">${CURRENCY}${p.price.toFixed(2)}</span>
      </div>
      <p class="card-desc">${p.description}</p>
      <button class="add-btn" data-add="${p.id}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5v14"/></svg>
        Add to cart
      </button>
    </div>
  `;
  return card;
}

function renderGrid() {
  const list = filteredProducts();
  grid.innerHTML = '';
  if (!list.length) { emptyEl.hidden = false; return; }
  emptyEl.hidden = true;
  for (const p of list) grid.appendChild(productCard(p));
}

/* ---------- Cart ---------- */
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
  const count = cartCount();
  cartCountEl.textContent = count;
  cartCountInline.textContent = count ? `· ${count} item${count === 1 ? '' : 's'}` : '';
  cartTotalEl.textContent = `${CURRENCY}${cartTotal().toFixed(2)}`;
  cartItemsEl.innerHTML = '';
  const ids = Object.keys(state.cart);
  if (!ids.length) {
    cartItemsEl.innerHTML = '<div class="cart-empty">Your cart is empty.</div>';
    return;
  }
  for (const id of ids) {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) continue;
    const qty = state.cart[id];
    const line = document.createElement('div');
    line.className = 'line';
    line.innerHTML = `
      <div class="thumb" style="background:${p.gradient}">${p.emoji}</div>
      <div class="info">
        <strong>${p.title}</strong>
        <small>${CURRENCY}${p.price.toFixed(2)}</small>
        <div class="qty">
          <button data-dec="${p.id}" aria-label="Decrease">−</button>
          <span>${qty}</span>
          <button data-inc="${p.id}" aria-label="Increase">+</button>
        </div>
      </div>
      <div class="line-end">
        <div class="line-price">${CURRENCY}${(p.price * qty).toFixed(2)}</div>
        <button class="remove" data-remove="${p.id}">Remove</button>
      </div>
    `;
    cartItemsEl.appendChild(line);
  }
}

function addToCart(id, btn) {
  state.cart[id] = (state.cart[id] || 0) + 1;
  saveCart();
  renderCart();
  if (btn) {
    btn.classList.add('added');
    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> Added';
    setTimeout(() => {
      btn.classList.remove('added');
      btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5v14"/></svg> Add to cart';
    }, 1100);
  } else {
    showToast('Added to cart');
  }
}
function decFromCart(id) {
  if (!state.cart[id]) return;
  state.cart[id] -= 1;
  if (state.cart[id] <= 0) delete state.cart[id];
  saveCart(); renderCart();
}
function removeFromCart(id) {
  delete state.cart[id];
  saveCart(); renderCart();
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
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 1600);
}

/* ---------- Events ---------- */
grid.addEventListener('click', e => {
  const t = e.target.closest('[data-add]');
  if (t) {
    e.stopPropagation();
    addToCart(t.dataset.add, t);
  }
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

searchInput.addEventListener('input', e => {
  state.search = e.target.value.trim();
  renderGrid();
});
sortSelect.addEventListener('change', e => {
  state.sort = e.target.value;
  renderGrid();
});

document.getElementById('checkoutBtn').addEventListener('click', () => {
  if (!cartCount()) { showToast('Cart is empty'); return; }
  const summary = Object.entries(state.cart)
    .map(([id, n]) => {
      const p = PRODUCTS.find(x => x.id === id);
      return `• ${p.title} × ${n}`;
    }).join('\n');
  alert(
    `Demo checkout\n\n${summary}\n\nTotal: ${CURRENCY}${cartTotal().toFixed(2)}\n\nWire to Stripe / Gumroad to take real payments.`
  );
});

const licenseModal = document.getElementById('licenseModal');
document.getElementById('licenseLink').addEventListener('click', e => {
  e.preventDefault();
  if (typeof licenseModal.showModal === 'function') licenseModal.showModal();
});
document.getElementById('licenseClose').addEventListener('click', () => licenseModal.close());

/* ⌘K / Ctrl+K focuses search; Esc closes cart */
document.addEventListener('keydown', e => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    searchInput.focus();
    searchInput.select();
  } else if (e.key === 'Escape') {
    closeCart();
  }
});

/* ---------- Init ---------- */
document.getElementById('statCount').textContent = PRODUCTS.length;
document.getElementById('year').textContent = new Date().getFullYear();
renderFilters();
renderGrid();
renderCart();
