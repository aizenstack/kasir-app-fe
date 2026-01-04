<script setup>
import { onMounted, ref, computed } from 'vue'
import http from '../utils/http'
import { formatRupiah } from '../utils/currency'
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const confirm = useConfirm();

const form = ref({
    pelanggan_id: null,
    detail: []
})
const selectedProduct = ref(null)
const qty = ref(1)

const totalBelanja = computed(() => {
    return form.value.detail.reduce((acc, item) => acc + (item.harga * item.qty), 0)
})

const openAddPenjualan = () => {
    mode.value = 'add'
    form.value = { pelanggan_id: null, detail: [] }
    selectedProduct.value = null
    qty.value = 1
    visible.value = true
}

const addItem = () => {
    if (!selectedProduct.value) return
    const existing = form.value.detail.find(item => item.produk_id === selectedProduct.value.id)
    if (existing) {
        existing.qty += qty.value
    } else {
        form.value.detail.push({
            produk_id: selectedProduct.value.id,
            nama_produk: selectedProduct.value.nama_produk,
            harga: selectedProduct.value.harga,
            qty: qty.value
        })
    }
    selectedProduct.value = null
    qty.value = 1
}

const removeItem = (index) => {
    form.value.detail.splice(index, 1)
}

const submitPenjualan = async () => {
    if (!form.value.pelanggan_id || form.value.detail.length === 0) {
        toast.add({ severity: 'warn', summary: 'Warning', detail: 'Isi data pelanggan dan produk', life: 3000 });
        return;
    }

    try {
        isLoading.value = true
        const payload = {
            pelanggan_id: form.value.pelanggan_id,
            detail_penjualan: form.value.detail.map(item => ({
                produk_id: item.produk_id,
                jumlah_produk: item.qty
            }))
        }

        await http.post('/penjualan', payload)
        toast.add({ severity: 'success', summary: 'Success', detail: 'Penjualan berhasil disimpan', life: 3000 });
        visible.value = false
        await getAllPenjualan()
    } catch (err) {
        console.error(err)
        toast.add({ severity: 'error', summary: 'Error', detail: 'Gagal menyimpan transaksi', life: 3000 });
    } finally {
        isLoading.value = false
    }
}

const isLoading = ref(false)
const penjualans = ref([])

const columns = [
    { field: 'tanggal_penjualan', header: 'Tanggal Penjualan' },
    { field: 'nama_pelanggan', header: 'Nama Pelanggan' },
    { field: 'total_harga', header: 'Total Harga', type: 'currency' },
]

const getAllPenjualan = async () => {
    try {
        isLoading.value = true

        const response = await http.get('/penjualan')

        penjualans.value = response.data.data.map(item => {
            return {
                ...item,
                nama_pelanggan: item.pelanggan ? item.pelanggan.nama_pelanggan : '-',
                tanggal_penjualan: new Date(item.tanggal_penjualan).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                })
            }
        })

    } catch (err) {
        console.error(err)
    } finally {
        isLoading.value = false
    }
}

onMounted(async () => {
    await getAllPenjualan()
    await getAllPelanggan()
    await getAllProduk()
})

const visible = ref(false)
const selectedPenjualan = ref(null)
const mode = ref('detail')

const customers = ref([])
const products = ref([])

const getAllPelanggan = async () => {
    try {
        const response = await http.get('/pelanggan')
        customers.value = response.data.data
    } catch { }
}

const getAllProduk = async () => {
    try {
        const response = await http.get('/produk')
        products.value = response.data.data
    } catch { }
}

