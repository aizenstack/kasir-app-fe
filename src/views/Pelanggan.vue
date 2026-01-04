<script setup>
import { onMounted, ref } from 'vue'
import http from '../utils/http'

const products = ref([])

const isLoading = ref(false)

const mode = ref('add')
const form = ref({
    nama_produk: '',
    harga: '',
    stok: ''
})

const deleteProduct = async (id) => {
    if (!confirm('Are you sure want to delete this product?')) return
    try {
        isLoading.value = true
        await http.delete(`/produk/${id}`)
        await getAllData()
    } catch (err) {
        console.error(err)
    } finally {
        isLoading.value = false
    }
}

const getAllData = async () => {
    try {
        isLoading.value = true
        const response = await http.get('/pelanggan')
        products.value = response.data.data
    } catch (err) {
        console.error(err)
    } finally {
        isLoading.value = false
    }
}

const columns = [
    { field: 'nama_pelanggan', header: 'Nama Pelanggan' },
    { field: 'alamat', header: 'Alamat' },
    { field: 'telepon', header: 'Telepon' }
]

const openEdit = (row) => {
    mode.value = 'edit'
    form.value = { ...row }
    visible.value = true
}

const openAdd = () => {
    mode.value = 'add'
    form.value = {
        nama_pelanggan: '',
        alamat: '',
        telepon: ''
    }
    visible.value = true
}

const submit = async () => {
    try {
        isLoading.value = true
        if (mode.value === 'add') {
            await http.post('/produk', form.value)
        } else {
            await http.put(`/produk/${form.value.id}`, form.value)
        }
        visible.value = false
        await getAllData()
    } catch (err) {
        console.error(err)
    } finally {
        isLoading.value = false
    }
}

onMounted(async () => {
    await getAllData()
})

const visible = ref(false)
</script>

<template>
    <div class="card">
        <div class="flex justify-between items-center mb-4 ml-8 mr-8">
            <h2 class="text-xl font-bold">Manajemen Pelanggan</h2>
            <Button severity="info" label="Add New Pelanggan" icon="pi pi-plus" @click="openAdd" />
        </div>
        <div class="mt-2 p-8">
            <data-table-component :data="products" :columns="columns" :loading="isLoading" :rows="5"
                :rowsPerPageOptions="[5, 10, 20]">
                <template #action="{ row }">
                    <div class="flex gap-2 justify-center text-start">
                        <Button icon="pi pi-pencil" size="small" @click="openEdit(row)" />
                        <Button icon="pi pi-trash" severity="danger" size="small" @click="deleteProduct(row.id)" />
                    </div>
                </template>
            </data-table-component>
        </div>
        <Dialog v-model:visible="visible" maximizable modal :header="mode === 'add' ? 'Tambah Produk' : 'Edit Produk'"
            :style="{ width: '80rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <div class="grid gap-3">
                <div>
                    <label>Nama Pelanggan</label>
                    <InputText v-model="form.nama_pelanggan" class="w-full" />
                </div>

                <div>
                    <label>Alamat</label>
                    <InputText v-model="form.alamat" class="w-full" />
                </div>

                <div>
                    <label>Telepon</label>
                    <InputText v-model="form.telepon" class="w-full" />
                </div>
            </div>

            <template #footer>
                <!-- <Button label="Batal" severity="secondary" @click="visible = false" /> -->
                <Button :label="mode === 'add' ? 'Simpan' : 'Update'" @click="submit" />
            </template>
        </Dialog>
    </div>
</template>