<template>
  <v-app>
    <div class="product-details">
      <Navbar @toggle-cart="toggleCartDrawer" />

  
       <!-- Cart Drawer -->
<v-navigation-drawer location="right" v-model="isCartDrawerOpen" app right temporary>
  <v-container>
    <h2>Your Shopping Cart</h2>
    <v-list>
      <v-list-item-group v-if="cartItems.length > 0">
        <v-list-item v-for="item in cartItems" :key="item.id">
          <v-list-item-content>
            {{ item.name }} - {{ item.price }} - Quantity: {{ item.quantity }}
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-list-item v-else>
        <v-list-item-content>No items in the cart</v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Total Amount:</v-list-item-title>
          <v-list-item-subtitle>${{ totalAmount }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-btn color="primary" @click="proceedToCheckout">Proceed to Checkout</v-btn>
  </v-container>
</v-navigation-drawer>

      <h2 class="product-title">Product Details</h2>
      <div v-if="product" class="product-container">
        <div class="product-image">
          <img :src="product.image" alt="Product Image" class="image">
        </div>
        <div class="product-info">
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-price">{{ product.price }}</p>
          <p class="product-description">{{ product.description }}</p>

          <!-- Quantity Selector -->
          <div class="quantity-selector">
            <label for="quantity">Quantity:</label>
            <input type="number" id="quantity" v-model="selectedQuantity" min="1">
          </div>

          <!-- Add to Cart Button -->
          <v-btn color="primary" @click="addToCart" class="add-to-cart-button">Add to Cart</v-btn>
        </div>
      </div>
    </div>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue'; 
import { useProductStore } from '../stores/store';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      isCartDrawerOpen: false,
      product: null,
      selectedQuantity: 1, 
    };
  },
  computed: {
    cartItems() {
      return useProductStore().cartItems;
    },

    totalAmount() {
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
  },
  methods: {
    addToCart() {
      const quantity = this.selectedQuantity;
      useProductStore().addToCart({ ...this.product, quantity });

    },
    proceedToCheckout() {
    
      this.$router.push('/cart');

    },
    toggleCartDrawer() {
      this.isCartDrawerOpen = !this.isCartDrawerOpen;
    },
  },
  created() {
    useProductStore().initializeStore();
  try {
    useProductStore().fetchProducts();
    this.product =  useProductStore().getProductById(this.$route.params.productId);
  } catch (error) {   
  }
  
},



};
</script>

<style scoped>

.product-details {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}


.quantity-selector {
  margin-top: 10px;
  display: flex;
  align-items: center;
}


</style>
