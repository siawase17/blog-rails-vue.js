import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // 토큰을 헤더에 포함
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
        const response = await api.post('/login', { email, password }); // 서버로 로그인 요청
        return response.data.token;
    } catch (error) {
        console.error('로그인 실패:', error);
        throw new Error('로그인 실패');
    }
};