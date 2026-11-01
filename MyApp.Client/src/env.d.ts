/// <reference types="vite/client" />
/// <reference types="vite-plugin-vue-layouts-next/client" />
/// <reference types="vite-plugin-press/client" />

declare module '*.vue' {
    import { DefineComponent } from 'vue'
    const component: DefineComponent
    export default component
}

declare module '*.md' {
    import { DefineComponent } from 'vue'
    const component: DefineComponent
    export default component
}
