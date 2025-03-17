<script setup>
defineProps({
    label: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: false
    },
    type: {
        type: String,
        default: 'button'
    }
})
</script>

<template>
    <RouterLink v-if="to" :to="to">
        <button class="button">{{ label }}</button>
    </RouterLink>
    <button v-else :type="type" class="button">{{ label }}</button>
</template>

<style scoped>
.button {
    color: white;
    text-decoration: none;
    padding: 10px;
    background-color: #d6ccc2;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.button:hover {
    background-color: #d5bdaf;
}
</style>
