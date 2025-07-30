<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">All Blog Posts</h1>

    <!-- ✅ Only show create button if user is logged in -->
    <div v-if="user" class="mb-6">
      <NuxtLink
        to="/posts/create"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Create New Post
      </NuxtLink>
    </div>

    <ul class="space-y-4">
      <li
        v-for="post in posts"
        :key="post.id"
        class="border p-4 rounded bg-white shadow-sm"
      >
        <h2 class="text-xl font-semibold">{{ post.title }}</h2>
        <p class="text-gray-600 text-sm mb-1">
          by {{ post.user?.username || 'Unknown' }}
        </p>
        <p class="mb-2">{{ post.content }}</p>

        <!-- ✅ Only show if logged-in user is the post author -->
        <div v-if="user?.username === post.user?.username" class="space-x-2">
          <NuxtLink
            :to="`/posts/${post.id}/edit`"
            class="text-blue-600 hover:underline"
          >
            Edit
          </NuxtLink>
          <button
            @click="deletePost(post.id)"
            class="text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRuntimeConfig } from '#imports'
import { useAuthUser } from '~/composables/useAuthUser'

const config = useRuntimeConfig()
const posts = ref([])
const { user } = useAuthUser()
const token = useCookie<string | null>('token')

const fetchPosts = async () => {
  const res = await fetch(`http://localhost:${config.public.express}/api/posts`)
  posts.value = await res.json()
}

const deletePost = async (id: number) => {
  if (!token.value) return alert('You must be logged in to delete a post.')

  const res = await fetch(`http://localhost:${config.public.express}/api/posts/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  })

  if (res.ok) {
    await fetchPosts()
  } else {
    const error = await res.json()
    alert(error.error || 'Failed to delete post.')
  }
}

onMounted(fetchPosts)
</script>
