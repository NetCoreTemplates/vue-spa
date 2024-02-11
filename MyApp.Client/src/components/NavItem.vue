<template>
  <li v-if="hasAccess" class="relative flex flex-wrap just-fu-start m-0">
    <slot></slot>
  </li>
</template>

<script setup lang="ts">

import { attrs } from "@/auth"
import { computed } from "vue";

const props = defineProps<{
  show?: string
  hide?: string
}>()

const hasAccess = computed(() => {
  if (props.show) return attrs.value.indexOf(props.show) >= 0
  if (props.hide) return attrs.value.indexOf(props.hide) == -1
  return true
})

</script>