<template>
  <b @click="count++">Counter {{count}}</b>
</template>

<script setup lang="ts">
import { ref } from "vue"
const count = ref(1)
</script>
