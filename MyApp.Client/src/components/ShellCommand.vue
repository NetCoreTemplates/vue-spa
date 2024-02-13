<template>
  <div class="lang relative bg-gray-700 text-gray-300 pl-5 py-3 sm:rounded flex">
    <div class="flex ml-2 w-full justify-between cursor-pointer" @click="copy">
      <div>
        <span>$ </span>
        <label class="cursor-pointer">
          <slot></slot>
        </label>
      </div>
      <small class="text-xs text-gray-400 px-3 -mt-1">sh</small>
    </div>
    <div v-if="successText" class="absolute right-0 -mr-28 -mt-3 rounded-md bg-green-50 p-3">
      <div class="flex">
        <div class="flex-shrink-0">
          <Iconify icon="mdi:check-circle" class="h-5 w-5 text-green-400" />
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-green-800">
            {{ successText }}
          </p>
        </div>
      </div>
    </div>
  </div>  
</template>

<script setup lang="ts">
import { ref } from "vue"

let successText = ref('')

function copy(e: MouseEvent) {
  let $el = document.createElement("input")
  let $lbl = (e.target as HTMLElement).parentElement!.querySelector('label')!

  $el.setAttribute("value", $lbl.innerText)
  document.body.appendChild($el)
  $el.select()
  document.execCommand("copy")
  document.body.removeChild($el)

  if (typeof window.getSelection == "function") {
    const range = document.createRange()
    range.selectNodeContents($lbl)
    window.getSelection()?.removeAllRanges()
    window.getSelection()?.addRange(range)
  }

  successText.value = 'copied'
  setTimeout(() => successText.value = '', 3000)
}
</script>