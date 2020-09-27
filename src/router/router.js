import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/Home.vue')
        },
        // {
        //     path: '/task',
        //     name: 'taskList',
        //     component: () => import('../views/TaskList.vue')
        // },
        {
            path: '/task/page/:id',
            name: 'taskList',
            component: () => import('../views/TaskList.vue')
        },
        {
            path: '/task/:id',
            name: 'taskEdit',
            component: () => import('../views/Task.vue')
        }
    ]
})