const deletePenjualan = (id) => {
    confirm.require({
        message: 'Are you sure you want to delete this data?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Delete',
            severity: 'danger'
        },
        accept: async () => {
            try {
                isLoading.value = true
                await http.delete(`/penjualan/${id}`)
                toast.add({ severity: 'success', summary: 'Success', detail: 'Data Deleted', life: 3000 });
                await getAllPenjualan()
            } catch {
                toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete data', life: 3000 });
            } finally {
                isLoading.value = false
            }
        }
    });
}
const detailPenjualan = (id) => {
    const rawData = penjualans.value.find(p => p.id === id)
    if (rawData) {
        mode.value = 'detail'
        selectedPenjualan.value = rawData
        visible.value = true
    }
}
const downloadtrxPenjualan = async (id) => {
    try {
        isLoading.value = true
        const response = await http.get(`/penjualan/${id}/cetak`, {
            responseType: 'blob'
        })

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `struk-penjualan-${id}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.add({
            severity: 'success',
            summary: 'Berhasil',
            detail: 'Data Berhasil di Download',
            life: 2000
        })
    } catch (err) {
        console.error("Download fail:", err)
        // alert("Gagal mengunduh struk")
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Gagal Mengunduh Struk',
            life: 3000
        })
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <div class="card">
        <Toast />
        <ConfirmDialog />
        <div class="flex justify-between items-center mb-4 ml-8 mr-8">
            <h2 class="text-xl font-bold">Manajemen Pelanggan</h2>
            <Button icon="pi pi-plus" label="Tambah Penjualan" severity="info" size="small" @click="openAddPenjualan" />
        </div>
        <div class="mt-0 p-8">
            <data-table-component :data="penjualans" :columns="columns" :loading="isLoading" :rows="5"
                :rowsPerPageOptions="[5, 10, 20]">
                <template #action="{ row }">
                    <div class="flex gap-2 justify-center text-start">
                        <Button icon="pi pi-book" severity="info" size="small" @click="detailPenjualan(row.id)"
                            v-tooltip.top="'Detail'" />
                        <Button icon="pi pi-download" severity="success" size="small"
                            @click="downloadtrxPenjualan(row.id)" v-tooltip.top="'Download'" />
                        <Button icon="pi pi-trash" severity="danger" size="small" @click="deletePenjualan(row.id)"
                            v-tooltip.top="'Delete'" />
                    </div>
                </template>
            </data-table-component>
        </div>
        <Dialog v-model:visible="visible" maximizable modal
            :header="mode === 'detail' ? 'Detail Penjualan' : 'Tambah Penjualan'" :style="{ width: '80rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">

            <div v-if="mode === 'detail' && selectedPenjualan" class="grid gap-6">
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h3 class="text-lg font-bold mb-3 border-b pb-2">Data Pelanggan</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm text-gray-500">Nama Pelanggan</label>
                            <span class="font-semibold">{{ selectedPenjualan.pelanggan?.nama_pelanggan || '-' }}</span>
                        </div>
                        <div>
                            <label class="block text-sm text-gray-500">Telepon</label>
                            <span class="font-semibold">{{ selectedPenjualan.pelanggan?.telepon || '-' }}</span>
                        </div>
                        <div class="col-span-2">
                            <label class="block text-sm text-gray-500">Alamat</label>
                            <span class="font-semibold">{{ selectedPenjualan.pelanggan?.alamat || '-' }}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 class="text-lg font-bold mb-3">Daftar Produk</h3>
                    <DataTable :value="selectedPenjualan.detailPenjualan" size="small" class="p-datatable-sm">
                        <Column field="produk.nama_produk" header="Nama Produk" />
                        <Column field="jumlah_produk" header="Qty" />
                        <Column field="produk.harga" header="Harga Satuan" type="currency">
                            <template #body="slotProps">
                                {{ formatRupiah(slotProps.data.produk.harga) }}
                            </template>
                        </Column>
                        <Column field="subtotal" header="Subtotal" type="currency">
                            <template #body="slotProps">
                                {{ formatRupiah(slotProps.data.subtotal) }}
                            </template>
                        </Column>
                    </DataTable>
                </div>

                <div class="text-end text-xl font-bold bg-blue-50 p-4 rounded-lg">
                    Total Transaksi: {{ formatRupiah(selectedPenjualan.total_harga) }}
                </div>
            </div>

            <div v-else-if="mode === 'add'" class="grid gap-4">
                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-4">
                        <label class="block mb-2 font-semibold">Pilih Pelanggan</label>
                        <Dropdown v-model="form.pelanggan_id" :options="customers" optionLabel="nama_pelanggan"
                            optionValue="id" placeholder="Pilih Pelanggan" class="w-full" filter />
                    </div>
                    <div class="col-span-8 grid grid-cols-12 gap-2 items-end">
                        <div class="col-span-6">
                            <label class="block mb-2 font-semibold">Pilih Produk</label>
                            <Dropdown v-model="selectedProduct" :options="products" optionLabel="nama_produk"
                                placeholder="Pilih Produk" class="w-full" filter />
                        </div>
                        <div class="col-span-2">
                            <label class="block mb-2 font-semibold">Stok</label>
                            <InputText :value="selectedProduct?.stok || 0" disabled class="w-full bg-gray-100" />
                        </div>
                        <div class="col-span-2">
                            <label class="block mb-2 font-semibold">Qty</label>
                            <InputNumber v-model="qty" :min="1" :max="selectedProduct?.stok || 1" class="w-full" />
                        </div>
                        <div class="col-span-2">
                            <Button icon="pi pi-plus" label="Add" @click="addItem" :disabled="!selectedProduct" />
                        </div>
                    </div>
                </div>

                <DataTable :value="form.detail" size="small" class="mt-4">
                    <Column header="Nama Produk">
                        <template #body="{ data }">
                            {{ data.nama_produk }}
                        </template>
                    </Column>
                    <Column header="Harga">
                        <template #body="{ data }">
                            {{ formatRupiah(data.harga) }}
                        </template>
                    </Column>
                    <Column field="qty" header="Qty" />
                    <Column header="Subtotal">
                        <template #body="{ data }">
                            {{ formatRupiah(data.harga * data.qty) }}
                        </template>
                    </Column>
                    <Column header="Aksi">
                        <template #body="{ index }">
                            <Button icon="pi pi-trash" severity="danger" text @click="removeItem(index)" />
                        </template>
                    </Column>
                </DataTable>

                <div class="text-end text-xl font-bold mt-4">
                    Total: {{ formatRupiah(totalBelanja) }}
                </div>
            </div>

            <template #footer>
                <Button label="Tutup" severity="secondary" @click="visible = false" />
                <Button v-if="mode === 'add'" label="Simpan Transaksi" severity="success" @click="submitPenjualan"
                    :loading="isLoading" />
            </template>
        </Dialog>
    </div>
</template>