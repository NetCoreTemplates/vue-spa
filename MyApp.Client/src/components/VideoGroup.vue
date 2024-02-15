<template>
  <div :class="[background,'py-24 sm:py-32']">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-5xl">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">{{ title }}</h2>
        <p class="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-400">
          {{ summary }}
          <a v-if="learnMore" :href="learnMore" class="ml-2 text-sm font-semibold leading-6">Learn more <span aria-hidden="true">→</span></a>
        </p>
        <div class="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
          <article v-for="video in videos as Video[]" class="relative isolate flex flex-col gap-8 lg:flex-row">
            <div class="relative lg:w-1/2 lg:shrink-0">
              <LiteYouTube :id="videoId(video.url)" :title="video.title" />
            </div>
            <div>
              <div class="flex items-center gap-x-4 text-xs">
                <time datetime="2020-03-16" class="text-gray-500 dark:text-gray-400">{{dateFmt(video.date)}}</time>
                <span v-for="tag in video.tags" class="relative z-10 rounded-full bg-gray-50 dark:bg-gray-800 py-1.5 px-3 font-medium text-gray-600 dark:text-gray-300">
                  {{ tag }}
                </span>
              </div>
              <div class="group relative max-w-xl">
                <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-gray-50 group-hover:text-gray-600 dark:group-hover:text-gray-400">
                  <a :href="video.url">
                    {{video.title}}
                  </a>
                </h3>
                <div class="mt-5 text-sm leading-6 text-gray-600 dark:text-gray-400">
                  <div class="prose dark:prose-invert">
                    <MarkdownComponent type="videos" :doc="video" :group="group" />
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>  
</template>

<script setup lang="ts">
import type { VirtualPress, Video } from "vite-plugin-press"
import MarkdownComponent from "@/components/MarkdownComponent.vue"
import { inject, computed } from "vue"
import { lastRightPart } from "@servicestack/client"

const props = defineProps<{
  group: string
  title?: string
  background?: string
  summary?: string
  border?: string
  learnMore?: string
}>()

function videoId(url: string) {
  return lastRightPart(url, '/')
}

function dateFmt(date: string) {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

const press:VirtualPress = inject('press')!
const videos = computed(() => press.videos[props.group])
</script>