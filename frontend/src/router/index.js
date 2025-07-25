import { createRouter, createWebHistory } from 'vue-router'
import WantedList from '@/views/WantedList.vue';
import WantedDetail from '@/views/WantedDetail.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'wanted-list',
      component: WantedList,
    },
    {
      path: '/person/:id',
      name: 'PersonDetail',
      component: WantedDetail
    },

  ],
})

export default router
