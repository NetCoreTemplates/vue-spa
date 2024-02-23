---
title: Vite Press Plugin
summary: Introducing the Vite Press Plugin for Vite Vue & React Apps
author: Lucy Bates
tags: [docs, markdown]
image: https://images.unsplash.com/photo-1524668951403-d44b28200ce0?crop=entropy&fit=crop&h=1000&w=2000
---

The Vite Press Plugin is an alternative to [VitePress](https://vitepress.dev) for adding Markdown features 
to existing Vite Vue or React projects. It's a non-intrusive plugin for Vue and React Vite apps that want to 
add markdown powered content features without needing to adopt an opinionated framework for their entire App.

## Universal Markdown Features

A goal for **vite-press-plugin** is to implement a suite of universal markdown-powered features that can be
reused across all our Vue, React and .NET Razor and Blazor project templates, allowing you to freely copy and 
incorporate same set of markdown feature folders to power markdown content features across a range of 
websites built with different technologies.

### Vite Apps with vite-press-plugin

The **vite-press-plugin** currently powers the markdown features in the following Vite Vue and React templates:

#### Vite Templates with vite-press-plugin

 - [press-vue](https://press-vue.web-templates.io) - Vite Vue App
 - [press-react](https://press-react.web-templates.io) - Vite React App

#### .NET 8 API backend with Vite Vue & React SPA frontend

 - [vue-spa](https://vue-spa.web-templates.io) - .NET 8 API with Vite Vue SPA frontend
 - [react-spa](https://react-spa.web-templates.io) - .NET 8 API with Vite React SPA frontend

The **vite-press-plugin** makes the Markdown features available to the Vite App, whilst the markdown rendering itself is optimally
implemented in:

 - Vue Templates - with [markdown-it](https://github.com/markdown-it/markdown-it) in [Vue SFC](https://vuejs.org/guide/scaling-up/sfc.html) Components
 - React Templates - with [remark](https://github.com/remarkjs/remark) and [MDX](https://mdxjs.com) in [React](https://react.dev) Components

### .NET Templates with C# and Markdig

Whilst the same Markdown feature folders are [implemented in C#](https://razor-ssg.web-templates.io/posts/razor-ssg)
and rendered with [Markdig](https://github.com/xoofx/markdig) and either Razor Pages or Blazor Components:

#### .NET 8 Razor SSG and Blazor SSR Templates

 - [razor-ssg](https://razor-ssg.web-templates.io) - .NET Razor SSG Blog and Marketing Website with **Markdig**
 - [razor-press](https://razor-press.web-templates.io) - .NET Razor SSG Documentation Website with **Markdig**
 - [blazor-vue](https://blazor-vue.web-templates.io) - .NET 8 Blazor Server Rendered Website with **Markdig**

### Markdown Feature Folders

The content for each Markdown feature is maintained within its own feature folder with a `_` prefix:

<FileLayout :files="{
    _includes: {},
    _posts: {},
    _videos: {},
    _whatsnew: {},
}"/>

#### Markdown Document Structure

Additional metadata for each markdown page is maintained in the frontmatter of each markdown page, e.g.
the front matter for this blog post contains:

```md
---
title:   Vite Press Plugin
summary: Introducing the Vite Press Plugin
author:  Lucy Bates
tags:    [docs,markdown]
image:   https://source.unsplash.com/random/2000x1000/?stationary
---
```

The frontmatter is used in combination with file attributes to populate the document metadata.
The schema used to support the current markdown features include:

```ts
type Doc = {
    title: string     // title of Markdown page (frontmatter)
    slug: string      // slug to page (populated)
    path: string      // path to page (populated)
    fileName: string  // filename of markdown file (populated)
    content: string   // markdown content (populated)
    date: string      // date of page (frontmatter)
    tags: string[]    // related tags (frontmatter)
    order?: number    // explicit page ordering (frontmatter)
    group?: string    // which group page belongs to (populated)
    draft?: boolean   // make visible in production (frontmatter)
    wordCount: number      // (populated)
    lineCount: number      // (populated)
    minutesToRead: number  // (populated)
}

type Post = Doc & {
    summary: string // short summary of blog post (frontmatter)
    author: string  // author of blog post (frontmatter)
    image: string   // hero image of blog post (frontmatter)
}

type Video = Doc & {
    url: string // URL of YouTube Video
}

type WhatsNew = Doc & {
    url: string    // URL of YouTube Video
    image: string  // Image to display for feature
}
```

Markdown files can contain additional frontmatter which is also merged with the document metadata.

### Accessing Markdown Metadata

In Vue App's the Metadata is available as an injected dependency that's navigable with the typed `VirtualPress` schema, e.g:

```ts
import type { VirtualPress } from "vite-plugin-press"

const press:VirtualPress = inject('press')!
```

In React App's it's available via an injected context:

```ts
import { PressContext } from "@/contexts"

const press = useContext(PressContext)
```

Which is defined as:

```ts
import { createContext } from 'react'
import type { VirtualPress } from 'vite-plugin-press'

export const PressContext = createContext<VirtualPress>({} as VirtualPress)
```

This `VirtualPress` metadata is used to power all markdown features.

### Blog

The blog maintains its markdown posts in a flat  [/_posts](https://github.com/NetCoreTemplates/vue-spa/tree/main/MyApp.Client/src/_posts) 
folder which each Markdown post containing its publish date and URL slug it should be published under, e.g:

<FileLayout :files="{
    _posts: { _: [
      '...',
      '2023-01-21_start.md',
      '2024-02-11_jwt-identity-auth.md',
      '2024-03-01_vite-press-plugin.md',
    ]},
}"/>

Supporting all Blog features requires several different pages to render each of its view:

| Description | Example | Vue | React | 
| - | - | - | - |
| Main Blog layout | [/blog](/blog) | [blog.vue](https://github.com/NetCoreTemplates/vue-spa/blob/main/MyApp.Client/src/pages/blog.vue) | [blog.tsx](https://github.com/NetCoreTemplates/react-spa/blob/main/MyApp.Client/src/pages/blog.tsx) |
| Navigable Archive of Posts | [/posts](/posts) | [index.vue](https://github.com/NetCoreTemplates/vue-spa/blob/main/MyApp.Client/src/pages/posts/index.vue) | [index.tsx](https://github.com/NetCoreTemplates/react-spa/blob/main/MyApp.Client/src/pages/posts/index.tsx) |
| Individual Blog Post (like this!) | [/posts/vite-press-plugin](/posts/vite-press-plugin) | [\[slug\].vue](https://github.com/NetCoreTemplates/vue-spa/blob/main/MyApp.Client/src/pages/posts/%5Bslug%5D.vue) | [\[slug\].tsx](https://github.com/NetCoreTemplates/react-spa/blob/main/MyApp.Client/src/pages/posts/%5Bslug%5D.tsx) |
| Display Posts by Author | [/posts/author/lucy-bates](/posts/author/lucy-bates) | [\[name\].vue](https://github.com/NetCoreTemplates/vue-spa/blob/main/MyApp.Client/src/pages/posts/author/%5Bname%5D.vue) | [\[name\].tsx](https://github.com/NetCoreTemplates/react-spa/blob/main/MyApp.Client/src/pages/posts/author/%5Bname%5D.tsx) |
| Display Posts by Tag | [/posts/tagged/markdown](/posts/tagged/markdown) | [\[tag\].vue](https://github.com/NetCoreTemplates/vue-spa/blob/main/MyApp.Client/src/pages/posts/tagged/%5Btag%5D.vue) | [\[tag\].tsx](https://github.com/NetCoreTemplates/react-spa/blob/main/MyApp.Client/src/pages/posts/tagged/%5Btag%5D.tsx) |
| Display Posts by Year | [/posts/year/2024](/posts/year/2024) | [\[year\].vue](https://github.com/NetCoreTemplates/vue-spa/blob/main/MyApp.Client/src/pages/posts/year/%5Byear%5D.vue) | [\[year\].tsx](https://github.com/NetCoreTemplates/react-spa/blob/main/MyApp.Client/src/pages/posts/year/%5Byear%5D.tsx) |

#### Configuration

Additional information about the Website Blog is maintained in `_posts/config.json`

```json
{
  "localBaseUrl": "http://localhost:5173",
  "publicBaseUrl": "https://press-vue.web-templates.io",
  "siteTwitter": "@Vue",
  "blogTitle": "From the blog",
  "blogDescription": "Writing on software design and aerospace industry.",
  "blogEmail": "email@example.org (Vue)",
  "blogImageUrl": "https://servicestack.net/img/logo.png"
}
```

#### Authors

Whilst information about Post Authors are maintained in `_posts/authors.json`

```json
[
  {
    "name": "Lucy Bates",
    "email": "lucy@email.org",
    "bio": "Writing on software design and aerospace industry.",
    "profileUrl": "/img/profiles/user1.svg",
    "twitterUrl": "https://twitter.com/lucy",
    "threadsUrl": "https://threads.net/@lucy",
    "gitHubUrl": "https://github.com/lucy"
  },
]
```

To associate an Author the **name** property is used to match a posts frontmatter **author**.

### General Features

Most unique markdown features are captured in their Markdown's frontmatter metadata, but in general these features
are broadly available for all features:

 - **Live Reload** - Latest Markdown content is displayed during **Development** 
 - **Drafts** - Prevent posts being worked on from being published with `draft: true`
 - **Future Dates** - Posts with a future date wont be published until that date

### What's New Feature

The [/whatsnew](/whatsnew) page is an example of creating a custom Markdown feature to implement a portfolio or a product releases page
where a new folder is created per release, containing both release date and release or project name, with all features in that release 
maintained markdown content sorted in alphabetical order:

<FileLayout :files="{
  _whatsnew: {
    '2023-03-08_Animaginary': { _: ['feature1.md'] },
    '2023-03-18_OpenShuttle': { _: ['feature1.md'] },
    '2023-03-28_Planetaria':  { _: ['feature1.md'] },
  }
}"/>

What's New follows the same structure as Pages feature which is rendered in:

 - [whatsnew.vue](https://github.com/NetCoreTemplates/vue-spa/blob/main/MyApp.Client/src/pages/whatsnew.vue)
 - [whatsnew.tsx](https://github.com/NetCoreTemplates/react-spa/blob/main/MyApp.Client/src/pages/whatsnew.tsx)
 
### Videos Feature

The videos feature maintained in the `_videos` folder allows grouping of related videos into different folder groups, e.g:

<FileLayout :files="{
  _videos: {
    'vue': {
       _: ['admin.md','autoquerygrid.md','components.md']
    },
    'react': {
       _: ['locode.md','bookings.md','nextjs.md']
    },
  }
}"/>

These can then be rendered as UI fragments using the `<VideoGroup>` component, e.g:

```tsx
<VideoGroup
  title="Vue Components"
  summary="Learn about productive features in Vue Component Library"
  group="vue"
  learnMore="https://docs.servicestack.net/vue/" />
```

### Includes Feature

The includes feature allows maintaining reusable markdown fragments in the `_includes` folder, e.g:

<FileLayout :files="{
  _includes: {
    'features': {
       _: ['videos.md','whatsnew.md']
    },
    _: ['privacy.md']
  }
}"/>


Which can be included in other Markdown files with:

```md
:::include privacy.md:::

:::include features/include.md:::
```

Alternatively they can be included in other Vue, React or Markdown pages with the `<Include>` component, e.g:

```tsx
<Include src="privacy.md" />

<Include src="features/include.md" />
```

### Metadata APIs Feature

To support external clients from querying static markdown metadata you can export it to pre-rendered static `*.json` 
data structures by configuring `metadataPath` to the location you the `*.json` files published to, e.g:

```ts
export default defineConfig({
    plugins: [
        Press({
            metadataPath: 'public/api',
        }),
    ]
})
```

This will publish all the content of each content type in the year they were published in, along with an `all.json` containing
all content published in that year as well aso for all time, e.g:

<FileLayout :files="{
  meta: {
    2022: { _: ['all.json','posts.json','videos.json'] },
    2023: { _: ['all.json','posts.json'] },
    2024: { _: ['all.json','posts.json','videos.json','whatsnew.json'] },
    _: ['all.json','index.json']
  }
}"/>

With this you can fetch the metadata of all the new **Blog Posts** added in **2023** from:

[/api/2024/blog.json](/api/2024/blog.json)

Or all the website content added in **2024** from:

[/api/2024/all.json](/api/2024/all.json)

Or **ALL** the website metadata content from:

[/api/all.json](/api/all.json)

This feature makes it possible to support use-cases like CreatorKit's
[Generating Newsletters](https://servicestack.net/creatorkit/portal-mailruns#generating-newsletters) feature which generates 
a Monthly Newsletter Email with all new content added within a specified period.

## Components in Markdown Pages

The [Simple, Modern JavaScript](/posts/javascript) blog post is a good example showing how you can import and reference components in Markdown pages:

```tsx
<script setup>
import Hello from "./components/Hello.vue";
import Counter from "./components/Counter.vue";
import Plugin from "./components/Plugin.vue";
import HelloApi from "./components/HelloApi.vue";
import VueComponentGallery from "./components/VueComponentGallery.vue";
import VueComponentLibrary from "./components/VueComponentLibrary.vue";
</script>

<hello name="Vue 3"></hello>
<counter></counter>
```

As well as use Global Components which don't need to be imported, e.g:

```xml
<FileLayout :files="{
  _videos: {
    'vue': {
       _: ['admin.md','autoquerygrid.md']
    },
    'react': {
       _: ['locode.md','bookings.md']
    },
  }
}" />
```

#### Output

<FileLayout :files="{
  _videos: {
    'vue': {
       _: ['admin.md','autoquerygrid.md']
    },
    'react': {
       _: ['locode.md','bookings.md']
    },
  }
}" />


## Markdown Containers

Most of [VitePress Containers](https://vitepress.dev/guide/markdown#custom-containers) are also implemented, enabling
rich markup to enhance markdown content and documentation universally across all Markdown App implementations:

#### Input

    :::info
    This is an info box.
    :::

    :::tip
    This is a tip.
    :::

    :::warning
    This is a warning.
    :::

    :::danger
    This is a dangerous warning.
    :::

#### Output

:::info
This is an info box.
:::

:::tip
This is a tip.
:::

:::warning
This is a warning.
:::

:::danger
This is a dangerous warning.
:::

### Custom Title

You can specify a custom title by appending the text right after the container type:

#### Input

```markdown
:::danger STOP
Danger zone, do not proceed
:::
```

#### Output

:::danger STOP
Danger zone, do not proceed
:::


### copy

The **copy** container is ideal for displaying text snippets in a component that allows for easy copying:

#### Input

    :::copy
    Copy Me!
    :::

#### Output

:::copy
Copy Me!
:::

HTML or XML fragments can also be copied by escaping them first:

#### Input

    :::copy
    `<PackageReference Include="ServiceStack" Version="8.*" />`
    :::

#### Output

:::copy
`<PackageReference Include="ServiceStack" Version="8.*" />`
:::

### sh

Similarly the **sh** container is ideal for displaying and copying shell commands:

#### Input

    :::sh
    npm run prerender
    :::

#### Output

:::sh
npm run prerender
:::

### YouTube

For embedding YouTube Videos, optimally rendered using the `<LiteYouTube>` component, e.g:

#### Input

    :::youtube YIa0w6whe2U:::

#### Output

:::youtube YIa0w6whe2U:::
