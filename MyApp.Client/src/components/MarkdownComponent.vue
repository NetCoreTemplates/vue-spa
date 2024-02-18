<template>
  <component v-if="MarkdownComponent" :is="MarkdownComponent" :name="doc.slug" :frontmatter="{ nowrap:true }" />
  <div v-else-if="doc.preview" v-html="doc.preview"></div>
  <pre v-else v-html="doc.content"></pre>
</template>

<script setup lang="ts">
import { inject, defineAsyncComponent, h } from "vue"
import type { VirtualPress, Doc } from "vite-plugin-press"

const props = defineProps<{
  doc: Doc
  type: string
  group?: string
}>()

const press:VirtualPress = inject('press')!
const components = (press.components as any)[props.type] || {}

const factory = (props.group
    ? components[props.group] && components[props.group][props.doc.slug]
    : components[props.doc.slug])

const MarkdownComponent = factory ? defineAsyncComponent(factory) : null
</script>
