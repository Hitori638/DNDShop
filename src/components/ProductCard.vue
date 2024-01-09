<!-- ProductCard.vue -->

<template>
  <v-card class="pa-4 product-card" @click="redirectToProductView">
    <v-img :src="product.image" height="300" contain></v-img>
    <v-card-title class="mt-2">{{ product.name }}</v-card-title>
    <v-card-subtitle>
      <span v-if="product.offer" class="default-price">{{ product.defaultPrice }}</span>
      <span v-if="product.offer">
        &nbsp;{{ calculateSalePrice(product.defaultPrice, product.percentageSale) }}
        <span class="sale-info"> ({{ product.percentageSale }}% off)</span>
      </span>
      <span v-else>{{ product.defaultPrice }}</span>
    </v-card-subtitle>
    <v-card-text>{{ product.description }}</v-card-text>
    <v-card-actions>
      <v-btn @click.stop="addToCart" text color="primary">Add to Cart</v-btn>
    </v-card-actions>
  </v-card>
</template>


<script>
import { useProductStore } from '@/stores/store';

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addToCart() {
      const quantity = 1;
      useProductStore().addToCart({ ...this.product, quantity });
    },
    redirectToProductView() {
      this.$router.push({ name: 'product-view', params: { productId: this.product.id } });
    },
    calculateSalePrice(defaultPrice, percentageOff) {
      const price = parseFloat(defaultPrice.replace('$', ''));
      const discount = (price * percentageOff) / 100;
      const salePrice = price - discount;
      return `$${salePrice.toFixed(2)}`;
    },
  },
};
</script>

<style scoped>
.default-price {
  text-decoration: line-through;
  color: grey;
}

.sale-info {
  color: rgb(255, 0, 0); 
}
</style>