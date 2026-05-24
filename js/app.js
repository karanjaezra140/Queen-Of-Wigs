/* ═══════════════════════════════════════
   QUEEN OF WIGS — App JS v3
   Header · Footer · Cart · Payments · Admin
═══════════════════════════════════════ */

const SOCIAL_LINKS = {
  whatsapp:  'https://wa.me/254713248937',
  facebook:  'https://facebook.com/ezrakingofwigs',
  tiktok:    'https://www.tiktok.com/@queen_of_wigs',
  instagram: 'https://www.instagram.com/queen_ofwigs/',
  youtube:   'https://www.youtube.com/@queen_of_wigs'
};

const CONTACT = {
  phone:    '+254 713 248 937',
  phoneRaw: '+254713248937',
  whatsapp: '254713248937',
  email:    'karanjaezra140@gmail.com',
  location: 'Naivasha, Kenya'
};

/* ── Active nav ── */
function getActivePage() { return window.location.pathname.split('/').pop() || 'index.html'; }
function navLink(href, label, extra = '') {
  const active = getActivePage() === href ? 'class="active"' : '';
  return `<a href="${href}" ${active} ${extra}>${label}</a>`;
}

/* ═══════════════════════════════════════
   HEADER
═══════════════════════════════════════ */
function renderHeader() {
  const cart = getCart();
  const n = cart.length;

  document.body.insertAdjacentHTML('afterbegin', `
  <div class="mobile-nav" id="mobileNav">
    ${navLink('index.html','Home')}
    ${navLink('wig.html','Our Wigs')}
    ${navLink('about.html','About')}
    ${navLink('contact.html','Contact')}
    <a href="cart.html" class="mobile-cart">🛒 View Cart (${n})</a>
  </div>

  <header id="site-header">
    <div class="nav-inner">
      <a href="index.html" class="nav-brand">
        <img src="images/Queenlogo.jpeg" alt="Queen of Wigs Logo">
        <div class="nav-brand-text">
          Queen of Wigs
          <span>Naivasha · Kenya</span>
        </div>
      </a>
      <nav>
        ${navLink('index.html','Home')}
        ${navLink('wig.html','Our Wigs')}
        ${navLink('about.html','About')}
        ${navLink('contact.html','Contact')}
        <a href="cart.html" class="nav-cart-btn">
          🛒 Cart
          <span class="cart-badge" style="display:${n>0?'flex':'none'}">${n}</span>
        </a>
      </nav>
      <button class="hamburger" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>
  `);

  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    const open  = mobileNav.classList.contains('open');
    spans[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
    spans[1].style.opacity   = open ? '0' : '';
    spans[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
  });
  mobileNav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => mobileNav.classList.remove('open'))
  );
  window.addEventListener('scroll', () => {
    document.querySelector('header').classList.toggle('scrolled', window.scrollY > 20);
  });
}

/* ═══════════════════════════════════════
   FOOTER
═══════════════════════════════════════ */
function socialIconsHTML(style = '') {
  return `
  <div class="social-icons" ${style ? `style="${style}"` : ''}>
    <a href="${SOCIAL_LINKS.whatsapp}"  target="_blank" aria-label="WhatsApp"><img src="images/whatsapp.png"  alt="WhatsApp"></a>
    <a href="${SOCIAL_LINKS.facebook}"  target="_blank" aria-label="Facebook"><img src="images/facebook.png"  alt="Facebook"></a>
    <a href="${SOCIAL_LINKS.tiktok}"    target="_blank" aria-label="TikTok"><img src="images/tiktok.png"    alt="TikTok"></a>
    <a href="${SOCIAL_LINKS.instagram}" target="_blank" aria-label="Instagram"><img src="images/instagram.png" alt="Instagram"></a>
    <a href="${SOCIAL_LINKS.youtube}"   target="_blank" aria-label="YouTube" class="yt-icon">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/></svg>
    </a>
  </div>`;
}

