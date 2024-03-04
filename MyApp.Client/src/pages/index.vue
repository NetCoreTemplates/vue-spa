<template>

  <div class="mx-auto mt-16 max-w-7xl px-4 sm:mt-24">
    <div class="text-center">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl">
        <span class="block xl:inline">Welcome to </span>
        <span class="block text-green-600 dark:text-green-500 xl:inline">Vue SPA</span>
      </h1>
      <p class="mx-auto mt-3 max-w-md text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
        Welcome to your new Vue SPA App
      </p>
      <div class="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
        <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
          <a href="https://docs.servicestack.net/vue/" class="flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-8 py-3 text-base font-medium text-white hover:bg-green-700 md:py-4 md:px-10 md:text-lg">
            Vue Gallery
          </a>
        </div>
      </div>
    </div>
  </div>
  
  <section class="py-8 flex">
    <div class="mt-8 mx-auto">
      <h2 class="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl text-center">
        Getting Started
      </h2>
      <div>
        <GettingStarted template="vue-spa" />
      </div>
    </div>
  </section>

  <div class="relative">
    <div class="mt-8 max-w-6xl mx-auto">
      <div class="aspect-w-16 aspect-h-9">
        <LiteYouTube id="JlUjWlVslRg" title="Productive ASP.NET Core Vite Vue SPA Tailwind Template with Identity Auth" />
      </div>
    </div>
  </div>

  <div class="container mx-auto px-5 mt-24 mb-24">
    <section v-if="primaryPost">
      <div class="mb-8 md:mb-16">
        <div class="sm:mx-0">
          <RouterLink :aria-label="primaryPost.title" :to="postLink(primaryPost)">
            <img :src="primaryPost.image" :alt="`Cover Image for ${primaryPost.title}`" class="shadow-sm hover:shadow-2xl transition-shadow duration-200">
          </RouterLink>
        </div>
      </div>
      <div class="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 class="mb-4 text-4xl lg:text-6xl leading-tight">
            <RouterLink class="hover:underline" :to="postLink(primaryPost)">{{primaryPost.title}}</RouterLink>
          </h3>
          <div class="mb-4 md:mb-0 text-lg">
            <time :datetime="dateTimestamp(primaryPost.date)">{{dateLabel(primaryPost.date)}}</time>
          </div>
        </div>
        <div>
          <p class="text-lg leading-relaxed mb-4">{{primaryPost.summary}}</p>
          <RouterLink v-if="authorLink(primaryPost.author)" class="flex items-center text-xl font-bold" :to="authorLink(primaryPost.author)!">
            <img :src="authorProfileUrl(primaryPost.author)" class="w-12 h-12 rounded-full mr-4" alt="Author">
            <span>{{postAuthor}}</span>
          </RouterLink>
          <span v-else class="flex items-center text-xl font-bold">
              <img :src="authorProfileUrl(primaryPost.author)" class="w-12 h-12 rounded-full mr-4" alt="Author">
              <span>{{postAuthor}}</span>
          </span>
        </div>
      </div>
    </section>
  </div>

  <div class="flex justify-center my-20 py-20 bg-slate-100 dark:bg-slate-800">
    <div class="text-center">
      <Iconify icon="mdi:feature-highlight" class="text-green-600 w-36 h-36 inline-block" />
      <h1 class="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
        Features
      </h1>
    </div>
  </div>

  <div class="text-center text-xl">
    Opinionated Vue template for a productive out-of-the-box development UX
  </div>
  <div class="prose dark:prose-invert lg:prose-xl mx-auto">
    <Include src="features.md" />
  </div>

  <div class="flex justify-center my-20 py-20 bg-slate-100 dark:bg-slate-800">
    <div class="text-center">
      <Iconify icon="material-symbols:hangout-video" class="text-green-600 w-36 h-36 inline-block" />
      <h1 class="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
        Videos
      </h1>
    </div>
  </div>

  <VideoGroup
      title="Vue Components"
      summary="Learn about productive features in our growing Vue Component Library"
      group="vue"
      learnMore="https://docs.servicestack.net/vue/" />

  <div class="my-8 flex justify-center gap-x-4">
    <SrcPage path="index.vue" />
  </div>

</template>


<script setup lang="ts">
import type { VirtualPress, Post } from "vite-plugin-press"
import { inject } from "vue"
import { generateSlug, dateLabel, dateTimestamp } from "@/utils"

const press:VirtualPress = inject('press')!

function authorLink(name:any) {
  return name && press.blog.authors.some((x:any) => x.name.toLowerCase() == name.toLowerCase())
      ? `/posts/author/${generateSlug(name)}`
      : null
}
function postLink(post:any) {
  return `/posts/${post.slug}`
}
function author(name:string) {
  return name ? press.blog.authors.filter((x:any) => x.name.toLowerCase() == name.toLowerCase())[0] : null
}
function authorProfileUrl(name:string) {
  return author(name)?.profileUrl ?? "/img/profiles/user1.svg"
}

const posts:Post[] = press.blog.posts
const primaryPost:Post = posts[0]
const postAuthor = primaryPost.author
</script>