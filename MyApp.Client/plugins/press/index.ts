import * as markdownVideos from './videos'
import * as markdownPosts from './posts'
import { Options, VitePluginPressPlugin } from "./types"

const videosPath = './src/_videos'
const postsPath = './src/_posts'
const fallbackAuthorProfileUrl:string = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4'/%3E%3C/svg%3E")`
const fallbackPostImageUrl:string = `https://source.unsplash.com/random/2000x1000/?stationary`

/**
 * Static markdown content for creating blogs, videos and other content
 * https://github.com/ServiceStack/vite-plugin-press
 * @param {Options} options
 */
export default function(options:Options={}): VitePluginPressPlugin {
    options = Object.assign({ fallbackAuthorProfileUrl, fallbackPostImageUrl, videosPath, postsPath }, options)
    const virtualModuleId = 'virtual:meta'
    const resolvedVirtualModuleId = '\0' + virtualModuleId
    
    return {
        name: 'press-plugin', // required, will show up in warnings and errors
        enforce: 'pre',
        resolveId(id:string) {
            if (id === virtualModuleId) {
                return resolvedVirtualModuleId
            }
        },
        load(id:string) {
            if (id === resolvedVirtualModuleId) {
                const videos = markdownVideos.loadFrom(options.videosPath!)
                const posts = markdownPosts.loadFrom(options.postsPath!)

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
        api: {
            options: options
        }
    }
}
