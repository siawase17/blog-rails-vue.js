<template>
    <div class="login">
        <h1>로그인</h1>
        <form @submit.prevent="login">
            <div>
                <label for="email">Email</label>
                <input type="email" id="email" v-model="email" required />
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password" required />
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginUser } from '@/api';

export default {
    name: 'Login',
    setup() {
        const email = ref('');
        const password = ref('');
        const errorMessage = ref('');
        const router = useRouter();

        const login = async () => {
            try {
                const token = await loginUser(email.value, password.value); 
                localStorage.setItem('authToken', token);
                router.push('/'); 
            } catch (error) {
                errorMessage.value = '로그인 실패: ' + error.message;
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
.login {
    max-width: 600px;
    margin: 50px auto;
    padding: 50px;
    border: 1px solid #edede9;
    border-radius: 15px;
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
    margin-top: 20px;
    padding: 10px;
    background-color: #d6ccc2;
    color: white;
    border: none;
    border-radius: 5px;
}

button:hover {
    background-color: #d5bdaf;
}

.error-message {
    color: red;
    font-size: 14px;
    margin-top: 10px;
}
</style>