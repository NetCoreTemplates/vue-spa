<template>
  <div class="text-center">
    <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">{{blogTitle}}</h2>
    <p class="mx-auto mt-3 max-w-2xl text-xl text-gray-500 dark:text-gray-400 sm:mt-4" v-html="heading">
    </p>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import type { VirtualPress } from 'vite-plugin-press'
defineProps<{
  heading: string
}>()

const press:VirtualPress = inject('press')!
const blogTitle = press.blog.config.blogTitle
</script>

