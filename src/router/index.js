import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import home from '../views/Home.vue'
import welcome from '../views/pages/welcome/welcome.vue'
import users from "../views/pages/users/users.vue"
import roles from "../views/pages/access/roles.vue"
import rights from "../views/pages/access/rights.vue"
import goods from '../views/pages/goods/goods.vue'
import add from "../views/pages/goods/add/add.vue"
import categories from "../views/pages/goods/categories.vue"
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
  redirect:{
    name:"welcome"
  },
  children: [

  {
    path: "welcome",
    name: 'welcome',
    component: welcome
  }, {
    path: "users",
    name: 'users',
    component: users
  }, {
    path: "rights",
    name: 'rights',
    component: rights
  }, {
    path: "roles",
    name: "roles",
    component: roles
  },
  {
    path: "goods",
    name: "goods",
    component: goods,
 
  },
  {
    path: "add",
    name: "add",
    component: add
  },
  {
    path: "categories",
    name: "categories",
    component: categories
  }
  ]

}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
