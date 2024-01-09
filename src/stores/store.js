// stores/product.js

import { defineStore } from 'pinia';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    categories: ["HOME", "GEMSTONE DICE", "GLASS DICE", "METAL DICE", "SPECIALIST DICE", "ACCESSORIES", "OFFERS"],
    cartItems: [],
    selectedOptions: {},
    customerInfo: {},
    slides: [],
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

    emptyCart() {
      this.cartItems = [];
      this.saveCartToLocalStorage();
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

    fetchSlides() {
      this.slides = [
        {
          id: 2,
          image: "https://verasartsanddice.com/wp-content/uploads/2020/09/DSCF7697-1024x390.jpg",
        },
        {
          id: 3,
          image: "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/S/aplus-media-library-service-media/e4892914-8628-4509-987a-ec03b7937304.__CR0,0,970,600_PT0_SX970_V1___.jpg",
        },
        {
          id: 4,
          image: "https://images.squarespace-cdn.com/content/v1/5c8ed82db7c92c6291f7e79f/1588769174171-SWVJETJOR207J676S6J3/Banner.jpg",
        },
        {
          id: 5,
          image: "https://www.elderwoodacademy.com/wp-content/uploads/2021/11/hex-chest-walnut-emerald-cat-dice-detail-banner.jpg",
        },
        {
          id: 6,
          image: "https://mintmustard.co.uk/cdn/shop/articles/website_banners_720x.png?v=1673446950",
        },
      ];
    },
  

    fetchProducts() {
  this.products = [
    {
      id: 1,
      name: "Silver Dice Set",
      defaultPrice: "$10.99",
      percentageSale: 18,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "https://www.rollacrit.com/cdn/shop/products/Old_Dragon_Metal_Silver_7SD_2677_7cb25053-d835-4ce2-9242-978f19705226.jpg?v=1663669147",
      category: "Metal Dice",
      offer: false,
      price: "$8.99",
    },
    {
      id: 2,
      name: "Glassy Dice Set",
      defaultPrice: "$12.99",
      percentageSale: 0,
      description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/71BknWbyaFL.jpg",
      category: "Glass Dice",
      offer: false,
      price: "$12.99",
    },
    {
      id: 3,
      name: "Amethyst Dice Set",
      defaultPrice: "$24.99",
      percentageSale: 20,
      description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      image: "https://www.norsefoundry.com/cdn/shop/products/Photo_Oct_30_2_41_27_PM_5000x.jpg?v=1674511030",
      category: "Gemstone Dice",
      offer: true,
      price: "$19.99",
    },
    {
      id: 4,
      name: "Titanium Dice Set",
      defaultPrice: "$15.99",
      percentageSale: 6,
      description: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "https://www.norsefoundry.com/cdn/shop/products/PhotoApr19_35642PM_2000x.jpg?v=1665768050",
      category: "Metal Dice",
      offer: true,
      price: "$14.99",
    },
    {
      id: 5,
      name: "Ruby Dice Set",
      defaultPrice: "$29.99",
      percentageSale: 13,
      description: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: "https://fanrolldice.com/wp-content/uploads/2022/11/JulyRuby-scaled.jpg",
      category: "Glass Dice",
      offer: true,
      price: "$26.09",
    },
    {
      id: 6,
      name: "Specialist dice set",
      defaultPrice: "$18.99",
      percentageSale: 10,
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: "https://static.wixstatic.com/media/100764_1e22d5f574034dc7a90211fd554f3d34~mv2.jpg/v1/fill/w_560,h_560,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/100764_1e22d5f574034dc7a90211fd554f3d34~mv2.jpg",
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
      image: "https://img.fruugo.com/product/1/48/832179481_max.jpg",
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
      image: "https://darkelfdice.com/cdn/shop/products/GoldDice2.jpg?v=1628289379",
      category: "Metal Dice",
      offer: true,
      price: "$31.99",
    },
    {
      id: 9,
      name: "Copper Dice Set",
      defaultPrice: "$22.99",
      percentageSale: 0,
      description: "Durable and lightweight titanium dice for a unique gaming experience.",
      image: "https://easyrollerdice.com/cdn/shop/products/DSC06169.jpg?v=1617662516",
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
      image: "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/81ajY1LQRVL._AC_UF894,1000_QL80_.jpg",
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
      image: "https://i.etsystatic.com/20151778/r/il/e45740/3697990643/il_570xN.3697990643_489w.jpg",
      category: "Glass Dice",
      offer: false,
      price: "$14.99",
    },
    {
      id: 12,
      name: "Color-changing Set",
      defaultPrice: "$17.99",
      percentageSale: 10,
      description: "Glass dice that change color based on temperature for added fun.",
      image: "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/81NiWGZHGKL._AC_UF894,1000_QL80_.jpg",
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
      image: "https://darkelfdice.com/cdn/shop/products/GlitterRainbowDice2.jpg?v=1656185007",
      category: "Glass Dice",
      offer: true,
      price: "$16.14",
    },
    {
      id: 14,
      name: "Amethyst dice set",
      defaultPrice: "$32.99",
      percentageSale: 15,
      description: "High-quality amethyst gemstone dice for a luxurious gaming experience.",
      image: "https://www.norsefoundry.com/cdn/shop/products/Photo_Oct_30_2_41_27_PM_5000x.jpg?v=1674511030",
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
      image: "https://gametee.co.uk/cdn/shop/products/clear-quartz-gemstone-dice-set-435698.jpg?v=1599679921",
      category: "Gemstone Dice",
      offer: false,
      price: "$27.99",
    },
    {
      id: 16,
      name: "Obsidian dice set",
      defaultPrice: "$36.99",
      percentageSale: 25,
      description: "Black obsidian gemstone dice with unique patterns for a mystical touch.",
      image: "https://darkelfdice.com/cdn/shop/products/Obsidiand20.jpg?v=1679588322",
      category: "Gemstone Dice",
      offer: true,
      price: "$27.74",
    },
    {
      id: 17,
      name: "Steampunk dice set",
      defaultPrice: "$21.99",
      percentageSale: 0,
      description: "Intricately designed steampunk-themed six-sided dice for collectors.",
      image: "https://q-workshop.com/img/p/2/6/0/0/2600-large_default.jpg",
      category: "Specialist dice",
      offer: false,
      price: "$21.99",
    },
    {
      id: 18,
      name: "Translucent dice set",
      defaultPrice: "$11.99",
      percentageSale: 10,
      description: "Crystal-clear translucent four-sided dice for unique gameplay.",
      image: "https://www.awesomedice.com/cdn/shop/products/chessex-translucent-red.jpg?v=1569097497",
      category: "Specialist dice",
      offer: true,
      price: "$10.79",
    },
    {
      id: 19,
      name: "Glow-in-the-Dark dice set",
      defaultPrice: "$14.99",
      percentageSale: 0,
      description: "D10 dice that glow in the dark, adding a cool element to your gaming sessions.",
      image: "https://darkelfdice.com/cdn/shop/products/Luminary_Dice_1b.jpg?v=1556830582",
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
      image: "https://i.etsystatic.com/14338001/r/il/570c45/3866253324/il_fullxfull.3866253324_4sbx.jpg",
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
      image: "https://i.etsystatic.com/22599340/r/il/47bd1f/4087874156/il_fullxfull.4087874156_o73u.jpg",
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
      image: "https://m.media-amazon.com/images/I/71e8Z6AFkYL.jpg",
      category: "Accessories",
      offer: false,
      price: "$129.99",
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

    
  },
});
