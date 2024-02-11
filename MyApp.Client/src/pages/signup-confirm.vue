<template>
  <div class="mt-8 mb-20 mx-auto max-w-fit">
    <h1 class="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">Signup confirmation</h1>

    <p v-if="$route.query.confirmLink" class="my-4">
      Normally this would be emailed:
      <a class="font-semibold" id="confirm-link" :href="$route.query.confirmLink as string">Click here to confirm your account</a>
    </p>
    <p class="my-4">Please check your email to confirm your account.</p>
  </div>
</template>

<script setup lang="ts">
import { useHead } from "@unhead/vue"
useHead({ title: 'Signup confirmation' })
</script>