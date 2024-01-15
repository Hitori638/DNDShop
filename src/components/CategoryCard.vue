<template>
  <v-card class="category-card">

    <v-card-title class="mt-2 d-flex justify-center text-h6">{{ categoryName }}</v-card-title>
    <v-card-actions class="d-flex justify-center">
      <v-btn @click="viewCategory" color="primary">View</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    category: String,
  },
  computed: {
    categoryName() {
      return this.category;
    },
  },
  methods: {
    viewCategory() {
      this.$emit('view-category', this.categoryName);
    },
  },
};
</script>

