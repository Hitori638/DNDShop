<!-- HomeView.vue -->

<template>
  <v-app>
    <Navbar
      @toggle-cart="toggleCartDrawer"
    />
    <Slideshow/>
    <v-container class="mt-8">
      <!-- Special offers -->
      <v-row class="mt-4">
        <v-col v-for="offer in specialOffers" :key="offer.id" cols="12" md="12" lg="12">
          <v-card class="pa-4 special-offer-card" style="background-color: #ff0000;">
            <v-img :src="offer.image" height="300" contain></v-img>
            <v-card-title class="mt-2">{{ offer.name }}</v-card-title>
            <v-card-subtitle>{{ offer.discountedPrice }} <span class="discounted-price">{{ offer.price }}</span></v-card-subtitle>
            <v-card-text>{{ offer.description }}</v-card-text>
            <v-card-actions>
              <v-btn text color="primary">View Offer</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- Welcome -->
      <v-row>
        <v-col cols="12">
          <h1 class="display-2 text-center mb-4">Welcome to DnDice.com</h1>
          <p class="text-center">Your one-stop shop for all things D&D related dice and gaming accessories!</p>
        </v-col>
      </v-row>

      <!-- products section -->
      <v-row>
        <v-col
          v-for="product in featuredProducts"
          :key="product.id"
          cols="12"
          md="4"
          class="product-card"
        >
          <product-card
            :product="product"
            @add-to-cart="addToCart"
          />
        </v-col>
      </v-row>
    </v-container>

    <!-- Category cards -->
    <v-row class="mt-4">
      <v-col
        v-for="category in categories.filter(cat => cat !== 'HOME')"
        :key="category"
        cols="12"
        md="4"
        lg="4"
        class="category-card"
      >
        <category-card
          :category="{ name: category, image: 'https://via.placeholder.com/400x300' }"
          @view-category="navigate"
        />
      </v-col>
    </v-row>

    <!-- Cart Drawer -->
    <v-navigation-drawer location="right" v-model="isCartDrawerOpen" app right temporary>
      <v-container>
        <h2>Your Shopping Cart</h2>
        <v-list>
          <v-list-item-group v-if="cartItems.length > 0">
            <v-list-item v-for="item in cartItems" :key="item.id">
              <v-list-item-content>{{ item.name }} - {{ item.price }}</v-list-item-content>
            </v-list-item>
          </v-list-item-group>
          <v-list-item v-else>
            <v-list-item-content>No items in the cart</v-list-item-content>
          </v-list-item>
        </v-list>
        <v-btn color="primary" @click="proceedToCheckout">Proceed to Checkout</v-btn>
      </v-container>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';
import CategoryCard from '@/components/CategoryCard.vue';
import Navbar from '@/components/Navbar.vue';
import { useProductStore } from '@/stores/store';
import Slideshow from '@/components/Slideshow.vue'; 


export default {
  name: "HomeView",
  components: {
    ProductCard,
    CategoryCard,
    Navbar,
    Slideshow,
  },
  data() {
    return {
      isCartDrawerOpen: false,
      currentCategory: "HOME",
    };
  },
  computed: {
    featuredProducts() {
      return useProductStore().products.slice(0, 3);
    },
    specialOffers() {
      return [
        {
          id: 1,
          name: "Special Offer 1",
          price: "$29.99",
          discountedPrice: "$19.99",
          description: "Limited time offer! Grab it now!",
          image: "https://via.placeholder.com/600x400",
        },
      ];
    },
    categories() {
      return useProductStore().categories;
    },
    cartItems() {
      return useProductStore().cartItems;
    },
  },
  methods: {
    addToCart(product) {
      useProductStore().addToCart(product);
    },
    proceedToCheckout() {
      // Implement the checkout logic here
    },
    navigate(category) {
      this.currentCategory = category;
      // Implement navigation logic for the selected category
    },
    
    toggleCartDrawer() {
      this.isCartDrawerOpen = !this.isCartDrawerOpen;
    },
  },
  created() {
    useProductStore().fetchProducts();
    useProductStore().fetchCategories();
  },
};
</script>

<style scoped>

.product-card {
  margin-bottom: 20px; 
}
</style>
