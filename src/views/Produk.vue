<script setup>
import { ref, onMounted } from 'vue';
import http from '../utils/http';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';

const toast = useToast();
const confirm = useConfirm();
const products = ref([]);
const isLoading = ref(false);

const columns = [
    { field: 'nama_produk', header: 'Nama Produk' },
    { field: 'kode_produk', header: 'Kode Produk' },
    { field: 'harga', header: 'Harga', type: 'currency' },
    { field: 'stok', header: 'Stok' },
];

const fetchProducts = async () => {
    try {
        isLoading.value = true;
        const response = await http.get('/produk');
        products.value = response.data.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Gagal mengambil data produk', life: 3000 });
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    fetchProducts();
});
</script>

<template>
    <div class="card">
        <Toast />
        <ConfirmDialog />
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">Data Produk</h2>
        </div>

        <data-table-component 
            :data="products" 
            :columns="columns" 
            :loading="isLoading" 
            :rows="10"
        />
    </div>
</template>
