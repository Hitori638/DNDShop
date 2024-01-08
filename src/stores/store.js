// stores/product.js

import { defineStore } from 'pinia';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    categories: ["HOME", "GEMSTONE DICE", "GLASS DICE", "METAL DICE", "SPECIALIST DICE", "ACCESSORIES", "OFFERS"],
    cartItems: [],
    selectedOptions: {},
    customerInfo: {},
  }),

  actions: {
    clearLocalStorage() {
      localStorage.removeItem('cartItems');
    },
    
    setSelectedOptions(selectedOptions) {
      this.selectedOptions = selectedOptions;
    },

    setCustomerInfo(customerInfo) {
      this.customerInfo = customerInfo;
    },

    generateOrderId() {
    
      const timestamp = new Date().getTime();
      const randomNum = Math.floor(Math.random() * 9000) + 1000;
      const orderId = `${timestamp}-${randomNum}`;
      
      return orderId;
    },
  

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
      defaultPrice: "$10.99",
      percentageSale: 18,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "https://via.placeholder.com/600x400",
      category: "Metal Dice",
      offer: false,
      price: "$8.99",
    },
    {
      id: 2,
      name: "Dice Set 2",
      defaultPrice: "$12.99",
      percentageSale: 0,
      description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "https://via.placeholder.com/600x400",
      category: "Glass Dice",
      offer: false,
      price: "$12.99",
    },
    {
      id: 3,
      name: "Gemstone Dice",
      defaultPrice: "$24.99",
      percentageSale: 20,
      description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      image: "https://via.placeholder.com/600x400",
      category: "Gemstone Dice",
      offer: true,
      price: "$19.99",
    },
    {
      id: 4,
      name: "Metallic D20",
      defaultPrice: "$15.99",
      percentageSale: 6,
      description: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "https://via.placeholder.com/600x400",
      category: "Metal Dice",
      offer: true,
      price: "$14.99",
    },
    {
      id: 5,
      name: "Crystal Dice Set",
      defaultPrice: "$29.99",
      percentageSale: 13,
      description: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: "https://via.placeholder.com/600x400",
      category: "Glass Dice",
      offer: true,
      price: "$26.09",
    },
    {
      id: 6,
      name: "Specialist D10",
      defaultPrice: "$18.99",
      percentageSale: 10,
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: "https://via.placeholder.com/600x400",
      category: "Specialist dice",
      offer: true,
      price: "$17.09",
    },
    {
      id: 7,
      name: "Dice Bag",
      defaultPrice: "$8.99",
      percentageSale: 0,
      description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: "https://via.placeholder.com/600x400",
      category: "Accessories",
      offer: false,
      price: "$8.99",
    },
    {
      id: 8,
      name: "Gold-plated Set",
      defaultPrice: "$39.99",
      percentageSale: 20,
      description: "Premium metal dice with a gold-plated finish.",
      image: "https://via.placeholder.com/600x400",
      category: "Metal Dice",
      offer: true,
      price: "$31.99",
    },
    {
      id: 9,
      name: "Titanium D6",
      defaultPrice: "$22.99",
      percentageSale: 0,
      description: "Durable and lightweight titanium dice for a unique gaming experience.",
      image: "https://via.placeholder.com/600x400",
      category: "Metal Dice",
      offer: false,
      price: "$22.99",
    },
    {
      id: 10,
      name: "Silver Dice Set",
      defaultPrice: "$29.99",
      percentageSale: 15,
      description: "Elegant silver-colored metal dice set for tabletop enthusiasts.",
      image: "https://via.placeholder.com/600x400",
      category: "Metal Dice",
      offer: true,
      price: "$25.49",
    },
    {
      id: 11,
      name: "Frosted Glass Set",
      defaultPrice: "$14.99",
      percentageSale: 0,
      description: "Smooth and stylish frosted glass dice set for a unique look.",
      image: "https://via.placeholder.com/600x400",
      category: "Glass Dice",
      offer: false,
      price: "$14.99",
    },
    {
      id: 12,
      name: "Color-changing D8",
      defaultPrice: "$17.99",
      percentageSale: 10,
      description: "Glass dice that change color based on temperature for added fun.",
      image: "https://via.placeholder.com/600x400",
      category: "Glass Dice",
      offer: true,
      price: "$16.19",
    },
    {
      id: 13,
      name: "Glitter Dice Set",
      defaultPrice: "$16.99",
      percentageSale: 5,
      description: "Sparkling and glittery glass dice set to add a touch of glamour to your games.",
      image: "https://via.placeholder.com/600x400",
      category: "Glass Dice",
      offer: true,
      price: "$16.14",
    },
    {
      id: 14,
      name: "Amethyst D12",
      defaultPrice: "$32.99",
      percentageSale: 15,
      description: "High-quality amethyst gemstone dice for a luxurious gaming experience.",
      image: "https://via.placeholder.com/600x400",
      category: "Gemstone Dice",
      offer: true,
      price: "$28.04",
    },
    {
      id: 15,
      name: "Rose Quartz Set",
      defaultPrice: "$27.99",
      percentageSale: 0,
      description: "Beautiful rose quartz gemstone dice set for tabletop enthusiasts.",
      image: "https://via.placeholder.com/600x400",
      category: "Gemstone Dice",
      offer: false,
      price: "$27.99",
    },
    {
      id: 16,
      name: "Obsidian D20",
      defaultPrice: "$36.99",
      percentageSale: 25,
      description: "Black obsidian gemstone dice with unique patterns for a mystical touch.",
      image: "https://via.placeholder.com/600x400",
      category: "Gemstone Dice",
      offer: true,
      price: "$27.74",
    },
    {
      id: 17,
      name: "Steampunk D6",
      defaultPrice: "$21.99",
      percentageSale: 0,
      description: "Intricately designed steampunk-themed six-sided dice for collectors.",
      image: "https://via.placeholder.com/600x400",
      category: "Specialist dice",
      offer: false,
      price: "$21.99",
    },
    {
      id: 18,
      name: "Translucent D4",
      defaultPrice: "$11.99",
      percentageSale: 10,
      description: "Crystal-clear translucent four-sided dice for unique gameplay.",
      image: "https://via.placeholder.com/600x400",
      category: "Specialist dice",
      offer: true,
      price: "$10.79",
    },
    {
      id: 19,
      name: "Glow-in-the-Dark D10",
      defaultPrice: "$14.99",
      percentageSale: 0,
      description: "D10 dice that glow in the dark, adding a cool element to your gaming sessions.",
      image: "https://via.placeholder.com/600x400",
      category: "Specialist dice",
      offer: false,
      price: "$14.99",
    },
    {
      id: 20,
      name: "Leather Dice Pouch",
      defaultPrice: "$12.99",
      percentageSale: 0,
      description: "Stylish and durable leather pouch to carry your favorite dice sets.",
      image: "https://via.placeholder.com/600x400",
      category: "Accessories",
      offer: false,
      price: "$12.99",
    },
    {
      id: 21,
      name: "Wooden Dice Tray",
      defaultPrice: "$19.99",
      percentageSale: 15,
      description: "Handcrafted wooden dice tray for a premium rolling experience.",
      image: "https://via.placeholder.com/600x400",
      category: "Accessories",
      offer: true,
      price: "$16.99",
    },
    {
      id: 22,
      name: "Dice Tower",
      defaultPrice: "$24.99",
      percentageSale: 0,
      description: "Foldable dice tower for a fun and convenient way to roll your dice.",
      image: "https://via.placeholder.com/600x400",
      category: "Accessories",
      offer: false,
      price: "$24.99",
    }];
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
