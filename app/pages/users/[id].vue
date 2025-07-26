<script setup>
const params = useRoute().params
const user = await $fetch("/api/users/" + params.id)

</script>

<template>
    <h1>
        {{ user }}
    </h1>
    <div>
        <p>my id is {{ user.id }}</p>
        <p>my name is {{ user.name }}</p>
    </div>

</template>