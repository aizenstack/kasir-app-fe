<script setup>
import { onMounted, ref } from 'vue'
import http from '../utils/http'
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();
const pelanggan = ref([])

const isLoading = ref(false)

const mode = ref('add')
const form = ref({
    nama_pelanggan: '',
    alamat: '',
    telepon: ''
})

const deletePelanggan = (id) => {
    confirm.require({
        message: 'Apakah anda yakin ingin menghapus pelanggan ini?',
        header: 'Konfirmasi Hapus',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Ya, Hapus',
        rejectLabel: 'Batal',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: async () => {
            try {
                isLoading.value = true
                await http.delete(`/pelanggan/${id}`)
                toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Pelanggan berhasil dihapus', life: 3000 });
                await getAllData()
            } catch (err) {
                console.error(err)
                toast.add({ severity: 'error', summary: 'Error', detail: 'Gagal menghapus pelanggan', life: 3000 });
            } finally {
                isLoading.value = false
            }
        }
    });
}

const getAllData = async () => {
    try {
        isLoading.value = true
        const response = await http.get('/pelanggan')
        pelanggan.value = response.data.data
        toast.add({
            severity: 'info',
            summary: 'Info',
            detail: 'Data berhasil dimuat',
            life: 2000
        })
    } catch (err) {
        console.error(err)
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Gagal memuat data',
            life: 2000
        })
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
            await http.post('/pelanggan', form.value)
        } else {
            await http.put(`/pelanggan/${form.value.id}`, form.value)
        }
        visible.value = false
        toast.add({
            severity: 'success',
            summary: 'Berhasil',
            detail: 'Berhasil Menambahkan Pelanggan',
            life: 3000
        })
        await getAllData()
    } catch (err) {
        console.error(err)
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Gagal Menambahkan Pelanggan',
            life: 3000
        })
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
            <h2 class="text-xl font-bold">Manajemen Pelanggan</h2>
            <Button severity="info" label="Add New Pelanggan" icon="pi pi-plus" @click="openAdd" />
        </div>
        <div class="mt-2 p-8">
            <data-table-component :data="pelanggan" :columns="columns" :loading="isLoading" :rows="5"
                :rowsPerPageOptions="[5, 10, 20]">
                <template #action="{ row }">
                    <div class="flex gap-2 justify-center text-start">
                        <Button icon="pi pi-pencil" size="small" @click="openEdit(row)" />
                        <Button icon="pi pi-trash" severity="danger" size="small" @click="deletePelanggan(row.id)" />
                    </div>
                </template>
            </data-table-component>
        </div>
        <Dialog v-model:visible="visible" maximizable modal :header="mode === 'add' ? 'Tambah Pelanggan' : 'Edit Produk'"
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