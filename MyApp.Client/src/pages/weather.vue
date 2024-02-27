<template>
  <div class="mt-8 mb-20 mx-auto max-w-screen-md">
    <h1 class="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">Weather</h1>

    <p class="my-4">This component demonstrates showing data.</p>

    <Alert v-if='api.error' type="error">{{api.error.message}}</Alert>
    <div v-else-if="api.response">
      
      <h3 class="py-6 text-center text-xl">Auto DataGrid</h3>
      <DataGrid :items="api.response" />

      <h3 class="py-6 text-center text-xl">Custom DataGrid</h3>
      <DataGrid :items="api.response" class="max-w-screen-md" :table-style="['stripedRows','uppercaseHeadings']"
                :header-titles="{ temperatureC:'TEMP. (C)', temperatureF:'TEMP. (F)' }">
        <template #date-header>
          <span class="text-green-600">Date</span>
        </template>
        <template #date="{ date }">
          {{ new Intl.DateTimeFormat().format(new Date(date)) }}
        </template>
        <template #temperatureC="{ temperatureC }">
          {{ temperatureC }}&deg;
        </template>
        <template #temperatureF="{ temperatureF }">
          {{ temperatureF }}&deg;
        </template>
        <template #summary="{ summary }">{{ summary }}</template>        
      </DataGrid>
    </div>
    <Loading v-else>loading...</Loading>

    <div class="mt-8 flex justify-center gap-x-4">
      <SrcPage path="weather.vue" />
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHead } from "@unhead/vue"
import { ApiResult } from "@servicestack/client"
import { useClient } from "@servicestack/vue"
import { GetWeatherForecast } from "@/dtos"

useHead({ title: 'Weather' })

const client = useClient()
const api = ref(new ApiResult())

onMounted(async () => {
  api.value = await client.api(new GetWeatherForecast())
})
</script>