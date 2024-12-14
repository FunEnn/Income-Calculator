import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Income1 from '../components/Income1/Income1.vue'
import Income2 from '../components/Income2/Income2.vue'
import Income3 from '../components/Income3/Income3.vue'

const routes = [{
  path: '/',
  name: 'Income1',
  component: Income1
},
{
  path: '/Income2',
  name: 'Income2',
  component: Income2
},
{
  path: '/Income3',
  name: 'Income3',
  component: Income3
},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router