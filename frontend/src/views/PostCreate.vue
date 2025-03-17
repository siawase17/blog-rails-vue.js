<template>
    <div class="create-post">
        <form @submit.prevent="createPost">
            <input type="text" id="title" v-model="title" placeholder="제목을 입력하세요" required />
            <div class="category-container">
                <label for="category">카테고리</label>
                <select v-model="selectedCategory" required>
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                        {{ category.name }}
                    </option>
                </select>
            </div>
            <textarea id="content" v-model="content" placeholder="내용을 입력하세요" required></textarea>
            <button type="submit">글 작성</button>
        </form>

        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { fetchCategories, createPost } from '@/api';

export default {
    name: 'PostCreate',
    data() {
        return {
            title: '',
            content: '',
            selectedCategory: null,
            categories: [],
            errorMessage: '',
        };
    },
    async created() {
        try {
            const categories = await fetchCategories();
            this.categories = categories;
        } catch (error) {
            console.error('카테고리 목록을 불러오는 중 오류가 발생했습니다:', error);
        }
    },
    methods: {
        async createPost() {
            try {
                const postData = {
                    title: this.title,
                    content: this.content,
                    category_id: this.selectedCategory,
                };

                const response = await createPost(postData);
                this.$router.push('/'); // 홈 페이지로 리디렉션
            } catch (error) {
                this.errorMessage = '글 작성 중 오류가 발생했습니다.';
            }
        },
    },
};
</script>

<style scoped>
/* 기본 스타일 */
.create-post {
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
}

button:hover {
    background-color: #d5bdaf;
}

.error {
    color: red;
    margin-top: 10px;
}
</style>
