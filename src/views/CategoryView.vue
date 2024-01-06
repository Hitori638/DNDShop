<!-- CategoryView.vue -->

<template>
    <div>
      <h2>{{ selectedCategory }}</h2>
      <div v-for="product in filteredProducts" :key="product.id">
        <ProductCard :product="product" @add-to-cart="addToCart" />
      </div>
    </div>
  </template>
  
  <script>
  import { useProductStore } from '@/stores/store';
  import ProductCard from '@/components/ProductCard.vue';
  
  export default {
    components: {
      ProductCard,
    },
    computed: {
      selectedCategory() {
        return this.$route.params.categoryName; 
      },
      filteredProducts() {
        const store = useProductStore();
        return store.state.products.filter(product => product.category === this.selectedCategory);
      },
    },
    methods: {
      addToCart(product) {
     
      },
    },
    created() {
      const store = useProductStore();
      if (store.state.products.length === 0) {

        store.dispatch('fetchProducts');
      }
    },
  };
  </script>
  