export default defineNuxtRouteMiddleware((to) => {
    const cookie = useCookie('auth_user', { path: '/' })

    let user = null
    try {
        if (!cookie.value) {
            user = null
        } else if (typeof cookie.value === 'string') {
            user = JSON.parse(cookie.value)
        } else if (typeof cookie.value === 'object') {
            user = cookie.value
        } else {
            user = null
        }
    } catch (err) {
        console.error('[Middleware] Error parsing cookie:', err)
        cookie.value = null
        user = null
    }

    console.log('[Middleware] User:', user)

    const publicPages = ['/', '/login']
    const isPublic = publicPages.includes(to.path)

    if (!isPublic && !user) {
        console.log('[Middleware] Redirecting to login')
        return navigateTo('/login')
    }
})
