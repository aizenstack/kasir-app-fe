<script setup>
import { useMenu } from '../composables/useMenu'
import { useRouter } from 'vue-router'

const router = useRouter()
const { sidebar } = useMenu()

const pushHome = () => {
  router.push('/')
}

</script>

<template>
  <aside
    class="hidden md:flex flex-col w-64 bg-gradient-to-b from-white via-white to-white border-r border-blue-200/50 shadow-xl backdrop-blur-sm px-5  py-6 relative overflow-hidden">
    <div class="absolute top-0 right-0 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl -z-0 animate-pulse"></div>
    <div class="absolute bottom-0 left-0 w-40 h-40 bg-indigo-400/20 rounded-full blur-3xl -z-0 animate-pulse"
      style="animation-delay: 1s;"></div>

    <div class="flex items-center gap-3 mb-10 px-2 cursor-pointer group relative z-10" @click="pushHome">
      
        <img src="../../../public/logo/sikas_logov.png" alt="Logo" class="w-12 h-12">

      <div>
        <h1 class="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">SIKAS
        </h1>
        <p>Sistem Informasi Kasir</p>
      </div>
    </div>

    <nav class="flex flex-col gap-2 relative z-10">
      <RouterLink v-for="(item, index) in sidebar" :key="item.to" :to="item.to"
        class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden"
        :class="{
          'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 transform scale-[1.02]': $route.path === item.to,
          'text-gray-600 hover:bg-white/80 hover:text-blue-600 hover:shadow-md': $route.path !== item.to
        }" :style="{ animationDelay: `${index * 50}ms` }">
        <div v-if="$route.path === item.to"
          class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000">
        </div>

        <div class="w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 relative z-10"
          :class="{
            'bg-white/20 text-white shadow-inner': $route.path === item.to,
            'bg-blue-50 text-blue-600 group-hover:bg-blue-100 group-hover:scale-110': $route.path !== item.to
          }">
          <i :class="item.icon + ' text-lg'"></i>
        </div>

        <span class="font-semibold text-sm relative z-10">{{ item.label }}</span>

        <i v-if="$route.path === item.to" class="pi pi-chevron-right text-xs ml-auto relative z-10 animate-pulse"></i>
      </RouterLink>
    </nav>
  </aside>
</template>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

nav>* {
  animation: fadeInUp 0.5s ease-out both;
}
</style>