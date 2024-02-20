<template>
  <div>
    <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
      <RouterLink v-for="stat in stats" :key="stat.label" :to="`/admin/${stat.label.toLowerCase()}`"
           class="block cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 overflow-hidden rounded-lg bg-white dark:bg-black px-4 py-5 shadow sm:p-6 dark:border-2 dark:border-pink-600 dark:hover:border-blue-600">
        <dt class="truncate text-sm font-medium text-gray-500">Total {{humanize(stat.label)}}</dt>
        <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-50">{{formatNumber(stat.total)}}</dd>
      </RouterLink>
    </dl>
    <p class="mt-8 text-sm font-semibold leading-6">
      Go to <RouterLink to="/" class="text-indigo-600">Home <span aria-hidden="true">&rarr;</span></RouterLink>
    </p>
    <div>
      <div class="mt-20 mx-auto text-gray-500 max-w-screen-lg">
        <h2 class="mt-4 text-3xl sm:text-4xl text-slate-900 font-extrabold tracking-tight dark:text-slate-50">
          Build beautiful custom .NET Admin UIs in minutes
        </h2>
        <p class="my-3 mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl">
          In this video we explore the Server Multi Razor Page and Client rendered Admin UI Pages
          to see how to use the new SidebarLayout and <a href="https://docs.servicestack.net/vue/autoquerygrid">AutoQueryGrid</a> Vue Tailwind components
          to build beautiful Admin UI Pages within minutes.
        </p>
        <iframe class="mt-4 w-full aspect-video" src="https://www.youtube.com/embed/wlRA4_owEsc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      </div>
    </div>
  </div>

  <div class="my-8 flex justify-center gap-x-4">
    <SrcPage path="admin/index.vue" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { humanize, type ApiResult } from "@servicestack/client"
import { useClient } from "@servicestack/vue"
import { AdminData, type AdminDataResponse, type PageStats } from "@/dtos"

const client = useClient()
const stats = ref<PageStats[]>([])
client.swr(new AdminData(), (r:ApiResult<AdminDataResponse>) => stats.value = r.response?.pageStats || [])
const formatNumber = (value:number) => new Intl.NumberFormat().format(value)
</script>
