<template>
    <v-app>
      <Navbar @toggle-cart="toggleCartDrawer" />
      <v-container class="checkout-container mt-11">
        <v-row>
          <v-col md="6" sm="12">
            <!-- Delivery Type Menu -->
            <v-card class="card-height">
              <v-card-title class="headline z-index-1">Select Delivery Type</v-card-title>
              <v-card-text>
                <v-radio-group v-model="selectedDeliveryType">
                  <v-radio v-for="type in deliveryTypes" :key="type.id" :label="type.name" :value="type.id"></v-radio>
                </v-radio-group>
              </v-card-text>
            </v-card>
          </v-col>
  
          <v-col md="6" sm="12">
            <!-- Payment Method Menu -->
            <v-card class="card-height">
              <v-card-title class="headline z-index-1">Select Payment Method</v-card-title>
              <v-card-text>
                <v-radio-group v-model="selectedPaymentMethod">
                  <v-radio v-for="method in paymentMethods" :key="method.id" :label="method.name" :value="method.id"></v-radio>
                </v-radio-group>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
  
        <!-- Customer Information Section -->
        <v-card class="mb-4">
          <v-card-title class="headline z-index-1">Customer Information</v-card-title>
          <v-card-text>
            <v-row>
              <v-col md="6" sm="12">
                <v-text-field v-model="customerName" label="Name"></v-text-field>
              </v-col>
              <v-col md="6" sm="12">
                <v-text-field v-model="customerSurname" label="Surname"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="6" sm="12">
                <v-text-field v-model="customerEmail" label="Email"></v-text-field>
              </v-col>
              <v-col md="6" sm="12">
                <v-text-field v-model="customerPhone" label="Phone"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="12">
                <v-text-field v-model="customerAddress" label="Street Address"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="6" sm="12">
                <v-text-field v-model="customerCity" label="City"></v-text-field>
              </v-col>
              <v-col md="6" sm="12">
                <v-text-field v-model="customerPostalCode" label="Postal Code"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="12">
                <v-checkbox v-model="acceptTerms" label="I accept the terms and conditions"></v-checkbox>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
  
        <!-- Cart Summary Section -->
        <v-card class="mb-4">
          <v-card-title class="headline z-index-1">Cart Summary</v-card-title>
          <v-card-text>
            <p>Total Items: {{ totalItems }}</p>
            <p>Total Price: ${{ totalPrice }}</p>
          </v-card-text>
        </v-card>
  
        <!-- Proceed to Payment Button -->
        <v-btn @click="proceedToPayment" color="success">
          Proceed to Payment
        </v-btn>
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
        selectedDeliveryType: null,
        selectedPaymentMethod: null,
        customerName: '',
        customerSurname: '',
        customerEmail: '',
        customerPhone: '',
        customerAddress: '',
        customerCity: '',
        customerPostalCode: '',
        acceptTerms: false,
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
      deliveryTypes() {
        return [
          { id: 1, name: 'Standard Delivery' },
          { id: 2, name: 'Express Delivery' },
        ];
      },
      paymentMethods() {
        return [
          { id: 1, name: 'Credit Card' },
          { id: 2, name: 'PayPal' },
          { id: 3, name: 'Cash on delivery' },
        ];
      },
    },
    methods: {
        proceedToPayment() {
  if (
    this.selectedDeliveryType &&
    this.selectedPaymentMethod &&
    this.customerName &&
    this.customerSurname &&
    this.customerEmail &&
    this.customerPhone &&
    this.customerAddress &&
    this.customerCity &&
    this.customerPostalCode &&
    this.acceptTerms
  ) {
    const selectedOptions = {
      deliveryType: this.deliveryTypes.find(type => type.id === this.selectedDeliveryType).name,
      paymentMethod: this.paymentMethods.find(method => method.id === this.selectedPaymentMethod).name,
    };
    const customerInfo = {
      name: this.customerName,
      surname: this.customerSurname,
      email: this.customerEmail,
      phone: this.customerPhone,
      address: `${this.customerAddress}, ${this.customerCity}, ${this.customerPostalCode}`,
    };

    useProductStore().setSelectedOptions(selectedOptions);
    useProductStore().setCustomerInfo(customerInfo);


    this.$router.push('/payment');
  } else {
    alert('Please fill in all required fields before proceeding.');
  }
},

},

    created() {
      useProductStore().fetchProducts();
      useProductStore().initializeStore();
    },
  };
  </script>
  
  <style scoped>
  .checkout-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .card-height {
    min-height: 210px; 
  }
  </style>
  