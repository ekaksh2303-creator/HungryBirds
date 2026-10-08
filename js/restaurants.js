/**
 * HungryBirds - Restaurants Page Logic (restaurants.js)
 * Handles restaurant search, category filtering, sorting,
 * reading URL query parameters, and dynamic card rendering.
 * Built for College ASDD Lab Assignment.
 */

document.addEventListener('DOMContentLoaded', () => {
  const gridContainer = document.getElementById('restaurantsGrid');
  const searchInput = document.getElementById('restaurantSearchInput');
  const filterPillsContainer = document.getElementById('categoryFilterPills');
  const resultsCount = document.getElementById('resultsCount');
  const sortSelect = document.getElementById('restaurantSortSelect');

  if (!gridContainer) return;

  // Read URL search params
  const urlParams = new URLSearchParams(window.location.search);
  let currentCategory = urlParams.get('category') || 'All';
  let currentSearch = urlParams.get('search') || '';

  if (searchInput) {
    if (currentSearch) {
      searchInput.value = currentSearch;
    }
    if (urlParams.get('focus') === 'search') {
      setTimeout(() => {
        searchInput.focus();
        searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }

  // Setup category pills
  const categoriesList = ['All', 'Pizza', 'Burgers', 'Indian', 'Chinese', 'Desserts', 'Healthy'];
  
  function renderFilterPills() {
    if (!filterPillsContainer) return;
    filterPillsContainer.innerHTML = '';

    categoriesList.forEach(cat => {
      const pill = document.createElement('button');
      pill.className = `filter-pill ${currentCategory.toLowerCase() === cat.toLowerCase() ? 'active' : ''}`;
      pill.textContent = cat;
      pill.setAttribute('type', 'button');
      pill.addEventListener('click', () => {
        currentCategory = cat;
        // Update URL state without reload
        const newUrl = new URL(window.location);
        if (cat === 'All') {
          newUrl.searchParams.delete('category');
        } else {
          newUrl.searchParams.set('category', cat);
        }
        window.history.replaceState({}, '', newUrl);

        renderFilterPills();
        applyFiltersAndRender();
      });
      filterPillsContainer.appendChild(pill);
    });
  }

  // Filter & Sort Logic
  function applyFiltersAndRender() {
    let filtered = [...RESTAURANTS];

    // 1. Category filter
    if (currentCategory && currentCategory.toLowerCase() !== 'all') {
      const targetCat = currentCategory.toLowerCase();
      filtered = filtered.filter(r => {
        const matchesCuisine = r.cuisine.toLowerCase() === targetCat;
        const matchesTags = r.tags.some(tag => tag.toLowerCase() === targetCat);
        const matchesMenu = r.menu.some(m => m.category.toLowerCase() === targetCat || m.name.toLowerCase().includes(targetCat));
        return matchesCuisine || matchesTags || matchesMenu;
      });
    }

    // 2. Search query filter
    const query = currentSearch.trim().toLowerCase();
    if (query) {
      filtered = filtered.filter(r => {
        const nameMatch = r.name.toLowerCase().includes(query);
        const cuisineMatch = r.cuisine.toLowerCase().includes(query);
        const tagMatch = r.tags.some(t => t.toLowerCase().includes(query));
        const dishMatch = r.menu.some(d => d.name.toLowerCase().includes(query));
        return nameMatch || cuisineMatch || tagMatch || dishMatch;
      });
    }

    // 3. Sorting
    if (sortSelect) {
      const sortVal = sortSelect.value;
      if (sortVal === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
      } else if (sortVal === 'deliveryTime') {
        filtered.sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime));
      }
    }

    // Update Results count text
    if (resultsCount) {
      resultsCount.textContent = `Showing ${filtered.length} restaurant${filtered.length === 1 ? '' : 's'}`;
    }

    // Render cards
    renderRestaurantCards(filtered);
  }

  function renderRestaurantCards(restaurants) {
    gridContainer.innerHTML = '';

    if (restaurants.length === 0) {
      gridContainer.innerHTML = `
        <div class="empty-results-box" style="grid-column: 1 / -1; text-align: center; padding: 4.5rem 1.5rem; background: var(--bg-surface); border-radius: var(--radius-lg); border: 1px dashed var(--border);">
          <div style="font-size: 3rem; margin-bottom: 0.75rem;">🍽️</div>
          <h3 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 0.4rem; color: var(--text-primary);">No restaurants found</h3>
          <p style="color: var(--text-secondary); margin-bottom: 1.75rem; font-size: 0.98rem; max-width: 440px; margin-left: auto; margin-right: auto; line-height: 1.5;">
            Try another search or explore a different category.
          </p>
          <button id="resetFiltersBtn" class="btn btn-primary btn-sm" type="button">Reset All Filters</button>
        </div>
      `;

      const resetBtn = document.getElementById('resetFiltersBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          currentCategory = 'All';
          currentSearch = '';
          if (searchInput) searchInput.value = '';
          const newUrl = new URL(window.location);
          newUrl.search = '';
          window.history.replaceState({}, '', newUrl);
          renderFilterPills();
          applyFiltersAndRender();
        });
      }
      return;
    }

    restaurants.forEach(rest => {
      const card = document.createElement('a');
      card.href = `menu.html?id=${rest.id}`;
      card.className = 'restaurant-card';

      card.innerHTML = `
        <div class="restaurant-image-box">
          <img src="${rest.image}" alt="${rest.name}" loading="lazy">
          ${rest.badge ? `<span class="restaurant-badge-floating">${rest.badge}</span>` : ''}
          ${rest.offer ? `<span class="restaurant-offer-floating">🏷️ ${rest.offer}</span>` : ''}
        </div>
        <div class="restaurant-info">
          <div class="restaurant-header-row">
            <h3 class="restaurant-name">${rest.name}</h3>
            <span class="badge-rating">★ ${rest.rating.toFixed(1)}</span>
          </div>
          <p class="restaurant-cuisine">${rest.cuisine} • ${rest.tags.slice(0, 2).join(', ')}</p>
          <div class="restaurant-meta-row">
            <span class="restaurant-meta-item">⏱️ ${rest.deliveryTime}</span>
            <span class="restaurant-meta-item">💳 ${rest.priceRange}</span>
          </div>
        </div>
      `;

      gridContainer.appendChild(card);
    });
  }

  // Search input event with debounce
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        currentSearch = e.target.value;
        const newUrl = new URL(window.location);
        if (currentSearch) {
          newUrl.searchParams.set('search', currentSearch);
        } else {
          newUrl.searchParams.delete('search');
        }
        window.history.replaceState({}, '', newUrl);
        applyFiltersAndRender();
      }, 250);
    });
  }

  // Sort change event
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      applyFiltersAndRender();
    });
  }

  // Initial render
  renderFilterPills();
  applyFiltersAndRender();
});
