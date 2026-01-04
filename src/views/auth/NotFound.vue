<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'

const router = useRouter()
const pageLoaded = ref(false)

onMounted(() => {
  setTimeout(() => {
    pageLoaded.value = true
  }, 100)
})

const goToHome = () => {
  router.push('/')
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div 
    v-if="!pageLoaded"
    class="fixed inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 z-[9999] flex items-center justify-center"
  >

  </div>

  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50/30 to-purple-50 relative overflow-hidden flex items-center justify-center">
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob transition-opacity duration-1000" :class="pageLoaded ? 'opacity-100' : 'opacity-0'"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 transition-opacity duration-1000 delay-200" :class="pageLoaded ? 'opacity-100' : 'opacity-0'"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000 transition-opacity duration-1000 delay-400" :class="pageLoaded ? 'opacity-100' : 'opacity-0'"></div>
    </div>

    <div class="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-12">
      <div class="bg-white/90 backdrop-blur-xl rounded-3xl border border-white/30 p-8 md:p-12 relative overflow-hidden">
        <div class="absolute inset-0 opacity-5">
          <div class="absolute inset-0" style="background-image: radial-gradient(circle, #3b82f6 1px, transparent 1px); background-size: 30px 30px;"></div>
        </div>
        
        <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"></div>
        
        <div class="relative z-10 text-center">
          <div class="mb-8 transform transition-all duration-1000 delay-300" :class="pageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'">
            <div class="flex items-center justify-center gap-4 md:gap-8">
              <div class="relative">
                <div class="text-8xl md:text-9xl lg:text-[12rem] font-black bg-gradient-to-br from-red-500 via-rose-600 to-pink-700 bg-clip-text text-transparent drop-shadow-2xl transform transition-all duration-1000 delay-400 animate-bounce-soft" :class="pageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'">
                  4
                </div>
                <div class="absolute -top-4 -right-4 w-3 h-3 bg-red-400 rounded-full animate-pulse-slow"></div>
                <div class="absolute -bottom-2 -left-2 w-2 h-2 bg-rose-400 rounded-full animate-pulse-slow animation-delay-1000"></div>
              </div>
              
              <div class="relative transform transition-all duration-1000 delay-500" :class="pageLoaded ? 'opacity-100 rotate-0' : 'opacity-0 rotate-180'">
                <div class="relative">
                  <div class="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 relative">
                    <div class="absolute inset-0 rounded-full bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 shadow-2xl border-4 border-gray-900/50"></div>
                    
                    <div class="absolute inset-0">
                      <div 
                        v-for="i in 12" 
                        :key="i"
                        class="absolute w-3 h-8 md:w-4 md:h-10 lg:w-5 lg:h-12 bg-gradient-to-b from-gray-700 to-gray-800 rounded-t-lg"
                        :style="{
                          top: '-4px',
                          left: '50%',
                          transform: `translateX(-50%) rotate(${i * 30}deg)`,
                          transformOrigin: '50% 100%'
                        }"
                      ></div>
                    </div>
                    
                    <div class="absolute inset-0 flex items-center justify-center">
                      <div class="w-1 h-full bg-gradient-to-b from-transparent via-red-500/50 to-transparent animate-pulse-slow"></div>
                    </div>
                    
                    <div class="absolute inset-0 flex items-center justify-center">
                      <div class="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 shadow-inner"></div>
                    </div>
                    
                    <div 
                      v-for="(pos, idx) in [
                        { top: '-20%', left: '20%', size: 'w-8 h-8 md:w-10 md:h-10', delay: 'delay-300' },
                        { top: '20%', right: '-20%', size: 'w-6 h-6 md:w-8 md:h-8', delay: 'delay-500' },
                        { bottom: '-15%', left: '50%', size: 'w-7 h-7 md:w-9 md:h-9', delay: 'delay-700' }
                      ]"
                      :key="idx"
                      class="absolute"
                      :class="[pos.top, pos.left || pos.right, pos.size, pos.delay]"
                      :style="pos.left ? { left: pos.left } : { right: pos.right }"
                    >
                      <div class="w-full h-full rounded-full bg-gradient-to-br from-gray-400 to-gray-600 border-2 border-gray-500 shadow-lg animate-rotate-slow"></div>
                      <div class="absolute inset-0 flex items-center justify-center">
                        <div class="w-1/3 h-1/3 rounded-full bg-gray-700"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="relative">
                <div class="text-8xl md:text-9xl lg:text-[12rem] font-black bg-gradient-to-br from-red-500 via-rose-600 to-pink-700 bg-clip-text text-transparent drop-shadow-2xl transform transition-all duration-1000 delay-600 animate-bounce-soft" :class="pageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'">
                  4
                </div>
                <div class="absolute -top-4 -left-4 w-3 h-3 bg-red-400 rounded-full animate-pulse-slow animation-delay-500"></div>
                <div class="absolute -bottom-2 -right-2 w-2 h-2 bg-rose-400 rounded-full animate-pulse-slow animation-delay-1500"></div>
              </div>
            </div>
          </div>

          <div class="mb-6 transform transition-all duration-1000 delay-700" :class="pageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'">
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
              <span class="bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 bg-clip-text text-transparent">
                PAGE
              </span>
              <span class="text-gray-700 mx-2">
                NOT
              </span>
              <span class="bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 bg-clip-text text-transparent">
                FOUND
              </span>
            </h1>
            <p class="text-gray-600 text-lg md:text-xl mb-2">
              Oops! Halaman yang Anda cari tidak ditemukan
            </p>
            <p class="text-gray-500 text-sm md:text-base">
              Halaman mungkin telah dipindahkan atau dihapus
            </p>
          </div>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 transform transition-all duration-1000 delay-900" :class="pageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'">
            <Button 
              @click="goToHome"
              label="Kembali ke Beranda"
              icon="pi pi-home"
              severity="danger"
              class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 border-none hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 px-6 py-3 text-base font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            />
            <!-- <Button 
              @click="goBack"
              label="Kembali"
              icon="pi pi-arrow-left"
              outlined
              severity="secondary"
              class="px-6 py-3 text-base font-semibold border-2 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
            /> -->
          </div>

          <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div 
              v-for="(line, idx) in Array(8).fill(0)"
              :key="idx"
              class="absolute w-16 h-0.5 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 border-dashed border-t-2 border-yellow-400/50"
              :style="{
                top: `${20 + idx * 10}%`,
                left: `${10 + idx * 12}%`,
                transform: `rotate(${idx * 15}deg)`,
                animationDelay: `${idx * 200}ms`
              }"
              :class="pageLoaded ? 'animate-fade-in-line' : 'opacity-0'"
            ></div>
            
            <div 
              v-for="(circle, idx) in Array(6).fill(0)"
              :key="`circle-${idx}`"
              class="absolute w-2 h-2 rounded-full bg-red-400/40"
              :style="{
                top: `${15 + idx * 15}%`,
                right: `${5 + idx * 15}%`,
                animationDelay: `${idx * 300}ms`
              }"
              :class="pageLoaded ? 'animate-pulse-slow' : 'opacity-0'"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes blob {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animation-delay-1000 {
  animation-delay: 1s;
}

.animation-delay-1500 {
  animation-delay: 1.5s;
}

@keyframes bounce-soft {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce-soft {
  animation: bounce-soft 3s ease-in-out infinite;
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 2s ease-in-out infinite;
}

@keyframes rotate-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-rotate-slow {
  animation: rotate-slow 8s linear infinite;
}

@keyframes fade-in-line {
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 0.6;
    transform: translateX(0);
  }
}

.animate-fade-in-line {
  animation: fade-in-line 2s ease-out forwards;
}

.delay-300 {
  animation-delay: 300ms;
}

.delay-500 {
  animation-delay: 500ms;
}

.delay-700 {
  animation-delay: 700ms;
}
</style>
