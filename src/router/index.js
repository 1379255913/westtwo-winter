import {createRouter, createWebHashHistory} from "vue-router";


import Login from "@/components/Login.vue";
import Search from "@/components/SearchMusic.vue"

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

export default router
