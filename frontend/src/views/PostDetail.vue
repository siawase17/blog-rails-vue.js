<template>
    <div>
        <h1>{{ post.title }}</h1>
        <div class="container">
            <div class="info">
                <p>{{ formatDate(post.updated_at) }}</p>
                <span class="category">{{ post.category.name }}</span>
            </div>
            <div class="action-buttons">
                <Button label="수정" :to="`/post/edit/${post.id}`" />
                <Button label="삭제" @click="deletePost" />
            </div>
        </div>
        <p>{{ post.content }}</p>
    </div>
</template>

<script>
import { fetchPostDetail, deletePost } from '@/api';
import Button from '@/components/Button.vue';
import { useRouter } from 'vue-router';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export default {
    name: 'PostDetail',
    components: {
        Button,
    },
    data() {
        return {
            post: {},
        };
    },
    async created() {
        try {
            const postId = this.$route.params.id;
            const postDetail = await fetchPostDetail(postId);
            this.post = postDetail;
        } catch (error) {
            console.error('게시글 상세 내용을 가져오는 중에 오류가 발생했습니다:', error);
        }
    },
    methods: {
        async deletePost() {
            try {
                const confirmDelete = window.confirm('정말로 이 게시글을 삭제하시겠습니까?');
                if (confirmDelete) {
                    const postId = this.$route.params.id;
                    await deletePost(postId);
                    this.$router.push('/');
                }
            } catch (error) {
                console.error('게시글 삭제 중 오류가 발생했습니다:', error);
            }
        },
        formatDate(date) {
            return format(new Date(date), 'yyyy년 MM월 dd일', { locale: ko });
        }
    },
};
</script>

<style scoped>
h1 {
    font-size: 50px;
    font-weight: 600;
}

p {
    font-size: 18px;
}

.container {
    display: flex;
    justify-content: space-between;
    padding: 0;
    border-bottom: 1px solid #cccccca9;
    padding-bottom: 5px;
    margin-top: 15px;
    margin-bottom: 30px;
}

.info {
    display: flex;
    align-items: baseline;
    gap: 15px;
}

.category {
    background-color: rgb(235, 235, 235);
    padding: 8px 14px;
    border-radius: 15px;
}

.action-buttons {
    display: flex;
    align-items: baseline;
    gap: 10px;
}
</style>