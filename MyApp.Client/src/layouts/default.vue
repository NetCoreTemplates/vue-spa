<script setup lang="ts">
import NavHeader from '@/components/NavHeader.vue'
import NavFooter from '@/components/NavFooter.vue'
import { useApp } from "@/api"

let app = useApp()
app.load()
</script>

<template>
  <NavHeader />

  <div class="min-h-screen">
    <main role="main">
      <RouterView />
    </main>
  </div>
  
  <NavFooter />
</template>
