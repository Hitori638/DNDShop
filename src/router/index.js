import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProductView from '../views/ProductView.vue';
import CartView from '../views/Cartview.vue';
import CategoryView from '../views/CategoryView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
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
