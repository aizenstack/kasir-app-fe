<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
    router.push('/');
}
</script>

<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div class="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md w-full">
            <div class="mb-6 text-red-100 bg-red-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto">
                <i class="pi pi-lock text-5xl text-red-500"></i>
            </div>
            <h1 class="text-3xl font-bold text-gray-800 mb-2">Access Denied</h1>
            <p class="text-gray-600 mb-8">Maaf, Anda tidak memiliki izin untuk mengakses halaman ini.</p>
            <Button label="Kembali ke Dashboard" icon="pi pi-arrow-left" @click="goBack" severity="danger" />
        </div>
    </div>
</template>