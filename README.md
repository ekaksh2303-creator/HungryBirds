# HungryBirds — Modern Lightweight Food Delivery Website
**College ASDD (Agile Software Development and Design) Laboratory Assignment**

HungryBirds is a modern, lightweight, and responsive food-delivery website built exclusively with **HTML5, CSS3, and Vanilla JavaScript**. It simulates the core user experience of a modern food-tech startup (browsing restaurants, category filtering, menu viewing, live cart calculation, coupon discounts, checkout validation, and simulated order delivery tracking) without external frameworks, libraries, or backend databases.

---

## 🚀 Key Features

1. **Homepage (`index.html`)**:
   - Modern food-tech branding with warm cream (`#FBF9F5`) and terracotta (`#DE5D35`) aesthetic.
   - Clean navigation bar with live cart item counter badge, search, and login modal.
   - Hero banner with headline *"Good food. Good mood."*, search bar, and quick filter chips.
   - Interactive category cards with hover animations (*Pizza, Burgers, Biryani, Chinese, Desserts, Healthy*).
   - Popular restaurants grid featuring curated partner restaurants with rating, cuisine, delivery time, and offers.
   - Promotional discount banner (`HUNGRYBIRDS40`) and professional footer.

2. **Restaurant Discovery (`restaurants.html`)**:
   - Live debounced search by restaurant name, cuisine tags, or dish name.
   - Interactive category pill filters (*All, Pizza, Burgers, Indian, Chinese, Desserts, Healthy*).
   - URL query parameter synchronization (`?category=Pizza` or `?search=biryani`).
   - Sorting by Top Rated and Fastest Delivery.
   - Direct click-through to individual restaurant menus.

3. **Restaurant Menu (`menu.html`)**:
   - Dynamic page rendering based on URL query `menu.html?id=X`.
   - Restaurant banner with cover photo, badges, rating, delivery time, and description.
   - Veg-only filter switch (`🌱 Pure Veg Only`).
   - Sticky category navigation sidebar (*Recommended, Starters, Main Course, Desserts, Drinks*).
   - Food item cards with veg/non-veg status indicators, dish photo, price, description, and `+ Add` button.
   - Slide-up floating sticky bottom cart bar showing item count, total price, and quick link to cart.

4. **Shopping Cart & Checkout (`cart.html`)**:
   - Clean empty-cart state with a call-to-action to browse restaurants.
   - Active cart items list with dish photos, restaurant name, and price.
   - Real-time quantity adjustment stepper (`− qty +`) and item removal (`✕`).
   - Coupon discount system (`HUNGRYBIRDS40`, `WELCOME50`, `TASTY20`).
   - Accurate bill breakdown: Item total, delivery fee (FREE for orders >= ₹500), 5% GST taxes, and grand total.
   - Checkout form: Name, 10-digit Phone, Delivery Address, and Demo Payment Mode.
   - Form validation and order generation.

5. **Order Confirmation & Status (`order.html`)**:
   - Order confirmation badge with unique generated ID (e.g., `#ES48291`).
   - Live 4-step delivery status tracker with animated pulsing indicator:
     - ✓ **Order Confirmed**
     - ● **Preparing Food**
     - ○ **Out for Delivery**
     - ○ **Delivered**
   - **ASDD Evaluation Feature**: Interactive button (`⚡ Demo: Simulate Next Delivery Stage`) allowing examiners to step through delivery stages on demand.
   - Complete order receipt, customer details, and action buttons to return home or discover more food.

---

## 🛠️ Technology Stack

- **Structure**: Semantic HTML5
- **Styling**: Vanilla CSS3 with CSS variables, Flexbox, Grid, and smooth transitions
- **Typography**: Google Fonts (*Manrope*)
- **Logic**: Pure Vanilla JavaScript (ES6+)
- **Data Persistence**: Browser `localStorage` (`hungrybirds_cart`, `hungrybirds_last_order`, `hungrybirds_applied_coupon`, `hungrybirds_user`)
- **Third-Party Libraries**: **NONE** (No React, Vue, Angular, Bootstrap, Tailwind, or jQuery)

---

## 📂 File Architecture

```text
HungryBirds/
├── index.html            # Homepage (Hero, Categories, Featured Restaurants, Offers)
├── restaurants.html      # Restaurant discovery, search, and category filter pills
├── menu.html             # Dynamic restaurant menu with veg filter & floating cart bar
├── cart.html             # Cart items, quantity controls, coupon box, checkout form
├── order.html            # Order receipt and simulated 4-stage delivery tracker
│
├── css/
│   └── style.css         # Complete design system, tokens, typography, and responsive styles
│
├── js/
│   ├── data.js           # Central mock data store (8 restaurants, 39 dishes, coupons)
│   ├── main.js           # Global cart utilities, localStorage sync, toasts, login modal
│   ├── restaurants.js    # Restaurant search, category filtering, sorting logic
│   ├── menu.js           # Dynamic menu builder, veg toggle, add-to-cart handlers
│   ├── cart.js           # Cart view rendering, bill calculations, checkout submission
│   └── order.js          # Order confirmation rendering and stage progression simulator
│
├── server.js             # Optional zero-dependency local static development server
└── README.md             # Project documentation for ASDD lab evaluation
```

---

## 💻 How to Run the Website

### Option 1: Direct Browser Opening (No Server Required)
Simply double-click `index.html` or right-click `index.html` and select **Open with Google Chrome / Microsoft Edge / Firefox**.

### Option 2: Using the Included Local Server
Run with Node.js (which has zero npm dependencies):
```bash
node server.js
```
Then visit:
```text
http://localhost:3001
```
