<template>
  <div class="flex flex-wrap justify-center">
    <TextInput v-model="name" @keyup="update" />
    <div class="ml-3 mt-2 text-lg">{{ result }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useClient } from "@servicestack/vue"
import { Hello } from "@/dtos"

const props = defineProps<{ value:string }>()

let name = ref(props.value)
let result = ref('')
let client = useClient()

async function update() {
  let api = await client.api(new Hello({ name:name.value }))
  if (api.succeeded) {
    result.value = api.response!.result
  }
}
update()
</script>
