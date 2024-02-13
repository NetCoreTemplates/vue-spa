<template>
  <div>
    <section class="w-full flex flex-col justify-center text-center">
      <div id="empty" class="mt-4 mb-2">
        <div class="flex justify-center mb-8">
          <div class="w-70">
            <input v-model="project" type="text" placeholder="Project Name" autocorrect="off" spellcheck="false" @keypress="isAlphaNumeric"
                   class="mt-1 text-lg block w-full px-3 py-2 bg-white dark:bg-black border border-slate-300 dark:border-slate-700 rounded-md text-sm shadow-sm placeholder-slate-400
                          focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
          </div>
        </div>
      </div>
    </section>
    <section :class="['w-full flex grid gap-4 text-center', templates.length === 1 
    ? 'grid-cols-1' 
    : templates.length === 2 
        ? 'grid-cols-2 max-w-md mx-auto' 
        : 'grid-cols-3']">
      <div v-for="template in templates" class="mb-2">
        <div class="flex justify-center text-center">
          <a class="archive-url hover:no-underline" :href="zipUrl('NetCoreTemplates/' + template.repo)">
            <div class="bg-white dark:bg-gray-800 px-4 py-4 mr-4 mb-4 rounded-lg shadow-lg text-center items-center justify-center hover:shadow-2xl dark:border-2 dark:border-pink-600 dark:hover:border-blue-600 dark:border-2 dark:border-pink-600 dark:hover:border-blue-600" style="min-width:150px">
              <div class="text-center font-extrabold flex items-center justify-center mb-2">
                <div class="text-4xl text-blue-400 my-3" v-html="svgIcon(template.icon)">
                </div>
              </div>
              <div class="text-xl font-medium text-gray-700">{{ template.name }}</div>
              <div class="flex justify-center h-8">
                <div v-for="tag in template.tags" class="mr-1">
                  <span class="px-2 h-8 rounded-lg bg-blue-50 dark:bg-blue-900 text-blue-500 dark:text-blue-400 text-sm">{{tag}}</span>
                </div>
              </div>
              <span class="archive-name px-4 pb-2 text-blue-600 dark:text-indigo-400">{{ projectZip }}</span>
              <div class="count mt-1 text-gray-400 text-sm"></div>
            </div>
          </a>
        </div>
        <a v-if="template.demo && hide !== 'demo'" :href="'https://' + template.demo">{{template.demo}}</a>
      </div>
    </section>
  </div>  
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { type Template, Icons } from './TemplateIndex'

defineProps<{
  templates: Template[]
  hide?: string
}>()

const project = ref('MyApp')
const projectZip = computed(() => (project.value || 'MyApp') + '.zip')

/** @param {string} template */
const zipUrl = (template:string) =>
    `https://account.servicestack.net/archive/${template}?Name=${project.value || 'MyApp'}`

const isAlphaNumeric = (e:KeyboardEvent) => {
  const c = e.charCode;
  if (c >= 65 && c <= 90 || c >= 97 && c <= 122 || c >= 48 && c <= 57 || c === 95) //A-Za-z0-9_
    return;
  e.preventDefault()
}

const icons:{[name:string]:string} = Icons
const svgIcon = (icon:string) => icons[icon] ?? Icons.ServiceStack
</script>