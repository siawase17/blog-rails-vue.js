import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import PostDetail from '../views/PostDetail.vue';
import PostCreate from '../views/PostCreate.vue';
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
