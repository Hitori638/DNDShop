// stores/product.js

import { defineStore } from 'pinia';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    categories: ["HOME", "GEMSTONE DICE", "GLASS DICE", "METAL DICE", "SPECIALIST DICE", "ACCESSORIES", "OFFERS"],
    cartItems: [],
  }),

  actions: {

    initializeStore() {
      const savedCartItems = localStorage.getItem('cartItems');
      if (savedCartItems) {
        this.cartItems = JSON.parse(savedCartItems);
      }
    },

    fetchProducts() {
      this.products = [
        {
          id: 1,
          name: "Dice Set 1",
          price: "$10.99",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          image: "https://via.placeholder.com/600x400",
          category: "Metal Dice",
        },
        {
          id: 2,
          name: "Dice Set 2",
          price: "$12.99",
          description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          image: "https://via.placeholder.com/600x400",
          category: "Glass Dice",
        },
        {
          id: 3,
          name: "Gemstone Dice",
          price: "$24.99",
          description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
          image: "https://via.placeholder.com/600x400",
          category: "Gemstone Dice",
        },
        {
          id: 4,
          name: "Metallic D20",
          price: "$15.99",
          description: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          image: "https://via.placeholder.com/600x400",
          category: "Metal Dice",
        },
        {
          id: 5,
          name: "Crystal Dice Set",
          price: "$29.99",
          description: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          image: "https://via.placeholder.com/600x400",
          category: "Glass Dice",
        },
        {
          id: 6,
          name: "Specialist D10",
          price: "$18.99",
          description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          image: "https://via.placeholder.com/600x400",
          category: "Specialist dice",
        },
        {
          id: 7,
          name: "Dice Bag",
          price: "$8.99",
          description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          image: "https://via.placeholder.com/600x400",
          category: "Accessories",
        },
    
        {
          id: 8,
          name: "Gold-plated Set",
          price: "$39.99",
          description: "Premium metal dice with a gold-plated finish.",
          image: "https://via.placeholder.com/600x400",
          category: "Metal Dice",
        },
        {
          id: 9,
          name: "Titanium D6",
          price: "$22.99",
          description: "Durable and lightweight titanium dice for a unique gaming experience.",
          image: "https://via.placeholder.com/600x400",
          category: "Metal Dice",
        },
        {
          id: 10,
          name: "Silver Dice Set",
          price: "$29.99",
          description: "Elegant silver-colored metal dice set for tabletop enthusiasts.",
          image: "https://via.placeholder.com/600x400",
          category: "Metal Dice",
        },
     
        {
          id: 11,
          name: "Frosted Glass Set",
          price: "$14.99",
          description: "Smooth and stylish frosted glass dice set for a unique look.",
          image: "https://via.placeholder.com/600x400",
          category: "Glass Dice",
        },
        {
          id: 12,
          name: "Color-changing D8",
          price: "$17.99",
          description: "Glass dice that change color based on temperature for added fun.",
          image: "https://via.placeholder.com/600x400",
          category: "Glass Dice",
        },
        {
          id: 13,
          name: "Glitter Dice Set",
          price: "$16.99",
          description: "Sparkling and glittery glass dice set to add a touch of glamour to your games.",
          image: "https://via.placeholder.com/600x400",
          category: "Glass Dice",
        },
     
        {
          id: 14,
          name: "Amethyst D12",
          price: "$32.99",
          description: "High-quality amethyst gemstone dice for a luxurious gaming experience.",
          image: "https://via.placeholder.com/600x400",
          category: "Gemstone Dice",
        },
        {
          id: 15,
          name: "Rose Quartz Set",
          price: "$27.99",
          description: "Beautiful rose quartz gemstone dice set for tabletop enthusiasts.",
          image: "https://via.placeholder.com/600x400",
          category: "Gemstone Dice",
        },
        {
          id: 16,
          name: "Obsidian D20",
          price: "$36.99",
          description: "Black obsidian gemstone dice with unique patterns for a mystical touch.",
          image: "https://via.placeholder.com/600x400",
          category: "Gemstone Dice",
        },
     
        {
          id: 17,
          name: "Steampunk D6",
          price: "$21.99",
          description: "Intricately designed steampunk-themed six-sided dice for collectors.",
          image: "https://via.placeholder.com/600x400",
          category: "Specialist dice",
        },
        {
          id: 18,
          name: "Translucent D4",
          price: "$11.99",
          description: "Crystal-clear translucent four-sided dice for unique gameplay.",
          image: "https://via.placeholder.com/600x400",
          category: "Specialist dice",
        },
        {
          id: 19,
          name: "Glow-in-the-Dark D10",
          price: "$14.99",
          description: "D10 dice that glow in the dark, adding a cool element to your gaming sessions.",
          image: "https://via.placeholder.com/600x400",
          category: "Specialist dice",
        },
   
        {
          id: 20,
          name: "Leather Dice Pouch",
          price: "$12.99",
          description: "Stylish and durable leather pouch to carry your favorite dice sets.",
          image: "https://via.placeholder.com/600x400",
          category: "Accessories",
        },
        {
          id: 21,
          name: "Wooden Dice Tray",
          price: "$19.99",
          description: "Handcrafted wooden dice tray for a premium rolling experience.",
          image: "https://via.placeholder.com/600x400",
          category: "Accessories",
        },
        {
          id: 22,
          name: "Dice Tower",
          price: "$24.99",
          description: "Foldable dice tower for a fun and convenient way to roll your dice.",
          image: "https://via.placeholder.com/600x400",
          category: "Accessories",
        },
      
 
      ];
    },

    getProductById(productId) {
      const product = this.products.find((p) => p.id === parseInt(productId));
      return product || null;
    },

    fetchCategories() {
      this.categories = ["HOME", "GEMSTONE DICE", "GLASS DICE", "METAL DICE", "SPECIALIST DICE", "ACCESSORIES", "OFFERS"];
    },

    addToCart(product) {
      const existingProductIndex = this.cartItems.findIndex((p) => p.id === product.id);

      if (existingProductIndex !== -1) {

        this.cartItems[existingProductIndex].quantity += product.quantity;
      } else {

        this.cartItems.push(product);
      }

      this.saveCartToLocalStorage(); 
    },

    removeFromCart(productId) {
      const cartItemIndex = this.cartItems.findIndex((item) => item.id === productId);

      if (cartItemIndex !== -1) {

        this.cartItems.splice(cartItemIndex, 1);
        this.saveCartToLocalStorage(); 
      } else {
        console.warn(`Item with ID ${productId} not found in the cart.`);
      }
    },


    saveCartToLocalStorage() {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    },
  },

  mutations: {
    updateProducts(newProducts) {
      this.products = newProducts;
      this.initializeStore(); 
    },

    updateCartItemQuantity(state, payload) {
      const { productId, quantity } = payload;
      const cartItem = state.cartItems.find(item => item.id === productId);

      if (cartItem) {
        cartItem.quantity = quantity;
        this.saveCartToLocalStorage(); 
      }
    },
  },
});
