<script setup>
import { onMounted, ref } from 'vue'
import http from '../utils/http'
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();
const products = ref([])

const isLoading = ref(false)

const mode = ref('add')
const form = ref({
    nama_produk: '',
    harga: '',
    stok: ''
})

const deleteProduct = (id) => {
    confirm.require({
        message: 'Apakah anda yakin ingin menghapus produk ini?',
        header: 'Konfirmasi Hapus',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Ya, Hapus',
        rejectLabel: 'Batal',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: async () => {
            try {
                isLoading.value = true
                await http.delete(`/produk/${id}`)
                toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Produk berhasil dihapus', life: 3000 });
                await getAllData()
            } catch (err) {
                console.error(err)
                toast.add({ severity: 'error', summary: 'Error', detail: 'Gagal menghapus produk', life: 3000 });
            } finally {
                isLoading.value = false
            }
        }
    });
}

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
    { field: 'harga', header: 'Harga', type: 'currency' },
    { field: 'stok', header: 'Stok' }
]

const openEdit = (row) => {
    mode.value = 'edit'
    form.value = { ...row }
    visible.value = true
}

const openAdd = () => {
    mode.value = 'add'
    form.value = {
        nama_produk: '',
        harga: '',
        stok: ''
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
        <Toast />
        <ConfirmDialog />
        <div class="flex justify-between items-center mb-4 ml-8 mr-8">
            <h2 class="text-xl font-bold">Manajemen Pendataan Barang</h2>
            <Button severity="info" label="Add New Product" icon="pi pi-plus" @click="openAdd" />
        </div>
        <div class="mt-2 p-8">
            <data-table-component :data="products" :columns="columns" :loading="isLoading" :rows="5"
                :rowsPerPageOptions="[5, 10, 20]">
                <template #action="{ row }">
                    <div class="flex gap-2 justify-center text-start">
                        <Button icon="pi pi-pencil" size="small" @click="openEdit(row)" v-tooltip.left="'Edit'"/>
                        <Button icon="pi pi-trash" severity="danger" size="small" @click="deleteProduct(row.id)" v-tooltip.left="'Hapus'"/>
                    </div>
                </template>
            </data-table-component>
        </div>
        <Dialog v-model:visible="visible" maximizable modal :header="mode === 'add' ? 'Tambah Produk' : 'Edit Produk'"
            :style="{ width: '80rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <div class="grid gap-3">
                <div>
                    <label>Nama Produk</label>
                    <InputText v-model="form.nama_produk" class="w-full" />
                </div>

                <div>
                    <label>Harga</label>
                    <InputText v-model="form.harga" class="w-full" />
                </div>

                <div>
                    <label>Stok</label>
                    <InputText v-model="form.stok" class="w-full" />
                </div>
            </div>

            <template #footer>
                <!-- <Button label="Batal" severity="secondary" @click="visible = false" /> -->
                <Button :label="mode === 'add' ? 'Simpan' : 'Update'" @click="submit" />
            </template>
        </Dialog>
    </div>
</template>