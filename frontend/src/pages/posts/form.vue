<template>
  <div class="p-4 max-w-xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">
      {{ isEdit ? 'Edit Post' : 'Create Post' }}
    </h1>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <input
          v-model="form.title"
          placeholder="Title"
          class="w-full border px-2 py-1"
        />
        <p v-if="errors.title" class="text-sm text-red-600 mt-1">{{ errors.title }}</p>
      </div>

      <div>
        <textarea
          v-model="form.content"
          placeholder="Content"
          class="w-full border px-2 py-1"
        ></textarea>
        <p v-if="errors.content" class="text-sm text-red-600 mt-1">{{ errors.content }}</p>
      </div>

      <button
        type="submit"
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {{ isEdit ? 'Update' : 'Submit' }}
      </button>

      <p v-if="serverError" class="text-sm text-red-600 mt-2 text-center">
        {{ serverError }}
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute, useRuntimeConfig } from '#imports'
import { useAuthUser } from '~/composables/useAuthUser'

const router = useRouter()
const route = useRoute()
const config = useRuntimeConfig()
const { user } = useAuthUser()
const token = useCookie<string | null>('token')

const isEdit = ref(route.name === 'posts-id-edit')
const postId = route.params.id
const form = ref({ title: '', content: '' })
const errors = ref<{ title?: string; content?: string }>({})
const serverError = ref('')

// Fetch existing post
const fetchPost = async () => {
  try {
    const res = await fetch(`http://localhost:${config.public.express}/api/posts/${postId}`)
    if (!res.ok) throw new Error('Post not found')

    const data = await res.json()
    form.value.title = data.title
    form.value.content = data.content
  } catch (error) {
    console.error(error)
    alert('Failed to fetch post')
    router.push('/')
  }
}

// Handle create/update
const handleSubmit = async () => {
  errors.value = {}
  serverError.value = ''

  const endpoint = isEdit.value
    ? `http://localhost:${config.public.express}/api/posts/${postId}`
    : `http://localhost:${config.public.express}/api/posts`

  const method = isEdit.value ? 'PUT' : 'POST'

  try {
    const res = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token.value ? { Authorization: `Bearer ${token.value}` } : {})
      },
      body: JSON.stringify(form.value)
    })

    const data = await res.json()

    if (!res.ok) {
      if (Array.isArray(data.errors)) {
        data.errors.forEach((err: { path: string; msg: string }) => {
          if (err.path && err.msg) {
            errors.value[err.path as 'title' | 'content'] = err.msg
          }
        })
        return
      }

      serverError.value = data.error || 'Failed to save post'
      return
    }

    router.push('/')
  } catch (err) {
    console.error(err)
    serverError.value = 'Something went wrong'
  }
}

if (isEdit.value) {
  onMounted(fetchPost)
}
</script>
