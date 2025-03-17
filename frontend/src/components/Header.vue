<script setup>
import { ref, onMounted, watch } from 'vue';
import Button from './Button.vue';

// token을 ref로 관리
const token = ref(localStorage.getItem('authToken'));

// 토큰 상태에 따라 로컬스토리지를 업데이트
const updateToken = () => {
    token.value = localStorage.getItem('authToken'); // 토큰 값 갱신
};

// 로그아웃 처리
const logout = () => {
    const confirmLogout = window.confirm('ログアウトしますか？');
    if (confirmLogout) {
        localStorage.removeItem('authToken'); // 로그아웃 시 로컬스토리지에서 토큰 삭제
        token.value = null; // Vue 상태에서 토큰 비우기
    }
};

// 컴포넌트가 처음 마운트될 때 token 업데이트
onMounted(() => {
    updateToken();
});

// token 상태 변화를 감지하여 UI 업데이트
watch(token, (newToken) => {
    if (!newToken) {
        // 토큰이 null이면 로그인 버튼 표시
        console.log('로그아웃 상태');
    } else {
        // 토큰이 있으면 로그아웃 버튼 표시
        console.log('로그인 상태');
    }
});

// 로컬스토리지가 변경될 때 자동으로 상태 업데이트
window.addEventListener('storage', updateToken);
</script>

<template>
    <header>
        <div class="logo-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                class="bi bi-arrow-through-heart-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                    d="M2.854 15.854A.5.5 0 0 1 2 15.5V14H.5a.5.5 0 0 1-.354-.854l1.5-1.5A.5.5 0 0 1 2 11.5h1.793l3.103-3.104a.5.5 0 1 1 .708.708L4.5 12.207V14a.5.5 0 0 1-.146.354zM16 3.5a.5.5 0 0 1-.854.354L14 2.707l-1.006 1.006c.236.248.44.531.6.845.562 1.096.585 2.517-.213 4.092-.793 1.563-2.395 3.288-5.105 5.08L8 13.912l-.276-.182A24 24 0 0 1 5.8 12.323L8.31 9.81a1.5 1.5 0 0 0-2.122-2.122L3.657 10.22a9 9 0 0 1-1.039-1.57c-.798-1.576-.775-2.997-.213-4.093C3.426 2.565 6.18 1.809 8 3.233c1.25-.98 2.944-.928 4.212-.152L13.292 2 12.147.854A.5.5 0 0 1 12.5 0h3a.5.5 0 0 1 .5.5z" />
            </svg>
        </div>

        <div class="auth-buttons">
            <Button v-if="!token" label="Login" to="/login" />
            <Button v-if="token" label="Logout" @click="logout" />
        </div>
    </header>
</template>

<style scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #edede9;
    padding: 10px 20px;
    color: white;
}

.logo-container {
    display: flex;
    align-items: center;
    color: #d5bdaf
}

.auth-buttons {
    display: flex;
    gap: 10px;
}
</style>
