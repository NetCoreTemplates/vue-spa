<template>
<a v-if="iconSrc" :href="absoluteHref" class="mr-3 text-gray-500 hover:text-gray-600 text-decoration-none">
  <img :src="iconSrc" class="w-5 h-5 inline-flex text-purple-800 mr-1" alt="file icon">{{ fileName }}</a>
<a v-else :href="absoluteHref" class="mr-3 text-gray-400 hover:text-gray-500 text-decoration-none">
    <slot></slot> {{ fileName }}</a>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { lastRightPart, combinePaths } from "@servicestack/client"

const baseUrl = "https://github.com/NetCoreTemplates/vue-spa/blob/main"

const props = defineProps<{
  href: string
  iconSrc?: string
}>()

const fileName = lastRightPart(props.href, '/')
const absoluteHref = computed(() => props.href.includes('://') ? props.href : combinePaths(baseUrl, props.href))
</script>
