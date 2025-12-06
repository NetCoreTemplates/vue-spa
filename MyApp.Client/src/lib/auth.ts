import { ref, computed } from "vue"
import { useAuth } from "@servicestack/vue"
import type { NavigationGuardNext, RouteLocationNormalized, Router } from "vue-router"
import { nextTick, watchEffect } from "vue"
import { Authenticate } from "@/lib/dtos"
import { client, Routes } from "@/lib/gateway"

export async function checkAuth() {
    try {
        return await client.post(new Authenticate())
    } catch (e) {
        return undefined
    }
}

export async function logout() {
    await client.post(new Authenticate({ provider: 'logout' }))
    const { signOut } = useAuth()
    signOut()
}

export function createAttrs(auth?: { roles?: string[] | undefined; permissions?: string[] | undefined } | null) {
    return auth ? [
        'auth',
        ...(auth?.roles || []).map(role => `role:${role}`),
        ...(auth?.permissions || []).map(perm => `perm:${perm}`),
    ] : []
}

const { user, hasRole, hasPermission, signIn, signOut } = useAuth()

export { user, hasRole, hasPermission }

checkAuth().then(auth => {
    if (auth) signIn(auth)
    else signOut()
})

export async function revalidate() {
    loading.value = true
    const auth = await checkAuth()
    if (auth) signIn(auth)
    else signOut()
    loading.value = false
}

export const loading = ref(false)

export const attrs = computed(() => createAttrs(user.value))

export const signout = async (router:any, redirectTo?: string) => {
    signOut()
    await logout()
    // Always redirect to force re-running auth route guards
    await router.replace({ path: redirectTo ?? router?.currentRoute?.value.path, force: true })
}


// Use Route Guards to guard against access to pages 
type RouteGuard = { path:string, attr:string }
const routes:RouteGuard[] = [
    { path:'/profile',       attr:'auth' },
    { path:'/admin',         attr:'role:Admin' },
    { path:'/bookings',      attr:'role:Employee' },
    { path:'/bookings-crud', attr:'role:Employee' },
]

export function configRouter(router:Router)  {
    const invalidAttrRedirect = (to:RouteLocationNormalized, guardAttr:string, userAttrs:string[]) => userAttrs.indexOf('auth') === -1
        ? Routes.signin(to.path)
        : Routes.forbidden()

    // Validate Route guards against Authenticated User's Attributes
    const validateRoute = (to:RouteLocationNormalized, next:NavigationGuardNext, attrs:string[]) => {
        for (let i=0; i<routes.length; i++) {
            const route = routes[i]
            if (!route) continue
            const { path, attr } = route
            if (!to.path.startsWith(path)) continue
            if (attrs.indexOf(attr) === -1) {
                const isAdmin = attrs.indexOf('role:Admin') >= 0
                const allowAdmin = isAdmin && (attr.startsWith('role:') || attr.startsWith('perm:'))
                if (!allowAdmin) {
                    const goTo = invalidAttrRedirect(to, attr, attrs)
                    next(goTo)
                    return
                }
            }
        }
        next()
    }

    router.beforeEach((to:RouteLocationNormalized,from:RouteLocationNormalized,next:NavigationGuardNext) => {
        if (loading) {
            const stop = watchEffect(() => {
                validateRoute(to, next, attrs.value)
                nextTick(() => stop())
            })
        } else {
            validateRoute(to, next, attrs.value)
        }
    })

    return router
}
