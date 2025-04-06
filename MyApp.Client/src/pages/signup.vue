<template>

  <div class="mt-8 mx-auto max-w-lg">
    <div class="max-w-xl">
      <h1 class="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">Register</h1>
      <section class="mt-4 sm:shadow overflow-hidden sm:rounded-md">

        <form @submit.prevent="onSubmit">
          <div>
            <ErrorSummary except="userName,password,rememberMe"/>
            <div class="px-4 py-5 bg-white dark:bg-black space-y-6 sm:p-6">
              <h3 class="mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100 leading-tight">Create a new
                account.</h3>

              <div class="flex flex-col gap-y-4">
                <TextInput id="displayName" help="Your first and last name" v-model="displayName"/>
                <TextInput id="userName" placeholder="Email" help="" v-model="username"/>
                <TextInput id="password" type="password" help="6 characters or more" v-model="password"/>
                <TextInput id="confirmPassword" type="password" v-model="confirmPassword"/>
              </div>

              <div class="flex justify-end">
                <FormLoading v-if="loading" class="flex-1"/>
                <PrimaryButton :diabled="!loading" class="ml-3">Sign Up</PrimaryButton>
              </div>

            </div>
          </div>
        </form>

      </section>

      <div class="flex mt-8 ml-8">
        <h3 class="mr-4 leading-8 text-gray-500">Quick Links</h3>
        <div class="flex flex-wrap max-w-lg gap-2">
          <SecondaryButton @click="setUser('new@user.com')">
            new@user.com
          </SecondaryButton>
        </div>
      </div>

    </div>
  </div>

</template>

<script setup lang="ts">
import {ref, watchEffect, nextTick} from "vue"
import {useRouter} from "vue-router"
import {ApiResult, leftPart, rightPart, serializeToObject, toPascalCase} from "@servicestack/client"
import {useClient, useAuth} from "@servicestack/vue"
import {Register,type RegisterResponse} from "@/dtos"
import {revalidate} from "@/auth"
import {getRedirect} from "@/routing"

const client = useClient()
const {user} = useAuth()
const displayName = ref("")
const username = ref("")
const password = ref("")
const confirmPassword = ref("")
const router = useRouter()
const loading = ref(false)
const api = ref(new ApiResult())

const stop = watchEffect(() => {
  if (user.value) {
    router.push(getRedirect(router) ?? '/')
    nextTick(stop)
  }
})

function setUser(email: string) {
  let first = leftPart(email, '@')
  let last = rightPart(leftPart(email, '.'), '@')
  displayName.value = toPascalCase(first) + ' ' + toPascalCase(last)
  username.value = email
  confirmPassword.value = password.value = 'p@55wOrd'
}

async function onSubmit(e: Event) {
  const {
    displayName,
    userName,
    password,
    confirmPassword,
  } = serializeToObject(e.currentTarget as HTMLFormElement)
  if (password !== confirmPassword) {
    client.setError({fieldName: 'confirmPassword', message: 'Passwords do not match'})
    return
  }

  loading.value = true
  api.value = await client.api(new Register({displayName, email: userName, password, confirmPassword }))
  loading.value = false
  if (api.value.succeeded) {
    await revalidate()
    const redirectUrl = (api.value.response as RegisterResponse).redirectUrl
    if (redirectUrl) {
      location.href = redirectUrl
    } else {
      await router.push("/signin")
    }
  }
}
</script>
