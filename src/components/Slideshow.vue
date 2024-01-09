<!-- Slideshow.vue -->
<template>
  <div>
    <v-carousel>
      <v-carousel-item v-for="(slide, index) in slides" :key="index">
        <v-img :src="slide.image" height="400" contain></v-img>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import { useProductStore } from '@/stores/store';

export default {
  data() {
    return {
      slides: [""],
    };
  },
  mounted() {

    const productStore = useProductStore();
    productStore.fetchSlides();


    this.slides = productStore.slides;
  },
};
</script>

<style scoped>

</style>
