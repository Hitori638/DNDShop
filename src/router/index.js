import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProductView from '../views/ProductView.vue';
import CartView from '../views/Cartview.vue';
import CategoryView from '../views/CategoryView.vue';
import CheckoutView from '../views/CheckoutView.vue';
import PaymentView from '../views/PaymentView.vue';
import SuccessView from '../views/SuccessView.vue';

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
    {
      path: '/checkout',
      name: 'checkout-view',
      component: CheckoutView,
    },
    {
      path: '/payment',
      name: 'payment-view',
      component: PaymentView,
    },
    {
      path: '/thank-you',
      name: 'success-view',
      component: SuccessView,
    },
  
  ],
});

export default router;
