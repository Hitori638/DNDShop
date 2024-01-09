<template>
  <v-app>
    <Navbar />
    <div class="cart-container">
      <h2>Your Cart</h2>
      <div v-if="cartItems.length === 0" class="empty-cart">
        <p>Your cart is empty.</p>
      </div>
      <div v-else>
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <div class="item-image">
            <img :src="item.image" :alt="item.name" />
          </div>
          <div class="item-details">
            <h3>{{ item.name }}</h3>
            <p class="item-description">{{ item.description }}</p>
            <div class="item-price">
              <p>Price: {{ item.price }}</p>
            </div>
            <p>Quantity: {{ item.quantity }} </p>
            <button @click="removeFromCart(item.id)" class="remove-button">Remove</button>
          </div>
        </div>
 
<button @click="emptyCart" class="empty-cart-button">Empty Cart</button>

        <div class="cart-summary">
          <h4>Cart Summary</h4>
          <p>Total Items: {{ totalItems }}</p>
          <p>Total Price: ${{ totalPrice }}</p>
        </div>

        <!-- Payment Button -->
        <button @click="proceedToPayment" class="proceed-to-payment-button">
          Proceed to Payment
        </button>
      </div>
    </div>
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
  },
  methods: {
    removeFromCart(productId) {
      useProductStore().removeFromCart(productId);
    },
    proceedToPayment() {

      this.$router.push('/checkout');
    },
    emptyCart() {
      useProductStore().emptyCart();
    },
  },
  created() {
    useProductStore().fetchProducts();
    useProductStore().initializeStore();
  },
};
</script>
  
  
  <style scoped>

.proceed-to-payment-button {
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.proceed-to-payment-button:hover {
  background-color: #45a049;
}
  .cart-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .empty-cart {
    text-align: center;
    padding: 20px;
    background-color: #f8f8f8;
    border-radius: 8px;
  }
  .empty-cart-button {
    background-color: #e74c3c;
    color: #fff;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px; 
  }

  .empty-cart-button:hover {
    background-color: #c0392b;
  }
  .cart-item {
    display: flex;
    border: 1px solid #ddd;
    margin: 10px 0;
    padding: 10px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .item-image {
    margin-right: 20px;
  }
  
  .item-image img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 4px;
  }
  
  .item-details {
    flex-grow: 1;
  }
  
  .item-details h3 {
    margin-bottom: 8px;
    font-size: 18px;
  }
  
  .item-description {
    color: #555;
    margin-bottom: 12px;
  }
  
  .item-price {
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
  
  .cart-summary {
    margin-top: 20px;
    padding-top: 10px;
    border-top: 1px solid #ddd;
  }
  
  .cart-summary h4 {
    font-size: 20px;
    margin-bottom: 12px;
  }
  </style>
  