---
title: Template Features
---

This template contains our essential recommendations for a modern Vue Single Page App optimal for both 
productivity and performance.

:::include features.md:::

## Vue Plugins

The Vite plugins registered in `vite.config.ts` improves productivity by adopting popular conventions that automating-away manual tasks & configurations.

### [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)

For Auto Registering Vue Components, either `.vue` SFC's, `.md` Markdown components or Iconify's icons as Vue3 components.

```ts
Components({
    // allow auto load markdown components under `./src/components/`
    extensions: ['vue', 'md'],

    // allow auto import and register components used in markdown
    include: [/\.vue$/, /\.vue\?vue/, /\.md$/],

    dts: 'src/components.d.ts',
})
```

### [Iconify for Vue](https://iconify.design/docs/icon-components/vue/)

For accessing [thousands of Iconfigy's SVG icons](https://icon-sets.iconify.design) as Vue components **on-demand** universally.

```ts
import { Icon } from '@iconify/vue'
```

#### Usage

```html
<Icon icon="mdi-light:home" />
```

### [unplugin-vue-router](https://github.com/posva/unplugin-vue-router)

For auto generating vue routing configurations for each Vue 3 component from 
[NuxtJS inspired File System Routing](https://github.com/posva/unplugin-vue-router?tab=readme-ov-file#routes-folder-structure) conventions.

```ts
VueRouter({
    extensions: ['.vue', '.md'],
})
```

### [unplugin-vue-markdown](https://github.com/unplugin/unplugin-vue-markdown)

For enabling Markdown Support by converting each `.md` document into a Vue Component that's rendered using 
[markdown-it](https://github.com/markdown-it/markdown-it).

```ts
Markdown({
    markdownItOptions: {
        // html: true,
    },
    markdownItSetup(md) {
        //md.use(markdownPlugin)
    },
    wrapperComponent: 'MarkdownPage'
})
```

