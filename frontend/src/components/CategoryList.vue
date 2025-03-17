<template>
    <div class="category-list">
        <p>Category List</p>
        <ul>
            <li v-for="category in categories" :key="category.id">
                <button
                    @click="selectCategory(category.id)"
                    :class="{ selected: category.id === selectedCategoryId }"
                >
                    {{ category.name }}
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'CategoryList',
    props: {
        categories: Array,
        selectedCategoryId: {
            type: [String, Number],
            default: null,
        },
    },
    methods: {
        selectCategory(id) {
            this.$emit('category-selected', id);
        }
    }
};
</script>

<style scoped>
p {
    font-size: 20px;
    border-bottom: 1px solid #cccccca9;
    padding-bottom: 10px;
}

.category-list ul {
    list-style-type: none;
    padding: 0;
}

.category-list li {
    margin-bottom: 10px;
}

button {
    background: none;
    border: none;
    background-color: rgb(235, 235, 235);
    padding: 8px 14px;
    border-radius: 15px;
}

button:hover {
    background-color: #d5bdaf;
}

button.selected {
    background-color: #d5bdaf;
}
</style>