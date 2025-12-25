import {createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../layouts/AppLayout.vue';

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
                    path: '/registrasi',
                    name: 'registrasi',
                    component: () => import('../views/auth/Registrasi.vue')
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

export default router;