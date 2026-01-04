<template>
    <div class="min-h-screen bg-white p-8 flex justify-center font-sans">
        <div class="bg-white w-full max-w-full rounded-4xl shadow-lg
             border border-gray-100 overflow-hidden">

            <main class="p-8">

                <!-- ================= TOP ================= -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    <!-- ====== GRAFIK ====== -->
                    <div>
                        <div class="bg-blue-600 text-white px-5 py-2 rounded-t-lg w-fit font-bold text-sm">
                            📊 Statistik Penjualan
                        </div>

                        <div class="bg-gray-50 p-8 min-h-[360px] flex flex-col items-center
                        border border-gray-100 rounded-b-xl rounded-r-xl">

                            <div class="w-[260px] h-[260px]">
                                <Chart type="doughnut" :data="chartData" :options="chartOptions"
                                    class="w-full h-full" />
                            </div>

                            <div class="mt-6 grid grid-cols-2 gap-4 w-full">
                                <div class="bg-white p-4 rounded-xl shadow-sm border-t-4 border-blue-700">
                                    <p class="text-[10px] uppercase text-gray-400 font-bold">Pendapatan</p>
                                    <p class="text-lg font-black text-blue-800">
                                        {{ rupiah(totalPendapatan) }}
                                    </p>
                                </div>

                                <div class="bg-white p-4 rounded-xl shadow-sm border-t-4 border-blue-300">
                                    <p class="text-[10px] uppercase text-gray-400 font-bold">Pengeluaran</p>
                                    <p class="text-lg font-black text-blue-400">
                                        {{ rupiah(totalPengeluaran) }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- ====== WELCOME ====== -->
                    <div class="text-center flex flex-col items-center">
                        <h2 class="text-5xl lg:text-5xl font-extrabold italic uppercase tracking-tight
                     text-blue-500 mb-2" style="font-bold:'Playfair Display', serif">
                            Selamat Datang <br />
                            <span class="text-blue-700">di Aplikasi SIKAS</span>
                        </h2>

                        <P class="text-gray-500 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
                            Sistem Informasi Kasir modern untuk mengelola penjualan,
                            pendapatan, dan pengeluaran secara otomatis.
                        </p>

                        <button class="bg-green-500 hover:bg-green-600 text-white
                     text-2xl font-extrabold px-20 py-4 rounded-2xl
                     shadow-[0_6px_0_rgb(21,128,61)]
                     active:translate-y-[6px] active:shadow-none transition-all">
                            SIKAS
                        </button>
                    </div>
                </div>

                <!-- ================= BOTTOM ================= -->
                <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-16">

                    <!-- PRODUK -->
                    <div class="lg:col-span-2">
                        <h3 class="text-blue-500 font-black text-xs uppercase mb-3">📦 Daftar Produk</h3>

                        <table class="w-full text-xs bg-gray-50 rounded-xl overflow-hidden">
                            <thead class="bg-blue-500 text-white">
                                <tr>
                                    <th class="p-3">No</th>
                                    <th class="p-3 text-left">Produk</th>
                                    <th class="p-3">Stok</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(p, i) in produk" :key="i" class="border-b hover:bg-blue-50">
                                    <td class="p-2 text-center">{{ i + 1 }}</td>
                                    <td class="p-2">{{ p.nama }}</td>
                                    <td class="p-2 text-center font-bold text-blue-600">
                                        {{ p.stok }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- PENJUALAN -->
                    <div class="lg:col-span-3">
                        <h3 class="text-blue-500 font-black text-xs uppercase mb-3">🛒 Laporan Penjualan</h3>

                        <table class="w-full text-xs bg-gray-50 rounded-xl overflow-hidden">
                            <thead class="bg-blue-500 text-white">
                                <tr>
                                    <th class="p-3">No</th>
                                    <th class="p-3">Tanggal</th>
                                    <th class="p-3">Masuk</th>
                                    <th class="p-3">Keluar</th>
                                    <th class="p-3">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(l, i) in penjualan" :key="i" class="border-b hover:bg-blue-50">
                                    <td class="p-2 text-center">{{ i + 1 }}</td>
                                    <td class="p-2 text-center">{{ l.tgl }}</td>
                                    <td class="p-2 text-green-600 font-semibold">
                                        {{ rupiah(l.masuk) }}
                                    </td>
                                    <td class="p-2 text-red-500">
                                        {{ rupiah(l.keluar) }}
                                    </td>
                                    <td class="p-2 font-black">
                                        {{ rupiah(l.masuk - l.keluar) }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

/* ===== DATA ===== */
const produk = ref([
    { nama: 'Beras', stok: 20 },
    { nama: 'Gula', stok: 15 },
    { nama: 'Minyak', stok: 30 }
])

const penjualan = ref([
    { tgl: '22 Des 2025', masuk: 90000, keluar: 60000 },
    { tgl: '23 Des 2025', masuk: 120000, keluar: 50000 },
    { tgl: '24 Des 2025', masuk: 80000, keluar: 30000 }
])

/* ===== TOTAL OTOMATIS ===== */
const totalPendapatan = computed(() =>
    penjualan.value.reduce((t, d) => t + d.masuk, 0)
)

const totalPengeluaran = computed(() =>
    penjualan.value.reduce((t, d) => t + d.keluar, 0)
)

/* ===== GRAFIK OTOMATIS ===== */
const chartData = ref({})
const chartOptions = {
    cutout: '65%',
    plugins: {
        legend: { position: 'bottom' }
    },
    responsive: true,
    maintainAspectRatio: false
}

watch(
    [totalPendapatan, totalPengeluaran],
    () => {
        chartData.value = {
            labels: ['Pendapatan', 'Pengeluaran'],
            datasets: [
                {
                    data: [totalPendapatan.value, totalPengeluaran.value],
                    backgroundColor: ['#1e40af', '#93c5fd'],
                    borderWidth: 0
                }
            ]
        }
    },
    { immediate: true }
)

/* ===== FORMAT RUPIAH ===== */
const rupiah = (n) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(n)
</script>
