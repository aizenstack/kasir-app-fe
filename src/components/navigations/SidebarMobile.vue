<script setup>
import { ref } from 'vue'
import { useMenu } from '../composables/useMenu'

const open = ref(false)
const { sidebar } = useMenu()
</script>

<template>
  <button
    @click="open = true"
    class="md:hidden fixed top-3 right-3 z-50 bg-white p-2"
  >
    <i class="pi pi-bars text-xl"></i>
  </button>

  <transition name="fade"> 
    <div
      v-if="open"
      class="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
      @click="open = false"
    ></div>
  </transition>

  <transition name="slide">
    <aside
      v-if="open"
      class="fixed top-0 left-0 bottom-0 w-64 bg-white shadow-lg p-4 space-y-2 z-50"
    >
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">Menu</h2>
        <button @click="open = false" class="text-gray-500 hover:text-black">
          <i class="pi pi-times text-xl"></i>
        </button>
      </div>

      <RouterLink
        v-for="item in sidebar"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
        :class="{ 'bg-blue-50 text-blue-600 font-medium': $route.path === item.to }"
        @click="open = false"
      >
        <i :class="item.icon"></i>
        <span>{{ item.label }}</span>
      </RouterLink>
    </aside>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from {
  transform: translateX(-100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
