<script setup>
import { ref, onMounted, computed } from 'vue';
import Chart from 'primevue/chart';
import http from '../utils/http';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const isLoading = ref(false);

const products = ref([]);
const sales = ref([]);

const totalRevenue = computed(() => sales.value.reduce((acc, sale) => acc + parseFloat(sale.total_harga), 0));
const totalSalesCount = computed(() => sales.value.length);
const totalProductCount = computed(() => products.value.length);

const revenueChartData = ref(null);
const revenueChartOptions = ref(null);
const topProductsChartData = ref(null);
const topProductsChartOptions = ref(null);

const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
};

const initDashboard = async () => {
    isLoading.value = true;
    try {
        const [prodRes, saleRes] = await Promise.all([
            http.get('/produk'),
            http.get('/penjualan')
        ]);

        products.value = prodRes.data.data;
        sales.value = saleRes.data.data;

        setupRevenueChart();
        setupTopProductsChart();

    } catch (err) {
        console.error(err);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Gagal memuat data', life: 3000 });
    } finally {
        isLoading.value = false;
    }
};

const setupRevenueChart = () => {
    // Group sales by date
    const salesByDate = {};
    sales.value.forEach(sale => {
        const date = new Date(sale.tanggal_penjualan).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
        salesByDate[date] = (salesByDate[date] || 0) + parseFloat(sale.total_harga);
    });

    const labels = Object.keys(salesByDate).slice(-7); // Last 7 days
    const data = labels.map(date => salesByDate[date]);

    revenueChartData.value = {
        labels: labels,
        datasets: [
            {
                label: 'Pendapatan Harian',
                data: data,
                fill: true,
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                tension: 0.4
            }
        ]
    };

    revenueChartOptions.value = {
        plugins: {
            legend: { display: false }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: '#f3f4f6' }
            },
            x: {
                grid: { display: false }
            }
        }
    };
};

const setupTopProductsChart = () => {
    const sortedProducts = [...products.value].sort((a, b) => b.stok - a.stok).slice(0, 5);
    
    topProductsChartData.value = {
        labels: sortedProducts.map(p => p.nama_produk.length > 20 ? p.nama_produk.substring(0, 20) + '...' : p.nama_produk),
        datasets: [
            {
                label: 'Stok Tersedia',
                data: sortedProducts.map(p => p.stok),
                backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
                borderWidth: 0,
                borderRadius: 4
            }
        ]
    };

    topProductsChartOptions.value = {
        plugins: {
            legend: { display: false }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { display: false }
            },
            x: {
                grid: { display: false }
            }
        }
    };
};

onMounted(() => {
    initDashboard();
});
</script>

<template>
    <div class="p-6 space-y-6 bg-gray-50 min-h-screen">
        <Toast />
        
        <!-- Welcome Banner -->
        <div class="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg">
            <h1 class="text-3xl font-bold mb-2">Dashboard Overview</h1>
            <p class="text-blue-100">Pantau performa bisnis Anda hari ini secara real-time.</p>
        </div>

        <!-- Summary Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-gray-500 text-sm font-medium mb-1">Total Pendapatan</p>
                        <h3 class="text-2xl font-bold text-gray-800">{{ formatRupiah(totalRevenue) }}</h3>
                    </div>
                    <div class="p-2 bg-green-50 rounded-lg text-green-600">
                        <i class="pi pi-wallet text-xl"></i>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-gray-500 text-sm font-medium mb-1">Total Transaksi</p>
                        <h3 class="text-2xl font-bold text-gray-800">{{ totalSalesCount }}</h3>
                    </div>
                    <div class="p-2 bg-blue-50 rounded-lg text-blue-600">
                        <i class="pi pi-shopping-bag text-xl"></i>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-gray-500 text-sm font-medium mb-1">Total Produk</p>
                        <h3 class="text-2xl font-bold text-gray-800">{{ totalProductCount }}</h3>
                    </div>
                    <div class="p-2 bg-orange-50 rounded-lg text-orange-600">
                        <i class="pi pi-box text-xl"></i>
                    </div>
                </div>
            </div>
        </div>

        <!-- Charts Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Revenue Trend -->
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 class="font-bold text-lg text-gray-800 mb-6">Tren Pendapatan (7 Hari Terakhir)</h3>
                <div class="h-[300px] flex items-center justify-center">
                    <Chart type="line" :data="revenueChartData" :options="revenueChartOptions" class="w-full h-full" v-if="revenueChartData" />
                    <div v-else class="text-gray-400">Memuat grafik...</div>
                </div>
            </div>

            <!-- Top Products -->
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 class="font-bold text-lg text-gray-800 mb-6">Stok Produk Terbanyak</h3>
                <div class="h-[300px] flex items-center justify-center">
                    <Chart type="bar" :data="topProductsChartData" :options="topProductsChartOptions" class="w-full h-full" v-if="topProductsChartData" />
                    <div v-else class="text-gray-400">Memuat grafik...</div>
                </div>
            </div>
        </div>
    </div>
</template>