<template>
  <div class="relative bg-gray-50 dark:bg-gray-900 px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
    <div class="absolute inset-0">
      <div class="h-1/3 bg-white dark:bg-black sm:h-2/3"></div>
    </div>
    <div class="relative mx-auto max-w-7xl">
      <BlogTitle :heading="blogDescription" />
    </div>
    <div class="relative my-4 mx-auto max-w-7xl">
      <div class="flex flex-wrap justify-center">
        <RouterLink v-for="tag in allTags" :to="tagLink(tag)" class="mr-2 mb-2 text-xs leading-5 font-semibold bg-slate-400/10 dark:bg-slate-400/30 rounded-full py-1 px-3 flex items-center space-x-2 hover:bg-slate-400/20 dark:hover:bg-slate-400/40 dark:highlight-white/5">{{tag}}</RouterLink>
      </div>
    </div>
    <div class="relative mb-8 mx-auto max-w-7xl">
      <div class="flex flex-wrap justify-center">
        <b class="text-sm font-semibold">{{ thisYear }}</b>
        <RouterLink v-for="year in allYears.filter(x => x != thisYear)" class="ml-3 text-sm text-indigo-700 dark:text-indigo-300 font-semibold hover:underline" :to="yearLink(year)">{{year}}</RouterLink>
      </div>
    </div>
    <div class="relative mx-auto max-w-7xl">
      <BlogPosts :posts="allPosts.filter((x:any) => new Date(x.date).getFullYear() == thisYear)" />

      <div class="mt-8 text-center">
        <RouterLink class="text-sm font-semibold hover:underline" to="/posts">view all posts</RouterLink>
      </div>
    </div>

  </div>

  <div class="my-8 flex justify-center gap-x-4">
    <SrcPage path="posts/index.vue" />
  </div>
</template>

<script setup lang="ts">
import type { VirtualPress, Post } from "vite-plugin-press"
import { inject } from 'vue'
import { generateSlug } from "@/utils"

const press:VirtualPress = inject('press')!
const blogDescription = press.blog.config.blogDescription
const allPosts:Post[] = press.blog.posts
const allYears = [...new Set(allPosts.map((x:any) => new Date(x.date).getFullYear()) as number[])]
const allTags = [...new Set(allPosts.flatMap((x:any) => x.tags) as string[])]
const tagCounts: {[tag:string]: number} = {}
allTags.forEach(tag => tagCounts[tag] = allPosts.filter((x:any) => x.tags.includes(tag)).length)
allTags.sort((a:string, b:string) => tagCounts[b] - tagCounts[a])

function tagLink(tag:string) {
  return `/posts/tagged/${generateSlug(tag)}`
}
function yearLink(year:number) {
  return `/posts/year/${year}`
}
const thisYear = new Date().getFullYear()
</script>
