<template>
  <div class="mt-8 mb-20 mx-auto max-w-fit">
    <h1 class="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">Counter</h1>

    <p class="my-4">Current count: {{currentCount}}</p>

    <PrimaryButton @click="incrementCount">Click me</PrimaryButton>

    <div class="mt-8 flex justify-center gap-x-4">
      <SrcPage path="counter.vue" />
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useHead } from "@unhead/vue"
useHead({ title: 'Counter' })

const currentCount = ref(0)
const incrementCount = () => currentCount.value++
</script>