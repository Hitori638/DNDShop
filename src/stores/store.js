// stores/product.js

import { defineStore } from 'pinia';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    categories: ["HOME", "GEMSTONE DICE", "GLASS DICE", "METAL DICE", "SPECIALIST DICE", "ACCESSORIES", "OFFERS"],
    cartItems: [],
  }),

  actions: {
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
          category: "Specialist",
        },
        {
          id: 7,
          name: "Dice Bag",
          price: "$8.99",
          description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          image: "https://via.placeholder.com/600x400",
          category: "Accessories",
        },
        // Add more examples as needed
      ];
    }
    ,
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
        // Product already exists in the cart, update the quantity
        this.cartItems[existingProductIndex].quantity += product.quantity;
      } else {
        // Product is not in the cart, add it
        this.cartItems.push(product);
      }
    },
    removeFromCart(productId) {
      const cartItemIndex = this.cartItems.findIndex((item) => item.id === productId);

      if (cartItemIndex !== -1) {
        // Remove the item from the cart
        this.cartItems.splice(cartItemIndex, 1);
      } else {
        console.warn(`Item with ID ${productId} not found in the cart.`);
      }
    },
    
  },
  

  mutations: {
    updateProducts(newProducts) {
      this.products = newProducts;
    },
    updateCartItemQuantity(state, payload) {
      const { productId, quantity } = payload;
      const cartItem = state.cartItems.find(item => item.id === productId);
  
      if (cartItem) {
        cartItem.quantity = quantity;
      }
    },
  },
  },
);
