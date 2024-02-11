import * as markdownVideos from './videos'
import * as markdownPosts from './posts'

export default function() {
    const virtualModuleId = 'virtual:meta'
    const resolvedVirtualModuleId = '\0' + virtualModuleId
    
    return {
        name: 'meta-plugin', // required, will show up in warnings and errors
        enforce: 'pre',
        resolveId(id:string) {
            if (id === virtualModuleId) {
                return resolvedVirtualModuleId
            }
        },
        load(id:string) {
            if (id === resolvedVirtualModuleId) {
                const videos = markdownVideos.loadFrom('./_videos')
                const posts = markdownPosts.loadFrom('./_posts')

                const videoComponents = markdownVideos.generateComponents(videos)
                const postComponents = markdownPosts.generateComponents(posts)
                
                const sb = [`export default {`,
                `    videos: ${JSON.stringify(videos)},`,
                `    posts: ${JSON.stringify(posts)},`,
                `    components: {`, 
                `        videos:`,
                videoComponents + ',',
                `        posts:`,
                postComponents + ',',
                `       }`,                     
                '}'].join('\n')
                return sb
            }
        },
    }
}