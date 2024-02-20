<template>
  <div class="mt-8 mb-20 mx-auto max-w-fit">

    <h1 class="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">Bookings AutoQueryGrid</h1>

    <AutoQueryGrid type="Booking" :visible-from="{ name:'xl', bookingStartDate:'sm', bookingEndDate:'xl', createdBy:'2xl' }">
      <template #id="{ id }">
        <span class="font-semibold text-gray-900 dark:text-gray-50" v-html="id"></span>
      </template>

      <template #name="{ name }">{{name}}</template>

      <template #roomNumber-header>
        <span class="hidden lg:inline">Room </span>No
      </template>

      <template #cost="{ cost }">
        <span v-html="currency(cost)"></span>
      </template>

      <template #bookingStartDate-header>
        Start<span class="hidden lg:inline"> Date</span>
      </template>

      <template #bookingEndDate-header>
        End<span class="hidden lg:inline"> Date</span>
      </template>

      <template #createdBy-header>
        Employee
      </template>

      <template #createdBy="{ createdBy }">
        {{createdBy}}
      </template>

      <template #discount="{ discount }">
        <TextLink v-if="discount" class="flex items-end" @click.stop="showCoupon(discount.id)" :title="discount.id">
          <icon class="w-5 h-5 mr-1" type="Coupon" />
          <PreviewFormat :value="discount.description" />
        </TextLink>
      </template>
    </AutoQueryGrid>
    <AutoEditForm v-if="coupon" type="UpdateCoupon" v-model="coupon" v-on:done="close" v-on:save="close" />

    <div>
      <div class="mt-5 flex justify-between gap-x-4">
        <div>
          <SrcPage path="bookings-auto.vue" />
        </div>
        <div>
          <RouterLink class="text-gray-400 hover:text-gray-600" to="/bookings-data">Bookings DataGrid</RouterLink>
          <Iconify icon="mdi:chevron-right" class="text-gray-400 w-6 h-6 inline" aria-hidden="true" />
        </div>
      </div>
    </div>

    <div class="pb-20">
      <h4 class="mt-20 text-center text-xl">
        Manage Bookings in
        <RouterLink class="font-semibold" to="/admin/bookings">Admin</RouterLink>,
        <a class="font-semibold" :href="apiUrl('/locode/QueryBookings')">Locode</a> or
        <a class="font-semibold" :href="apiUrl('/ui/QueryBookings')">API Explorer</a>
      </h4>

      <div class="mt-20 mx-auto text-gray-500 max-w-screen-lg">
        <h2 class="mt-4 text-3xl sm:text-4xl text-slate-900 font-extrabold tracking-tight dark:text-slate-50">
          Create a multi-user Booking system in minutes
        </h2>
        <p class="my-3 mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl">
          The Bookings APIs are built using
          <RouterLink class="font-semibold" to="https://docs.servicestack.net/autoquery-crud">AutoQuery CRUD</RouterLink>,
          allowing for rapid development of typed CRUD Services using only declarative POCO DTOs, enabling
          developing entire
          <RouterLink class="font-semibold" to="https://docs.servicestack.net/autoquery/crud#advanced-crud-example">audited</RouterLink>
          &amp; <RouterLink class="font-semibold" to="https://docs.servicestack.net/autoquery/audit-log">verifiable</RouterLink>
          data-driven systems in mins
          <RouterLink class="font-semibold" to="https://docs.servicestack.net/autoquery/bookings-crud">more...</RouterLink>
        </p>
        <iframe class="mt-4 w-full aspect-video" src="https://www.youtube.com/embed/rSFiikDjGos" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      </div>

      <div class="mt-20 mx-auto text-gray-500 max-w-screen-lg">
        <h2 class="mt-4 text-3xl sm:text-4xl text-slate-900 font-extrabold tracking-tight dark:text-slate-50">
          Instantly Manage your data using AutoQueryGrid Vue
        </h2>
        <p class="my-3 mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl">
          This walkthrough explores the ServiceStack Vue 3 library and the functionality of the AutoQueryGrid component.
          The AutoQueryGrid component simplifies the integration of AutoQuery services by generating a customizable UI.
        </p>
        <iframe class="mt-4 w-full aspect-video" src="https://www.youtube.com/embed/znCoC-Ct0Ps" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useClient, useFormatters } from "@servicestack/vue"
import { QueryCoupons } from "@/dtos"
import { apiUrl } from "@/api"
import { useHead } from "@unhead/vue"
useHead({ title: 'Bookings AutoQueryGrid' })

const client = useClient()
const coupon = ref()
const { currency } = useFormatters()
async function showCoupon(id:string) {
  const api = await client.api(new QueryCoupons({ id }))
  if (api.succeeded) {
    coupon.value = api.response!.results[0]
  }
}
const close = () => coupon.value = null
</script>