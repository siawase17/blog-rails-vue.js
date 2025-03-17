<template>
    <div class="login">
        <h1>로그인</h1>
        <form @submit.prevent="login">
            <div>
                <label for="email">이메일</label>
                <input type="email" id="email" v-model="email" required />
            </div>
            <div>
                <label for="password">비밀번호</label>
                <input type="password" id="password" v-model="password" required />
            </div>
            <button type="submit">로그인</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginUser } from '@/api'; // 로그인 API 호출 함수

export default {
    name: 'Login',
    setup() {
        const email = ref('');
        const password = ref('');
        const errorMessage = ref('');
        const router = useRouter();

        const login = async () => {
            try {
                const token = await loginUser(email.value, password.value); // 로그인 시 API 호출
                localStorage.setItem('authToken', token); // 받은 토큰을 로컬 스토리지에 저장
                router.push('/'); // 홈 화면으로 리디렉션
            } catch (error) {
                errorMessage.value = '로그인 실패: ' + error.message; // 실패 시 에러 메시지 출력
            }
        };

        return {
            email,
            password,
            login,
            errorMessage,
        };
    },
};
</script>

<style scoped>
/* 로그인 폼 스타일 */
.login {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

input {
    width: 100%;
    padding: 8px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid #ccc;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
}

button:hover {
    background-color: #218838;
}

.error-message {
    color: red;
    font-size: 14px;
    margin-top: 10px;
}
</style>