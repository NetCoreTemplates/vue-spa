<template>
  <template v-if="post">
    <div class="container px-5 mb-32 mx-auto">
      <article class="mt-20">
        <h1 class="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
          {{post.title}}
        </h1>
        <div class="flex justify-between">
          <div class="md:mb-12 flex items-center">
            <RouterLink v-if="authorHref" :to="authorHref"><img class="w-12 h-12 rounded-full mr-4 text-cyan-600" :src="authorProfileUrl"></RouterLink>
            <img v-else class="w-12 h-12 rounded-full mr-4 text-cyan-600" :src="authorProfileUrl">
            <div v-if="author" class="flex flex-col">
              <RouterLink v-if="authorHref" class="text-xl font-semibold hover:underline" :to="authorHref">{{post.author}}</RouterLink>
              <span v-else class="text-xl font-semibold">{{post.author}}</span>
              <AuthorLinks :author="author" />
            </div>
          </div>
        </div>
        <div class="mb-8 md:mb-16 sm:mx-0">
          <div class="sm:mx-0">
            <img :src="post.image" :alt="`${post.title} Background`" class="shadow-small">
          </div>
        </div>
        <div class="flex max-w-3xl mx-auto justify-between">
          <div>
            <div class="mb-4 flex flex-wrap">
              <RouterLink v-for="tag in post.tags" :to="tagLink(tag)" class="mr-2 mb-2 text-xs leading-5 font-semibold bg-slate-400/10 dark:bg-slate-400/30 rounded-full py-1 px-3 flex items-center space-x-2 hover:bg-slate-400/20 dark:hover:bg-slate-400/40 dark:highlight-white/5">{{tag}}</RouterLink>
            </div>
            <div v-if="post.date" class="max-w-3xl mx-auto">
              <div class="mb-6 text-lg text-gray-500 dark:text-gray-400">
                <time :datetime="dateTimestamp(post.date)">{{dateLabel(post.date)}}</time>
                <span class="px-1" aria-hidden="true">&middot;</span>
                <span>{{post.minutesToRead}} min read</span>
              </div>
            </div>
          </div>
        </div>
        <div class="max-w-3xl mx-auto">
          <div id="post" class="prose dark:prose-invert lg:prose-xl max-w-none mb-32">
            <MarkdownComponent type="blog" :doc="post" />
          </div>
        </div>
      </article>
    </div>

    <div v-if="author && authorPosts.length" class="bg-gray-50 dark:bg-gray-900 py-20">
      <div class="max-w-3xl mx-auto">
        <div class="flex justify-between">
          <div>
            <RouterLink v-if="authorHref" :to="authorHref"><img class="w-20 h-20 rounded-full text-cyan-600" :src="authorProfileUrl"></RouterLink>
            <img v-else class="w-20 h-20 rounded-full text-cyan-600" :src="authorProfileUrl">

            <div class="mt-2 font-medium text-2xl">
              Written by {{author.name}}
            </div>
            <div class="text-gray-600 dark:text-gray-300">
              {{author.bio}}
            </div>
          </div>
          <div class="flex items-end">
            <AuthorLinks :author="author" />
          </div>
        </div>
        <div class="mt-4 border-t">
          <div class="py-8 text-lg text-gray-700 dark:text-gray-200 font-medium">
            More from {{author.name}}
          </div>
          <div class="grid grid-cols-2 gap-8">
            
            <div v-for="authorPost in authorPosts as Post[]">
              <div class="flex flex-col overflow-hidden">
                <div class="flex-shrink-0">
                  <RouterLink :to="postLink(authorPost)">
                    <img class="h-48 w-full object-cover" :src="authorPost.image" alt="">
                  </RouterLink>
                </div>
                <div class="flex flex-1 flex-col justify-between bg-white dark:bg-black p-6">
                  <div class="flex-1">
                    <p class="text-sm font-medium text-indigo-600 dark:text-indigo-300">
                      Article
                    </p>
                    <RouterLink :to="postLink(authorPost)" class="mt-2 block">
                      <p class="text-xl font-semibold text-gray-900 dark:text-gray-50 whitespace-nowrap overflow-hidden text-ellipsis" :title="authorPost.title">
                        {{authorPost.title}}
                      </p>
                      <p class="mt-3 text-base text-gray-500 dark:text-gray-400">{{authorPost.summary}}</p>
                    </RouterLink>
                  </div>
                  <div class="mt-6 flex items-center">
                    <div class="flex-shrink-0">
                      <span class="sr-only">{{authorPost.author}}</span>
                      <img class="h-10 w-10 rounded-full" :src="authorProfileUrl" :alt="`${authorPost.title} background`">
                    </div>
                    <div class="ml-3">
                      <p class="text-sm font-medium text-gray-900 dark:text-gray-50">
                        <RouterLink v-if="authorLink(authorPost.author)" :to="authorLink(authorPost.author)!" class="hover:underline">{{authorPost.author}}</RouterLink>
                        <span v-else>{{authorPost.author}}</span>
                      </p>
                      <div class="flex space-x-1 text-sm text-gray-500 dark:text-gray-400">
                        <time :datetime="dateTimestamp(authorPost.date)">{{dateLabel(authorPost.date)}}</time>
                        <span class="px-1" aria-hidden="true">&middot;</span>
                        <span>{{authorPost.minutesToRead}} min read</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
        
      </div>
    </div>
  </template>
  <div v-else class="mt-3 mb-20 mx-auto max-w-fit">
    <ErrorSummary :status="{ errorCode:'NotFound', message:`Post ${slug} was not found` }" />    
  </div>
  
</template>

<script setup lang="ts">
import type { VirtualPress, Post, Author } from "vite-plugin-press"
import { inject, computed, onMounted } from "vue"
import { generateSlug, dateLabel, dateTimestamp } from "@/utils"
import { useHead } from "@unhead/vue"
import { useRoute } from "vue-router"

const route = useRoute()
const press:VirtualPress = inject('press')!
const slug = computed(() => (route.params as any)?.slug)
const allPosts:Post[] = press.blog.posts
const post = computed(() => allPosts.find((x:any) => x.slug == slug.value) as Post)

const author = computed(() => post.value ? press.blog.authors.find((x:any) => x.name.toLowerCase() == post.value.author?.toLowerCase()) : null)
const authorPosts = computed<Post[]>(() => author.value ? allPosts.filter((x:any) => x.author?.toLowerCase() == author.value!.name.toLowerCase()).slice(0,4) : [])
const authorProfileUrl = computed(() => author.value?.profileUrl ?? "/img/profiles/user1.svg")
const authorHref = computed(() => author.value ? `/posts/author/${generateSlug(author.value.name)}` : null)

function postLink(post:any) {
  return `/posts/${post.slug}`
}
function tagLink(tag:string) {
  return `/posts/tagged/${generateSlug(tag)}`
}
function authorLink(name:any) {
  return name && press.blog.authors.some((x:any) => x.name.toLowerCase() == name.toLowerCase())
      ? `/posts/author/${generateSlug(name)}`
      : null
}

onMounted(() => {
  if (post.value) {
    useHead({ title: post.value.title })
  }
})
</script>
