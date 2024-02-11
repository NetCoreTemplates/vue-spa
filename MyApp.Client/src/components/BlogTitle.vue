<template>
  <div class="text-center">
    <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">{{blogTitle}}</h2>
    <p class="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4" v-html="heading">
    </p>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
defineProps<{
  heading: string
}>()

const meta = inject('meta') as any
const blogTitle = meta.posts.config.blogTitle
</script>

