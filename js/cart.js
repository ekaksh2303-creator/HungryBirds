/**
 * HungryBirds - Cart & Checkout Page Logic (cart.js)
 * Handles rendering cart items, quantity adjustments, item removals,
 * promo code application, total calculations, and order submission.
 * Built for College ASDD Lab Assignment.
 */

document.addEventListener('DOMContentLoaded', () => {
  renderCartView();
  setupPromoCodeForm();
  setupCheckoutForm();
});

function renderCartView() {
  const container = document.getElementById('cartContainer');
  if (!container) return;

  const cart = getCart();
  const totals = calculateCartTotals();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart-state">
        <div class="empty-cart-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Good food is always just a few clicks away! Explore delicious menus from top restaurants.</p>
        <a href="restaurants.html" class="btn btn-primary btn-lg">Browse Restaurants</a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="cart-layout">
      <!-- Left Column: Cart Items -->
      <div class="cart-items-card">
        <div class="cart-header-title">
          <span>Your Cart</span>
          <button id="clearCartBtn" class="btn btn-sm" style="color: var(--danger); font-size: 0.85rem;" type="button" aria-label="Clear all items from cart">Clear All</button>
        </div>
        <div id="cartItemsList"></div>
      </div>

      <!-- Right Column: Bill Details & Checkout -->
      <div class="cart-sidebar">
        <!-- Promo Coupon Box -->
        <div class="sidebar-box">
          <h4 class="sidebar-title">Coupons & Offers</h4>
          <div class="promo-input-box">
            <input type="text" id="promoInput" placeholder="ENTER COUPON" value="${totals.couponCode || ''}">
            <button id="applyPromoBtn" class="btn btn-secondary btn-sm" type="button">
              ${totals.couponCode ? 'Remove' : 'Apply'}
            </button>
          </div>
          <div class="promo-tag-helper">
            Try codes: <code data-code="HUNGRYBIRDS40">HUNGRYBIRDS40</code> (40% off), <code data-code="WELCOME50">WELCOME50</code>
          </div>
        </div>

        <!-- Bill Summary -->
        <div class="sidebar-box">
          <h4 class="sidebar-title">Order Bill Summary</h4>
          <div class="bill-row">
            <span>Item Total</span>
            <span>${formatCurrency(totals.subtotal)}</span>
          </div>
          <div class="bill-row">
            <span>Delivery Partner Fee</span>
            <span>${totals.deliveryFee === 0 ? '<span style="color: var(--success); font-weight: 700;">FREE</span>' : formatCurrency(totals.deliveryFee)}</span>
          </div>
          <div class="bill-row">
            <span>Taxes & Restaurant GST (5%)</span>
            <span>${formatCurrency(totals.taxes)}</span>
          </div>
          ${totals.discount > 0 ? `
            <div class="bill-row discount">
              <span>Coupon Discount (${totals.couponCode})</span>
              <span>- ${formatCurrency(totals.discount)}</span>
            </div>
          ` : ''}
          <div class="bill-row grand-total">
            <span>To Pay</span>
            <span>${formatCurrency(totals.grandTotal)}</span>
          </div>
        </div>

        <!-- Checkout Details Box -->
        <div class="sidebar-box">
          <h4 class="sidebar-title">Delivery & Contact Details</h4>
          <form id="checkoutForm">
            <div class="checkout-form-group">
              <label for="custName" class="checkout-label">Customer Name *</label>
              <input type="text" id="custName" class="checkout-input" placeholder="e.g. John Doe" required autocomplete="name">
            </div>
            <div class="checkout-form-group">
              <label for="custPhone" class="checkout-label">Phone Number *</label>
              <input type="tel" id="custPhone" class="checkout-input" placeholder="e.g. 9876543210 (10 digits)" required pattern="[0-9]{10}" title="Please enter a valid 10-digit mobile number" autocomplete="tel">
            </div>
            <div class="checkout-form-group">
              <label for="custAddress" class="checkout-label">Delivery Address *</label>
              <textarea id="custAddress" class="checkout-input" rows="2" placeholder="e.g. Flat 402, Sunshine Apartments, Green Valley" required autocomplete="street-address"></textarea>
            </div>
            <div class="checkout-form-group">
              <span class="checkout-label">Payment Option</span>
              <div class="payment-method-selector">
                <label class="payment-option-label" for="payCod">
                  <input type="radio" id="payCod" name="paymentOption" value="Cash on Delivery (Demo)" checked>
                  <span>💵 Cash on Delivery (Demo)</span>
                </label>
                <label class="payment-option-label" for="payOnline">
                  <input type="radio" id="payOnline" name="paymentOption" value="UPI / Online (Demo)">
                  <span>📱 UPI / Card / NetBanking (Demo)</span>
                </label>
              </div>
            </div>
            <button type="submit" class="btn btn-primary btn-block btn-lg btn-checkout-action" style="margin-top: 1.5rem;">
              Place Order (${formatCurrency(totals.grandTotal)}) →
            </button>
          </form>
        </div>
      </div>
    </div>
  `;

  // Render items list
  const listEl = document.getElementById('cartItemsList');
  cart.forEach(item => {
    const row = document.createElement('div');
    row.className = 'cart-item-row';
    row.innerHTML = `
      <div class="cart-item-img">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-details">
        <div style="display: flex; align-items: center; gap: 0.4rem;">
          <span class="food-type-icon ${item.isVeg ? 'veg' : 'non-veg'}"></span>
          <h4>${item.name}</h4>
        </div>
        <div class="cart-item-restaurant">${item.restaurantName}</div>
        <div class="cart-item-price">${formatCurrency(item.price * item.quantity)} <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: normal;">(${formatCurrency(item.price)} each)</span></div>
      </div>
      <div class="qty-stepper" role="group" aria-label="Quantity for ${item.name}">
        <button class="qty-btn" data-action="decrease" data-id="${item.id}" type="button" aria-label="Decrease quantity of ${item.name}">−</button>
        <span class="qty-val" aria-live="polite">${item.quantity}</span>
        <button class="qty-btn" data-action="increase" data-id="${item.id}" type="button" aria-label="Increase quantity of ${item.name}">+</button>
      </div>
      <button class="btn-remove-item" data-id="${item.id}" title="Remove item" aria-label="Remove ${item.name} from cart" type="button">✕</button>
    `;

    // Quantity events
    row.querySelector('[data-action="decrease"]').addEventListener('click', () => {
      updateItemQuantity(item.id, -1);
      renderCartView();
    });

    row.querySelector('[data-action="increase"]').addEventListener('click', () => {
      updateItemQuantity(item.id, 1);
      renderCartView();
    });

    row.querySelector('.btn-remove-item').addEventListener('click', () => {
      removeFromCart(item.id);
      renderCartView();
    });

    listEl.appendChild(row);
  });

  // Clear all button
  const clearBtn = document.getElementById('clearCartBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm("Are you sure you want to empty your cart?")) {
        clearCart();
        renderCartView();
      }
    });
  }

  // Pre-fill user name if logged in
  const savedUser = localStorage.getItem(USER_STORAGE_KEY);
  if (savedUser) {
    const nameInput = document.getElementById('custName');
    if (nameInput) nameInput.value = savedUser;
  }

  // Quick promo code clicks
  document.querySelectorAll('.promo-tag-helper code').forEach(codeEl => {
    codeEl.addEventListener('click', () => {
      const code = codeEl.getAttribute('data-code');
      const promoInput = document.getElementById('promoInput');
      if (promoInput) {
        promoInput.value = code;
        applyPromo(code);
      }
    });
  });

  setupPromoCodeForm();
  setupCheckoutForm();
}

function applyPromo(code) {
  const cleanCode = code.trim().toUpperCase();
  const totals = calculateCartTotals();

  if (!cleanCode) {
    setAppliedCoupon(null);
    renderCartView();
    return;
  }

  if (typeof PROMO_CODES !== 'undefined' && PROMO_CODES[cleanCode]) {
    const promo = PROMO_CODES[cleanCode];
    if (totals.subtotal < promo.minOrder) {
      showToast(`Add items worth ${formatCurrency(promo.minOrder - totals.subtotal)} more to apply`, "⚠️");
      return;
    }
    setAppliedCoupon({ code: cleanCode, ...promo });
    showToast(`Coupon "${cleanCode}" applied!`, "🎉");
    renderCartView();
  } else {
    showToast("Invalid coupon code", "✕");
  }
}

function setupPromoCodeForm() {
  const promoBtn = document.getElementById('applyPromoBtn');
  const promoInput = document.getElementById('promoInput');

  if (promoBtn && promoInput) {
    promoBtn.addEventListener('click', () => {
      const currentCoupon = getAppliedCoupon();
      if (currentCoupon) {
        setAppliedCoupon(null);
        showToast("Coupon removed", "✓");
        renderCartView();
      } else {
        applyPromo(promoInput.value);
      }
    });
  }
}

function setupCheckoutForm() {
  const form = document.getElementById('checkoutForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('custName').value.trim();
    const phone = document.getElementById('custPhone').value.trim();
    const address = document.getElementById('custAddress').value.trim();
    const paymentRadio = document.querySelector('input[name="paymentOption"]:checked');
    const payment = paymentRadio ? paymentRadio.value : "Cash on Delivery (Demo)";

    if (!name || !phone || !address) {
      showToast("Please fill in all required fields", "⚠️");
      return;
    }

    const cart = getCart();
    if (cart.length === 0) {
      showToast("Your cart is empty", "⚠️");
      return;
    }

    const totals = calculateCartTotals();
    const orderId = 'ES' + Math.floor(10000 + Math.random() * 90000);
    const orderTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const orderDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const orderData = {
      id: orderId,
      items: cart,
      totals: totals,
      customer: {
        name,
        phone,
        address,
        payment
      },
      time: orderTime,
      date: orderDate,
      statusStep: 2, // 1: Confirmed, 2: Preparing, 3: Out for delivery, 4: Delivered
      statusText: "Preparing your food",
      estimatedTime: "25–30 mins"
    };

    // Save order data to localStorage
    localStorage.setItem('hungrybirds_last_order', JSON.stringify(orderData));
    
    // Also save user name for future visits
    localStorage.setItem(USER_STORAGE_KEY, name);

    // Clear cart and coupon
    clearCart();

    // Redirect to order confirmation page
    window.location.href = `order.html?id=${orderId}`;
  });
}
