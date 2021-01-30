import Vue from 'vue'
import VueRouter from 'vue-router'

// 为了首屏加载快，所以首页不使用懒加载
import Main from '@/views/main'
const Home = () => import('@/views/home')
const CompanyList = () => import('@/views/companyList')
// const CompanyDetail = () => import('@/views/companyDetail')
const Dept = () => import('@/views/dept')
const Industry = () => import('@/views/industry')
const Enterprise = () => import('@/views/enterprise')
const Detail = () => import('@/views/detail')
const Map = () => import('@/views/map')

const originalPush = VueRouter.prototype.push

// 处理路由跳转会报错的问题
VueRouter.prototype.push = function push(...rest) {
  return originalPush.apply(this, rest).catch(err => err)
}

Vue.use(VueRouter)

const routes = []

routes.push(
  ...[
    {
      path: '/',
      name: 'main',
      component: Main,
      meta: { title: '企涌钱塘', keepAlive: true }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: { title: '平台街道', keepAlive: true, isBack: false }
    },
    {
      path: '/dept',
      name: 'dept',
      component: Dept,
      meta: { title: '平台街道', keepAlive: true, isBack: false }
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail,
      meta: { title: '企业详情' }
    },
    {
      path: '/industry',
      name: 'industry',
      component: Industry,
      meta: { title: '行业列表', keepAlive: true, isBack: false }
    },
    {
      path: '/companyList',
      name: 'companyList',
      component: CompanyList,
      meta: { title: '平台街道', keepAlive: true, isBack: false }
    },
    {
      path: '/map',
      name: 'map',
      component: Map,
      meta: { title: '按地图查看', keepAlive: true }
    },
    {
      path: '/enterprise',
      name: 'enterprise',
      component: Enterprise,
      meta: { title: '企业列表', keepAlive: true, isBack: false }
    }
  ]
)

const router = new VueRouter({
  routes,
  // 页面滚动行为
  scrollBehavior(/* to, from, savedPosition */) {
    return {
      x: 0,
      y: 0
    }
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
