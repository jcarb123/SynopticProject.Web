<template>
    <div class='mt-7 max-width-sm mx-auto text-center card'>
        <p class='mt-7 text-7xl font-bold'>{{ error.statusCode }}</p>
        <p class='mt-7 text-6xl '>Oops....</p>
        <p class='mt-7'> {{ error.message }}</p>
        <button class='btn my-7' @click='handleClearError'>View Our Range!</button>
    </div>
</template>

<script setup>
defineProps(['error'])

const handleClearError = () => clearError({redirect: '/products'})
</script>