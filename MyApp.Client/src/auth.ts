import { ref, computed } from "vue"
import { useAuth } from "@servicestack/vue"
import { checkAuth, logout } from "./api"

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
