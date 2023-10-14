import { createRouter, createWebHistory } from 'vue-router';
import SubscriptionPlans from '@/components/SubscriptionPlans.vue';
import PaymentPage from '@/components/PaymentPage.vue' // 결제 페이지 컴포넌트 임포트
import Home from "@/components/Home.vue";
import Options from "@/components/Options.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/plans',
        name: 'Plans',
        component: SubscriptionPlans
    },
    {
        path: '/payment/:subscriptionId',
        name: 'Payment',
        component: PaymentPage  // 결제 페이지 컴포넌트
    },
    {
        path: '/options',
        name: 'Options',
        component: Options  // 구독 옵션 컴포넌트
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
