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
  export default {
    data() {
      return {
        slides: [
          {
            id: 1,
            image: "https://via.placeholder.com/800x400",
          },
          {
            id: 2,
            image: "https://via.placeholder.com/800x400",
          },
          // Add more slides as needed
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add styling for the slideshow if necessary */
  </style>
  