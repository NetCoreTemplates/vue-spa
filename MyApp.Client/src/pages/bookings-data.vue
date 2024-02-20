<template>
  <div class="mt-8 mb-20 mx-auto max-w-fit">
    <h1 class="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">Bookings DataGrid</h1>
    <AutoCreateForm v-if="create" type="CreateBooking" @done="done" @save="done"/>
    <AutoEditForm v-else-if="edit" type="UpdateBooking" :deleteType="canDelete ? 'DeleteBooking' : null" v-model="edit"
                  @done="done" @save="done" @delete="done"/>
    <OutlineButton @click="() => reset({ create:true })">
      <svg class="w-5 h-5 mr-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
           xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"></path>
      </svg>
      New Booking
    </OutlineButton>
    <DataGrid :items="bookings" :visible-from="{ name:'xl', bookingStartDate:'sm', bookingEndDate:'xl' }"
              @row-selected="editId = editId == $event.id ? null : $event.id" :is-selected="(row:Booking) => editId == row.id">
      <template #id="{ id }">
        <span class="text-gray-900">{{ id }}</span>
      </template>
      <template #name="{ name }">
        {{ name }}
      </template>
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
      <template #createdBy="{ createdBy }">{{ createdBy }}</template>
    </DataGrid>
    <div>
      <div class="mt-5 flex justify-between gap-x-4">
        <div>
          <SrcPage path="bookings-data.vue" />
        </div>
        <div>
          <RouterLink class="text-gray-400 hover:text-gray-600" to="/bookings-auto">Bookings AutoQueryGrid</RouterLink>
          <Iconify icon="mdi:chevron-right" class="text-gray-400 w-6 h-6 inline" aria-hidden="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from "vue"
import { useClient, useAuth, useFormatters } from "@servicestack/vue"
import { Booking, QueryBookings } from "@/dtos"
import { useHead } from "@unhead/vue"
useHead({ title: 'Bookings DataGrid' })

const create = ref(false)
const editId = ref()
const edit = ref()
const bookings = ref<Booking[]>([])

const client = useClient()
const { currency } = useFormatters()
const { hasRole } = useAuth()
const canDelete = computed(() => hasRole('Manager'))

async function refresh() {
  const api = await client.api(new QueryBookings())
  if (api.succeeded) {
    bookings.value = api.response!.results || []
  }
}

function reset(args:{ create?: boolean, editId?:number }={}) {
  create.value = args.create ?? false
  editId.value = args.editId ?? undefined
}

function done() {
  refresh()
  reset()
}

watch(editId, async () => {
  if (editId.value) {
    const api = await client.api(new QueryBookings({ id: editId.value }))
    if (api.succeeded) {
      edit.value = api.response!.results![0]
      return
    }
  }
  edit.value = null
})

onMounted(refresh)
</script>
