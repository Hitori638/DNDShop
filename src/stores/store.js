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
        },
        {
          id: 2,
          name: "Dice Set 2",
          price: "$12.99",
          description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          image: "https://via.placeholder.com/600x400",
        },
        {
          id: 3,
          name: "Gemstone Dice",
          price: "$24.99",
          description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
          image: "https://via.placeholder.com/600x400",
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
      this.cartItems.push(product);
    },

  },
  

  mutations: {
    updateProducts(newProducts) {
      this.products = newProducts;
    },
  },
});
