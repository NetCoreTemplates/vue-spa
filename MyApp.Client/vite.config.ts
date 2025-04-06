import { fileURLToPath, URL } from 'node:url'

import fs from 'fs'
import path from 'path'
import child_process from 'child_process'
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

const baseFolder =
    env.APPDATA !== undefined && env.APPDATA !== ''
        ? `${env.APPDATA}/ASP.NET/https`
        : `${env.HOME}/.aspnet/https`;

const certificateArg = process.argv.map(arg => arg.match(/--name=(?<value>.+)/i)).filter(Boolean)[0];
const certificateName = certificateArg ? certificateArg!.groups!.value : "myapp.client";
if (!certificateName) {
    console.error('Invalid certificate name. Run this script in the context of an npm/yarn script or pass --name=<<app>> explicitly.')
    process.exit(-1);
}

const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

console.log(`Certificate path: ${certFilePath}`);

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {

    // mkdir to fix dotnet dev-certs error 3 https://github.com/dotnet/aspnetcore/issues/58330
    if (!fs.existsSync(baseFolder)) {
        fs.mkdirSync(baseFolder, { recursive: true });
    }
    if (
        0 !==
        child_process.spawnSync(
            "dotnet",
            [
                "dev-certs",
                "https",
                "--export-path",
                certFilePath,
                "--format",
                "Pem",
                "--no-password",
            ],
            { stdio: "inherit" }
        ).status
    ) {
        throw new Error("Could not create certificate.");
    }
}

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:5001';
const apiUrl = process.env.NODE_ENV === 'development' ? target : ''
const baseUrl = process.env.NODE_ENV === 'development'
    ? "https://locahost:5173"
    : process.env.DEPLOY_HOST ? `https://${process.env.DEPLOY_HOST}` : undefined

// https://vitejs.dev/config/
export default defineConfig({
    define: { API_URL: `"${apiUrl}"` },
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
            baseUrl,
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
        proxy: {
            '^/api': {
                target,
                secure: false
            }
        },
        port: 5173,
        https: {
            key: fs.readFileSync(keyFilePath),
            cert: fs.readFileSync(certFilePath),
        }
    }
})
