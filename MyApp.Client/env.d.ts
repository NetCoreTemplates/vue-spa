/// <reference types="vite/client" />
/// <reference types="vite-plugin-vue-layouts-next/client" />
/// <reference types="vite-plugin-press/client" />

import type { Author, Post } from '@/meta'

declare module '*.vue' {
    import type { DefineComponent } from 'vue'

    const component: DefineComponent
    export default component
}

declare module '*.md' {
    import { DefineComponent } from 'vue'
    const component: DefineComponent
    export default component
}

declare module 'virtual:*' {
    const component: any
    export default component
}
