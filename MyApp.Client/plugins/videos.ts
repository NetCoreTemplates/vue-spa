import fs from 'fs'
import path from 'path'
import { createDoc, createRenderer } from "./markdown"

export function loadFrom(fromDir:string) {
    const groups :{[key:string]:any[]} = {}
    
    const dirs = fs.readdirSync(fromDir).filter(x => fs.statSync(path.join(fromDir, x)).isDirectory())
    console.log(`Found ${dirs.length} video directories`)
    const markdown = createRenderer()

    dirs.forEach(dir => {
        const group = dir
        fs.readdirSync(path.join(fromDir, dir)).forEach(file => {
            const filePath = path.join(fromDir, dir, file)
            if (!groups[group]) groups[group] = []
            const doc = createDoc(markdown, filePath)
            if (process.env.NODE_ENV != 'development' && doc.draft) {
                return
            }
            groups[group].push(doc)
        })
    })
    
    return groups
}

export function generateComponents(groups:{[key:string]:any[]}) {
    return [
    `{`,
    ...Object.keys(groups).flatMap(group => [
    `   "${group}": {`,
    ...groups[group].map((doc:any) => `         "${doc.slug}": () => import('/${doc.path}'),`),
    `   },`]),
    `}`,
    ].map(line => `            ${line}`).join('\n')
}
