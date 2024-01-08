<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title class="mr-4">DnDice.com</v-toolbar-title>

    <!-- Navbar.vue -->

<v-btn
  text
  v-for="category in categories"
  :key="category"
  @click="navigate(category)"
  :class="{ 'primary--text': currentCategory === category }"
>
  {{ category }}
</v-btn>


    <v-spacer></v-spacer>

    <v-btn icon @click="toggleCart">
      <v-icon>mdi-cart</v-icon>
      <v-badge :content="totalCartItemsQuantity" overlap color="red" class="ml-2"></v-badge>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { useProductStore } from '@/stores/store';

export default {
  props: {
    currentCategory: String,
  },
  computed: {
    store() {
      return useProductStore();
    },
    totalCartItemsQuantity() {
      return this.store.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
    categories() {
      return this.store.categories;
    },
  },
  methods: {
    toggleCart() {
      this.$emit('toggle-cart');
    },
    navigate(category) {
  if (category.toLowerCase() === 'home') {
    this.$router.push('/');
  } else if (category !== this.currentCategory) {

    const encodedCategory = encodeURIComponent(category.toLowerCase());
    this.$router.push({ name: 'category-view', params: { categoryName: encodedCategory } });
  }
},

  },
};
</script>
