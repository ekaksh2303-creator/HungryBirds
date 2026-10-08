/**
 * HungryBirds - Menu Page Logic (menu.js)
 * Loads restaurant details by ID, displays categorized menu items,
 * veg/non-veg filter, add-to-cart actions, and floating bottom cart bar.
 * Built for College ASDD Lab Assignment.
 */

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const restaurantId = parseInt(urlParams.get('id'), 10) || 1;

  const restaurant = RESTAURANTS.find(r => r.id === restaurantId) || RESTAURANTS[0];

  // Render Restaurant Header & Banner
  renderRestaurantBanner(restaurant);

  // Render Menu Sections
  let vegOnlyFilter = false;
  renderMenuLayout(restaurant, vegOnlyFilter);

  // Setup Veg-only toggle if element exists
  const vegToggle = document.getElementById('vegOnlyToggle');
  if (vegToggle) {
    vegToggle.addEventListener('change', (e) => {
      vegOnlyFilter = e.target.checked;
      renderMenuLayout(restaurant, vegOnlyFilter);
    });
  }

  // Update floating cart bar
  updateFloatingCartBar();

  // Listen to storage events to update UI if cart changes in another tab
  window.addEventListener('storage', () => {
    updateFloatingCartBar();
    renderMenuLayout(restaurant, vegOnlyFilter);
  });
});

