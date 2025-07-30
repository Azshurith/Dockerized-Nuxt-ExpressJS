<template>
  <div class="flex items-center justify-center px-4">
    <div class="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">
        Create Your Account ✨
      </h1>

      <form @submit.prevent="handleRegister" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            v-model="registerData.username"
            type="text"
            placeholder="Choose a username"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <p v-if="fieldErrors.username" class="text-red-600 text-sm mt-1">
            {{ fieldErrors.username }}
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            v-model="registerData.password"
            type="password"
            placeholder="••••••••"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <p v-if="fieldErrors.password" class="text-red-600 text-sm mt-1">
            {{ fieldErrors.password }}
          </p>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-150"
        >
          Register
        </button>

        <p v-if="registerSuccess" class="text-green-600 text-sm text-center mt-2">
          {{ registerSuccess }}
        </p>
        <p v-if="registerError" class="text-red-600 text-sm text-center mt-2">
          {{ registerError }}
        </p>
      </form>

      <p class="text-sm text-center text-gray-600 mt-6">
        Already have an account?
        <NuxtLink to="/auth/login" class="text-blue-600 hover:underline font-medium">
          Login here
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()
const registerData = ref({ username: '', password: '' })
const registerError = ref('')
const registerSuccess = ref('')
const fieldErrors = ref<{ username?: string; password?: string }>({})

definePageMeta({
  middleware: 'guest'
})

const handleRegister = async () => {
  registerError.value = ''
  registerSuccess.value = ''
  fieldErrors.value = {}

  try {
    const res = await fetch(`http://localhost:${config.public.express}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerData.value),
    })

    const data = await res.json()

    if (!res.ok) {
      if (Array.isArray(data.errors)) {
        data.errors.forEach((err: { path: string; msg: string }) => {
          if (err.path && err.msg) {
            fieldErrors.value[err.path as 'username' | 'password'] = err.msg
          }
        })
      } else {
        registerError.value = data.error || 'Registration failed'
      }
      return
    }

    registerSuccess.value = 'User created successfully!'
    registerData.value = { username: '', password: '' }
  } catch (err) {
    registerError.value = 'Something went wrong. Please try again.'
  }
}
</script>
