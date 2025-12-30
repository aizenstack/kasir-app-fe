<script setup>
import { ref } from 'vue'
import { useMenu } from '../composables/useMenu'
import {  useRouter } from 'vue-router'
const open = ref(false)
const { sidebarMenu } = useMenu()
const router = useRouter()

const pushHome = () => {
  router.push('/')
}
</script>

<template>
  <header class="bg-gradient-to-b from-white via-white to-white border-r border-blue-200/50 shadow-sm">
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 md:h-25 items-center">
        <div class="flex-shrink-0 flex items-center gap-3 cursor-pointer" @click="pushHome">
            <img src="../../../public//logo/sikas_logov.png" alt="" class="h-8 w-8 md:hidden">
          <div>
            <h1 class="text-lg font-bold text-gray-800 sm:hidden">SIKAS</h1>
            <p class="text-xs text-gray-500 sm:hidden">Sistem Informasi Kasir</p>
          </div>
        </div>

        <div class="hidden md:flex items-center space-x-4">

          <div class="relative ml-3">
          </div>
        </div>

        <div class="flex items-center gap-2 md:hidden">
          
          <button type="button"
            class="inline-flex items-center justify-center p-2 rounded-xl text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
            @click="open = true">
            <i class="pi pi-bars text-xl"></i>
          </button>
        </div>

        <transition 
          enter-active-class="transition-opacity duration-300"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-opacity duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0">
          <div v-if="open" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" @click="open = false"></div>
        </transition>

        <transition 
          enter-active-class="transition-transform duration-300 ease-out"
          enter-from-class="-translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="transition-transform duration-250 ease-in"
          leave-from-class="translate-x-0"
          leave-to-class="-translate-x-full">
          <aside v-if="open" class="fixed top-0 left-0 bottom-0 w-72 bg-white shadow-2xl z-50 flex flex-col">
            <div class="flex items-center justify-between p-4 border-b border-gray-100">
              <div class="flex items-center gap-3 cursor-pointer" @click="pushHome">
                  <img src="../../../public//logo/sikas_logov.png" alt="" class="h-8 w-8">
                <div>
                  <h2 class="text-base font-bold text-gray-800">SIKAS</h2>
                  <p class="text-xs text-gray-500">Sistem Informasi Kasir</p>
                </div>
              </div>
              <button @click="open = false" 
                class="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200">
                <i class="pi pi-times text-xl"></i>
              </button>
            </div>

            <div class="flex-1 overflow-y-auto p-4 space-y-1">
              <RouterLink v-for="item in sidebarMenu" :key="item.to" :to="item.to"
                class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group"
                :class="{ 
                  'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md': $route.path === item.to,
                  'text-gray-700 hover:bg-gray-100': $route.path !== item.to
                }" 
                @click="open = false">
                <i :class="item.icon" class="text-lg transition-transform duration-200 group-hover:scale-110"></i>
                <span class="font-medium">{{ item.label }}</span>
                <i v-if="$route.path === item.to" class="pi pi-chevron-right text-sm ml-auto"></i>
              </RouterLink>
            </div>
          </aside>
        </transition>
      </div>
    </div>
  </header>
</template>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>