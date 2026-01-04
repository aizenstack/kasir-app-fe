<script setup>
import { onMounted, ref } from 'vue'
import http from '../utils/http'

const products = ref([])

const isLoading = ref(false)

const getAllData = async () => {
    try {
        isLoading.value = true
        const response = await http.get('/produk')
        products.value = response.data.data
    } catch (err) {
        console.error(err)
    } finally {
        isLoading.value = false
    }
}

const columns = [
    { field: 'nama_produk', header: 'Nama Produk' },
    { field: 'stok', header: 'Stok' }
]


onMounted(async () => {
    await getAllData()
})

</script>

<template>
    <div class="card">
        <div class="flex justify-between items-center mb-4 ml-8">
            <h2 class="text-xl font-bold">Manajemen Pelanggan</h2>
        </div>
        <div class="mt-2 p-8">
            <data-table-component :data="products" :columns="columns" :loading="isLoading" :rows="5"
                :rowsPerPageOptions="[5, 10, 20]">
            </data-table-component>
        </div>
    </div>
</template>