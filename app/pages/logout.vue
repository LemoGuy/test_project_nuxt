<script setup>

await navigateTo('/login')
const cookie = useCookie('auth_user')
cookie.value = null

</script>

<template>
    <div class="text-center p-10 text-gray-600">
        Logging out...
    </div>
</template>
