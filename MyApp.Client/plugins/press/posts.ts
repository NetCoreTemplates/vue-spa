import fs from 'fs'
import path from 'path'
import { leftPart, rightPart, lastLeftPart } from "@servicestack/client"
import { createDoc, generateSlug } from "./utils"
import { Options, Post, Author } from "./types"

export function loadFrom(fromDir:string, options: Options = {}) {
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
    
    if (!options.quiet) console.log(`Found ${files.length} posts`)

    files.forEach(file => {
        const filePath = path.join(fromDir, file)
        const doc = createDoc(filePath, options) as Post
        if (!doc) return
        doc.date = leftPart(file, '_')
        doc.fileName = rightPart(file, '_')
        doc.slug = lastLeftPart(doc.fileName, '.')
        doc.image ??= options.fallbackAuthorProfileUrl!
        if (process.env.NODE_ENV != 'development' && doc.draft) {
            return
        }
        posts.push(doc)
    })
    
    authors.forEach((author:any) => {
        authors.profileUrl ??= options.fallbackAuthorProfileUrl
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
