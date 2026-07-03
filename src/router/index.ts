import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TradeView from '../views/TradeView.vue'
import LostFoundView from '../views/LostFoundView.vue'
import GroupBuyView from '../views/GroupBuyView.vue'
import ErrandView from '../views/ErrandView.vue'
import PublishView from '../views/PublishView.vue'
import MessageView from '../views/MessageView.vue'
import UserCenterView from '../views/UserCenterView.vue'
import { useUserStore } from '../stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: '首页' }
    },
    {
      path: '/trade',
      name: 'trade',
      component: TradeView,
      meta: { title: '二手交易' }
    },
    {
      path: '/trade/:id',
      name: 'detail',
      component: () => import('../views/DetailView.vue'),
      meta: { title: '商品详情' }
    },
    {
      path: '/lost-found',
      name: 'lostFound',
      component: LostFoundView,
      meta: { title: '失物招领' }
    },
    {
      path: '/group-buy',
      name: 'groupBuy',
      component: GroupBuyView,
      meta: { title: '拼单搭子' }
    },
    {
      path: '/errand',
      name: 'errand',
      component: ErrandView,
      meta: { title: '跑腿委托' }
    },
    {
      path: '/publish',
      name: 'publish',
      component: PublishView,
      meta: { title: '发布信息', requiresAuth: true }
    },
    {
      path: '/message',
      name: 'message',
      component: MessageView,
      meta: { title: '消息中心', requiresAuth: true }
    },
    {
      path: '/user',
      name: 'user',
      component: UserCenterView,
      meta: { title: '个人中心', requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { title: '登录', guest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: { title: '注册', guest: true }
    }
  ]
})

// 全局路由守卫
router.beforeEach((to, _from, next) => {
  const userStore = useUserStore()

  // 需要登录的页面
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next('/login?redirect=' + encodeURIComponent(to.path))
  }
  // 已登录用户访问登录/注册页 → 重定向到首页
  else if (to.meta.guest && userStore.isLoggedIn) {
    next('/')
  }
  else {
    next()
  }
})

export default router
