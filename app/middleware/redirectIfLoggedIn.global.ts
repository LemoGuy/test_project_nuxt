export default defineNuxtRouteMiddleware((to) => {
    const isLoginPage = to.path === '/login'
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
    } catch {
        cookie.value = null
        user = null
    }

    if (isLoginPage && user) {
        return navigateTo('/dashboard')
    }
})
