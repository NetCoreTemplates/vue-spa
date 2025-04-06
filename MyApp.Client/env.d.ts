/// <reference types="vite/client" />
/// <reference types="vite-plugin-vue-layouts-next/client" />
/// <reference types="vite-plugin-press/client" />

import type {Author, Post} from "@/meta";

declare module '*.vue' {
    import type { DefineComponent } from 'vue'

    const component: DefineComponent<object, object, any>
    export default component
}

declare module '*.md' {
    import { DefineComponent } from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare module 'virtual:*' {
    // eslint-disable-next-line
    const component: any;
    export default component;
}
