import {createRouter, createWebHashHistory} from "vue-router";


import Login from "@/components/Login.vue";
import Search from "@/components/SearchMusic.vue"
import {ElMessage} from "element-plus";

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/search',
    component: Search
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    // 登录或者注册才可以往下进行
    next();
  } else {
    // 获取 token
    const token = JSON.parse(localStorage.getItem('user')).token;
    // token 不存在
    if (token === null || token === '') {
      ElMessage.error('您还没有登录，请先登录');
      next('/login');
    } else {
      next();
    }
  }
});

export default router
