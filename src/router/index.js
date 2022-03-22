import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import home from '../views/Home.vue'
import welcome from '../views/pages/welcome/welcome.vue'
Vue.use(VueRouter)

const routes = [{
  path: '',
  redirect: { name: 'login' }
},
{
  path: '/login',
  name: 'login',
  component: login
},
{
  path: "/home",
  name: 'home',
  component: home,

  children: [
    {
      path: "welcome",
      name: 'welcome',
      component: welcome
    },
  ]

}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
