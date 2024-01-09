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
          <v-list-item-avatar>
            <v-img :src="item.image" alt="Product Image"></v-img>
          </v-list-item-avatar>
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

 
      <v-container v-if="product" >
        <h2 class="product-title">Related Products</h2>
        <v-row>
          <v-col 
            v-for="relatedProduct in relatedProducts"
            :key="relatedProduct.id"
            cols="12"
            md="4"
            class="product-card"
          >
            <ProductCard height="550" :product="relatedProduct" @add-to-cart="addToCart" />
          </v-col>
        </v-row>
      </v-container>
    </div>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue'; 
import { useProductStore } from '../stores/store';
import Footer from '@/components/Footer.vue';
import ProductCard from '@/components/ProductCard.vue';

export default {
  components: {
    Navbar,
    Footer,
    ProductCard,
  },
  data() {
    return {
      isCartDrawerOpen: false,
      product: null,
      selectedQuantity: 1,
      relatedProducts: [], 
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

    filterProductsByCategory(category) {
      return useProductStore().products.filter(product => product.category === category);
    },
  },
  created() {
  useProductStore().initializeStore();
  try {
    useProductStore().fetchProducts();
    this.product = useProductStore().getProductById(this.$route.params.productId);

  
    if (this.product) {
      const categoryProducts = this.filterProductsByCategory(this.product.category);
      

      this.relatedProducts = categoryProducts.filter(product => product.id !== this.product.id).slice(0, 3);
    }
  } catch (error) {
    console.error(error);
  }
},

};
</script>

<style scoped>
.product-details {
  max-width: 1000px; 
  margin: auto;
  padding: 40px; 
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 80px;
  margin-bottom: 20px;
}

.product-title {
  font-size: 28px; 
  margin-bottom: 30px;
  color: #333;
}

.product-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.product-image {
  flex: 1;
}

.image {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.product-info {
  flex: 1;
  padding: 30px; 
}

.product-name {
  font-size: 24px; 
  margin-bottom: 15px;
  color: #333;
}

.product-price {
  font-size: 20px; 
  margin-bottom: 15px;
  color: #e74c3c;
}

.product-description {
  margin-bottom: 30px;
  color: #666;
}

.quantity-selector {
  margin-top: 15px;
  display: flex;
  align-items: center;
}

#quantity {
  width: 60px; 
  margin-left: 15px;
  padding: 10px; 
  border: 1px solid #ddd;
  border-radius: 6px;
}

.add-to-cart-button {
  margin-top: 30px;
}





.remove-button {
  background-color: #e74c3c;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 6px;
  cursor: pointer;
}

.cart-total {
  font-weight: bold;
}



@media (max-width: 768px) {
  .product-container {
    flex-direction: column;
  }

  .product-info {
    padding: 20px 0;
  }

  .quantity-selector {
    margin-top: 20px;
  }

  .add-to-cart-button {
    margin-top: 20px;
  }
}
</style>