import Home from './views/Home.vue';
import Privacy from './views/Privacy.vue';
import Contact from './views/Contact.vue';
import About from './views/About.vue';
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            description: 'Find the best restaurants in your area to dine with ease.'
        }
    },
    {
        path: '/privacy-policy',
        name: 'Privacy',
        component: Privacy,
        meta: {
            description: 'Dine with ease with our privacy policy.'
        }
    },
    {
        path: '/about-us',
        name: 'About',
        component: About,
        meta: {
            description: 'A small startup based in Hungary, initially made waves in the restaurant industry with their innovative restaurant software. Now, they are expanding their horizons with a brand new service that aims to revolutionize how people discover, explore, and engage with restaurants.'
        }
    },
    {
        path: '/contact',
        name: 'Contact',
        component: Contact,
        meta: {
            description: 'Contact us for any inquiries or questions you may have. We are here to help you dine with ease.'
        }
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/',
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(),
});

router.beforeEach((to, from, next) => {
    document.title = 'DineEase | ' + to.name;
    document.querySelector('meta[name="description"]').content = to.meta.description;
    next();
});

export default router;