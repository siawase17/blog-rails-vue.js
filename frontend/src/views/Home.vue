<template>
    <div>
        <PostList />
    </div>
</template>

<script>
import Button from '@/components/Button.vue';
import PostList from '@/components/PostList.vue';

export default {
    name: 'Home',
    components: {
        Button,
        PostList,
    }
}
</script>

<style scoped>
</style>
