import { fileURLToPath, URL } from 'node:url'

import fs from 'fs'
import { env } from 'process'

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import Vue from '@vitejs/plugin-vue'
import Press, { matter } from 'vite-plugin-press'
import Components from 'unplugin-vue-components/vite'
import VueRouter from 'unplugin-vue-router/vite'
import Layouts from 'vite-plugin-vue-layouts-next'
import Markdown from 'unplugin-vue-markdown/vite'
import svgLoader from 'vite-svg-loader'
import configureMarkdown from './vite.config.markdown'

const target = process.env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${process.env.ASPNETCORE_HTTPS_PORT}` :
    process.env.ASPNETCORE_URLS ? process.env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:5001';

const isProd = process.env.NODE_ENV === 'production'
const buildLocal = process.env.MODE === 'local'

// Define DEPLOY_API first
const DEPLOY_API = process.env.KAMAL_DEPLOY_HOST
    ? `https://${process.env.KAMAL_DEPLOY_HOST}`
    : target

// Now use it for API_URL
const API_URL = isProd ? DEPLOY_API : (buildLocal ? '' : target)

// https://vitejs.dev/config/
export default defineConfig({
    define: { apiBaseUrl: `"${API_URL}"` },
    plugins: [
        // https://github.com/posva/unplugin-vue-router
        VueRouter({
            extensions: ['.vue', '.md'],
            dts: 'src/typed-router.d.ts',
            extendRoute(route:any) { 
                const filePath = route.node.value.components?.get('default')
                if (filePath && filePath.endsWith('.md')) {
                    const md = fs.readFileSync(filePath, 'utf-8')
                    const { attributes:frontmatter } = matter(md)
                    const pos = filePath.indexOf('/src/pages/')
                    const crumbs =  filePath.substring(pos + '/src/pages/'.length).split('/').slice(0,-1)
                        .map((name:string) => ({ name, href:`/${name}` }))
                    route.meta = Object.assign(route.meta || {}, { crumbs, frontmatter })
                }
            }
        }),
        Vue({
            include: [/\.vue$/, /\.md$/],
        }),
        tailwindcss(),

        Press({
            baseUrl:API_URL,
            metadataPath:'public/api'
        }),
        Layouts(),
        svgLoader(),

        // https://github.com/unplugin/unplugin-vue-markdown
        Markdown({
            // default options passed to markdown-it
            // see: https://markdown-it.github.io/markdown-it/
            markdownItOptions: {
                html: true,
                linkify: true,
                typographer: true,
            },
            wrapperComponent: 'MarkdownPage',
            headEnabled: true,
            markdownItSetup(md:any) {
                configureMarkdown(md)
            },
        }),

        // https://github.com/unplugin/unplugin-vue-components
        Components({
            // allow auto load markdown components under `./src/components/`
            extensions: ['vue', 'md'],

            // allow auto import and register components used in markdown
            include: [/\.vue$/, /\.vue\?vue/, /\.md$/],

            //dts: 'src/components.d.ts',
            dts:true,
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        host: true, // Listen on all interfaces (both IPv4 and IPv6)
        open: false,
    }
})
