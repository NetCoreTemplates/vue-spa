import fs from "fs"
import matter from "front-matter"
import { leftPart, lastRightPart } from "@servicestack/client"
import MarkdownIt from "markdown-it"
import container from "markdown-it-container"
import prism from "markdown-it-prism"
import { Doc } from "../src/meta"

function padInt(n: number) { 
    return n < 10 ? '0' + n : n 
}
function dateFmt(d: Date = new Date()) { 
    return d.getFullYear() + '-' + padInt(d.getMonth() + 1) + '-' + padInt(d.getDate())  
}
function countWords(str:string) {
    const matches = str.match(/[\w\d\’\'-]+/gi);
    return matches ? matches.length : 0;
}
function countLines(str: string) {
    return (str.match(/\n/g) || '').length + 1
}
function minutesToRead(worlds:number) {
    return Math.round((worlds ?? 1) / 225)
}
export function generateSlug(str:string) {
    return str
        .normalize('NFKD') // normalize() with NFKD returns Unicode Normalization Form
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\_/g,'-')       // Replace _ with -
        .replace(/\-\-+/g, '-')   // Replace multiple - with single -
        .replace(/\-$/g, '');     // Remove trailing -
}

export function createDoc(markdown:MarkdownIt,filePath:string):Doc {
    filePath = filePath.replaceAll('\\', '/')
    const file = lastRightPart(filePath, '/')
    const txt = fs.readFileSync(filePath, 'utf-8')
    const { attributes:frontmatter, body:content } = matter(txt) as any
    if (!frontmatter.tags) frontmatter.tags = []
    if (frontmatter.date) {
        const parts = frontmatter.date.split('-')
        if (parts.length == 3 && parts[2].length == 4) {
            frontmatter.date = parts[2] + '-' + parts[1] + '-' + parts[0]
        }
    }

    const wordCount = countWords(content) 
    const preview = renderMarkdown(markdown,content)
    const doc = Object.assign({
        slug: generateSlug(leftPart(file, '.')),
        path: filePath,
        fileName: file,
        content,
        preview,
        date: dateFmt(new Date(fs.statSync(filePath).mtime)),
        tags: [],
        wordCount,
        lineCount: countLines(content),
        minutesToRead: minutesToRead(wordCount),
    }, frontmatter) 
    return doc
}

export function createRenderer() {
    const md = new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
    })
    return configureMarkdown(md)
}

export function configureMarkdown(md:MarkdownIt) {
    md.linkify.set({ fuzzyLink: false })
    md.use(prism)
    md.use(container, 'copy', copy({cls:'not-prose copy cp', icon:'bg-sky-500'}))
    md.use(container, 'sh', copy({cls:'not-prose sh-copy cp', box:'bg-gray-800', icon:'bg-green-600', txt:'whitespace-pre text-base text-gray-100'}))
    return md
}

export function renderMarkdown(markdown:MarkdownIt, raw:string) {
    raw = raw.trimStart()
    let html = markdown.render(raw)
    return html
}

export function copy({cls,box,icon,txt}:any) {
    return ({
        render(tokens:any, idx:any) {
            const token = tokens[idx]
            if (token.nesting === 1) {
                return `<div class="${cls} flex cursor-pointer mb-3" onclick="copy(this)">
            <div class="flex-grow ${box||'bg-gray-700'}">
                <div class="pl-4 py-1 pb-1.5 align-middle ${txt||'text-lg text-white'}">`
            } else {
                return `</div>
            </div>
            <div class="flex">
                <div class="${icon} text-white p-1.5 pb-0">
                    <svg class="copied w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <svg class="nocopy w-6 h-6" title="copy" fill='none' stroke='white' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                        <path stroke-linecap='round' stroke-linejoin='round' stroke-width='1' d='M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2'></path>
                    </svg>
                </div>
            </div>
        </div>\n`
            }
        }
    })
}