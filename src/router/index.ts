import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";


const routes: Array<RouteRecordRaw> = [
  {
    path: '/index', 
    name: 'Index', 
    component: () => import('@/views/index.vue')
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: '/index'
  }
];

const router = createRouter({
  history: createWebHistory('/openGuass-workflow-vue3-test/'),
  routes
});

export default router;