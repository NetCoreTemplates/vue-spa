import fs from 'fs'
import path from 'path'
import { leftPart, rightPart, lastLeftPart } from "@servicestack/client"
import { createDoc, createRenderer, renderMarkdown, generateSlug } from "./markdown"
import { Post, Author } from "../src/meta"

const fallbackProfileUrl:string = "img/profiles/user1.svg"
const fallbackImageUrl:string = "https://source.unsplash.com/random/2000x1000/?stationary"

export function loadFrom(fromDir:string) {
    const authorSlugs : {[name:string]:Author} = {}
    const tagSlugs : {[name:string]:string} = {}
    const posts: Post[] = []

    const authorsPath = path.join(fromDir,'authors.json')
    const authors = fs.existsSync(authorsPath)
        ? JSON.parse(fs.readFileSync(authorsPath, 'utf-8'))
        : []

    const configPath = path.join(fromDir,'config.json')
    const config = fs.existsSync(configPath)
        ? JSON.parse(fs.readFileSync(configPath, 'utf-8'))
        : {}

    const files = fs.readdirSync(fromDir).filter(x => fs.statSync(path.join(fromDir, x)).isFile() && x.endsWith('.md'))
    
    console.log(`Found ${files.length} posts`)
    const markdown = createRenderer()

    files.forEach(file => {
        const filePath = path.join(fromDir, file)
        const doc = createDoc(markdown, filePath) as Post
        if (!doc) return
        doc.date = leftPart(file, '_')
        doc.fileName = rightPart(file, '_')
        doc.slug = lastLeftPart(doc.fileName, '.')
        if (!doc.image) {
            doc.image = fallbackImageUrl
        }
        if (process.env.NODE_ENV != 'development' && doc.draft) {
            return
        }
        posts.push(doc)
    })
    
    authors.forEach((author:any) => { 
        if (!authors.profileUrl) {
            authors.profileUrl = fallbackProfileUrl
        }
        authorSlugs[generateSlug(author.name)] = author
    })
    posts.forEach((post:any) => {
        post.tags.forEach((tag:string) => {
            tagSlugs[generateSlug(tag)] = tag
        })
    })
    posts.reverse()
    
    return { config, authors, posts, authorSlugs, tagSlugs }
}

export function generateComponents({ posts }:any) {
    return [
        `{`,
        ...posts.map((doc:any) => `"${doc.slug}": () => import('/${doc.path}'),`),
        `}`,
    ].map(line => `                ${line}`).join('\n')
}
