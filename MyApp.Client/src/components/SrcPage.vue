<template>
  <SrcLink :href="combinePaths('/MyApp.Client/src/pages',path)">
    <Iconify icon="logos:vue" class="w-5 h-5 inline" />
  </SrcLink>
</template>

<script setup lang="ts">
import { combinePaths } from "@servicestack/client"

defineProps<{
  path: string
}>()
</script>
