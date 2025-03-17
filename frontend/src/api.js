import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// 게시글 목록을 가져오는 함수
export const fetchPosts = async () => {
    try {
        const response = await api.get('/posts');
        return response.data;
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
};

// 게시글 상세 정보를 가져오는 함수
export const fetchPostDetail = async (id) => {
    try {
        const response = await api.get(`/posts/${id}`);
        return response.data;
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await api.post('/login', { email, password });
        return response.data.token;
    } catch (error) {
        console.error('로그인 실패:', error);
        throw new Error('로그인 실패');
    }
};