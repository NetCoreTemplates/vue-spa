<template>
  <div v-if="author" class="relative bg-gray-50 dark:bg-gray-900 px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
    <div class="absolute inset-0">
      <div class="h-1/3 bg-white dark:bg-black sm:h-2/3"></div>
    </div>
    <div class="relative mx-auto max-w-7xl">
      <BlogTitle :heading="`All posts written by <b>${author.name}</b>`" />
    </div>
    <div class="mt-12 relative mx-auto max-w-7xl">
      <BlogPosts :posts="authorPosts" />

      <div class="mt-8 text-center">
        <RouterLink class="text-sm font-semibold hover:underline" to="/posts">view all posts</RouterLink>
      </div>
    </div>
  </div>
  <ErrorSummary v-else :status="{ errorCode:'NotFound', message:`Author ${($route.params as any).name} was not found` }" />
</template>

<script setup lang="ts">
import type { VirtualPress, Post, Author } from "vite-plugin-press"
import { inject } from "vue"
import { generateSlug } from "@/utils"
import { useHead } from "@unhead/vue"
import { useRoute } from "vue-router"

const route = useRoute()
const name = (route.params as any)?.name

const press:VirtualPress = inject('press')!

const author = press.blog.authors.find((x:any) => generateSlug(x.name) == name)
const authorPosts:Post[] = author ? press.blog.posts.filter((x:any) => x.author.toLowerCase() == author.name.toLowerCase()) : []

if (author) {
  useHead({ title: `${author.name} posts` })
}
</script>
