<template>
  <FileLayout :files="files"/>
</template>

<script setup lang="ts">
import FileLayout from '@/components/FileLayout.vue'

const props = defineProps<{
  body: string
}>()

/* Takes an ascii string of indented folder and file paths:
const from = `/meta
  /2022
    all.json
    posts.json
    videos.json
  /2023
    all.json
    posts.json
  all.json
  index.json`

// and returns a nested object representing the file structure:
const to = {
    meta: {
        2022: { _: ['all.json','posts.json','videos.json'] },
        2023: { _: ['all.json','posts.json'] },
        _: ['all.json','index.json']
    }
}
*/
function parseFileStructure(ascii:string, indent:number = 2) {
  const lines = ascii.split('\n')
  const root = { _: [] }
  const stack = [root]

  for (const line of lines) {
    const depth = line.search(/\S/) / indent
    const name = line.trim()
    const parent:{[name:string]:any} = stack[depth]
    const isDir = name.startsWith('/')

    if (isDir) {
      const dirName = name.substring(1)
      const dirContents = { _: [] }
      parent[dirName] = dirContents
      stack.length = depth + 1
      stack.push(dirContents)
    } else {
      parent._.push(name)
    }
  }
  return root
}

const txt = props.body?.trim() || ''
const files = parseFileStructure(txt)
</script>