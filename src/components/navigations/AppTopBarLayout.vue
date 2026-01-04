<script setup>
import { ref, onMounted } from 'vue'
import { useMenu } from '../composables/useMenu'
import { useRouter } from 'vue-router'
import { clearAuth, getRole, getRefreshToken, getUsername } from '../../utils/auth'
import http from '../../utils/http'

const open = ref(false)
const { sidebarMenu } = useMenu()
const router = useRouter()
const userRole = ref('')
const username = ref('')

const showUserMenu = ref(false)

onMounted(() => {
  userRole.value = getRole()
  username.value = getUsername()
})

const handleLogout = async () => {
  try {
    const refreshToken = getRefreshToken()
    if (refreshToken) {
      await http.post('/auth/logout', { refreshToken })
    }
  } catch (e) {
    console.error('Logout failed', e)
  } finally {
    clearAuth()
    router.push('/auth/login')
  }
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const pushHome = () => {
  router.push('/')
}
</script>

<template>
  <header class="bg-gradient-to-b from-white via-white to-white border-r border-blue-200/50 shadow-sm relative">
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
            <div class="flex items-center gap-3 cursor-pointer px-3 py-2 ro
         bg-blue-600 hover:bg-blue-700 transition-all duration-200" @click="toggleUserMenu">
              <div class="flex flex-col items-end leading-tight">
                <span class="text-sm font-semibold text-white">
                  Welcome, {{ username || 'User' }}
                </span>
                <span class="text-xs text-blue-100 capitalize">
                  {{ userRole }}
                </span>
              </div>

              <div class="relative flex items-center">
                <div class="h-10 w-10 rounded-full bg-white/90 flex items-center justify-center 
             text-blue-600 shadow-sm">
                  <i class="pi pi-user text-lg"></i>
                </div>

                <div class="ml-1 h-4 w-4 rounded-full flex items-center justify-center">
                  <i class="pi pi-chevron-down text-[10px] text-white"></i>
                </div>
              </div>
            </div>

            <transition enter-active-class="transition ease-out duration-150"
              enter-from-class="transform opacity-0 scale-95 -translate-y-1"
              enter-to-class="transform opacity-100 scale-100 translate-y-0"
              leave-active-class="transition ease-in duration-100"
              leave-from-class="transform opacity-100 scale-100 translate-y-0"
              leave-to-class="transform opacity-0 scale-95 -translate-y-1">
              <div v-if="showUserMenu" class="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-xl
           ring-1 ring-black/5 z-50 origin-top-right">
                <button @click="handleLogout" class="flex w-full items-center gap-2 px-4 py-3 text-sm text-gray-700
             hover:bg-red-50 hover:text-red-600 transition-colors rounded-lg">
                  <i class="pi pi-sign-out text-base"></i>
                  <span class="font-medium">Sign out</span>
                </button>
              </div>
            </transition>

          </div>
        </div>

        <div class="flex items-center gap-2 md:hidden">

          <button type="button"
            class="inline-flex items-center justify-center p-2 rounded-xl text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
            @click="open = true">
            <i class="pi pi-bars text-xl"></i>
          </button>
        </div>

        <transition enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0"
          enter-to-class="opacity-100" leave-active-class="transition-opacity duration-200"
          leave-from-class="opacity-100" leave-to-class="opacity-0">
          <div v-if="open" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" @click="open = false"></div>
        </transition>

        <transition enter-active-class="transition-transform duration-300 ease-out" enter-from-class="-translate-x-full"
          enter-to-class="translate-x-0" leave-active-class="transition-transform duration-250 ease-in"
          leave-from-class="translate-x-0" leave-to-class="-translate-x-full">
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
                class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group" :class="{
                  'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md': $route.path === item.to,
                  'text-gray-700 hover:bg-gray-100': $route.path !== item.to
                }" @click="open = false">
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

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.ro {
  border-radius: 10px 10px 0 0;
  padding: 10px;
}
</style>