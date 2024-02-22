<template>
    <component v-if="MarkdownComponent" :is="MarkdownComponent" :name="src" :frontmatter="{ nowrap: true }" />
    <div v-else>Include not found: {{ src }}</div>
</template>
  
<script setup lang="ts">
const props = defineProps<{ src: string }>()
import { inject, defineAsyncComponent, h, computed } from "vue"
import type { VirtualPress } from "vite-plugin-press"

const press: VirtualPress = inject('press')!
const components = (press.components as any).includes || {}

const factory = components[props.src]
const MarkdownComponent = factory ? defineAsyncComponent(factory) : null
</script>
