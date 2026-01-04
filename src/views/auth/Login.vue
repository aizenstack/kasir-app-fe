<script setup>
import { useRouter } from 'vue-router'
import Logo from "/logo/sikas_logo.png"
import http from '../../utils/http'
import { setToken, setRole, setRefreshToken, setUsername } from '../../utils/auth'
import { ref } from 'vue'

const router = useRouter();

const username = ref('')
const password = ref('')
const error = ref('')
const showPassword = ref(false)
const isLoading = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

async function handleLogin() {
    if (!username.value || !password.value) {
        error.value = 'Username and password are required'
        return
    }

    try {
        isLoading.value = true
        error.value = ''

        const response = await http.post('/auth/login', {
            username: username.value,
            password: password.value
        });

        const { tokens, user } = response.data

        // 2. Simpan token dan role ke LocalStorage
        setToken(tokens.accessToken)
        setRefreshToken(tokens.refreshToken)
        setRole(user.role)
        setUsername(user.username)

        router.replace({ path: '/' })

    } catch (err) {
        console.error("Login Failed:", err)
        if (err.response && err.response.data && err.response.data.message) {
            error.value = err.response.data.message
        } else {
            error.value = 'Login failed. Please checks your credentials or connection.'
        }
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-teal-50">
        <div class="bg-white md:w-[820px] rounded-2xl shadow-lg p-10">

            <div class="text-center mb-6">
                <img :src="Logo" alt="SIKAS Logo" class="w-36 mx-auto mb-2" />
                <!-- <h1 class="text-3xl font-bold text-blue-600">SIKAS</h1>
                <p class="text-gray-500 text-sm">
                    Sistem Informasi Kasir
                </p> -->
            </div>

            <div class="bg-blue-300 rounded-xl p-6">
                <h5 class="text-white text-center mb-4 font-semibold text-2xl tracking-wide">
                    Sign in to continue
                </h5>

                <p v-if="error" class="text-red-600 text-sm text-center mb-3">
                    {{ error }}
                </p>

                <p>Username</p>
                <div class="relative mb-4">
                    <span class="absolute left-3 top-2.5"><i class="pi pi-user"></i></span>
                    <input v-model="username" type="text" placeholder="Username"
                        class="w-full pl-10 py-2 bg-white rounded-md focus:outline-none" />
                </div>
                <p>Password</p>
                <div class="relative mb-5">
                    <span class="absolute left-3 top-2.5">
                        <i class="pi pi-lock"></i>
                    </span>

                    <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Password"
                        class="w-full pl-10 pr-10 py-2 bg-white rounded-md focus:outline-none" />

                    <span class="absolute right-3 top-2.5 cursor-pointer" @click="togglePassword">
                        <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
                    </span>
                </div>
                <button @click="handleLogin" :disabled="isLoading"
                    class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-md disabled:bg-gray-400 cursor-pointer disabled:cursor-not-allowed">
                    {{ isLoading ? 'LOADING...' : 'LOGIN' }}
                </button>
            </div>
        </div>
    </div>
</template>
