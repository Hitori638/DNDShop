<template>
  <v-app>
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

    <v-container>
      <v-row>
        <v-col
          v-for="product in filteredProducts"
          :key="product.id"
          cols="12"
          md="4"
          class="product-card"
        >
          <product-card :product="product" @add-to-cart="addToCart" />
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
      const categoryName = decodeURI( this.$route.params.categoryName.toLowerCase());
      console.log('Current Category:', categoryName);

      const filtered = this.store.products.filter(product => product.category.toLowerCase() === categoryName);
      console.log('Filtered Products:', filtered);
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
    proceedToCheckout() {
      this.$router.push('/cart');
    },
    toggleCartDrawer() {
      this.isCartDrawerOpen = !this.isCartDrawerOpen;
    },
  },
  created() {
    useProductStore().initializeStore();
    this.store.fetchProducts();
  },
};
</script>


<style scoped>
/* Add any necessary styling for your component */
</style>
