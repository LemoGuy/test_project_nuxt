<template>
    <div class="min-h-screen bg-blue-50 p-8">
        <h1 class="text-2xl font-bold text-black" v-if="!loggingOut">
            Welcome, {{ user?.name }}!
        </h1>

        <p v-else class="text-xl text-black">Logging out...</p>

        <button v-if="!loggingOut" @click="logout"
            class="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
            Logout
        </button>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const loggingOut = ref(false)
const raw = useCookie('auth_user', { path: '/' })

const user = computed(() => {
    try {
        return typeof raw.value === 'string' ? JSON.parse(raw.value) : raw.value
    } catch (e) {
        console.error('[Dashboard] Failed parsing cookie:', e)
        return null
    }
})

console.log('[Dashboard] User:', user.value)

const router = useRouter()

const logout = () => {
    console.log('[Dashboard] Logging out...')
    loggingOut.value = true
    const cookie = useCookie('auth_user', { path: '/' })
    cookie.value = null
    setTimeout(() => {
        window.location.href = '/login'
    }, 500)
}
</script>
