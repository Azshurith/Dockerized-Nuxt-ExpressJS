<template>
  <div class="min-h-screen flex flex-col bg-gray-50 text-gray-800">
    <!-- Header -->
    <header class="bg-white shadow p-4 flex justify-between items-center">
      <h1 class="text-xl font-bold">
        <NuxtLink to="/">📝 Nuxt Headless Blog</NuxtLink>
      </h1>
      <nav class="space-x-4 flex items-center">
        <NuxtLink to="/" class="text-blue-600 hover:underline">Home</NuxtLink>

        <template v-if="user?.username">
          <span class="text-gray-600 text-sm">Hello, {{ user.username }}</span>
          <button
            type="button"
            class="text-red-600 hover:underline text-sm"
            @click="handleLogout"
          >
            Logout
          </button>
        </template>

        <template v-else>
          <NuxtLink to="/auth/login" class="text-blue-600 hover:underline">Login</NuxtLink>
          <NuxtLink to="/auth/register" class="text-blue-600 hover:underline">Register</NuxtLink>
        </template>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="flex-1 container mx-auto p-6">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-100 p-4 text-center text-sm text-gray-500">
      © 2025 Nuxt Blog. All rights reserved.
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useAuthUser } from '@/composables/useAuthUser'
import { useCookie } from '#app'

// Get user from composable
const { user } = useAuthUser()

/**
 * Logout the user by clearing token cookie
 */
const handleLogout = () => {
  console.log('LOGGING OUT')
  useCookie('token').value = null
  window.location.href = '/auth/login'
}
</script>
