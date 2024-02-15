<template>
  <div class="mx-auto grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
    <div v-for="post in posts" class="flex flex-col overflow-hidden rounded-lg shadow-lg">
      <div class="flex-shrink-0">
        <a :href="postLink(post)">
          <img class="h-48 w-full object-cover" :src="post.image" alt="">
        </a>
      </div>
      <div class="flex flex-1 flex-col justify-between bg-white dark:bg-black p-6">
        <div class="flex-1">
          <p class="text-sm font-medium text-indigo-600 dark:text-indigo-300">
            Article
          </p>
          <a :href="postLink(post)" class="mt-2 block">
            <p class="text-xl font-semibold text-gray-900 dark:text-gray-50 whitespace-nowrap overflow-hidden text-ellipsis" :title="post.title">
              {{post.title}}
            </p>
            <p class="mt-3 text-base text-gray-500 dark:text-gray-400">{{post.summary}}</p>
          </a>
        </div>
        <div class="mt-6 flex items-center">
          <div class="flex-shrink-0">
            <a href="">
              <span class="sr-only">{{post.author}}</span>
              <img class="h-10 w-10 rounded-full" :src="authorProfileUrl(post.author)" :alt="`${post.title} background`">
            </a>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-900 dark:text-gray-50">
              <RouterLink v-if="authorLink(post.author)" :to="authorLink(post.author)!" class="hover:underline">{{post.author}}</RouterLink>
              <span v-else>{{post.author}}</span>
            </p>
            <div class="flex space-x-1 text-sm text-gray-500 dark:text-gray-400">
              <time :datetime="dateTimestamp(post.date)">{{dateLabel(post.date)}}</time>
              <span class="px-1" aria-hidden="true">&middot;</span>
              <span>{{post.minutesToRead}} min read</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { VirtualPress, Post, Author } from "vite-plugin-press"
import { ref, inject } from "vue"
import { useHead } from "@unhead/vue"
import { generateSlug, dateLabel, dateTimestamp } from "@/utils"

defineProps<{
  posts: Post[]
}>()

const press:VirtualPress = inject('press')!
useHead({ title: press.blog.config.blogTitle })

function authorLink(name:any) {
  return name && press.blog.authors.some((x:any) => x.name.toLowerCase() == name.toLowerCase())
      ? `/posts/author/${generateSlug(name)}`
      : null
}
function postLink(post:Post) {
  return `/posts/${post.slug}`
}
function author(name:string) : Author | undefined {
  return name ? press.blog.authors.find((x:Author) => x.name.toLowerCase() == name.toLowerCase()) : undefined 
}
function authorProfileUrl(name:string) {
  return author(name)?.profileUrl!
}
</script>