function renderFooter() {
  document.body.insertAdjacentHTML('beforeend', `
  <footer>
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="images/Queenlogo.jpeg" alt="Queen of Wigs">
          <div class="footer-brand-name">Queen of Wigs</div>
          <p>Premium wigs for women who value confidence, quality, and style. Proudly based in ${CONTACT.location}.</p>
          ${socialIconsHTML('margin-top:22px')}
        </div>
        <div class="footer-col">
          <h4>Navigate</h4>
          <a href="index.html">Home</a>
          <a href="wig.html">Our Wigs</a>
          <a href="about.html">About Us</a>
          <a href="contact.html">Contact</a>
          <a href="cart.html">Cart</a>
        </div>
        <div class="footer-col">
          <h4>Contact Us</h4>
          <a href="tel:${CONTACT.phoneRaw}">${CONTACT.phone}</a>
          <a href="mailto:${CONTACT.email}">${CONTACT.email}</a>
          <a href="${SOCIAL_LINKS.whatsapp}" target="_blank">WhatsApp Us</a>
          <span>${CONTACT.location}</span>
        </div>
        <div class="footer-col">
          <h4>Watch Us</h4>
          <a href="${SOCIAL_LINKS.youtube}" target="_blank" class="yt-footer-link">
            <svg viewBox="0 0 24 24" width="16" height="16"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/></svg>
            YouTube Channel
          </a>
          <a href="${SOCIAL_LINKS.tiktok}" target="_blank">TikTok</a>
          <a href="${SOCIAL_LINKS.instagram}" target="_blank">Instagram</a>
          <a href="${SOCIAL_LINKS.facebook}" target="_blank">Facebook</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 Queen of Wigs. All rights reserved. Made with 💖 in Naivasha, Kenya.</span>
        <a href="admin.html" style="color:rgba(255,255,255,0.1);font-size:11px;">Admin</a>
      </div>
    </div>
  </footer>
  <div id="qow-toast"></div>
  `);
}

/* ═══════════════════════════════════════
   CART
═══════════════════════════════════════ */
function getCart()      { return JSON.parse(localStorage.getItem('qow_cart') || '[]'); }
function saveCart(c)    { localStorage.setItem('qow_cart', JSON.stringify(c)); updateCartBadge(); }
function clearCart()    { localStorage.removeItem('qow_cart'); updateCartBadge(); }

function updateCartBadge() {
  const badge = document.querySelector('.cart-badge');
  if (!badge) return;
  const n = getCart().length;
  badge.textContent = n;
  badge.style.display = n > 0 ? 'flex' : 'none';
}

function addToCart(name, price) {
  const cart = getCart();
  cart.push({ id: Date.now(), name, price: Number(price) });
  saveCart(cart);
  showToast(`✨ ${name} added to cart!`);
}

function removeFromCart(id) {
  saveCart(getCart().filter(i => i.id !== id));
  displayCart();
}

