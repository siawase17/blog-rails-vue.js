import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import PostDetail from '../views/PostDetail.vue';
import PostCreate from '../views/PostCreate.vue';
import PostEdit from '../views/PostEdit.vue'; // 새로운 컴포넌트 임포트
import Login from '@/views/Login.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/post/:id',
    name: 'PostDetail',
    component: PostDetail,
    props: true,
  },
  {
    path: '/post/edit/:id',
    name: 'PostEdit',
    component: PostEdit
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/create',
    name: 'PostCreate',
    component: PostCreate,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
