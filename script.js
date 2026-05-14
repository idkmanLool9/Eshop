/* Blockforge — static Roblox model shop */

const PRODUCTS = [
  {
    id: 'departure-board',
    title: 'Airport Departure Board',
    category: 'Showcase',
    price: 39.99,
    originalPrice: 59.99,
    description: 'Multi-screen airport departure / arrivals board with admin panels and !boards chat command.',
    emoji: '🛫',
    bg: 'linear-gradient(135deg, #1a0e26 0%, #2a0742 60%, #15081f 100%)',
    featured: true,
    new: true,
    details: {
      tagline: 'A complete airport flight display system for your Roblox build.',
      features: [
        'Multi-screen wraparound display with realistic flight rotation',
        'Admin panel: per-flight editor (time, gate, terminal, aircraft, status)',
        'Bulk actions: regenerate board, clear all, auto-generation toggle',
        'Switch between Departures and Arrivals at any time',
        '16+ airport brand presets (AMS, CDG, DXB, FRA, HND, HKG, DOH…)',
        'Permissions tab to manage who can edit the board',
        'In-game console for debugging and live commands',
        'Chat command !boards opens the admin panel instantly'
      ]
    }
  },
  {
    id: 'low-poly-sword-pack',
    title: 'Low-Poly Sword Pack',
    category: 'Weapons',
    price: 9.99,
    description: '12 stylized swords. R6/R15 rigged, under 1.2k tris each.',
    emoji: '⚔️',
    bg: 'linear-gradient(135deg, #1f1614 0%, #2a1d1a 60%, #1a1311 100%)',
    featured: true
  },
  {
    id: 'modern-city-kit',
    title: 'Modern City Kit',
    category: 'Kits',
    price: 24.99,
    description: '60+ modular building parts with snap-to-grid alignment.',
    emoji: '🏙️',
    bg: 'linear-gradient(135deg, #14181f 0%, #1c2330 60%, #131820 100%)',
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
    bg: 'linear-gradient(135deg, #141a1a 0%, #1d2828 60%, #121818 100%)',
    new: true
  },
  {
    id: 'sports-car-vehicle',
    title: 'Drift Sports Car',
    category: 'Vehicles',
    price: 14.99,
    description: 'A-Chassis drift car with interior, lights and exhaust FX.',
    emoji: '🏎️',
    bg: 'linear-gradient(135deg, #1a1418 0%, #261a22 60%, #161013 100%)',
    featured: true
  },
  {
    id: 'fantasy-tree-pack',
    title: 'Fantasy Trees',
    category: 'Nature',
    price: 4.99,
    description: '18 stylized trees, bushes and rocks. LOD-ready.',
    emoji: '🌳',
    bg: 'linear-gradient(135deg, #14191a 0%, #1c2422 60%, #121615 100%)'
  },
  {
    id: 'medieval-castle',
    title: 'Medieval Castle Set',
    category: 'Kits',
    price: 19.99,
    description: 'Modular castle: walls, towers, gates and banners.',
    emoji: '🏰',
    bg: 'linear-gradient(135deg, #18181f 0%, #22222e 60%, #14141a 100%)'
  },
  {
    id: 'animated-npc-pack',
    title: 'Animated NPC Pack',
    category: 'Characters',
    price: 12.99,
    description: '8 NPCs with idle, walk and combat animations + dialogue.',
    emoji: '🧙',
    bg: 'linear-gradient(135deg, #1a161e 0%, #251f2c 60%, #15121a 100%)',
    new: true
  },
  {
    id: 'tycoon-starter-kit',
    title: 'Tycoon Starter Kit',
    category: 'Scripts',
    price: 29.99,
    description: 'Full tycoon framework. Droppers, pads, leaderboard, DataStore.',
    emoji: '💸',
    bg: 'linear-gradient(135deg, #1c1a14 0%, #28241a 60%, #181610 100%)',
    featured: true
  },
  {
    id: 'horror-mansion',
    title: 'Haunted Mansion',
    category: 'Kits',
    price: 17.49,
    description: 'Three-story horror build with flickering lights and SFX.',
    emoji: '👻',
    bg: 'linear-gradient(135deg, #131318 0%, #1a1a22 60%, #0e0e12 100%)'
  },
  {
    id: 'racing-track-builder',
    title: 'Racing Track Builder',
    category: 'Kits',
    price: 22.99,
    description: 'Modular sections, checkpoints and lap-timer script.',
    emoji: '🏁',
    bg: 'linear-gradient(135deg, #1a1714 0%, #24201a 60%, #161310 100%)',
    new: true
  },
  {
    id: 'magic-spell-fx',
    title: 'Magic Spell FX',
    category: 'Effects',
    price: 8.99,
    description: '20 particle effects: fire, ice, lightning, heal and more.',
    emoji: '✨',
    bg: 'linear-gradient(135deg, #15151e 0%, #1f1d2c 60%, #11111a 100%)'
  },
  {
    id: 'pet-system',
    title: 'Pet System Framework',
    category: 'Scripts',
    price: 19.99,
    description: 'Server-authoritative pets: hatching, equipping, abilities.',
    emoji: '🐾',
    bg: 'linear-gradient(135deg, #1c1714 0%, #28201a 60%, #181310 100%)',
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
    btn.type = 'button';
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
  card.dataset.product = p.id;
  const badge = p.new
    ? '<span class="badge">New</span>'
    : p.featured
      ? '<span class="badge">Featured</span>'
      : '';
  card.innerHTML = `
    <div class="card-media" style="--media-bg:${p.bg}">
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
      <button class="add-btn" type="button" data-add="${p.id}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5v14"/></svg>
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
  cartCountEl.dataset.empty = count === 0 ? 'true' : 'false';
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
      <div class="thumb" style="background:${p.bg}">${p.emoji}</div>
      <div class="info">
        <strong>${p.title}</strong>
        <small>${CURRENCY}${p.price.toFixed(2)}</small>
        <div class="qty">
          <button type="button" data-dec="${p.id}" aria-label="Decrease">−</button>
          <span>${qty}</span>
          <button type="button" data-inc="${p.id}" aria-label="Increase">+</button>
        </div>
      </div>
      <div class="line-end">
        <div class="line-price">${CURRENCY}${(p.price * qty).toFixed(2)}</div>
        <button type="button" class="remove" data-remove="${p.id}">Remove</button>
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
    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg> Added';
    setTimeout(() => {
      btn.classList.remove('added');
      btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5v14"/></svg> Add to cart';
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

/* ---------- Product detail modal ---------- */
const productModal = document.getElementById('productModal');
const productModalBody = document.getElementById('productModalBody');

const BOARD_FLIGHTS = [
  ['19:35', 'MH 9148', 'SINGAPORE', 'A21', 'FINAL', 's-final'],
  ['19:39', 'SK 2852', 'CAIRO', 'D18', 'FINAL', 's-final'],
  ['19:45', 'IB 1151', 'LHR', 'A2', 'BOARDING', 's-board'],
  ['19:45', 'FR 2037', 'BANGKOK', 'A24', 'BOARDING', 's-board'],
  ['19:46', 'AI 2074', 'STOCKHOLM', 'A36', 'BOARDING', 's-board'],
  ['19:52', 'OS 6439', 'NRT', 'B34', 'BOARDING', 's-board'],
  ['19:57', 'VS 4673', 'TEL AVIV', 'B31', 'TO GATE', 's-gate'],
  ['20:04', 'TG 1451', 'PRAGUE', 'A16', 'TO GATE', 's-gate'],
  ['20:28', 'EK 9146', 'MIAMI', 'A1', 'DELAYED', 's-delayed'],
  ['20:55', 'OZ 7233', 'BOGOTÁ', 'B40', 'ON TIME', 's-ontime'],
];

function boardMarkup() {
  const rows = BOARD_FLIGHTS.map(([t, f, d, g, s, c]) =>
    `<div class="board-row"><span class="t">${t}</span><span>${f}</span><span>${d}</span><span>${g}</span><span class="s ${c}">${s}</span></div>`
  ).join('');
  return `
    <div class="board">
      <div class="board-header">
        <div class="board-meta">
          <span class="airport-code">CHANGI</span>
          <span class="terminal">TERMINAL 3</span>
        </div>
        <div class="board-title">DEPARTURES</div>
        <div class="board-clock"><span id="boardClock">--:--</span></div>
      </div>
      <div class="board-body">
        <div class="board-row board-row-head">
          <span>TIME</span><span>FLIGHT</span><span>DESTINATION</span><span>GATE</span><span>STATUS</span>
        </div>
        ${rows}
      </div>
    </div>
  `;
}

function tickBoardClock() {
  const el = document.getElementById('boardClock');
  if (!el) return;
  const d = new Date();
  el.textContent = `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}
let clockInterval;

function openProduct(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;

  const features = p.details?.features?.map(f =>
    `<li><span class="dot-i"></span> ${f}</li>`
  ).join('') || '';
  const tagline = p.details?.tagline || p.description;
  const wasPrice = p.originalPrice
    ? `<span class="price-was">${CURRENCY}${p.originalPrice.toFixed(2)}</span>`
    : '';
  const badge = p.new
    ? '<span class="pm-badge">New</span>'
    : p.featured
      ? '<span class="pm-badge">Featured</span>'
      : '';

  const previewContent = p.id === 'departure-board'
    ? boardMarkup()
    : `<span class="pm-emoji" aria-hidden="true">${p.emoji}</span>`;

  productModalBody.innerHTML = `
    <button class="icon-btn modal-close" type="button" data-close-modal aria-label="Close">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
    </button>
    <div class="pm">
      <div class="pm-preview" style="--media-bg:${p.bg}">
        ${previewContent}
      </div>
      <div class="pm-info">
        <div class="pm-badge-row">
          <span class="pm-cat">${p.category}</span>
          ${badge}
        </div>
        <h2 id="productModalTitle">${p.title}</h2>
        <p class="pm-tagline">${tagline}</p>
        ${features ? `<p class="pm-section-title">What's included</p><ul class="feature-list">${features}</ul>` : ''}
        <div class="pm-foot">
          <div class="pm-price">
            <span class="price-now">${CURRENCY}${p.price.toFixed(2)}</span>
            ${wasPrice}
          </div>
          <button class="btn btn-primary" type="button" data-add="${p.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5v14"/></svg>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  `;

  if (typeof productModal.showModal === 'function') productModal.showModal();

  if (p.id === 'departure-board') {
    tickBoardClock();
    clearInterval(clockInterval);
    clockInterval = setInterval(tickBoardClock, 30000);
  }
}

productModal.addEventListener('close', () => clearInterval(clockInterval));
productModal.addEventListener('click', e => {
  if (e.target === productModal) productModal.close();
  const close = e.target.closest('[data-close-modal]');
  if (close) productModal.close();
  const add = e.target.closest('[data-add]');
  if (add) {
    addToCart(add.dataset.add);
    productModal.close();
  }
});

/* ---------- Events ---------- */
grid.addEventListener('click', e => {
  const addBtn = e.target.closest('[data-add]');
  if (addBtn) {
    e.stopPropagation();
    addToCart(addBtn.dataset.add, addBtn);
    return;
  }
  const card = e.target.closest('[data-product]');
  if (card) openProduct(card.dataset.product);
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
