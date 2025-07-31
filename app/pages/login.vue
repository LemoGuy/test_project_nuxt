<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <div class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-blue-200">

            <!-- Logo & Title -->
            <div class="flex flex-col items-center mb-6">
                <img src="/logo.png" alt="University Logo" class="w-37.5 h-52.5 mb-2" />
            </div>

            <!-- Form -->
            <form @submit.prevent="handleLogin" class="space-y-4">
                <!-- Email -->
                <div>
                    <label class="block text-sm font-medium text-gray-700">Email</label>
                    <input v-model="email" type="email"
                        class="w-full px-4 py-2 mt-1 border border-gray-700 rounded-md focus:ring focus:ring-blue-200 text-gray-800"
                        required />
                </div>

                <!-- Password -->
                <div>
                    <label class="block text-sm font-medium text-gray-700">Password</label>
                    <input v-model="password" type="password"
                        class="w-full px-4 py-2 mt-1 border border-gray-700 rounded-md focus:ring focus:ring-blue-200 text-gray-800"
                        required />
                </div>

                <!-- Remember Me + Forgot Password -->
                <div class="flex items-center justify-between">
                    <label class="flex items-center text-sm text-gray-600">
                        <input v-model="rememberMe" type="checkbox" class="mr-2" />
                        Remember me
                    </label>

                    <a href="#" class="text-sm text-blue-600 hover:underline">
                        Forgot password?
                    </a>
                </div>

                <!-- Login Button -->
                <button type="submit"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition">
                    Login
                </button>

                <!-- Error Message -->
                <p v-if="error" class="text-red-600 text-sm text-center">{{ error }}</p>
            </form>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const rememberMe = ref(false)
const router = useRouter()

const users = [
    { email: 'student@university.edu', password: '123456', name: 'Student' },
    { email: 'lecturer@university.edu', password: '123456', name: 'Lecturer' },
    { email: 'hussein.mohammedali@ukh.edu.krd', password: '123456', name: 'Hussein' },
    { email: 'registry@university.edu', password: '123456', name: 'Registry' }
]

const handleLogin = () => {
  const user = users.find(
    (u) => u.email === email.value && u.password === password.value
  )

  if (user) {
    const cookieOptions = rememberMe.value
      ? { path: '/', maxAge: 60 * 60 * 24 * 7, secure: false, sameSite: 'lax' }
      : { path: '/', maxAge: undefined, secure: false, sameSite: 'lax' }

    console.log('[Login] Cookie options:', cookieOptions)

    const cookie = useCookie('auth_user', cookieOptions)
    cookie.value = JSON.stringify(user)

    console.log('[Login] Cookie set:', cookie.value)
    router.push('/dashboard')
  } else {
    error.value = 'Invalid email or password'
  }
}

</script>


<style>
input:-webkit-autofill {
    -webkit-text-fill-color: #1f2937 !important;
    /* Tailwind's gray-800 */
    /* transition: background-color 9999s ease-in-out 0s; */
}
</style>
