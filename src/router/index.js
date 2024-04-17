import { createRouter, createWebHistory } from 'vue-router'
import {  isAuth, isLoggedIn } from '@/composables/auth';

import Home from '@/components/home/index.vue'
import Signin from '@/components/user/signin.vue'
import NotFound from '@/components/404.vue';
import article from '@/components/home/article.vue';

import Dashboard from '@/components/user/dashboard/index.vue';
import DashboardMain from '@/components/user/dashboard/main.vue';
import UserProfile from '@/components/user/dashboard/pages/user_profile.vue';
import AdminArticles from '@/components/user/dashboard/admin/articles.vue';
import AdminAddArticle from '@/components/user/dashboard/admin/add.vue';
import AdminEditArticle from '@/components/user/dashboard/admin/edit.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', name: 'home', component: Home},
    {path: '/article/:id', name: 'article', component: article},
    {path: '/signin', name: 'signin', component: Signin, beforeEnter:isLoggedIn},
    {path: '/user/dashboard', component: Dashboard, beforeEnter:isLoggedIn, children:[
      {path: '', name: 'dashboard', component: DashboardMain},
      {path: 'profile', name: 'user_profile', component: UserProfile},
      {path: 'articles', name: 'admin_articles', component: AdminArticles},
      {path: 'articles/add', name: 'add_articles', component: AdminAddArticle},
      {path: 'articles/edit/:id', name: 'edit_articles', component: AdminEditArticle}
    ]},
    {path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound}
  ]
})

export default router
