<script setup lang="ts">
import { useHead } from "@unhead/vue"

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'MyApp',
  meta: [
    { name: 'description', content: 'Vue SPA Starter Template' },
  ],
  script: [{ src:'/default.js' }],  
  bodyAttrs: {
    class: 'bg-white dark:bg-black dark:text-white'
  }
})
</script>

<template>
  <RouterView />
</template>
