import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

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

// 게시글 작성 함수
export const createPost = async (postData) => {
    try {
        const response = await api.post('/posts', { post: postData });
        return response.data;
    } catch (error) {
        console.error('게시글 작성 중 오류가 발생했습니다:', error);
        throw error;
    }
};

// 게시글 수정 함수
export const updatePost = async (id, postData) => {
    try {
        const response = await api.patch(`/posts/${id}`, { post: postData });
        return response.data;
    } catch (error) {
        console.error('게시글 수정 중 오류가 발생했습니다:', error);
        throw error;
    }
};

// 게시글 삭제 함수
export const deletePost = async (id) => {
    try {
        const response = await api.delete(`/posts/${id}`);
        return response.data;
    } catch (error) {
        console.error('게시글 삭제 중 오류가 발생했습니다:', error);
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

export const fetchCategories = async () => {
    try {
        const response = await api.get('/categories');
        console.log(response.data)
        return response.data;
        
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
};