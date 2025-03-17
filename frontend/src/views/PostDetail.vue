<template>
    <div>
        <h1>{{ post.title }}</h1>
        <p>{{ post.content }}</p> <!-- 게시글 내용 -->
    </div>
</template>

<script>
import { fetchPostDetail } from '@/api'; // API에서 게시글 상세 정보 가져오는 함수

export default {
    name: 'PostDetail',
    data() {
        return {
            post: {}, // 게시글 데이터를 저장할 객체
        };
    },
    async created() {
        try {
            const postId = this.$route.params.id; // 라우터에서 받은 게시글 ID
            const postDetail = await fetchPostDetail(postId); // API 호출
            this.post = postDetail; // 받아온 게시글 내용을 post에 저장
        } catch (error) {
            console.error('게시글 상세 내용을 가져오는 중에 오류가 발생했습니다:', error);
        }
    }
};
</script>

<style scoped>
h1 {
    font-size: 24px;
    color: #333;
}

p {
    font-size: 18px;
    color: #555;
}
</style>