<template>
  <v-app>
    <Navbar />
    <v-container class="payment-container mt-11">
      <v-card class="payment-card">
        <v-card-title class="headline z-index-1 payment-title">Payment Information</v-card-title>
        <v-card-text>

          <template v-if="selectedPaymentMethod == 'Credit Card'">
            <v-row class="payment-row">
              <v-col md="6" sm="12">
                <v-text-field v-model="cardNumber" label="Card Number" class="payment-input"></v-text-field>
              </v-col>
              <v-col md="6" sm="12">
                <v-text-field v-model="expiryDate" label="Expiry Date" class="payment-input"></v-text-field>
              </v-col>
            </v-row>
            <v-row class="payment-row">
              <v-col md="6" sm="12">
                <v-text-field v-model="cvv" label="CVV" class="payment-input"></v-text-field>
              </v-col>
            </v-row>
            <v-divider class="my-4"></v-divider>
          </template>

          <v-row v-if="selectedPaymentMethod === 'PayPal'" class="payment-row">
            <v-col md="6" sm="12">
              <v-btn color="yellow" @click="payWithPayPal" class="paypal-btn">Pay with PayPal</v-btn>
            </v-col>
          </v-row>

          <v-card class="order-summary-card">
            <v-card-title class="headline z-index-1 payment-title">Order Summary</v-card-title>
            <v-card-text>
              <p class="order-info">Total Items: {{ totalItems }}</p>
              <p class="order-info">Total Price: ${{ totalPrice }}</p>
              <p class="order-info">Delivery Type: {{ selectedDeliveryType }}</p>
              <p class="order-info">Payment Method: {{ selectedPaymentMethod }}</p>
              <p class="customer-info">Name: {{ customerInfo.name }} {{ customerInfo.surname }}</p>
              <p class="customer-info">Email: {{ customerInfo.email }}</p>
              <p class="customer-info">Phone: {{ customerInfo.phone }}</p>
              <p class="customer-info">Address: {{ customerInfo.address }}</p>
            </v-card-text>
          </v-card>

          <v-btn @click="confirmOrder" color="success" class="confirm-order-btn">
            Confirm Order
          </v-btn>
        </v-card-text>
      </v-card>
    </v-container>
    <Footer />
  </v-app>
</template>

<style scoped>
  .payment-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }

  .payment-card {
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .payment-title {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
  }

  .payment-input {
    font-size: 16px;
  }

  .payment-row {
    margin-bottom: 20px;
  }

  .paypal-btn {
    font-size: 18px;
    text-transform: uppercase;
  }

  .order-summary-card {
    margin-top: 20px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .order-info {
    font-size: 18px;
    color: #333;
    margin-bottom: 10px;
  }

  .customer-info {
    font-size: 16px;
    color: #555;
    margin-bottom: 5px;
  }

  .confirm-order-btn {
    margin-top: 20px;
    font-size: 20px;
    text-transform: uppercase;
  }
</style>

  
  
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
  
