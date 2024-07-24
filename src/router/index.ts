import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import store from '@/store/index';

import Main from '@/modules/main/main.vue';
import Login from '@/modules/login/login.vue';
import Register from '@/modules/register/register.vue';

import Dashboard from '@/pages/dashboard/dashboard.vue';
import Profile from '@/pages/profile/profile.vue';
import ForgotPassword from '@/modules/forgot-password/forgot-password.vue';
import RecoverPassword from '@/modules/recover-password/recover-password.vue';
import VerifyMail from '@/modules/verify-mail/verify-mail.vue';
import SubMenu from '@/pages/main-menu/sub-menu/sub-menu.vue';
import Blank from '@/pages/blank/blank.vue';
import Customers from '@/pages/customers/customers.vue';
import Orders from '@/pages/orders/orders.vue';
import NotFound from '@/pages/NotFound.vue';
import {useToast} from 'vue-toastification';
import Wallet from '@/pages/wallet/wallet.vue';
import kyc from '@/pages/kyc/kyc.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Main',
        component: Main,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: 'profile',
                name: 'Profile',
                component: Profile,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'customers',
                name: 'Customers',
                component: Customers,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'orders',
                name: 'Orders',
                component: Orders,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'wallet',
                name: 'wallet',
                component: Wallet,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'kyc',
                name: 'kyc',
                component: kyc,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'sub-menu-1',
                name: 'Sub Menu 1',
                component: SubMenu,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'sub-menu-2',
                name: 'Sub Menu 2',
                component: Blank,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '',
                name: 'Dashboard',
                component: Dashboard,
                meta: {
                    requiresAuth: true
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            requiresUnauth: true
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
            requiresUnauth: true
        }
    },

    {
        path: '/verify/email',
        name: 'Verify',
        component: VerifyMail,
        meta: {
            requiresUnauth: true
        }
    },

    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
        meta: {
            requiresUnauth: true
        }
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: ForgotPassword,
        meta: {
            requiresUnauth: true
        }
    },
    {
        path: '/recover-password',
        name: 'RecoverPassword',
        component: RecoverPassword,
        meta: {
            requiresUnauth: true
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to, from, next) => {
    let toast = useToast();

    let storedAuthentication = store.getters['auth/currentUser'];

    if (!storedAuthentication) {
        try {
            storedAuthentication = await checkSession();
        } catch (error) {
            console.error('Error checking session:', error);
        }
    }

    if (to.meta.requiresAuth && !storedAuthentication) {
        console.log('err 1');

        return next('/login');
    }

    if (to.meta.requiresUnauth && storedAuthentication) {
        console.log('err 2', storedAuthentication);

        return next('/');
    } else {
        next();
    }
});

export default router;

export async function checkSession() {
    try {
        let user = localStorage.getItem('user');
        return JSON.parse(user);
    } catch (error: any) {
        console.log(error);
        return;
    }
}
