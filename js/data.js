/**
 * HungryBirds - Mock Data Store
 * Contains categories, restaurant profiles, and comprehensive menu items.
 * Built for College ASDD Lab Assignment.
 */

const CATEGORIES = [
  {
    id: "pizza",
    name: "Pizza",
    tagline: "Wood-fired & artisanal crusts",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    filterKey: "Pizza"
  },
  {
    id: "burgers",
    name: "Burgers",
    tagline: "Smash patties & brioche buns",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    filterKey: "Burgers"
  },
  {
    id: "biryani",
    name: "Biryani",
    tagline: "Fragrant dum basmati & spices",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    filterKey: "Indian"
  },
  {
    id: "chinese",
    name: "Chinese",
    tagline: "Dim sums, wok noodles & bowls",
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80",
    filterKey: "Chinese"
  },
  {
    id: "desserts",
    name: "Desserts",
    tagline: "Gourmet bakes & sweet treats",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
    filterKey: "Desserts"
  },
  {
    id: "healthy",
    name: "Healthy",
    tagline: "Fresh greens, bowls & juices",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
    filterKey: "Healthy"
  }
];

const RESTAURANTS = [
  {
    id: 1,
    name: "The Bombay Diner",
    cuisine: "Indian",
    tags: ["North Indian", "Biryani", "Mughlai"],
    rating: 4.8,
    reviewsCount: 1420,
    deliveryTime: "25-30 min",
    price: "₹₹",
    priceRange: "₹400 for two",
    offer: "40% OFF up to ₹100",
    badge: "Bestseller",
    isPureVeg: false,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    address: "42 Colaba Causeway, South Mumbai",
    description: "Authentic slow-cooked dum biryanis, aromatic curries, and rich traditional tandoori delights prepared with heirloom spices.",
    menu: [
      {
        id: 101,
        name: "Awadhi Murgh Dum Biryani",
        category: "Recommended",
        description: "Fragrant long-grain basmati cooked in sealed clay pots with tender spiced chicken and saffron glaze.",
        price: 349,
        isVeg: false,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80",
        bestseller: true
      },
      {
        id: 102,
        name: "Classic Butter Chicken",
        category: "Main Course",
        description: "Charcoal-grilled chicken simmered in a silky tomato, cashew cream, and fenugreek gravy.",
        price: 329,
        isVeg: false,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&q=80",
        bestseller: true
      },
      {
        id: 103,
        name: "Paneer Tikka Angara",
        category: "Starters",
        description: "Handcrafted cottage cheese cubes marinated in Kashmiri chili and hung curd, smoked in clay oven.",
        price: 269,
        isVeg: true,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=500&q=80",
        bestseller: false
      },
      {
        id: 104,
        name: "Dal Makhani Grand",
        category: "Main Course",
        description: "Black lentils slow-cooked overnight with churned butter and subtle aromatics.",
        price: 249,
        isVeg: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=80",
        bestseller: true
      },
      {
        id: 105,
        name: "Garlic Butter Naan",
        category: "Main Course",
        description: "Clay-oven flatbread garnished with minced roasted garlic and fresh cilantro butter.",
        price: 65,
        isVeg: true,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80",
        bestseller: false
      },
      {
        id: 106,
        name: "Gulab Jamun with Rabdi",
        category: "Desserts",
        description: "Warm golden milk dumplings dipped in rose-cardamom syrup and layered with thickened creamy rabdi.",
        price: 149,
        isVeg: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1605197584547-c93ee1a3b508?auto=format&fit=crop&w=500&q=80",
        bestseller: false
      },
      {
        id: 107,
        name: "Royal Kesari Lassi",
        category: "Drinks",
        description: "Chilled hand-churned yogurt smoothie scented with pure saffron strands and chopped pistachios.",
        price: 99,
        isVeg: true,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&w=500&q=80",
        bestseller: false
      }
    ]
  },
  {
    id: 2,
    name: "Casa Verde",
    cuisine: "Healthy",
    tags: ["Organic", "Salads", "Smoothie Bowls", "Keto"],
    rating: 4.7,
    reviewsCount: 890,
    deliveryTime: "20-25 min",
    price: "₹₹₹",
    priceRange: "₹550 for two",
    offer: "20% OFF above ₹499",
    badge: "Eco Choice",
    isPureVeg: true,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80",
    address: "18 Bandra West, St. John Avenue",
    description: "Farm-to-table salads, cold-pressed elixirs, nourish bowls, and high-protein vegan & keto delicacies.",
    menu: [
      {
        id: 201,
        name: "Mediterranean Harvest Bowl",
        category: "Recommended",
        description: "Quinoa, spiced roasted chickpeas, cherry tomatoes, cucumbers, kalamata olives, and tahini drizzle.",
        price: 319,
        isVeg: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80",
        bestseller: true
      },
      {
        id: 202,
        name: "Avocado Sourdough Crunch",
        category: "Starters",
        description: "Artisan sourdough toast with crushed Hass avocado, chili flakes, microgreens, and pumpkin seeds.",
        price: 249,
        isVeg: true,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&w=500&q=80",
        bestseller: true
      },
      {
        id: 203,
        name: "Tofu Teriyaki Greens Bowl",
        category: "Main Course",
        description: "Pan-seared organic tofu, sautéed edamame, broccoli, brown jasmine rice, and citrus teriyaki glaze.",
        price: 339,
        isVeg: true,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80",
        bestseller: false
      },
      {
        id: 204,
        name: "Berry Acai Detox Bowl",
        category: "Desserts",
        description: "Organic Brazilian acai blend topped with chia seeds, toasted coconut flakes, and fresh blueberries.",
        price: 279,
        isVeg: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=500&q=80",
        bestseller: true
      },
      {
        id: 205,
        name: "Cold-Pressed Green Glow",
        category: "Drinks",
        description: "Celery, crisp green apple, spinach, ginger, and Meyer lemon cold-pressed daily.",
        price: 139,
        isVeg: true,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=500&q=80",
        bestseller: false
      }
    ]
  },
  {
    id: 3,
    name: "Bella Forno",
    cuisine: "Pizza",
    tags: ["Neapolitan", "Pizza", "Pasta", "Italian"],
    rating: 4.9,
    reviewsCount: 2150,
    deliveryTime: "30-35 min",
    price: "₹₹",
    priceRange: "₹450 for two",
    offer: "Flat ₹125 OFF on ₹599",
    badge: "Top Rated",
    isPureVeg: false,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    address: "7 Indiranagar 100ft Road, Bengaluru",
    description: "Wood-fired artisanal pizzas with 48-hour fermented sourdough crust, San Marzano tomatoes, and fresh buffalo mozzarella.",
    menu: [
      {
        id: 301,
        name: "Margherita di Bufala",
        category: "Recommended",
        description: "San Marzano sauce, fresh buffalo mozzarella, fragrant sweet basil, and cold-pressed extra virgin olive oil.",
        price: 369,
        isVeg: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=500&q=80",
        bestseller: true
      },
      {
        id: 302,
        name: "Smoked Pepperoni Rustica",
        category: "Recommended",
        description: "Spicy pork pepperoni crisped over mozzarella, hot honey drizzle, and crushed oregano.",
        price: 449,
        isVeg: false,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=500&q=80",
        bestseller: true
      },
      {
        id: 303,
        name: "Truffle Mushroom Bruschetta",
        category: "Starters",
        description: "Toasted sourdough bread brushed with roasted garlic, wild thyme mushrooms, and shaved parmesan.",
        price: 239,
        isVeg: true,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=500&q=80",
        bestseller: false
      },
      {
        id: 304,
        name: "Creamy Pesto Penne",
        category: "Main Course",
        description: "Al dente penne pasta tossed in house basil-pine nut pesto, cherry tomatoes, and shaved grana padano.",
        price: 329,
        isVeg: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1621996346565-e3d5d628178d?auto=format&fit=crop&w=500&q=80",
        bestseller: false
      },
      {
        id: 305,
        name: "Classic Italian Tiramisu",
        category: "Desserts",
        description: "Espresso-soaked ladyfingers enveloped in mascarpone cream and dusted with dark cocoa powder.",
        price: 219,
        isVeg: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=500&q=80",
        bestseller: true
      },
      {
        id: 306,
        name: "San Pellegrino Blood Orange",
        category: "Drinks",
        description: "Sparkling Italian soda crafted with real sun-ripened Mediterranean blood oranges.",
        price: 119,
        isVeg: true,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=500&q=80",
        bestseller: false
      }
    ]
  },
  {
    id: 4,
    name: "The Burger Room",
    cuisine: "Burgers",
    tags: ["Gourmet Burgers", "Smash Patties", "Fries", "Shakes"],
    rating: 4.6,
    reviewsCount: 1680,
    deliveryTime: "20-30 min",
    price: "₹₹",
    priceRange: "₹380 for two",
    offer: "Free Fries with 2 Burgers",
    badge: "Trending",
    isPureVeg: false,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1200&q=80",
    address: "24 Park Street, Kolkata",
    description: "Juicy griddled smash burgers, golden buttered brioche buns, melted aged cheddar, and house secret burger sauce.",
    menu: [
      {
        id: 401,
        name: "The Double Smash Royale",
        category: "Recommended",
        description: "Two seasoned beef patties smashed ultra-crispy, double cheddar, caramelized onions, pickles & house sauce.",
        price: 299,
        isVeg: false,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80",
        bestseller: true
      },
      {
        id: 402,
        name: "Crispy Korean Fried Chicken Burger",
        category: "Main Course",
        description: "Golden buttermilk chicken fillet dipped in sweet Gochujang glaze with crunchy sesame slaw.",
        price: 279,
        isVeg: false,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1525164286253-04e68b9d94c6?auto=format&fit=crop&w=500&q=80",
        bestseller: true
      },
      {
        id: 403,
        name: "Crisp Truffle Parmesan Fries",
        category: "Starters",
        description: "Hand-cut skin-on Idaho potatoes tossed in white truffle essence, sea salt, and grated parmesan.",
        price: 159,
        isVeg: true,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=500&q=80",
        bestseller: true
      },
      {
        id: 404,
        name: "Smoky Black Bean Veggie Stack",
        category: "Main Course",
        description: "Hearty black bean & quinoa patty, roasted jalapeños, smoked chipotle mayo, and crisp lettuce.",
        price: 229,
        isVeg: true,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=500&q=80",
        bestseller: false
      },
      {
        id: 405,
        name: "Belgian Dark Chocolate Thickshake",
        category: "Drinks",
        description: "Real Belgian chocolate ganache blended with whole milk ice cream and cocoa crumble.",
        price: 169,
        isVeg: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=80",
        bestseller: true
      }
    ]
  },
  {
    id: 5,
    name: "Seoul Bowl & Wok",
    cuisine: "Chinese",
    tags: ["Chinese", "Dim Sum", "Noodles", "Asian"],
    rating: 4.7,
    reviewsCount: 1120,
    deliveryTime: "25-35 min",
    price: "₹₹",
    priceRange: "₹420 for two",
    offer: "30% OFF up to ₹80",
    badge: "Popular",
    isPureVeg: false,
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
    address: "12 Cyber City, Phase 2, Gurugram",
    description: "Sizzling wok tossed noodles, delicate crystal dumplings, and vibrant Asian street food classics.",
    menu: [
      {
        id: 501,
        name: "Crystal Truffle Edamame Dim Sum",
        category: "Starters",
        description: "Steamed translucent dumplings filled with crushed edamame, water chestnut, and black truffle oil.",
        price: 269,
        isVeg: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=500&q=80",
        bestseller: true
      },
      {
        id: 502,
        name: "Firecracker Dan Dan Noodles",
        category: "Recommended",
        description: "Hand-pulled noodles coated in spicy Sichuan chili paste, toasted peanuts, and tender minced chicken.",
        price: 299,
        isVeg: false,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80",
        bestseller: true
      },
      {
        id: 503,
        name: "Kung Pao Paneer Wok",
        category: "Main Course",
        description: "Crispy cottage cheese wok-tossed with fiery dry red chilies, crunchy cashews, and scallions.",
        price: 279,
        isVeg: true,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1546069901-d72d244243b6?auto=format&fit=crop&w=500&q=80",
        bestseller: false
      },
      {
        id: 504,
        name: "Classic Egg Fried Jasmine Rice",
        category: "Main Course",
        description: "Wok-fried fragrant jasmine rice with eggs, spring onions, light soy, and toasted sesame.",
        price: 239,
        isVeg: false,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=500&q=80",
        bestseller: false
      },
      {
        id: 505,
        name: "Matcha Iced Jasmine Tea",
        category: "Drinks",
        description: "Cold-brewed green jasmine tea lightly sweetened with raw honey and citrus peel.",
        price: 99,
        isVeg: true,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=500&q=80",
        bestseller: false
      }
    ]
  },
  {
    id: 6,
    name: "Sweet Atelier",
    cuisine: "Desserts",
    tags: ["Pastries", "Cheesecakes", "Cakes", "Gourmet Bakery"],
    rating: 4.9,
    reviewsCount: 1940,
    deliveryTime: "15-25 min",
    price: "₹₹",
    priceRange: "₹350 for two",
    offer: "Flat 15% OFF",
    badge: "Staff Pick",
    isPureVeg: true,
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1200&q=80",
    address: "9 Jubilee Hills, Hyderabad",
    description: "French artisanal patisserie, burnt Basque cheesecakes, warm molten cakes, and gourmet confectionery.",
    menu: [
      {
        id: 601,
        name: "San Sebastián Burnt Cheesecake",
        category: "Recommended",
        description: "Caramelized Basque cheesecake with a molten creamy center and Madagascar vanilla pod essence.",
        price: 269,
        isVeg: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=500&q=80",
        bestseller: true
      },
      {
        id: 602,
        name: "Molten Valrhona Lava Cake",
        category: "Recommended",
        description: "Warm chocolate sponge with an oozing liquid 70% dark Valrhona chocolate core.",
        price: 249,
        isVeg: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=500&q=80",
        bestseller: true
      },
      {
        id: 603,
        name: "French Macaron Box (4 pcs)",
        category: "Desserts",
        description: "Assorted delicate almond meringue shells: Pistachio, Raspberry Rose, Salted Caramel & Vanilla.",
        price: 289,
        isVeg: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1569864321390-dc97210e7b8f?auto=format&fit=crop&w=500&q=80",
        bestseller: false
      },
      {
        id: 604,
        name: "Artisan Sea Salt Caramel Latte",
        category: "Drinks",
        description: "Freshly pulled espresso with velvety steamed milk and house slow-cooked sea salt caramel.",
        price: 159,
        isVeg: true,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80",
        bestseller: false
      }
    ]
  },
  {
    id: 7,
    name: "Curry Theory",
    cuisine: "Indian",
    tags: ["Coastal Indian", "Curry", "Seafood", "Biryani"],
    rating: 4.7,
    reviewsCount: 970,
    deliveryTime: "30-40 min",
    price: "₹₹₹",
    priceRange: "₹600 for two",
    offer: "25% OFF above ₹600",
    badge: "Chef Curated",
    isPureVeg: false,
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=1200&q=80",
    address: "55 Koregaon Park, Pune",
    description: "Coastal spice blends, Malabar curries, flaky appams, and slow-roasted coconut gravies.",
    menu: [
      {
        id: 701,
        name: "Malabar Prawn Curry",
        category: "Recommended",
        description: "Succulent tiger prawns simmered in freshly pressed coconut milk, curry leaves, and Kodampuli.",
        price: 419,
        isVeg: false,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=500&q=80",
        bestseller: true
      },
      {
        id: 702,
        name: "Kerala Ghee Roast Dosa",
        category: "Starters",
        description: "Crispy fermented crepe roasted with fragrant golden cow ghee, served with 3 coastal chutneys.",
        price: 179,
        isVeg: true,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=500&q=80",
        bestseller: false
      },
      {
        id: 703,
        name: "Paneer Ghee Roast",
        category: "Main Course",
        description: "Tender paneer cubes pan-tossed in a robust Byadagi chili, peppercorn, and tangy tamarind paste.",
        price: 299,
        isVeg: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=500&q=80",
        bestseller: true
      },
      {
        id: 704,
        name: "Tender Coconut Payasam",
        category: "Desserts",
        description: "Velvety South-Indian pudding crafted with tender coconut pulp, coconut cream, and cardamom.",
        price: 159,
        isVeg: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1505253758473-96b3015f21c9?auto=format&fit=crop&w=500&q=80",
        bestseller: false
      }
    ]
  },
  {
    id: 8,
    name: "Urban Tandoor",
    cuisine: "Indian",
    tags: ["Tandoor", "Kebabs", "Rolls", "Street Food"],
    rating: 4.6,
    reviewsCount: 1310,
    deliveryTime: "20-28 min",
    price: "₹",
    priceRange: "₹280 for two",
    offer: "Flat ₹50 OFF",
    badge: "Pocket Friendly",
    isPureVeg: false,
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    address: "31 Sector 18, Noida",
    description: "Sizzling charcoal kebabs, flaky rumali rolls, and hearty North Indian street combos.",
    menu: [
      {
        id: 801,
        name: "Murgh Malai Kebab",
        category: "Starters",
        description: "Boneless chicken steeped in cream, cardamom, mild green chilies, and grilled to melt-in-mouth perfection.",
        price: 279,
        isVeg: false,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=500&q=80",
        bestseller: true
      },
      {
        id: 802,
        name: "Kathi Chicken Egg Roll",
        category: "Recommended",
        description: "Flaky paratha layered with egg, filled with spicy tandoori chicken chunks, sliced onions, and mint chutney.",
        price: 189,
        isVeg: false,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80",
        bestseller: true
      },
      {
        id: 803,
        name: "Soya Chaap Masala Curry",
        category: "Main Course",
        description: "Tender soya chaap roasted in clay oven and simmered in a spicy onion-tomato gravy.",
        price: 229,
        isVeg: true,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=80",
        bestseller: false
      }
    ]
  }
];

// Demo coupons for cart page
const PROMO_CODES = {
  "HUNGRYBIRDS40": { discountPercent: 40, maxDiscount: 100, minOrder: 199, label: "40% OFF up to ₹100" },
  "WELCOME50": { discountPercent: 50, maxDiscount: 150, minOrder: 299, label: "50% OFF up to ₹150" },
  "TASTY20": { discountPercent: 20, maxDiscount: 80, minOrder: 149, label: "20% OFF up to ₹80" }
};

if (typeof window !== 'undefined') {
  window.CATEGORIES = CATEGORIES;
  window.RESTAURANTS = RESTAURANTS;
  window.PROMO_CODES = PROMO_CODES;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CATEGORIES, RESTAURANTS, PROMO_CODES };
}

