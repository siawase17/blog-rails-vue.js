<template>
    <div class="post-edit">
        <form @submit.prevent="updatePost">
            <input type="text" id="title" v-model="title" required />
            <div class="category-container">
                <label for="category">Category</label>
                <select v-model="selectedCategory" required>
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                        {{ category.name }}
                    </option>
                </select>
            </div>
            <textarea id="content" v-model="content" required></textarea>
            <button type="submit">修正</button>
            <button type="button" @click="cancelEdit">削除</button>
        </form>
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { fetchPostDetail, fetchCategories, updatePost } from '@/api';
import { useRouter, useRoute } from 'vue-router';

export default {
    name: 'PostEdit',
    data() {
        return {
            postId: this.$route.params.id,
            title: '',
            content: '',
            selectedCategory: null,
            categories: [],
            errorMessage: '',
        };
    },
    setup() {
        const router = useRouter();
        const route = useRoute();

        const cancelEdit = () => {
            router.push(`/post/${route.params.id}`);
        };

        return { cancelEdit };
    },
    async created() {
        try {
            const postDetail = await fetchPostDetail(this.postId);
            this.title = postDetail.title;
            this.content = postDetail.content;
            this.selectedCategory = postDetail.category_id;

            const categories = await fetchCategories();
            this.categories = categories;
        } catch (error) {
            console.error('게시글 수정 정보를 불러오는 중 오류가 발생했습니다:', error);
        }
    },
    methods: {
        async updatePost() {
            try {
                const postData = {
                    title: this.title,
                    content: this.content,
                    category_id: this.selectedCategory,
                };
                await updatePost(this.postId, postData);
                this.$router.push(`/post/${this.postId}`);
            } catch (error) {
                this.errorMessage = '게시글 수정 중 오류가 발생했습니다.';
            }
        },
    },
};
</script>

<style scoped>
.post-edit {
    margin: 0 auto;
}

.category-container {
    display: flex;
    margin-bottom: 20px;
    gap: 15px;
}

label {
    font-size: 18px;
    display: block;
}

select {
    width: 150px;
}

input,
textarea {
    width: 100%;
    margin: 5px 0 20px;
    padding: 20px;
    border: none;
    outline: none;
    border-radius: 10px;
    background-color: #edede9;
}

input {
    font-size: 40px;
}

textarea {
    font-size: 18px;
    min-height: 500px;
    resize: none;
}

button {
    padding: 10px 20px;
    background-color: #d6ccc2;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
}

button:hover {
    background-color: #d5bdaf;
}

.error {
    color: red;
    margin-top: 10px;
}
</style>