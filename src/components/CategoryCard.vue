<!-- CategoryCard.vue -->

<template>
    <v-card class="category-card">
      <v-img :src="category.image" height="200" contain></v-img>
      <v-card-title class="mt-2">{{ category.name }}</v-card-title>
      <v-card-actions>
        <v-btn @click="viewCategory" color="primary">View</v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script>
  export default {
    props: {
      category: Object,
    },
    methods: {
      viewCategory() {
        this.$emit('view-category', this.category);
      },
    },
  };
  </script>
  
  <style scoped>

  .category-card {
    margin-bottom: 20px; 
  }
  </style>
  