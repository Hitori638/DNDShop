<template>
  <v-app>
    <Navbar @toggle-cart="toggleCartDrawer" />


<!-- Cart Drawer -->
<v-navigation-drawer location="right" v-model="isCartDrawerOpen" app right temporary>
  <v-container>
    <h2>Your Shopping Cart</h2>
    <div v-if="cartItems.length > 0">
      <div v-for="item in cartItems" :key="item.id">
        <v-list-item>
         
            <v-img :src="item.image" alt="Product Image"></v-img>
          
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




    <v-container>
      <v-row>
        <v-col
          v-for="product in filteredProducts"
          :key="product.id"
          cols="12"
          md="4"
          class="product-card"
        >
          <product-card height="600" :product="product" @add-to-cart="addToCart" />
        </v-col>
      </v-row>
    </v-container>
    <Footer />
  </v-app>
</template>

<script>
import { useProductStore } from '@/stores/store';
import ProductCard from '@/components/ProductCard.vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    ProductCard,
    Navbar,
    Footer,
  },
  data() {
    return {
      isCartDrawerOpen: false,
    };
  },
  computed: {
    store() {
      return useProductStore();
    },
    filteredProducts() {
  const categoryName = decodeURI(this.$route.params.categoryName.toLowerCase());
  console.log('Current Category:', categoryName);

  let filtered;

  if (categoryName === 'offers') {
 
    filtered = this.store.products.filter(product => product.offer === true);
    console.log('Filtered Products (Offer):', filtered);
  } else {
    
    filtered = this.store.products.filter(product => product.category.toLowerCase() === categoryName);
    console.log('Filtered Products:', filtered);
  }

  return filtered;
},


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
    addToCart(product) {
      const quantity = 1;
      this.store.addToCart({ ...product, quantity });
    },
    removeFromCart(productId) {
      useProductStore().removeFromCart(productId);
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
  
  },
};
</script>

<style scoped>
.remove-button {
    margin-left: auto;
    background-color: #e74c3c;
    color: #fff;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
  }
  .product-card {
    margin-top: 50px; 
}
  </style>