import MarkdownIt from "markdown-it"
import container from "markdown-it-container"
import prism from "markdown-it-prism"
import anchor from "markdown-it-anchor"
import Prism from 'prismjs'

const FencedComponents = ['files']

export default function(md:MarkdownIt, options: { fencedComponents?:string[] } = {}) {
    function copy({cls,box,icon,txt}:any) {
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
    function alert({title,cls}:any) {
        return ({
            render(tokens:any, idx:any) {
                const token = tokens[idx]
                if (token.nesting === 1) {
                    const useTitle = token.info.trim().substring(`${title} `.length).replace(/:+$/g,'') || title || 'TIP'
                    return `<div class="${cls||'tip'} custom-block">
                                <p class="custom-block-title">${useTitle}</p>`
                } else {
                    return `</div>`
                }
            }
        })
    }
    function include() {
        return ({
            validate(params:any) { 
                return params.trim().match(/^include\s+(.*)$/) 
            },
            render(tokens:any, idx:any) {
                const token = tokens[idx]
                if (token.nesting === 1) {
                    return `<Include src="${token.info.trim().substring('include '.length).replace(/:+$/g,'')}" />`
                } else {
                    return ``
                }
            }
        })
    }
    function youtube() {
        return ({
            render(tokens:any, idx:any) {
                const token = tokens[idx]
                if (token.nesting === 1) {
                    return `<LiteYouTube id="${token.info.trim().substring('youtube '.length).replace(/:+$/g,'')}" />`
                } else {
                    return ``
                }
            }
        })
    }
    
    md.linkify.set({ fuzzyLink: false })
    md.use(anchor, {permalink: anchor.permalink.headerLink()})
    md.use(prism)
    md.use((md:any) => {
        const allComponents = [...(options.fencedComponents || []), ...FencedComponents]
        allComponents.forEach(name => {
            Prism.languages[name] = {}
        })

        const prismFence = md.renderer.rules.fence
        md.renderer.rules.fence = function (tokens:any, idx:any, options:any, env:any, slf:any) {
            const token = tokens[idx]
            const info = token.info ? md.utils.unescapeAll(token.info).trim() : ''
            const langName = info.split(/\s+/g)[0]
            if (allComponents.includes(langName)) {
                const tag = langName
                const body = token.content.replace(/"/g, '&quot;').replace(/`/g, '&lt;').replace(/>/g, '&gt;').replace(/`/g,'\\`')
                return '<' + tag + ' :body="`' + body + '`" />'
            }
            return prismFence(tokens, idx, options, env, slf)
        }
    })
    md.use(container, 'tip', alert({}))
    md.use(container, 'info', alert({title:'INFO',cls:'info'}))
    md.use(container, 'warning', alert({title:'WARNING',cls:'warning'}))
    md.use(container, 'danger', alert({title:'DANGER',cls:'danger'}))
    md.use(container, 'copy', copy({cls:'not-prose copy cp', icon:'bg-sky-500'}))
    md.use(container, 'sh', copy({cls:'not-prose sh-copy cp', box:'bg-gray-800', icon:'bg-green-600', txt:'whitespace-pre text-base text-gray-100'}))
    md.use(container, 'include', include())
    md.use(container, 'youtube', youtube())
    md.use(container, 'dynamic', {
        validate: () => true,
        render: function (tokens:any, idx:any) {
            const token = tokens[idx];
            return token.nesting === 1
                ? '<div class="' + token.info.trim().replace(/[{}.]/g,'') + '">'
                : '</div>'
        },
    })
    return md
}
