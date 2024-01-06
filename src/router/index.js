import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProductView from '../views/ProductView.vue';
import CartView from '../views/CartView.vue';
import CategoryView from '../views/CategoryView.vue'; // Correct import path for CategoryView

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/product/:productId',
      name: 'product-view',
      component: ProductView,
    },
    {
      path: '/cart',
      name: 'cart-view',
      component: CartView,
    },
    {
      path: '/category/:categoryName',
      name: 'category-view',
      component: CategoryView,
    },
  ],
});

export default router;
