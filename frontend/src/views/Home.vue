<template>
    <div class="container">
        <CategoryList :categories="categories" :selectedCategoryId="selectedCategoryId"
            @category-selected="updateCategory" />
        <div class="right">
            <SearchBar @search="updateSearchQuery" />
            <PostList :selectedCategoryId="selectedCategoryId" :searchQuery="searchQuery" />
        </div>
    </div>
</template>

<script>
import PostList from '@/components/PostList.vue';
import CategoryList from '@/components/CategoryList.vue';
import SearchBar from '@/components/SearchBar.vue';
import { fetchCategories } from '@/api';

export default {
    name: 'Home',
    components: {
        PostList,
        CategoryList,
        SearchBar
    },
    data() {
        return {
            categories: [],
            selectedCategoryId: null,
            searchQuery: ''
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
        },
        updateSearchQuery(query) {
            this.searchQuery = query;
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

.right {
    flex: 4;
}

@media (max-width: 768px) {
    .container {
        flex-direction: column;
    }
}
</style>
