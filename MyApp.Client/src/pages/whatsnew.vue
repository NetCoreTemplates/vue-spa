<template>
    <div class="container mx-auto px-5">
        <section class="flex-col md:flex-row flex justify-center mt-16 mb-16 md:mb-12">
            <h1 class="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 dark:text-slate-50 sm:text-7xl">
                Latest features & highlights
            </h1>
        </section>
    </div>
    <div class="relative px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
        <div v-for="(features, release) in releases" class="relative mx-auto max-w-7xl">
            <h2 class="text-center mb-4 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">{{ releaseVersion(release as string) }}</h2>
            <div class="text-center text-lg font-normal text-gray-500 dark:text-gray-400 mb-8">{{ formatDate(releaseDate(release as string)) }}</div>
            <div v-for="feature in features" class="flex flex-wrap my-24">
                <div class="w-full sm:w-1/2 animated px-4">
                    <RouterLink :to="feature.url"><img :src="feature.image" alt="" loading="lazy"></RouterLink>
                </div>
                <div class="w-full sm:w-1/2 text-left wow fadeInLeft animated px-4">
                    <h3 class="m-0 mb-4">
                        <RouterLink class="text-2xl font-normal text-blue-500 hover:text-blue-600" :to="feature.url">{{ feature.title }}</RouterLink>
                    </h3>
                    <div class="prose dark:prose-invert max-w-none">
                        <MarkdownComponent type="whatsNew" :doc="feature" :group="(release as string)" />
                    </div>
                    <div class="text-center sm:text-left my-10">
                        <RouterLink :to="feature.url" class="text-white text-sm font-semibold py-2.5 px-3.5 rounded outline-none focus:outline-none mr-1 mb-1 bg-slate-700 active:bg-slate-600 shadow hover:shadow-lg ease-linear transition-all duration-150">
                            Learn more
                        </RouterLink>
                    </div>
                </div>
            </div>        
        </div>
    </div>
</template>

<script setup lang="ts">
import type { VirtualPress } from "vite-plugin-press"
import { inject } from "vue"
import { leftPart, rightPart } from "@servicestack/client"

const press:VirtualPress = inject('press')!
const releases = press.whatsNew

function formatDate(date:string) {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function releaseDate(release:string) {
    return leftPart(release, '_')
}
function releaseVersion(release:string) {
    return rightPart(release, '_')
}
</script>

<style scoped>
.prose a {
    --tw-text-opacity: 1;color: rgba(59, 130, 246, var(--tw-text-opacity)); /*text-blue-500*/
    -webkit-transition: all ease 0.25s;
            transition: all ease 0.25s;
    text-decoration: none;
}
.prose a:hover {
    --tw-text-opacity: 1;color: rgba(37, 99, 235, var(--tw-text-opacity)); /*text-blue-600*/
    text-decoration: none;
}
.prose p {
    color: rgb(55 65 81); /*text-gray-700*/
}
.dark .prose p {
    color: rgb(229 231 235); /*text-gray-200*/
}
</style>