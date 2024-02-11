<template>
  <router-link :to="href" class="flex items-center justify-start mw-full p-4 hover:text-green-600" v-bind="$attrs">
    <slot></slot>
  </router-link>
</template>

<script setup lang="ts">
defineProps<{
  href: string
}>()
</script>