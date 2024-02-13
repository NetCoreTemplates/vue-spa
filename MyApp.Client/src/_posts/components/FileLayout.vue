<template>
  <div>
    <File v-for="(contents,label) in files" :label="label" :contents="contents" />
  </div>
</template>

<script setup lang="ts">
import File from './File.vue'
defineProps<{
  files: Record<string, any>
}>()
</script>
