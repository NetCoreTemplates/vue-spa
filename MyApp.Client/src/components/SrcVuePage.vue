<template>
  <SrcLink :href="combinePaths('/MyApp.Client/src',path)">
    <LogosVue class="w-5 h-5 inline" />
  </SrcLink>
</template>

<script setup lang="ts">
import SrcLink from "@/components/SrcLink.vue"
import LogosVue from "@/assets/img/logos/vue.svg"
import { combinePaths } from "@servicestack/client"

defineProps<{
  path: string
}>()
</script>
