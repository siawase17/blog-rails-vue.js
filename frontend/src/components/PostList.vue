<template>
    <div class="post-list">
        <RouterLink
            v-for="post in posts"
            :key="post.id"
            :to="'/post/' + post.id"
            class="post-item"
        >
            <div class="post-content">
                <h2>{{ post.title }}</h2>
                <p>{{ post.content }}</p>
            </div>
        </RouterLink>
    </div>
</template>

<script>
import { fetchPosts } from '@/api'; // API에서 가져온 fetchPosts 함수

export default {
    name: 'PostList',
    data() {
        return {
            posts: [] // 게시글 목록을 빈 배열로 초기화
        };
    },
    async created() {
        try {
            // API에서 게시글 목록을 가져옵니다.
            const data = await fetchPosts();
            this.posts = data; // 받아온 데이터로 posts 배열을 채웁니다.
        } catch (error) {
            console.error('게시글을 가져오는 중에 오류가 발생했습니다:', error);
        }
    }
};
</script>

<style scoped>
.post-list {
    margin-top: 20px;
}

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
