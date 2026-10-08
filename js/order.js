/**
 * HungryBirds - Order Confirmation & Status Logic (order.js)
 * Displays order confirmation, live simulated delivery timeline,
 * order receipt breakdown, and interactive delivery progression.
 * Built for College ASDD Lab Assignment.
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('orderStatusContainer');
  if (!container) return;

  const orderDataRaw = localStorage.getItem('hungrybirds_last_order');
  
  if (!orderDataRaw) {
    container.innerHTML = `
      <div class="order-confirmation-card" style="text-align: center; padding: 4rem 2rem;">
        <div style="font-size: 3.5rem; margin-bottom: 1rem;">📦</div>
        <h2 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 0.5rem;">No Active Order Found</h2>
        <p style="color: var(--text-secondary); margin-bottom: 2rem;">It seems you haven't placed an order yet or your session expired.</p>
        <a href="restaurants.html" class="btn btn-primary btn-lg">Explore Restaurants</a>
      </div>
    `;
    return;
  }

  const order = JSON.parse(orderDataRaw);
  renderOrderDetails(order, container);
});

function renderOrderDetails(order, container) {
  // Current status stage: 1 = Confirmed, 2 = Preparing, 3 = Out for delivery, 4 = Delivered
  const currentStep = order.statusStep || 2;

  const stepLabels = [
    { title: "Order Confirmed", sub: "Accepted by kitchen" },
    { title: "Preparing Food", sub: "Fresh ingredients cooking" },
    { title: "Out for Delivery", sub: "Rider on the way" },
    { title: "Delivered", sub: "Enjoy your meal!" }
  ];

  // Calculate progress bar percentage
  // 1: 0%, 2: 38%, 3: 72%, 4: 100%
  const progressWidths = [0, 0, 38, 72, 100];
  const progressPercent = progressWidths[currentStep] || 38;

  container.innerHTML = `
    <div class="order-confirmation-card">
      <!-- Success Header -->
      <div class="order-success-header">
        <div class="success-badge-circle" aria-hidden="true">✓</div>
        <h1 class="order-title">Your order has been placed.</h1>
        <p style="color: var(--text-secondary); margin-top: 0.35rem; font-size: 1.05rem;">
          Thank you, <strong>${order.customer.name}</strong>! The kitchen has received your order and started preparation.
        </p>
        <div class="order-id-badge">Order ID: #${order.id}</div>
        <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem;">
          Placed on ${order.date} at ${order.time}
        </div>
      </div>

      <!-- Live Delivery Status Tracker -->
      <div class="status-tracker-box">
        <div class="tracker-title">
          <span>Estimated Delivery: <strong style="color: var(--accent); font-size: 1.1rem;">${order.estimatedTime || '25–30 mins'}</strong></span>
        </div>

        <div class="tracker-timeline" role="progressbar" aria-label="Delivery progress" aria-valuenow="${progressPercent}" aria-valuemin="0" aria-valuemax="100">
          <div class="tracker-timeline-progress" style="width: ${progressPercent}%;"></div>
          
          ${stepLabels.map((step, index) => {
            const stepNum = index + 1;
            let statusClass = '';
            let icon = stepNum;

            if (stepNum < currentStep) {
              statusClass = 'completed';
              icon = '✓';
            } else if (stepNum === currentStep) {
              statusClass = 'active';
              icon = '●';
            }

            return `
              <div class="tracker-step ${statusClass}">
                <div class="tracker-node" aria-hidden="true">${icon}</div>
                <div class="tracker-label">${step.title}</div>
                <div class="tracker-sublabel">${step.sub}</div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Simulation Control for ASDD Lab Demo -->
        <div class="demo-simulation-card">
          <div class="demo-simulation-tag">ASDD LAB DEMO FEATURE</div>
          <p class="demo-simulation-text">Interactive stage transition test: Advance delivery milestones on demand.</p>
          <button id="advanceStatusBtn" class="btn btn-secondary btn-sm" type="button">
            ⚡ Simulate Next Delivery Stage
          </button>
        </div>
      </div>

      <!-- Order Details & Receipt -->
      <div class="order-details-box">
        <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.75rem;">Order Receipt</h3>
        
        <div class="order-items-summary-list">
          ${order.items.map(item => `
            <div class="summary-item-line">
              <div style="display: flex; align-items: center; gap: 0.6rem;">
                <span class="food-type-icon ${item.isVeg ? 'veg' : 'non-veg'}"></span>
                <span><strong>${item.quantity}x</strong> ${item.name}</span>
                <span style="font-size: 0.8rem; color: var(--text-muted);">(${item.restaurantName})</span>
              </div>
              <span style="font-weight: 700;">${formatCurrency(item.price * item.quantity)}</span>
            </div>
          `).join('')}
        </div>

        <!-- Bill Breakdown -->
        <div style="border-top: 1px solid var(--border-light); padding-top: 1rem; margin-top: 1rem;">
          <div class="bill-row">
            <span>Item Subtotal</span>
            <span>${formatCurrency(order.totals.subtotal)}</span>
          </div>
          <div class="bill-row">
            <span>Delivery Fee</span>
            <span>${order.totals.deliveryFee === 0 ? '<span style="color: var(--success); font-weight: 700;">FREE</span>' : formatCurrency(order.totals.deliveryFee)}</span>
          </div>
          <div class="bill-row">
            <span>Taxes & GST (5%)</span>
            <span>${formatCurrency(order.totals.taxes)}</span>
          </div>
          ${order.totals.discount > 0 ? `
            <div class="bill-row discount">
              <span>Promo Discount (${order.totals.couponCode})</span>
              <span>- ${formatCurrency(order.totals.discount)}</span>
            </div>
          ` : ''}
          <div class="bill-row grand-total">
            <span>Total Paid</span>
            <span>${formatCurrency(order.totals.grandTotal)}</span>
          </div>
        </div>

        <!-- Delivery Destination Information -->
        <div class="delivery-destination-card">
          <strong>Delivering to:</strong>
          <div>${order.customer.name} • 📞 ${order.customer.phone}</div>
          <div style="margin-top: 0.25rem; color: var(--text-primary);">${order.customer.address}</div>
          <div style="margin-top: 0.5rem; font-size: 0.82rem; color: var(--text-muted);">
            Payment Mode: <span style="font-weight: 600; color: var(--text-primary);">${order.customer.payment}</span>
          </div>
        </div>
      </div>

      <!-- Footer Action Links -->
      <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; flex-wrap: wrap; margin-top: 2rem;">
        <a href="index.html" class="btn btn-secondary">Back to Home</a>
        <a href="restaurants.html" class="btn btn-primary">Discover More Food →</a>
      </div>
    </div>
  `;

  // Advance Delivery Simulation Button
  const advanceBtn = document.getElementById('advanceStatusBtn');
  if (advanceBtn) {
    if (currentStep >= 4) {
      advanceBtn.textContent = "✓ Order Delivered (Reset to Step 1)";
    }
    
    advanceBtn.addEventListener('click', () => {
      let nextStep = currentStep + 1;
      if (nextStep > 4) nextStep = 1;

      order.statusStep = nextStep;
      order.statusText = stepLabels[nextStep - 1].title;
      if (nextStep === 4) {
        order.estimatedTime = "Delivered just now";
      }
      localStorage.setItem('hungrybirds_last_order', JSON.stringify(order));
      showToast(`Status updated to: ${stepLabels[nextStep - 1].title}`, "🚀");
      renderOrderDetails(order, container);
    });
  }
}
