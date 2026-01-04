import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../layouts/AppLayout.vue';
import { getToken, getRole } from '../utils/auth';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/auth',
            children: [
                {
                    path: 'login',
                    name: 'login',
                    component: () => import('../views/auth/Login.vue')
                },
                {
                    path: 'access-denied',
                    name: 'access-denied',
                    component: () => import('../views/auth/Access.vue')
                }
            ]
        },
        {
            path: '/',
            component: AppLayout,
            meta: { requiresAuth: true },
            children: [
                {
                    path: '',
                    name: 'dashboard',
                    component: () => import('../views/Dashboard.vue')
                },
                {
                    path: '/pendataan-barang',
                    name: 'pendataan-barang',
                    component: () => import('../views/PendataanBarang.vue')
                },
                {
                    path: '/produk',
                    name: 'produk',
                    component: () => import('../views/Produk.vue')
                },
                {
                    path: '/stok-produk',
                    name: 'stok-produk',
                    component: () => import('../views/StokProduk.vue')
                },
                {
                    path: '/penjualan',
                    name: 'penjualan',
                    component: () => import('../views/Penjualan.vue')
                },
                {
                    path: '/pelanggan',
                    name: 'pelanggan',
                    component: () => import('../views/Pelanggan.vue')
                },
                {
                    path: '/registrasi',
                    name: 'registrasi',
                    component: () => import('../views/auth/Registrasi.vue'),
                    meta: { roles: ['administrator'] }
                }
            ]
        },
        {
            path: '/:pathMatch(.*)',
            name: 'catch-all-not-found',
            component: () => import('../views/auth/NotFound.vue')
        }
    ]
})

router.beforeEach((to, from, next) => {
    const token = getToken();
    const role = getRole();

    if (to.meta.requiresAuth && !token) {
        next('/auth/login');
    } else if (to.path === '/auth/login' && token) {
        next('/');
    } else if (to.meta.roles && !to.meta.roles.includes(role)) {
        next('/auth/access-denied');
    } else {
        next();
    }
});

export default router;