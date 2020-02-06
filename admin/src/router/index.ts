import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
// import CourseList from '../views/courses/CourseList.vue'
// import CourseEdit from '../views/courses/CourseEdit.vue'
import CourseCrud from '../views/courses/CourseCrud.vue'


Vue.use(VueRouter)

// 为routes添加类型提示
const routes: RouteConfig[] = [
  {
    path: '/',
    component: Main,
    // children子路由
    children: [
      { name: 'home', path: '/', component: Home },
      { name: 'courses-crud', path: '/courses/list', component: CourseCrud },
      // { name: 'courses-list', path: '/courses/list', component: CourseList },
      // // 接受参数路由,并将页面获取到的id参数传递给组件
      // { name: 'courses-edit', path: '/courses/edit/:id', component: CourseEdit, props: true },
      // { name: 'courses-create', path: '/courses/create', component: CourseEdit }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
