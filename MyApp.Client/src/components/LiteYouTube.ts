/*!
 * Original code by Ibrahim Cesar
 * MIT Licensed, Copyright 2022 Ibrahim Cesar, see https://github.com/ibrahimcesar/react-lite-youtube-embed/blob/main/LICENSE for details
 *
 * Credits to the team:
 * https://github.com/ibrahimcesar/react-lite-youtube-embed/blob/main/src/lib/index.tsx
 */
import type { PropType } from 'vue'
import { h as hDemi, computed, defineComponent, ref } from 'vue'

export type ImageResolution =
    | 'default'
    | 'mqdefault'
    | 'hqdefault'
    | 'sddefault'
    | 'maxresdefault'

function runCommand(iframe: HTMLIFrameElement | null, func: 'stopVideo' | 'pauseVideo' | 'playVideo') {
    if (iframe === null)
        throw new Error('iframe element not instantiated.')

    iframe.contentWindow?.postMessage(`{"event":"command","func":"${func}","args":""}`, '*')
}

function linkPreconnect(href: string) {
    return h('link', {
        attrs: { rel: 'preconnect', href },
    })
}

interface Options {
    props?: Record<any, any>
    domProps?: Record<any, any>
    attrs?: Record<any, any>
    on?: Record<any, any>
}
const adaptOnsV3 = (ons: Object) => {
    if (!ons)
        return null
    return Object.entries(ons).reduce((ret, [key, handler]) => {
        key = key.charAt(0).toUpperCase() + key.slice(1)
        key = `on${key}`
        return { ...ret, [key]: handler }
    }, {})
}
const h = (type: String | Record<any, any>, options: Options & any = {}, children?: any) => {
    const { props, domProps, on, attrs, ...extraOptions } = options
    const ons = adaptOnsV3(on)
    const params = { ...extraOptions, ...props, ...domProps, ...ons, ...attrs }
    return hDemi(type, params, children)
}

export default defineComponent({
    props: {
        announce: {
            type: String,
            required: false,
            default: 'Watch',
        },
        id: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        activatedClass: {
            type: String,
            required: false,
            default: 'lyt-activated',
        },
        adNetwork: {
            type: Boolean,
            required: false,
            default: true,
        },
        iframeClass: {
            type: String,
            required: false,
            default: '',
        },
        cookie: {
            type: Boolean,
            required: false,
            default: false,
        },
        params: {
            type: String,
            required: false,
            default: '',
        },
        playerClass: {
            type: String,
            required: false,
            default: 'lty-playbtn',
        },
        playlist: {
            type: Boolean,
            required: false,
            default: false,
        },
        playlistCoverId: {
            type: String,
            required: false,
            default: '',
        },
        poster: {
            type: String as PropType<ImageResolution>,
            required: false,
            default: 'hqdefault',
        },
        wrapperClass: {
            type: String,
            required: false,
            default: 'yt-lite',
        },
        muted: {
            type: Boolean,
            required: false,
            default: false,
        },
        thumbnail: {
            type: String,
            required: false,
        },
        webp: {
            type: Boolean,
            required: false,
            default: false,
        },
        rel: {
            type: String as PropType<'prefetch' | 'preload'>,
            required: false,
            default: 'preload',
        },
        aspectHeight: {
            type: Number,
            required: false,
            default: 9,
        },
        aspectWidth: {
            type: Number,
            required: false,
            default: 16,
        },
    },
    emits: ['iframeAdded'],
    setup(props, { emit, expose }) {
        const preconnected = ref(false)
        const iframe = ref(false)
        const iframeElement = ref<HTMLIFrameElement | null>(null)

        const videoId = computed(() => encodeURIComponent(props.id))
        const paramsImp = computed(() => `&${props.params}` || '')
        const mutedImp = computed(() => props.muted ? '&mute=1' : '')
        const format = computed(() => props.webp ? 'webp' : 'jpg')
        const vi = computed(() => props.webp ? 'vi_webp' : 'vi')
        const videoPlaylistCoverId = computed(() => typeof props.playlistCoverId === 'string' ? encodeURIComponent(props.playlistCoverId) : null)

        const posterUrl = computed(() => {
            return props.thumbnail || (!props.playlist
                ? `https://i.ytimg.com/${vi.value}/${videoId.value}/${props.poster}.${format.value}`
                : `https://i.ytimg.com/${vi.value}/${videoPlaylistCoverId.value}/${props.poster}.${format.value}`)
        })

        const ytUrl = computed(() => props.cookie
            ? 'https://www.youtube.com'
            : 'https://www.youtube-nocookie.com')
        const iframeSrc = computed(() => !props.playlist
            ? `${ytUrl.value}/embed/${videoId.value}?autoplay=1&enablejsapi=1&state=1${mutedImp.value}${paramsImp.value}`
            : `${ytUrl.value}/embed/videoseries?autoplay=1&enablejsapi=1&list=${videoId.value}${mutedImp.value}${paramsImp.value}`)

        function addIframe() {
            if (iframe.value)
                return
            iframe.value = true
            emit('iframeAdded')
        }

        function warmConnections() {
            if (preconnected.value)
                return
            preconnected.value = true
        }

        expose({
            getPlayerInstance() {
                return iframeElement.value
            },
            stopVideo() {
                runCommand(iframeElement.value, 'stopVideo')
            },
            pauseVideo() {
                runCommand(iframeElement.value, 'pauseVideo')
            },
            playVideo() {
                runCommand(iframeElement.value, 'playVideo')
            },
            warmConnections,
            addIframe,
        })

        const vnodeList = (): any[] => [
            h('link', {
                attrs: {
                    rel: props.rel,
                    href: posterUrl.value,
                    as: 'image',
                },
            }),
            preconnected.value ? linkPreconnect(ytUrl.value) : null,
            preconnected.value ? linkPreconnect('https://www.google.com') : null,
            props.adNetwork ? linkPreconnect('https://static.doubleclick.net') : null,
            props.adNetwork
                ? linkPreconnect('https://googleads.g.doubleclick.net')
                : null,
            h(
                'article',
                {
                    on: {
                        pointerover: warmConnections,
                        click: addIframe,
                    },
                    class: `${props.wrapperClass} ${iframe.value ? props.activatedClass : ''}`,
                    attrs: { 'data-title': props.title },
                    style: {
                        'backgroundImage': `url(${posterUrl.value})`,
                        '--aspect-ratio': `${(props.aspectHeight / props.aspectWidth) * 100}%`,
                    },
                },
                [
                    // Play button
                    h('button', {
                        class: props.playerClass,
                        attrs: {
                            'type': 'button',
                            'aria-label': `${props.announce} ${props.title}`,
                        },
                    }),
                    // Iframe
                    iframe.value
                        ? h('iframe', {
                            ref: iframeElement,
                            class: props.iframeClass,
                            attrs: {
                                title: props.title,
                                width: 560,
                                height: 315,
                                frameborder: 0,
                                allow:
                                    'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
                                allowfullscreen: true,
                                src: iframeSrc.value,
                            },
                        })
                        : null,
                ],
            ),
        ]
        return () => vnodeList()
    },
})