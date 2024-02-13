import type { Plugin } from 'vite'

export interface Options {
    /**
     * Whether to suppress Vite's build output
     * @default false
     */
    quiet?: boolean

    /**
     * Where to look for videos
     * @default './src/_videos'
     */
    videosPath?: string

    /**
     * Where to look for posts
     * @default './src/_posts'
     */
    postsPath?: string

    /**
     * Fallback Author profile url
     */
    fallbackAuthorProfileUrl?: string

    /**
     * Fallback post image URL
     * @default "https://source.unsplash.com/random/2000x1000/?stationary"
     */
    fallbackPostImageUrl?: string
}

export interface VitePluginPressPlugin extends Plugin {
    api: {
        options: Options
    }
}

const component: any
type VideoGroups = { [key:string]:Video[] }
type Posts = { config: any, authors: Author[], posts: Post[], authorSlugs: {[name:string]:Author}, tagSlugs: {[name:string]:string} }
type VideoComponents = { [key:string]: {[group:string]:() => Promise<component>} }
type PostComponents = { [key:string]:() => Promise<component> }
export type Meta = {
    videos: VideoGroups
    posts: Posts
    components: {
        videos: VideoComponents
        posts: PostComponents
    }
}

export type Doc = {
    title: string
    slug: string
    path: string
    fileName: string
    content: string
    preview: string
    date: string
    tags: string[]
    wordCount: number
    lineCount: number
    minutesToRead: number
    order?: number
    draft?: boolean
}

export type Post = Doc & {
    summary: string
    author: string
    image: string
}

export type Video = Doc & {
    url: string
}

export type Author = {
    name: string
    email: string
    bio: string
    profileUrl: string
    twitterUrl: string
    threadsUrl: string
    gitHubUrl: string
    mastodonUrl: string
}