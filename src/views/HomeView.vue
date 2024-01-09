<template>
  <v-app>
    <Navbar @toggle-cart="toggleCartDrawer" />
    <Slideshow class="slideshow" />
    <v-container class="mt-8">
      <!-- Special offers -->
      <v-row class="mt-4">
    <v-col cols="12">
      <h2 class="text-center mb-5">Our Hottest Offers</h2>
      <v-row >
        <v-col v-for="offer in specialOffers" :key="offer.id" cols="12" md="4">
          <ProductCard height="520" :product="offer" @add-to-cart="addToCart" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>

      <!-- Welcome -->
      <v-row>
        <v-col cols="12">
          <h1 class="display-2 text-center mb-4">Welcome to DnDice.com</h1>
          <p class="text-center">Your one-stop shop for all things D&D related dice and gaming accessories!</p>
        </v-col>
      </v-row>

      <!-- products section -->
      <v-row>
        <v-col
          v-for="product in featuredProducts"
          :key="product.id"
          cols="12"
          md="4"
          class="product-card"
        >
          <product-card :product="product" @add-to-cart="addToCart" />
        </v-col>
      </v-row>
    </v-container>

    

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




<Footer />
  </v-app>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';
import CategoryCard from '@/components/CategoryCard.vue';
import Navbar from '@/components/Navbar.vue';
import { useProductStore } from '@/stores/store';
import Slideshow from '@/components/Slideshow.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: "HomeView",
  components: {
    ProductCard,
    CategoryCard,
    Navbar,
    Slideshow,
    Footer,
  },
  data() {
    return {
      isCartDrawerOpen: false,
      currentCategory: "home",
    };
  },
  computed: {
    featuredProducts() {
      return useProductStore().products.slice(0, 3);
    },
    specialOffers() {
      const sortedProducts = useProductStore().products
        .filter(product => product.offer)
        .sort((a, b) => {
          const discountA = (parseFloat(a.defaultPrice.replace(/[^\d.]/g, '')) - parseFloat(a.price.replace(/[^\d.]/g, ''))) || 0;
          const discountB = (parseFloat(b.defaultPrice.replace(/[^\d.]/g, '')) - parseFloat(b.price.replace(/[^\d.]/g, ''))) || 0;

          return discountB - discountA;
        });

      return sortedProducts.slice(0, 3);
    },
    categories() {
      return useProductStore().categories;
    },
    cartItems() {
      return useProductStore().cartItems;
    },
    totalAmount() {
  return this.cartItems.reduce((total, item) => {
    const itemPrice = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0; 
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
      useProductStore().addToCart({ ...product, quantity: 1 });
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
    useProductStore().fetchProducts();
    useProductStore().fetchCategories();
 

    
  },
};
</script>


<style scoped>
.product-card {
  margin-bottom: 20px;
}

.cart-item-content {
  display: flex;
  align-items: center;
}

.cart-item-details {
  margin-left: 10px;
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
  .slideshow {
  margin-top: 100px; 
}
</style>
