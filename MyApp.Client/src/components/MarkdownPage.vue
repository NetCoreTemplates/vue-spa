<template>
  <article v-if="frontmatter.nowrap">
    <slot></slot>
  </article>
  <div v-else class="prose dark:prose-invert lg:prose-xl text-left mt-8 mb-20 mx-auto max-w-fit">
    <h1 class="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">{{frontmatter.title}}</h1>
    <div class="max-w-3xl mx-auto">
      <article class="max-w-none mb-32">
        <slot></slot>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
type FrontMatter = {
  title: string
  nowrap?: boolean
}
defineProps<{ frontmatter: FrontMatter }>()
</script>
