<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title class="mr-4">DnDice.com</v-toolbar-title>
    

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


    <v-autocomplete
  v-model="search"
  :items="filteredProducts"
  item-text="name"
  item-value="id"
  placeholder="Search products"
  @input="searchProducts"
  
>
  <template v-slot:selection="{ item }">
    {{ item.name }}
  </template>
</v-autocomplete>



    <v-btn icon @click="toggleCart" class="ml-2">
      <v-icon>mdi-cart</v-icon>
      <v-badge :content="cartItemsCount" overlap color="red" class="ml-2"></v-badge>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { useProductStore } from '@/stores/store';

export default {
  props: {
    currentCategory: String,
  },
  data() {
    return {
      search: '',
    };
  },
  computed: {
    store() {
      return useProductStore();
    },
    cartItemsCount() {
      return this.store.cartItems.length;
    },
    products() {
      return this.store.products;
    },
    categories() {
      return this.store.categories;
    },
    filteredProducts() {

  const searchQuery = this.search ?? '';


  return this.products
    .filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .map(product => product.name); 
},


  },
  methods: {
    toggleCart() {
      this.$emit('toggle-cart');
    },
    navigate(category) {
      this.$emit('navigate', category);
    },
    
  },
};
</script>