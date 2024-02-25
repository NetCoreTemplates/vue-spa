<template>
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

    <section v-if="gridPosts.length">
      <h2 class="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">More from the blog</h2>
      <div class="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
        <div v-for="post in gridPosts as Post[]" class="flex flex-col overflow-hidden rounded-lg shadow-lg">
          <div class="flex-shrink-0">
            <RouterLink :to="postLink(post)">
              <img class="h-48 w-full object-cover" :src="post.image" alt="">
            </RouterLink>
          </div>
          <div class="flex flex-1 flex-col justify-between bg-white dark:bg-black p-6">
            <div class="flex-1">
              <p class="text-sm font-medium text-indigo-600 dark:text-indigo-300">
                Article
              </p>
              <RouterLink :to="postLink(post)" class="mt-2 block">
                <p class="text-xl font-semibold text-gray-900 dark:text-gray-50">{{post.title}}</p>
                <p class="mt-3 text-base text-gray-500 dark:text-gray-400">{{post.summary}}</p>
              </RouterLink>
            </div>
            <div class="mt-6 flex items-center">
              <div class="flex-shrink-0">
                <span>
                    <span class="sr-only">{{post.author}}</span>
                    <img class="h-10 w-10 rounded-full" :src="authorProfileUrl(post.author)" :alt="`${post.title} background`">
                </span>
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
    </section>

    <section v-if="remainingPosts.length" class="mt-24 flex justify-center">
      <div class="flex max-w-screen-lg">
        <div class="w-2/3">
          <div v-for="post in remainingPosts as Post[]" class="border-b pb-4 mb-4">
            <div class="flex justify-between">
              <div class="w-3/4">
                <RouterLink :to="postLink(post)" class="mt-2 block">
                  <p class="text-xl font-semibold text-gray-900 dark:text-gray-50">{{post.title}}</p>
                  <p class="mt-3 text-base text-gray-500 dark:text-gray-400">{{post.summary}}</p>
                </RouterLink>
                <div class="mt-6 flex items-center">
                  <div class="flex-shrink-0">
                    <span>
                        <span class="sr-only">{{post.author}}</span>
                        <img class="h-10 w-10 rounded-full" :src="authorProfileUrl(post.author)" :alt="`${post.title} background`">
                    </span>
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
              <div class="w-1/4">
                <RouterLink :to="postLink(post)" class="pt-4">
                  <img class="w-full object-cover max-h-[130px]" :src="post.image" alt="">
                </RouterLink>
              </div>
            </div>
          </div>
          <div v-if="remainingPosts.length >= 15" class="mt-8 text-center">
            <a class="text-sm font-semibold hover:underline" href="/posts/">view all posts</a>
          </div>
        </div>
        <div class="w-1/3">
          <div class="pl-8">
            <div class="flex items-center">
              <Logo class="w-8 h-8 mr-1" alt="MyApp logo" />
              <span class="hidden sm:block text-lg font-semibold">MyApp</span>
            </div>
            <div class="p-2">
              <p class="text-gray-500">I’m Spencer Sharp. I live in New York City, where I design the future.</p>
              <RouterLink to="/about" class="text-sm font-medium text-gray-900 hover:underline">more information</RouterLink>
            </div>
            <div class="p-4">
              <FollowLinks />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <div class="my-8 flex justify-center gap-x-4">
    <SrcPage path="blog.vue" />
  </div>
</template>

<script setup lang="ts">
import type { VirtualPress, Post } from "vite-plugin-press"
import Logo from "@/assets/img/logo.svg"
import { inject } from "vue"
import { useHead } from "@unhead/vue"
import { generateSlug, dateLabel, dateTimestamp } from "@/utils"

const press:VirtualPress = inject('press')!
useHead({ title: press.blog.config.blogTitle })

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
const gridPosts = posts.slice(1, 7)
const remainingPosts = posts.slice(7, 22)
</script>