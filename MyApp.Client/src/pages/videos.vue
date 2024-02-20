<template>
  <div class="flex justify-center my-10">
    <div class="text-center">
      <svg class="text-green-600 w-36 h-36 inline-block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m18 16l-4-3.2V16H6V8h8v3.2L18 8m2-4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z" /></svg>
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
    <SrcPage path="videos.vue" />
  </div>
  
</template>

<script setup lang="ts">
import { useHead } from "@unhead/vue"
import VideoGroup from "@/components/VideoGroup.vue";
useHead({ title: 'Video Library' })
</script>
