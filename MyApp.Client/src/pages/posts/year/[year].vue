<template>
  <div v-if="yearPosts.length" class="relative bg-gray-50 dark:bg-gray-900 px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
    <div class="absolute inset-0">
      <div class="h-1/3 bg-white dark:bg-black sm:h-2/3"></div>
    </div>
    <div class="relative mx-auto max-w-7xl">
      <BlogTitle :heading="`All posts published in <b>${forYear}</b>`" />
    </div>
    <div class="mt-4 relative mb-8 mx-auto max-w-7xl">
      <div class="flex flex-wrap justify-center">
        <template v-for="year in allYears">
          <b v-if="forYear == year" class="ml-3 text-sm font-semibold">{{year}}</b>
          <RouterLink v-else class="ml-3 text-sm text-indigo-700 dark:text-indigo-300 font-semibold hover:underline" :to="yearLink(year)">{{year}}</RouterLink>
        </template>
      </div>
    </div>
    <div class="mt-12 relative mx-auto max-w-7xl">
      <BlogPosts :posts="yearPosts" />
      <div class="mt-8 text-center">
        <RouterLink class="text-sm font-semibold hover:underline" to="/posts">view all posts</RouterLink>
      </div>
    </div>
  </div>
  <ErrorSummary v-else :status="{ errorCode:'NotFound', message:`Posts published in ${forYear} was not found` }" />
</template>

<script setup lang="ts">
import type { VirtualPress, Post } from "vite-plugin-press"
import { inject, computed, onMounted } from "vue"
import { useHead } from "@unhead/vue"
import { useRoute } from "vue-router"

const route = useRoute()
const forYear = computed(() => parseInt((route.params as any)?.year ?? 0))

const press:VirtualPress = inject('press')!
const allPosts:Post[] = press.blog.posts
const allYears = [...new Set(allPosts.map((x:any) => new Date(x.date).getFullYear()) as number[])]
allYears.sort((a:number, b:number) => b - a)
const yearPosts = computed<Post[]>(() => {
  const to = allPosts.filter((x:any) => new Date(x.date).getFullYear() == forYear.value)
  to.sort((a:any, b:any) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return to
})

function yearLink(year:number) {
  return `/posts/year/${year}`
}

onMounted(() => {
  if (yearPosts.value.length) {
    useHead({ title: `${forYear.value} posts` })
  }
})

</script>
