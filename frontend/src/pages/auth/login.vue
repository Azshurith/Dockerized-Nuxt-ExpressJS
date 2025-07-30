<template>
  <div class="flex items-center justify-center px-4">
    <div class="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">Welcome Back 👋</h1>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            v-model="loginData.username"
            type="text"
            placeholder="Enter your username"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <p v-if="errors.username" class="text-sm text-red-600 mt-1">{{ errors.username }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            v-model="loginData.password"
            type="password"
            placeholder="••••••••"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <p v-if="errors.password" class="text-sm text-red-600 mt-1">{{ errors.password }}</p>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-150"
        >
          Login
        </button>

        <p v-if="loginError" class="text-red-600 text-sm text-center mt-2">
          {{ loginError }}
        </p>
      </form>

      <p class="text-sm text-center text-gray-600 mt-6">
        Don't have an account?
        <NuxtLink to="/auth/register" class="text-blue-600 hover:underline font-medium">
          Register here
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()
const loginData = ref({ username: '', password: '' })
const loginError = ref('')
const errors = ref({ username: '', password: '' })

definePageMeta({
  middleware: 'guest'
})

const handleLogin = async () => {
  loginError.value = ''
  errors.value = { username: '', password: '' }

  try {
    const res = await fetch(`http://localhost:${config.public.express}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData.value)
    })

    const data = await res.json()

    if (!res.ok) {
      if (Array.isArray(data.errors)) {
        data.errors.forEach((err: { path: string; msg: string }) => {
          if (err.path && err.msg) {
            errors.value[err.path as 'username' | 'password'] = err.msg
          }
        })
        throw new Error('Validation failed')
      } else {
        throw new Error(data.error || 'Login failed')
      }
    }

    useCookie('token').value = data.token
    window.location.href = '/'
  } catch (err) {
    console.error(err);
  }
}
</script>
