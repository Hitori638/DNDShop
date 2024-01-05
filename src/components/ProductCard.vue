<!-- ProductCard.vue -->

<template>
  <v-card class="pa-4 product-card" @click="redirectToProductView">
    <v-img :src="product.image" height="300" contain></v-img>
    <v-card-title class="mt-2">{{ product.name }}</v-card-title>
    <v-card-subtitle>{{ product.price }}</v-card-subtitle>
    <v-card-text>{{ product.description }}</v-card-text>
    <v-card-actions>
      <v-btn @click.stop="addToCart" text color="primary">Add to Cart</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.product);
    },
    redirectToProductView() {
      this.$router.push({ name: 'product-view', params: { productId: this.product.id } });
    },
  },
};
</script>
