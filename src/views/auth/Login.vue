<script setup>
import { useRouter } from 'vue-router'
import Logo from "../../assets/logo.png"

const router = useRouter();

// add handlelogin
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const error = ref('')

function handleLogin() {
    if (username.value === 'admin' && password.value === 'admin') {
        error.value = ''
        router.replace({ path: '/' })
    } else {
        error.value = 'Invalid username or password'
    }
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-teal-200">
        <div class="bg-white w-[420px] rounded-2xl shadow-lg p-10">

            <!-- LOGO SIKAS -->
            <div class="text-center mb-6">
                <img :src="Logo" alt="SIKAS Logo" class="w-36 mx-auto mb-2" />
                <!-- <h1 class="text-3xl font-bold text-blue-600">SIKAS</h1>
                <p class="text-gray-500 text-sm">
                    Sistem Informasi Kasir
                </p> -->
            </div>

            <!-- CARD LOGIN -->
            <div class="bg-blue-300 rounded-xl p-6">
                <h5 class="text-white text-center mb-4 font-semibold text-2xl tracking-wide">
                    Sign in to continue
                </h5>

                <p v-if="error" class="text-red-600 text-sm text-center mb-3">
                    {{ error }}
                </p>

                <p>Username</p>
                <div class="relative mb-4">
                    <span class="absolute left-3 top-2.5">👤</span>
                    <input v-model="username" type="text" placeholder="Username"
                        class="w-full pl-10 py-2 bg-white rounded-md focus:outline-none" />
                </div>
                <p>Password</p>
                <div class="relative mb-5">
                    <span class="absolute left-3 top-2.5">🔒</span>
                    <input v-model="password" type="password" placeholder="Password"
                        class="w-full pl-10 py-2 bg-white rounded-md focus:outline-none" />
                </div>

                <button @click="handleLogin"
                    class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-md">
                    LOGIN
                </button>
            </div>
        </div>
    </div>
</template>
