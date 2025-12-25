<script setup>
import SidebarLayout from '../components/navigations/SidebarLayout.vue';

</script>

<template>
  <div class="min-h-screen flex flex-col md:flex-row bg-white">
    <SidebarLayout class="hidden md:flex" />

    <div class="flex-1 flex flex-col h-screen overflow-visible">
      <main class="flex-1 overflow-y-auto focus:outline-none bg-white pb-16 md:pb-0">
        <div class="py-2 md:py-4">
          <div class="mx-auto px-1 sm:px-2 md:px-3">
            <div class="ml-8">
              <!-- Breadcrumb jika ada -->
            </div>
            <router-view />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

