<template>
    <div class="post-list">
        <RouterLink v-for="post in filteredPosts" :key="post.id" :to="'/post/' + post.id" class="post-item">
            <div class="post-content">
                <h2>{{ post.title }}</h2>
                <p>{{ post.content }}</p>
            </div>
        </RouterLink>
    </div>
</template>

<script>
import { fetchPosts } from '@/api';

export default {
    name: 'PostList',
    props: {
        selectedCategoryId: {
            type: [String, Number],
            default: null
        }
    },
    data() {
        return {
            posts: [],
        };
    },
    computed: {
        filteredPosts() {
            if (this.selectedCategoryId) {
                return this.posts.filter(post => post.category_id === this.selectedCategoryId);
            }
            return this.posts;
        }
    },
    async created() {
        try {
            const data = await fetchPosts();
            this.posts = data;
        } catch (error) {
            console.error('게시글을 가져오는 중에 오류가 발생했습니다:', error);
        }
    }
};
</script>

<style scoped>

.post-item {
    background-color: #f5ebe0;
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    display: block;
}

.post-item .post-content {
    display: flex;
    flex-direction: column;
}

.post-item h2 {
    font-size: 20px;
    color: #333;
    margin-bottom: 10px;
}

.post-item p {
    font-size: 14px;
    color: #777;
}
</style>
