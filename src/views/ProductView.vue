<template>
  <v-app>
    <div class="product-details">
      <Navbar @toggle-cart="toggleCartDrawer" />

<!-- Cart Drawer -->
<v-navigation-drawer location="right" v-model="isCartDrawerOpen" app right temporary>
  <v-container>
    <h2>Your Shopping Cart</h2>
    <div v-if="cartItems.length > 0">
      <div v-for="item in cartItems" :key="item.id">
        <v-list-item>
          <div>
            {{ item.name }} - {{ item.price }} - Quantity: {{ item.quantity }}
          </div>
          <v-list-item-action>
            <button @click="removeFromCart(item.id)" class="remove-button">Remove</button>
          </v-list-item-action>
        </v-list-item>
      </div>
    </div>
    <v-list-item v-else>
      <div>No items in the cart</div>
    </v-list-item>
    <v-divider></v-divider>
    <v-list>
      <v-list-item>
        <div>
          <v-list-item-title>Total Amount:</v-list-item-title>
          <v-list-item-subtitle>${{ totalAmount }}</v-list-item-subtitle>
        </div>
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
    removeFromCart(productId) {
      useProductStore().removeFromCart(productId);
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

.remove-button {
    margin-left: auto;
    background-color: #e74c3c;
    color: #fff;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
  }

</style>
