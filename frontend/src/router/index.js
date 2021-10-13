import { createRouter, createWebHashHistory } from 'vue-router'

import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Home from '../views/Home.vue'
import Settings from '../views/Settings.vue'
import OnePost from '../views/OnePost.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/Settings',
    name: 'Settings',
    component: Settings
  },
    
  {
    path: '/OnePost/:id',
    name: 'OnePost',
    component: OnePost
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