/* ═══════════════════════════════════════
   TOAST
═══════════════════════════════════════ */
function showToast(msg) {
  let toast = document.getElementById('qow-toast');
  if (!toast) { toast = document.createElement('div'); toast.id = 'qow-toast'; document.body.appendChild(toast); }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ═══════════════════════════════════════
   CART PAGE
═══════════════════════════════════════ */
function displayCart() {
  const itemsEl    = document.getElementById('cart-items');
  const emptyEl    = document.getElementById('cart-empty');
  const totalEl    = document.getElementById('cart-total');
  const countEl    = document.getElementById('cart-item-count');
  const delivEl    = document.getElementById('delivery-row');
  const checkoutBtn= document.getElementById('checkout-btn');
  if (!itemsEl) return;

  const cart = getCart();
  itemsEl.innerHTML = '';

  if (!cart.length) {
    emptyEl    && (emptyEl.style.display = 'block');
    itemsEl.style.display = 'none';
    totalEl    && (totalEl.textContent = 'KSh 0');
    countEl    && (countEl.textContent = '0 items');
    delivEl    && (delivEl.style.display = 'none');
    checkoutBtn && (checkoutBtn.disabled = true);
    return;
  }

  emptyEl    && (emptyEl.style.display = 'none');
  itemsEl.style.display = 'block';
  checkoutBtn && (checkoutBtn.disabled = false);

  let sub = 0;
  cart.forEach(item => {
    sub += item.price;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div style="flex:1">
        <div class="cart-item-name">${item.name}</div>
        <div style="font-size:12px;color:var(--muted);margin-top:3px;">1 item</div>
      </div>
      <div class="cart-item-price">KSh ${item.price.toLocaleString()}</div>
      <button class="cart-remove" onclick="removeFromCart(${item.id})" title="Remove">×</button>
    `;
    itemsEl.appendChild(div);
  });

  countEl  && (countEl.textContent = `${cart.length} item${cart.length>1?'s':''}`);
  delivEl  && (delivEl.style.display = 'flex');
  const ds = document.getElementById('delivery-cost');
  ds       && (ds.textContent = 'KSh 200');
  totalEl  && (totalEl.textContent = `KSh ${(sub+200).toLocaleString()}`);
}

/* ═══════════════════════════════════════
   CHECKOUT / PAYMENT
═══════════════════════════════════════ */
let countdownTimer;

function getOrderTotal() {
  const cart = getCart();
  const sub  = cart.reduce((t,i) => t + i.price, 0);
  return { subtotal: sub, total: sub + 200 };
}

function populateCheckoutSummary() {
  const cart = getCart();
  const el   = document.getElementById('summary-items');
  if (!el) return;
  const { subtotal, total } = getOrderTotal();

  el.innerHTML = cart.length
    ? cart.map(i => `
        <div class="summary-item">
          <span class="summary-item-name">${i.name}</span>
          <span class="summary-item-price">KSh ${i.price.toLocaleString()}</span>
        </div>`).join('')
    : '<p style="color:var(--muted);font-size:14px;padding:10px 0;">Cart is empty. <a href="wig.html">Browse wigs →</a></p>';

  const subEl = document.getElementById('summary-subtotal');
  const totEl = document.getElementById('summary-total');
  if (subEl) subEl.textContent = `KSh ${subtotal.toLocaleString()}`;
  if (totEl) totEl.textContent = `KSh ${total.toLocaleString()}`;
}

function validateCheckoutForm() {
  const name    = (document.getElementById('cust-name')   || {}).value?.trim();
  const address = (document.getElementById('cust-address') || {}).value?.trim();
  const phone   = (document.getElementById('mpesa-phone') || {}).value?.trim();
  if (!name)    { showToast('⚠️ Please enter your full name'); document.getElementById('cust-name').focus(); return false; }
  if (!address) { showToast('⚠️ Please enter your delivery address'); document.getElementById('cust-address').focus(); return false; }
  if (!phone || phone.length < 9 || !/^[17]\d{8}$/.test(phone)) {
    showToast('⚠️ Enter a valid Safaricom number e.g. 712345678');
    document.getElementById('mpesa-phone').focus(); return false;
  }
  return true;
}

function initiatePayment() {
  if (!validateCheckoutForm()) return;
  const cart = getCart();
  if (!cart.length) { showToast('🛒 Your cart is empty!'); return; }

  const phone  = '254' + document.getElementById('mpesa-phone').value.trim();
  const { total } = getOrderTotal();
  const fmt    = `+${phone.slice(0,3)} ${phone.slice(3,6)} ${phone.slice(6,9)} ${phone.slice(9)}`;

  document.getElementById('modal-phone-display').textContent = fmt;
  document.getElementById('modal-amount-display').textContent = `KSh ${total.toLocaleString()}`;
  document.getElementById('stk-modal').classList.add('active');
  document.getElementById('pay-btn').disabled = true;

  let secs = 120;
  const cdown = document.getElementById('countdown');
  if (cdown) cdown.textContent = secs;
  countdownTimer = setInterval(() => {
    secs--;
    if (cdown) cdown.textContent = secs;
    if (secs <= 0) { clearInterval(countdownTimer); confirmPayment(); }
  }, 1000);

  fetch('http://localhost:3000/api/mpesa/pay', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, amount: total })
  })
  .then(r => r.json())
  .then(data => {
    if (!data.success) {
      cancelPayment();
      showToast('❌ Payment failed. Please try again.');
      return;
    }
    setTimeout(() => confirmPayment(), 30000);
  })
  .catch(() => {
    cancelPayment();
    showToast('❌ Could not connect to server. Try again.');
  });
}

function cancelPayment() {
  clearInterval(countdownTimer);
  document.getElementById('stk-modal').classList.remove('active');
  const btn = document.getElementById('pay-btn');
  if (btn) btn.disabled = false;
}

function confirmPayment() {
  clearInterval(countdownTimer);
  document.getElementById('stk-modal').classList.remove('active');

  const orderRef = 'QOW-' + Date.now().toString().slice(-6);
  const cart     = getCart();
  const { total } = getOrderTotal();
  const name    = document.getElementById('cust-name').value.trim();
  const email   = document.getElementById('cust-email').value.trim();
  const phone   = '254' + document.getElementById('mpesa-phone').value.trim();
  const address = document.getElementById('cust-address').value.trim();
  const notes   = (document.getElementById('cust-notes') || {}).value?.trim() || '';

  const order = {
    ref: orderRef, date: new Date().toISOString(),
    name, email, phone, address, notes,
    items: cart,
    subtotal: cart.reduce((t,i) => t + i.price, 0),
    delivery: 200, total, status: 'paid', paymentMethod: 'mpesa'
  };
  const orders = JSON.parse(localStorage.getItem('qow_orders') || '[]');
  orders.push(order);
  localStorage.setItem('qow_orders', JSON.stringify(orders));
  clearCart();

  const itemsList = cart.map(i => `• ${i.name} — KSh ${i.price.toLocaleString()}`).join('\n');
  const waMsg = encodeURIComponent(
    `Hello Queen of Wigs! 👑\n\nI have completed my M-Pesa payment.\n\nOrder Ref: *${orderRef}*\n\nItems:\n${itemsList}\n\nTotal Paid: *KSh ${total.toLocaleString()}*\n\nDelivery Address: ${address}\n\nThank you! 🙏`
  );
  const waLink = document.getElementById('whatsapp-confirm-link');
  if (waLink) waLink.href = `https://wa.me/${CONTACT.whatsapp}?text=${waMsg}`;

  const refEl = document.getElementById('order-ref-display');
  if (refEl) refEl.textContent = orderRef;
  document.getElementById('success-modal').classList.add('active');
}

/* ═══════════════════════════════════════
   CONTACT FORM
═══════════════════════════════════════ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if (!name || !email || !message) { showToast('⚠️ Please fill in all fields'); return; }
    const msg = document.getElementById('successMsg');
    if (msg) { msg.textContent = '✅ Message sent! We\'ll be in touch soon.'; msg.style.color = '#2e7d32'; }
    form.reset();
    setTimeout(() => { if(msg) msg.textContent = ''; }, 5000);
  });
}

/* ═══════════════════════════════════════
   ADMIN PRODUCTS (appear in wig grid)
═══════════════════════════════════════ */
function loadAdminProducts() {
  const products  = JSON.parse(localStorage.getItem('admin_products') || '[]');
  const container = document.querySelector('.wig-grid');
  if (!products.length || !container) return;
  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'wig-card fade-up';
    card.innerHTML = `
      <div class="wig-card-img">
        <img src="${p.image || 'images/our wig.png'}" alt="${p.name}" onerror="this.src='images/our wig.png'">
        <span class="wig-badge">New</span>
      </div>
      <div class="wig-card-body">
        <h3>${p.name}</h3>
        <div class="wig-price">KSh ${Number(p.price).toLocaleString()}</div>
        <button class="order-btn" onclick="addToCart('${p.name.replace(/'/g,"\\'")}', ${p.price})">Add to Cart</button>
      </div>
    `;
    container.appendChild(card);
  });
}

/* ═══════════════════════════════════════
   SCROLL ANIMATIONS
═══════════════════════════════════════ */
function initScrollAnimations() {
  const els = document.querySelectorAll('.fade-up');
  if (!els.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }});
  }, { threshold: 0.1 });
  els.forEach(el => io.observe(el));
}

/* ═══════════════════════════════════════
   INIT
═══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const page = getActivePage();
  if (page !== 'admin.html') {
    renderHeader();
    renderFooter();
  }
  updateCartBadge();
  displayCart();
  initContactForm();
  loadAdminProducts();
  initScrollAnimations();
  if (page === 'payment.html') populateCheckoutSummary();
});