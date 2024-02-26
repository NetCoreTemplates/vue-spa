---
title: Vue Components in Markdown
summary: How to reference and Import Vue Components in Markdown
author: Lucy Bates
tags: [docs, markdown]
image: https://images.unsplash.com/photo-1700427296131-0cc4c4610fc6?crop=entropy&fit=crop&h=1000&w=2000
---

<script setup>
import Hello from "./components/Hello.vue"
import Counter from "./components/Counter.vue"
import Plugin from "./components/Plugin.vue"
import HelloApi from "./components/HelloApi.vue"
import ChartJs from "./components/ChartJs"
</script>

## Vue Components in Markdown Pages

Thanks to the [unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import) plugin, App Components in
[/src/components](https://github.com/NetCoreTemplates/vue-spa/tree/main/MyApp.Client/src/components) are automatically imported
and can immediately referenced in `*.md` Markdown pages using normal Vue SFC syntax, e.g:

```tsx
<GettingStarted template="vue-spa" />
```

<div class="py-20 not-prose flex justify-center">
  <GettingStarted template="vue-spa" />
</div>

Additional Global Components can be registered in [main.ts](https://github.com/NetCoreTemplates/vue-spa/blob/main/src/main.ts)
when creating the Vue App where you can register entire Component libraries, Aliases and TypeScript Vue components, e.g

```ts
import ServiceStackVue from "@servicestack/vue"
import { Icon } from '@iconify/vue'
import LiteYouTube from "@/components/LiteYouTube"

app
    .use(ServiceStackVue)        // @servicestack/vue library
    .component('Iconify', Icon)  // Alias
    .component('LiteYouTube', LiteYouTube) // .ts Vue Component
```

Which can also be referenced inside `*.md` Markdown files without importing them:

```tsx
<div class="py-20 flex justify-evenly">
  <Iconify class="w-28 h-28" icon="logos:vue" />
  <Iconify class="w-28 h-28" icon="logos:vitejs" />
  <Iconify class="w-28 h-28" icon="logos:react" />
</div>
```

<div class="py-20 flex justify-evenly">
  <Iconify class="w-28 h-28" icon="logos:vue" />
  <Iconify class="w-28 h-28" icon="logos:vitejs" />
  <Iconify class="w-28 h-28" icon="logos:react" />
</div>

## Importing Vue Components

Any other components you want to use in the markdown pages will need to imported right at the top of the page using standard 
import syntax inside a `<script setup>` block, e.g:

```tsx
<script setup>
import Hello from "./components/Hello.vue"
import Counter from "./components/Counter.vue"
import Plugin from "./components/Plugin.vue"
import HelloApi from "./components/HelloApi.vue"
import ChartJs from "./components/ChartJs"
</script>
```

Which is recommended to use for any components only used in Markdown content, by maintaining them in the relative `./components/` 
folder to reference components in [/_posts/components/](https://github.com/NetCoreTemplates/vue-spa/tree/main/MyApp.Client/src/_posts/components),

Like the minimal [Hello.vue](https://github.com/NetCoreTemplates/vue-spa/tree/main/MyApp.Client/src/_posts/components/Hello.vue):

```tsx
<template>
  <b>Hello, {{name}}!</b>
</template>

<script setup lang="ts">
defineProps<{ name:string }>()
</script>
```

That can be referenced using normal Vue SFC component syntax, e.g:

```tsx
<Hello name="Vue 3" />
```

<div class="text-center text-2xl py-2">
    <Hello name="Vue 3" />
</div>

Since Markdown pages are eventually converted into Vue components themselves, there's no restriction into what
components can be referenced, from simple Reactive components:

```tsx
<template>
  <b @click="count++">Counter {{count}}</b>
</template>

<script setup lang="ts">
import { ref } from "vue"
const count = ref(1)
</script>
```

```tsx
<Counter />
```

<div class="text-center text-2xl py-2 cursor-pointer select-none">
    <Counter />
</div>

To components like [Plugin.vue](https://github.com/NetCoreTemplates/vue-spa/tree/main/MyApp.Client/src/_posts/components/Plugin.vue) that
make use of external Vue component libraries:

```html
<template>
  <div>
    <PrimaryButton @click="show=true">Open Modal</PrimaryButton>
    <ModalDialog v-if="show" @done="show=false">
      <div class="p-8">Hello @servicestack/vue!</div>
    </ModalDialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
const show = ref(false)
</script>
```

```tsx
<Plugin />
```

<div class="text-center">
    <Plugin id="plugin" class="text-2xl py-4" />
</div>

Or components that use Ajax to invoke JSON Server APIs like 
[HelloApi.vue](https://github.com/NetCoreTemplates/vue-spa/tree/main/MyApp.Client/src/_posts/components/HelloApi.vue):

```html
<template>
  <div class="flex flex-wrap justify-center">
    <TextInput v-model="name" @keyup="update" />
    <div class="ml-3 mt-2 text-lg">{{ result }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { JsonServiceClient } from "@servicestack/client"
import { Hello } from "@/dtos"

const props = defineProps<{ value:string }>()

const name = ref(props.value)
const result = ref('')
const client = new JsonServiceClient('https://blazor-gallery.jamstacks.net')

async function update() {
  let api = await client.api(new Hello({ name:name.value }))
  if (api.succeeded) {
    result.value = api.response!.result
  }
}
update()
</script>
```

```tsx
<HelloApi value="Vue" />
```

<HelloApi value="Vue" />

Or components relying on dynamically loading external CDN scripts like [Chart.JS](https://www.chartjs.org):

```ts
import { ref, onMounted, defineComponent, h } from "vue"
import { addScript } from "@servicestack/client"

const loadJs = addScript('https://cdn.jsdelivr.net/npm/chart.js/dist/chart.umd.min.js')

declare var Chart:any

export default defineComponent({
    props:['type','data','options'],
    setup(props) {
        const chart = ref()
        onMounted(async () => {
            await loadJs

            const options = props.options || {
                responsive: true,
                legend: {
                    position: "top"
                }
            }
            new Chart(chart.value, {
                type: props.type || "bar",
                data: props.data,
                options,
            })

        })
        //<div><canvas ref="chart"></canvas></div>
        return () => h('div', {}, [h('canvas', { ref: chart })])
    }
})
```

Which can be called with complex nested object graph properties:

```tsx
<ChartJs :data="{
    labels: [
        '10,000 Rows',
        '100,000 Rows'
    ],
    datasets: [
    {
        label: 'SQLite Memory',
        backgroundColor: 'rgba(201, 203, 207, 0.2)',
        borderColor: 'rgb(201, 203, 207)',
        borderWidth: 1,
        data: [17.066, 166.747]
    },
    {
        label: 'SQLite Disk',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
        data: [20.224, 199.697]
    },
    //...
]}" />
```

To embed beautiful interactive charts directly within your Markdown documentation:

<ChartJs :data="{
    labels: [
        '10,000 Rows',
        '100,000 Rows'
    ],
    datasets: [
    {
        label: 'SQLite Memory',
        backgroundColor: 'rgba(201, 203, 207, 0.2)',
        borderColor: 'rgb(201, 203, 207)',
        borderWidth: 1,
        data: [17.066, 166.747]
    },
    {
        label: 'SQLite Disk',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
        data: [20.224, 199.697]
    },
    {
        label: 'PostgreSQL',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgb(153, 102, 255)',
        borderWidth: 1,
        data: [14.389, 115.645]
    },
    {
        label: 'MySQL',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1,
        data: [64.389, 310.966]
    },
    {
        label: 'MySqlConnector',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgb(255, 159, 64)',
        borderWidth: 1,
        data: [64.427, 308.574]
    },
    {
        label: 'SQL Server',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
        data: [89.821, 835.181]
    }]
}" />