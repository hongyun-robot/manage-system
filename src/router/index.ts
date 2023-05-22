import type { menuData } from '@/api/types'
import upperFirst from 'lodash/upperFirst'
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import { useMenuStore } from '@/store/menu'
import NotComponents from '@/views/Abnormal/NotComponents.vue'
import Layout from '../views/layout/Layout.vue'

// const path = require('path')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    name: 'Layout',
    children: [
      // {
      //   path: '/article/add',
      //   component: () => import('@/views/article/add/ArticleAdd.vue'),
      // },
      // {
      //   path: '/article/list',
      //   component: () => import('@/views/article/list/ArticleList.vue'),
      // },
      // {
      //   path: '/menu',
      //   component: () => import('@/views/systemConfig/manager.vue'),
      // },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/Abnormal/404.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

router.beforeEach(async (to, from, next) => {
  const menuStore = useMenuStore()
  const { asyncRouterMark } = menuStore
  // 首次登录路由生成
  if (!asyncRouterMark) {
    const { getMenuData, setAsyncRouterMark } = menuStore
    await getMenuData()
    const module = import.meta.glob('@/views/**/*.vue', { eager: true })
    const routerData = asyncRouter(menuStore.data, module)
    routerData.forEach(item => {
      router.addRoute('Layout', item)
    })
    setAsyncRouterMark(true)
    next({ path: to.path, query: to.query, params: to.params })
  } else {
    next()
  }
})

// 生成路由
function asyncRouter(data: menuData[], fileModule: Record<string, any>): RouteRecordRaw[] {
  const routerData: RouteRecordRaw[] = []
  data.forEach(item => {
    if (!item.children || item.children.length <= 0) {
      const address = item.url.split('/').slice(1)
      const fileName = address.reduce((pre, item) => `${pre}${upperFirst(item)}`, '') + '.vue'
      const filePath = `/src/views${item.url}/${fileName}`

      const module = fileModule[filePath]?.default
      routerData.push({
        path: item.url,
        name: fileName,
        component: module || NotComponents,
      })
    } else {
      routerData.push(...asyncRouter(item.children, fileModule))
    }
  })
  return routerData
}

export default router
