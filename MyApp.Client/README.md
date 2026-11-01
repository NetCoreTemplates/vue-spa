# myapp.client

Vue 3 SPA frontend built with the [Vite+](https://viteplus.dev) toolchain: Vite 8 (Rolldown), Vitest, Oxlint and Oxfmt.

## Recommended IDE Setup

Open `MyApp.code-workspace` in the repository root with [VS Code](https://code.visualstudio.com/) and install the recommended
[Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) and
[Vite+ Extension Pack](https://marketplace.visualstudio.com/items?itemName=VoidZero.vite-plus-extension-pack) extensions.

## Type Support for `.vue` Imports in TS

TypeScript can't type check `.vue` imports, so `vue-tsc` is used for type checking in `npm run build`, `npm run check` and `npm run typecheck`.

## Customize configuration

All tool config (`lint`, `fmt`, `test`) lives in [vite.config.ts](vite.config.ts). See the [Vite+ Guide](https://viteplus.dev/guide/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Format, Lint and Type-Check

```sh
npm run check
```

### Run Tests

```sh
npm run test:run
```
