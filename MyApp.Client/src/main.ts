import './assets/styles/main.css'
import './assets/styles/style.css'

import { createApp } from 'vue'
import { createHead } from '@unhead/vue/client'
import App from './App.vue'

import ServiceStackVue from "@servicestack/vue"
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'
import { setupLayouts } from 'virtual:generated-layouts'
import { createPinia } from "pinia"
import press from "virtual:press"
import { Icon } from '@iconify/vue'

import LiteYoutube from "@/components/LiteYouTube"
import { configRouter} from "@/routing"
import { client } from "@/api"

const app = createApp(App)
const head = createHead()

routes.forEach((route:any) => {
    // Force all pages in /admin to use /layout/admin.vue
    if (route.path.startsWith('/admin')) {
        (route.children ?? []).forEach((child:any) => {
            child.meta ??= {}
            child.meta.layout = 'admin'
        })
    }
})

export const router = configRouter(createRouter({
    history: createWebHistory(),
    // Scroll to top on navigation
    scrollBehavior(to, _from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        if (to.hash) {
            return { el: to.hash, behavior: 'smooth' }
        } else {
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 1)
        }
    },
    routes: setupLayouts(routes)
}))
// handle external links
router.beforeEach((to, _from, next) => {
    if (to.path.startsWith('/http'))
        location.href = to.path.substring(1)
    else next()
})

const pinia = createPinia()

app
    .use(head)
    .use(router)
    .use(pinia)
    .use(ServiceStackVue)
    .provide('client', client)
    .provide('press', press)
    .component('LiteYouTube', LiteYoutube)
    .component('Iconify', Icon)
    .mount('#app')
