<template>
  <div v-if="selectedTag" class="relative bg-gray-50 dark:bg-gray-900 px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
    <div class="absolute inset-0">
      <div class="h-1/3 bg-white dark:bg-black sm:h-2/3"></div>
    </div>
    <div class="relative mx-auto max-w-7xl">
      <BlogTitle :heading="`All posts tagged in <b>${selectedTag}</b>`" />
    </div>
    <div class="relative my-4 mx-auto max-w-7xl">
      <div class="flex flex-wrap justify-center">
        <template v-for="tag in allTags">
          <span v-if="tag == selectedTag" class="mr-2 mb-2 text-xs leading-5 font-semibold bg-indigo-600 text-white rounded-full py-1 px-3 flex items-center space-x-2">{{tag}}</span>
          <RouterLink v-else :to="tagLink(tag)" class="mr-2 mb-2 text-xs leading-5 font-semibold bg-slate-400/10 dark:bg-slate-400/30 rounded-full py-1 px-3 flex items-center space-x-2 hover:bg-slate-400/20 dark:hover:bg-slate-400/40 dark:highlight-white/5">{{tag}}</RouterLink>
        </template>
      </div>
    </div>
    <div class="mt-12 relative mx-auto max-w-7xl">
      <BlogPosts :posts="taggedPosts" />
      <div class="mt-8 text-center">
        <RouterLink class="text-sm font-semibold hover:underline" to="/posts">view all posts</RouterLink>
      </div>
    </div>
  </div>
  <ErrorSummary v-else :status="{ errorCode:'NotFound', message:`Posts tagged with ${tag} was not found` }" />
</template>

<script setup lang="ts">
import type { VirtualPress, Post } from "vite-plugin-press"
import { inject, computed, onMounted } from "vue"
import { useHead } from "@unhead/vue"
import { useRoute } from "vue-router"
import { generateSlug } from "@/utils"

const route = useRoute()
const tag = computed(() => (route.params as any)?.tag)

const press:VirtualPress = inject('press')!

const selectedTag = computed(() => press.blog.tagSlugs[tag.value])
const allPosts:Post[] = press.blog.posts
const taggedPosts = computed<Post[]>(() => selectedTag ? allPosts.filter((x:any) => x.tags.includes(selectedTag.value)) : [])
const allTags = [...new Set(allPosts.flatMap((x:any) => x.tags) as string[])]
const tagCounts: {[tag:string]: number} = {}
allTags.forEach(tag => tagCounts[tag] = allPosts.filter((x:any) => x.tags.includes(tag)).length)
allTags.sort((a:string, b:string) => tagCounts[b] - tagCounts[a])

function tagLink(tag:string) {
  return `/posts/tagged/${generateSlug(tag)}`
}

onMounted(() => {
  if (selectedTag) {
    useHead({ title: `${selectedTag.value} tagged posts` })
  }
})

</script>
