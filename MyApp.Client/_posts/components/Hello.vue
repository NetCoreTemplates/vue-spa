<template>
  <b>Hello, {{name}}!</b>
</template>

<script setup lang="ts">
defineProps<{ name:string }>()
</script>