function renderRestaurantBanner(restaurant) {
  const bannerContainer = document.getElementById('restaurantBanner');
  if (!bannerContainer) return;

  document.title = `${restaurant.name} - Menu | HungryBirds`;

  bannerContainer.innerHTML = `
    <div class="container">
      <a href="restaurants.html" class="back-link">← Back to all restaurants</a>
      <div class="restaurant-hero-grid">
        <div class="restaurant-hero-img">
          <img src="${restaurant.image}" alt="${restaurant.name}">
        </div>
        <div class="restaurant-hero-details">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem; flex-wrap: wrap;">
            <h1>${restaurant.name}</h1>
            ${restaurant.isPureVeg ? '<span class="badge-tag" style="background-color: var(--success-light); color: var(--success);">🌱 Pure Veg</span>' : ''}
            ${restaurant.badge ? `<span class="badge-tag">${restaurant.badge}</span>` : ''}
          </div>
          <p class="restaurant-hero-cuisine">${restaurant.cuisine} • ${restaurant.tags.join(', ')}</p>
          <div class="restaurant-hero-tags">
            <span class="badge-rating">★ ${restaurant.rating.toFixed(1)} (${restaurant.reviewsCount.toLocaleString()}+ ratings)</span>
            <span>⏱️ ${restaurant.deliveryTime}</span>
            <span>💳 ${restaurant.priceRange}</span>
          </div>
          <p class="restaurant-hero-desc">${restaurant.description}</p>
          ${restaurant.offer ? `
            <div style="margin-top: 1rem;">
              <span class="badge-offer">🏷️ ${restaurant.offer}</span>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

function renderMenuLayout(restaurant, vegOnly = false) {
  const menuNav = document.getElementById('menuCategoryNav');
  const menuContent = document.getElementById('menuContent');
  if (!menuNav || !menuContent) return;

  // Filter items by veg if requested
  const menuItems = vegOnly ? restaurant.menu.filter(item => item.isVeg) : restaurant.menu;

  // Group items by category in preferred order
  const categoryOrder = ['Recommended', 'Starters', 'Main Course', 'Desserts', 'Drinks'];
  const grouped = {};

  categoryOrder.forEach(cat => {
    grouped[cat] = [];
  });

  menuItems.forEach(item => {
    const cat = item.category || 'Main Course';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(item);
  });

  // Render category sticky sidebar / nav
  menuNav.innerHTML = '';
  categoryOrder.forEach(cat => {
    if (grouped[cat] && grouped[cat].length > 0) {
      const link = document.createElement('a');
      link.href = `#section-${cat.replace(/\s+/g, '-').toLowerCase()}`;
      link.className = 'menu-cat-link';
      link.textContent = `${cat} (${grouped[cat].length})`;
      menuNav.appendChild(link);
    }
  });

  // Render categorized food items
  menuContent.innerHTML = '';
  const cart = getCart();

  categoryOrder.forEach(cat => {
    const items = grouped[cat];
    if (!items || items.length === 0) return;

    const sectionEl = document.createElement('section');
    sectionEl.id = `section-${cat.replace(/\s+/g, '-').toLowerCase()}`;
    sectionEl.className = 'menu-section';

    sectionEl.innerHTML = `
      <div class="menu-section-header">
        <span>${cat}</span>
        <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-muted);">${items.length} items</span>
      </div>
      <div class="menu-items-list" id="list-${cat.replace(/\s+/g, '-').toLowerCase()}"></div>
    `;

    const listEl = sectionEl.querySelector('.menu-items-list');

    items.forEach(item => {
      const cartItem = cart.find(ci => ci.id === item.id);
      const inCartQty = cartItem ? cartItem.quantity : 0;

      const card = document.createElement('div');
      card.className = 'menu-item-card';

      card.innerHTML = `
        <div class="menu-item-info">
          <div class="menu-item-header">
            <span class="food-type-icon ${item.isVeg ? 'veg' : 'non-veg'}" title="${item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}" aria-label="${item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}"></span>
            ${item.bestseller ? '<span class="badge-bestseller">★ Bestseller</span>' : ''}
          </div>
          <h3 class="menu-item-name">${item.name}</h3>
          <div class="menu-item-price">₹${item.price}</div>
          <p class="menu-item-desc">${item.description}</p>
        </div>
        <div class="menu-item-action-box">
          <div class="menu-item-thumb">
            <img src="${item.image}" alt="${item.name}" loading="lazy">
          </div>
          <button class="btn-add-food" data-item-id="${item.id}" type="button" aria-label="Add ${item.name} to cart">
            ${inCartQty > 0 ? `Added (${inCartQty}) +` : '+ Add'}
          </button>
        </div>
      `;

      const addBtn = card.querySelector('.btn-add-food');
      addBtn.addEventListener('click', () => {
        addToCart(item, restaurant.name);
        updateFloatingCartBar();
        // Update button text locally
        const updatedCart = getCart();
        const updatedItem = updatedCart.find(ci => ci.id === item.id);
        const newQty = updatedItem ? updatedItem.quantity : 1;
        addBtn.textContent = `Added (${newQty}) +`;
      });

      listEl.appendChild(card);
    });

    menuContent.appendChild(sectionEl);
  });

  // Highlight active category nav on scroll
  setupScrollSpy();
}

function setupScrollSpy() {
  const sections = document.querySelectorAll('.menu-section');
  const navLinks = document.querySelectorAll('.menu-cat-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

function updateFloatingCartBar() {
  let bar = document.getElementById('floatingCartBar');
  const totals = calculateCartTotals();
  const count = getCartItemCount();

  if (count > 0) {
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'floatingCartBar';
      bar.className = 'floating-cart-bar';
      document.body.appendChild(bar);
    }

    bar.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <span style="background-color: var(--accent); color: #fff; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.82rem; font-weight: 800;">${count}</span>
        <div>
          <div style="font-weight: 700; font-size: 0.95rem;">${formatCurrency(totals.subtotal)}</div>
          <div style="font-size: 0.75rem; color: #D1CBC3;">Plus taxes & fees</div>
        </div>
      </div>
      <a href="cart.html" class="btn btn-primary btn-sm" style="background-color: #FFFFFF; color: var(--text-primary); border-radius: var(--radius-full); font-weight: 700;">
        View Cart →
      </a>
    `;

    bar.classList.add('active');
  } else if (bar) {
    bar.classList.remove('active');
  }
}
