<!-- components/views/SuccessView.vue -->

<template>
    <v-app>
      <Navbar />
      <v-container class="success-container mt-11">
        <v-card class="custom-card">
          <v-card-title class="headline large-font z-index-1">Order Confirmation</v-card-title>
          <v-card-text>
            <p class="large-font">Dear {{ customerInfo.name }} {{ customerInfo.surname }},</p>
            <p class="large-font">Thank you for shopping with us! Your order has been successfully placed.</p>
            <p class="large-font">Your order details are being processed, and you will receive an email confirmation shortly.</p>
            <v-divider class="my-4"></v-divider>
            <p class="large-font">Order ID: {{ generateOrderId() }}</p>
            <v-divider class="my-4"></v-divider>
            <p class="large-font">We appreciate your business and look forward to serving you again in the future.</p>
            <p class="large-font">Should you have any questions or concerns, feel free to contact our customer support.</p>
            <p class="large-font">Best regards,</p>
            <p class="large-font">The [DnDice.com] Team</p>
          </v-card-text>
        </v-card>
      </v-container>
      <Footer />
    </v-app>
  </template>
  
  <script>
  import { useProductStore } from '@/stores/store';
  import Navbar from '@/components/Navbar.vue';
  import Footer from '@/components/Footer.vue';
  
  export default {
    components: {
      Navbar,
      Footer,
    },
    computed: {
      customerInfo() {
        return useProductStore().customerInfo;
      },
    },
    methods: {
      generateOrderId() {
        return useProductStore().generateOrderId();
      },
    },
    created() {

      useProductStore().clearLocalStorage();
      useProductStore().emptyCart();
      


 
    },
  };
  </script>
  
  <style scoped>
  .success-container {
    max-width: 1200px; 
    margin: 0 auto;
    padding: 40px; 
  }
  
  .custom-card {
    height: 500px; 
  }
  
  .large-font {
    font-size: 25px; 
    line-height: 40px;
  }
  </style>
  