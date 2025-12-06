<template>
  <div class="mx-auto flex flex-col items-center">
    <h1 class="my-8 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">My Profile</h1>

    <Iconify icon="mdi:shield-account" v-if="hasRole('Admin')" class="w-36 h-36 text-gray-700 inline-block" />
    <Iconify icon="mdi:account-circle" v-else class="w-36 h-36 text-gray-700 inline-block" />
    <div>{{ (user as AuthenticateResponse).displayName }}</div>
    <div>{{ (user as AuthenticateResponse).userName }}</div>
    <div class="mt-2">
      <span v-for="role in roles"
            :key="role"
            class="ml-3 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium leading-5 bg-indigo-100 text-indigo-800">
        {{ role }}
      </span>
    </div>
    <SecondaryButton class="mt-8" @click="signout($router)">Sign Out</SecondaryButton>
    <PrimaryButton class="mt-8" href="/Identity/Account/Manage">
      Identity Auth Account
    </PrimaryButton>
    <TextLink class="mt-8" href="/">
      🏠 Home
    </TextLink>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "@servicestack/vue"
import { signout } from "@/lib/auth"
import { useHead } from "@unhead/vue"
import type { AuthenticateResponse } from "@/lib/dtos"

useHead({ title: 'My Profile' })

const { user, hasRole } = useAuth()
const roles = user.value?.roles ?? []
</script>
