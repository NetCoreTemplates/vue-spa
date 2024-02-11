<template>
  <div>
    <PrimaryButton @click="show=true">Open Modal</PrimaryButton>
    <ModalDialog v-if="show" @done="show=false">
      <div class="p-8">Hello @servicestack/vue!</div>
    </ModalDialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
const show = ref(false)
</script>
