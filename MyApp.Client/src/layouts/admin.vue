<template>
  <NavHeader />

  <div id="app" v-cloak>
    <SidebarLayout ref="sidebar">
      <div class="flex h-16 shrink-0 items-center">
        <RouterLink to="/admin/" class="text-2xl whitespace-nowrap overflow-x-hidden flex items-center">
          <Logo class="mr-1 h-8 w-auto text-indigo-600 dark:text-indigo-300" alt="Logo" />
          <span class="hidden sm:block text-2xl font-semibold">Admin</span>
        </RouterLink>
      </div>
      <nav class="flex flex-1 flex-col">
        <ul role="list" class="flex flex-1 flex-col gap-y-7">
          <li v-for="group in new Set(Object.keys(sections).flatMap(k => sections[k].group))">
            <div v-if="group" class="text-sm font-semibold leading-6 text-gray-400">{{group}}</div>
            <ul role="list" class="-mx-2 space-y-1">
              <li v-for="section in Object.keys(sections).map(k => sections[k].group === group ? sections[k] : null).filter(x => !!x)">
                <RouterLink :to="`/admin/${section.page ?? section.id}`" :class="[activeSection.id === section.id ? 'bg-gray-50 dark:bg-gray-900 text-indigo-600 dark:text-indigo-300' : 'cursor-pointer text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-gray-50 dark:hover:bg-gray-900', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold select-none']">
                  <Icon :svg="section.icon" class="h-6 w-6 shrink-0 text-indigo-600 dark:text-indigo-300" />
                  {{section.label}}
                </RouterLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <template #mobiletitlebar>
        <div class="flex-1 text-sm font-semibold leading-6 text-gray-900 dark:text-gray-50">{{ activeSection.title }}</div>
        <span v-if="user" class="cursor-pointer bg-gray-50 dark:bg-gray-900">
            <span class="sr-only">Your profile</span>
            <img class="h-8 w-8 rounded-full bg-gray-50 dark:bg-gray-900" :src="user.profileUrl" alt="">
        </span>
      </template>
    </SidebarLayout>
    <main class="lg:pl-72">
      <div class="px-4 sm:px-6 lg:px-8">
        <sign-in v-if="!user"></sign-in>
        <div v-else>
          <h1 class="hidden lg:block pt-4 mb-2 text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-gray-50">{{ activeSection.title }}</h1>
          <RouterView />
        </div>
      </div>
    </main>
  </div>
</template>


<script setup lang="ts">
import NavHeader from '@/components/NavHeader.vue'
import { useApp } from "@/api"
import Logo from "@/assets/img/logo.svg"
import { useRouter } from "vue-router"

import { ref, computed } from "vue"
import { leftPart, rightPart, lastRightPart, humanize } from "@servicestack/client"
import { useClient, useAuth, useMetadata } from "@servicestack/vue"

let app = useApp()
app.load()

const { typeOf } = useMetadata()
const sections: {[name:string]:any} = {
  dashboard: {
    page: '',
    icon: `<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>`,
  },
  bookings: {
    type: 'Booking',
  },
  coupons: {
    type: 'Coupon',
  },
}
function getIcon(id:string) {
  const section = sections[id]
  return section.icon  || typeOf(section.type)?.icon?.svg ||
      `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2M3 8v6m0-6h6m12 0v6m0-6H9m12 6v4a2 2 0 0 1-2 2H9m12-6H9m-6 0v4a2 2 0 0 0 2 2h4m-6-6h6m0-6v6m0 0v6m6-12v12"></path></svg>`
}
Object.keys(sections).map(id => {
  const section = sections[id]
  section.id = id
  section.label = section.label || humanize(id)
  section.title = section.title || section.label
  section.icon  = getIcon(id)
})

const { user, signIn } = useAuth()
const sidebar = ref()
const sectionId = computed(() => lastRightPart(useRouter().currentRoute.value.path, '/'))
const activeSection = computed(() => (sectionId.value ? sections[sectionId.value] : null) ?? sections.dashboard)
</script>
