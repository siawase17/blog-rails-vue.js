<template>
    <div class="container">
        <CategoryList :categories="categories" :selectedCategoryId="selectedCategoryId" @category-selected="updateCategory" />
        <PostList :selectedCategoryId="selectedCategoryId" />
    </div>
</template>

<script>
import PostList from '@/components/PostList.vue';
import CategoryList from '@/components/CategoryList.vue';
import { fetchCategories } from '@/api';

export default {
    name: 'Home',
    components: {
        PostList,
        CategoryList
    },
    data() {
        return {
            categories: [],
            selectedCategoryId: null,
        };
    },
    async created() {
        try {
            const categories = await fetchCategories();
            this.categories = categories;
        } catch (error) {
            console.error('카테고리 목록을 가져오는 중에 오류가 발생했습니다:', error);
        }
    },
    methods: {
        updateCategory(id) {
            this.selectedCategoryId = id;
        }
    }
};
</script>

<style scoped>
.container {
    display: flex;
    width: 100%;
    height: 100%;
    gap: 30px;
}

.category-list {
    flex: 1;
}

.post-list {
    flex: 4;
}
</style>
