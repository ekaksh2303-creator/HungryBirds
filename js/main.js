/**
 * HungryBirds - Main Core JavaScript
 * Manages global cart state via localStorage, toast notifications,
 * mobile drawer, login simulation, and shared utilities.
 * Built for College ASDD Lab Assignment.
 */

// Cart Storage Key
const CART_STORAGE_KEY = 'hungrybirds_cart';
const COUPON_STORAGE_KEY = 'hungrybirds_applied_coupon';
const USER_STORAGE_KEY = 'hungrybirds_user';

/* --- Cart Core Operations --- */

function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to parse cart from localStorage", e);
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartBadgeCount();
  } catch (e) {
    console.error("Failed to save cart to localStorage", e);
  }
}

function addToCart(item, restaurantName) {
  const cart = getCart();
  const existingIndex = cart.findIndex(cartItem => cartItem.id === item.id);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      isVeg: item.isVeg,
      restaurantName: restaurantName || "HungryBirds Partner",
      quantity: 1
    });
  }

  saveCart(cart);
  showToast(`Added "${item.name}" to cart!`, "✓");
}

function updateItemQuantity(itemId, delta) {
  let cart = getCart();
  const index = cart.findIndex(item => item.id === itemId);

  if (index > -1) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
      showToast("Item removed from cart", "🗑");
    }
    saveCart(cart);
  }
  return cart;
}

function removeFromCart(itemId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== itemId);
  saveCart(cart);
  showToast("Item removed from cart", "🗑");
  return cart;
}

function clearCart() {
  localStorage.removeItem(CART_STORAGE_KEY);
  localStorage.removeItem(COUPON_STORAGE_KEY);
  updateCartBadgeCount();
}

function getCartItemCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.quantity || 1), 0);
}

function getAppliedCoupon() {
  try {
    const raw = localStorage.getItem(COUPON_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function setAppliedCoupon(coupon) {
  if (coupon) {
    localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(coupon));
  } else {
    localStorage.removeItem(COUPON_STORAGE_KEY);
  }
}

function calculateCartTotals() {
  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  if (subtotal === 0) {
    return {
      subtotal: 0,
      deliveryFee: 0,
      taxes: 0,
      discount: 0,
      grandTotal: 0,
      couponCode: null
    };
  }

  // Delivery fee logic: Free delivery above ₹500, else ₹40
  const deliveryFee = subtotal >= 500 ? 0 : 40;
  
  // 5% GST taxes
  const taxes = Math.round(subtotal * 0.05);

  // Applied Coupon discount
  let discount = 0;
  const coupon = getAppliedCoupon();
  if (coupon && typeof PROMO_CODES !== 'undefined' && PROMO_CODES[coupon.code]) {
    const promo = PROMO_CODES[coupon.code];
    if (subtotal >= promo.minOrder) {
      discount = Math.min(Math.round((subtotal * promo.discountPercent) / 100), promo.maxDiscount);
    }
  }

  const grandTotal = Math.max(0, subtotal + deliveryFee + taxes - discount);

  return {
    subtotal,
    deliveryFee,
    taxes,
    discount,
    grandTotal,
    couponCode: discount > 0 && coupon ? coupon.code : null
  };
}

/* --- UI Utilities --- */

function updateCartBadgeCount() {
  const count = getCartItemCount();
  const badges = document.querySelectorAll('.cart-count-badge');
  badges.forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-flex' : 'inline-flex';
  });
}

function formatCurrency(amount) {
  return `₹${Math.round(amount)}`;
}

function showToast(message, icon = "✓") {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 350);
  }, 2600);
}

/* --- Mobile Navigation & Header Setup --- */

function setupNavigation() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.toggle('open');
      const isOpen = drawer.classList.contains('open');
      toggleBtn.innerHTML = isOpen ? '✕' : '☰';
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });
  }

  // Active link highlighting
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-links a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    const cleanHref = href.split('?')[0].split('#')[0];

    if (currentPath === 'menu.html' && cleanHref === 'restaurants.html') {
      link.classList.add('active');
    } else if (cleanHref === currentPath || (currentPath === '' && cleanHref === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }

    // Auto-close drawer on mobile link click
    if (drawer && link.closest('.mobile-nav-drawer')) {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        if (toggleBtn) {
          toggleBtn.innerHTML = '☰';
          toggleBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }
  });

  // Highlight cart button when on cart.html
  const cartBtn = document.querySelector('.cart-btn');
  if (cartBtn) {
    if (currentPath === 'cart.html') {
      cartBtn.classList.add('active');
    } else {
      cartBtn.classList.remove('active');
    }
  }

  // Login simulation modal
  setupLoginModal();
}

function setupLoginModal() {
  const loginBtns = document.querySelectorAll('.btn-login');
  let modalOverlay = document.getElementById('loginModal');

  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'loginModal';
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
      <div class="modal-content">
        <button class="modal-close-btn" aria-label="Close modal">&times;</button>
        <div style="text-align: center; margin-bottom: 1.5rem;">
          <div class="brand-icon" style="margin: 0 auto 0.75rem; width: 44px; height: 44px; font-size: 1.4rem;">♨</div>
          <h3 style="font-size: 1.4rem; font-weight: 800;">Welcome to HungryBirds</h3>
          <p style="font-size: 0.88rem; color: var(--text-secondary); margin-top: 0.25rem;">Enter your name for demo personalization</p>
        </div>
        <form id="demoLoginForm">
          <div class="checkout-form-group">
            <label class="checkout-label">Your Name</label>
            <input type="text" id="loginUserName" class="checkout-input" placeholder="e.g. Alex Johnson" required value="Alex">
          </div>
          <div class="checkout-form-group">
            <label class="checkout-label">Mobile Number</label>
            <input type="tel" class="checkout-input" placeholder="e.g. 9876543210" value="9876543210">
          </div>
          <button type="submit" class="btn btn-primary btn-block" style="margin-top: 1rem;">Continue to HungryBirds</button>
        </form>
      </div>
    `;
    document.body.appendChild(modalOverlay);

    const closeBtn = modalOverlay.querySelector('.modal-close-btn');
    closeBtn.addEventListener('click', () => modalOverlay.classList.remove('active'));
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) modalOverlay.classList.remove('active');
    });

    const form = modalOverlay.querySelector('#demoLoginForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('loginUserName');
      const userName = (nameInput && nameInput.value.trim()) || "Alex";
      localStorage.setItem(USER_STORAGE_KEY, userName);
      renderUserGreeting();
      modalOverlay.classList.remove('active');
      showToast(`Welcome back, ${userName}!`, "👋");
    });
  }

  loginBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modalOverlay.classList.add('active');
    });
  });

  renderUserGreeting();
}

function renderUserGreeting() {
  const userName = localStorage.getItem(USER_STORAGE_KEY);
  const loginBtns = document.querySelectorAll('.btn-login');
  if (userName && loginBtns.length) {
    loginBtns.forEach(btn => {
      btn.innerHTML = `👤 ${userName}`;
      btn.title = "Click to switch profile";
    });
  }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  updateCartBadgeCount();
});
