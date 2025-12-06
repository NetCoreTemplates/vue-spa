import { JsonServiceClient } from "@servicestack/client"
import { useMetadata } from "@servicestack/vue"
import type { Router } from "vue-router"

const serverRoutePaths = [
    '/Identity',
    '/metadata',
    '/api',
    '/ui',
    '/chat',
    '/admin-ui',
    '/swagger',
    '/scalar',
]

export function isServerRoute(path:string) {
    return serverRoutePaths.some(x => path.startsWith(x))
}

// Typed Routes used in Components
export const Routes = {
    signin: (redirectTo?:string) => redirectTo ? `/signin?redirect=${redirectTo}` : `/signin`,
    forbidden: () => '/forbidden',
}

export const client = new JsonServiceClient()

export function useApp() {
    async function load (force?:boolean) {
        const { loadMetadata } = useMetadata()
        await loadMetadata({ olderThan: 0 })
    }
    return {
        load,
        client,
    }
}

export function getRedirect(router:Router) {
    let { redirect } = router.currentRoute?.value.query
    let ret = redirect && Array.isArray(redirect)
        ? redirect[0]
        : redirect
    return ret?.toString()
}
