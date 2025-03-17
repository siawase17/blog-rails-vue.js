<template>
    <div class="search-bar">
        <input
            type="text"
            v-model="searchQuery"
            placeholder="검색어를 입력하세요"
            @input="emitSearch"
            @keypress.enter="emitSearch"
        />
    </div>
</template>

<script>
export default {
    name: 'SearchBar',
    data() {
        return {
            searchQuery: ''
        };
    },
    methods: {
        emitSearch() {
            this.$emit('search', this.searchQuery.trim());
        }
    }
};
</script>

<style scoped>
.search-bar {
    margin-bottom: 20px;
}

input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
}
</style>
