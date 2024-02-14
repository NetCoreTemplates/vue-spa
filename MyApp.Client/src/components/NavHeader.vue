<template>
  <header class="border-b border-gray-200 dark:border-gray-800 pr-3">
    <div class="flex flex-wrap items-center">
      <div class="absolute z-10 top-2 left-2 sm:static flex-shrink flex-grow-0">
        <div class="cursor-pointer">
          <RouterLink to="/" class="navbar-brand flex items-center">
            <Logo class="w-8 h-8 sm:ml-2 sm:w-12 sm:h-12" alt="MyApp logo" />
            <span class="hidden ml-2 sm:block text-2xl font-semibold">My App</span>
          </RouterLink>
        </div>
      </div>
      <div class="flex flex-grow flex-shrink flex-nowrap justify-end items-center">
        <nav class="relative flex flex-grow leading-6 font-semibold text-slate-700 dark:text-slate-200">
          <ul class="flex flex-wrap items-center justify-end w-full m-0">

            <li class="relative flex flex-wrap just-fu-start m-0">
              <RouterLink to="/counter" class="p-4 flex items-center justify-start mw-full hover:text-sky-500 dark:hover:text-sky-400" ActiveClass="text-blue-700 dark:text-blue-300">Counter</RouterLink>
            </li>
            <li class="relative flex flex-wrap just-fu-start m-0">
              <RouterLink to="/weather" class="p-4 flex items-center justify-start mw-full hover:text-sky-500 dark:hover:text-sky-400" ActiveClass="text-blue-700 dark:text-blue-300">Weather</RouterLink>
            </li>
            <li class="relative flex flex-wrap just-fu-start m-0">
              <RouterLink to="/bookings-auto" class="p-4 flex items-center justify-start mw-full hover:text-sky-500 dark:hover:text-sky-400" ActiveClass="text-blue-700 dark:text-blue-300">Bookings</RouterLink>
            </li>
            <li class="relative flex flex-wrap just-fu-start m-0">
              <RouterLink to="/todomvc" class="p-4 flex items-center justify-start mw-full hover:text-sky-500 dark:hover:text-sky-400" ActiveClass="text-blue-700 dark:text-blue-300">Todos</RouterLink>
            </li>
            <li class="relative flex flex-wrap just-fu-start m-0">
              <RouterLink to="/whatsnew" class="p-4 flex items-center justify-start mw-full hover:text-sky-500 dark:hover:text-sky-400" ActiveClass="text-blue-700 dark:text-blue-300">What's New</RouterLink>
            </li>
            <li class="relative flex flex-wrap just-fu-start m-0">
              <RouterLink to="/blog" class="p-4 flex items-center justify-start mw-full hover:text-sky-500 dark:hover:text-sky-400" ActiveClass="text-blue-700 dark:text-blue-300">Blog</RouterLink>
            </li>
            <li class="relative flex flex-wrap just-fu-start m-0">
              <RouterLink to="/videos" class="p-4 flex items-center justify-start mw-full hover:text-sky-500 dark:hover:text-sky-400" ActiveClass="text-blue-700 dark:text-blue-300">Videos</RouterLink>
            </li>
            <template v-if="hasRole('Admin')">
              <li class="relative flex flex-wrap just-fu-start m-0">
                <RouterLink to="/admin/" class="p-4 flex items-center justify-start mw-full hover:text-sky-500 dark:hover:text-sky-400" ActiveClass="text-blue-700 dark:text-blue-300">Admin</RouterLink>
              </li>
            </template>
            <template v-if="user">
              <li>
                <div class="mx-3 relative">
                  <div>
                    <RouterLink to="/profile"
                       class="max-w-xs bg-white dark:bg-black rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50 dark:lg:hover:bg-gray-900 dark:ring-offset-black" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                      <img class="h-8 w-8 rounded-full" :src="user.profileUrl" alt="">
                      <span class="hidden ml-3 text-gray-700 dark:text-gray-300 text-sm font-medium lg:block">
                            <span class="sr-only">Open user menu for </span>
                            {{user.userName}}
                        </span>
                    </RouterLink>
                  </div>
                </div>
              </li>
              <li class="mr-3 relative flex flex-wrap just-fu-start m-0">
                <SecondaryButton @click="signout($router)">
                  Sign Out
                </SecondaryButton>
              </li>
            </template>
            <template v-else>
              <li class="relative flex flex-wrap just-fu-start m-0">
                <RouterLink to="/Account/Login" class="m-2 mr-4">
                  <SecondaryButton class="m-2" href="/signin">Sign In</SecondaryButton>
                </RouterLink>
              </li>
            </template>

            <li class="relative flex flex-wrap just-fu-start m-0">
              <DarkModeToggle />
            </li>

          </ul>
        </nav>
      </div>
    </div>
  </header>
  
</template>

<script setup lang="ts">
import Logo from "@/assets/img/logo.svg"
import { useAuth } from "@servicestack/vue"
const { user, hasRole } = useAuth()

import { signout } from "@/auth"
</script>
