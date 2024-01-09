<template>
    <v-app>
      <Navbar @toggle-cart="toggleCartDrawer" />
      <v-container class="payment-container mt-11">
        <v-card>
          <v-card-title class="headline z-index-1">Payment Information</v-card-title>
          <v-card-text>
      
            <template v-if="selectedPaymentMethod == 'Credit Card'" >
              <v-row>
                <v-col md="6" sm="12">
                  <v-text-field v-model="cardNumber" label="Card Number"></v-text-field>
                </v-col>
                <v-col md="6" sm="12">
                  <v-text-field v-model="expiryDate" label="Expiry Date"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col md="6" sm="12">
                  <v-text-field v-model="cvv" label="CVV"></v-text-field>
                </v-col>
             
              </v-row>
              <v-divider class="my-4"></v-divider>
            </template>

            <v-col md="6" sm="12" v-if="selectedPaymentMethod === 'PayPal'">
   
              <v-btn color="yellow" @click="payWithPayPal">Pay with PayPal</v-btn>
            </v-col>
        
            <v-card class="mb-4">
              <v-card-title class="headline z-index-1">Order Summary</v-card-title>
              <v-card-text>
                <p>Total Items: {{ totalItems }}</p>
                <p>Total Price: ${{ totalPrice }}</p>
           
                <p>Delivery Type: {{ selectedDeliveryType }}</p>
                <p>Payment Method: {{ selectedPaymentMethod }}</p>
         
                <p>Name: {{ customerInfo.name }} {{ customerInfo.surname }}</p>
                <p>Email: {{ customerInfo.email }}</p>
                <p>Phone: {{ customerInfo.phone }}</p>
                <p>Address: {{ customerInfo.address }}</p>
              </v-card-text>
            </v-card>
 
            <v-btn @click="confirmOrder" color="success">
              Confirm Order
            </v-btn>
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
    data() {
      return {
        cardNumber: '',
        expiryDate: '',
        cvv: '',
      };
    },
    computed: {
      cartItems() {
        return useProductStore().cartItems;
      },
      totalItems() {
        return this.cartItems.reduce((total, item) => total + item.quantity, 0);
      },
      totalPrice() {
      return this.cartItems.reduce((total, item) => {
        const itemPrice = parseFloat(item.price.replace('$', ''));
        const itemQuantity = item.quantity;

        if (!isNaN(itemPrice)) {
          return total + itemPrice * itemQuantity;
        } else {
          console.error(`Invalid price for item ${item.name}: ${item.price}`);
          return total;
        }
      }, 0).toFixed(2);
    },
      selectedDeliveryType() {
        return useProductStore().selectedOptions.deliveryType;
      },
      selectedPaymentMethod() {
        
        return useProductStore().selectedOptions.paymentMethod;
        
      },
      deliveryTypes() {
        return useProductStore().deliveryTypes;
      },
      paymentMethods() {
        return useProductStore().paymentMethods;
      },
      customerInfo() {
        return useProductStore().customerInfo;
      },
      
    },
    methods: {
      confirmOrder() {

        this.$router.push('/thank-you');
      },
    },

  };
  </script>
  
  <style scoped>
  .payment-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  </style>
  