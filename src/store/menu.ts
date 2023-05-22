import { getAllMenuData } from '@/api'
import { menuData } from '@/api/types'
import { defineStore } from 'pinia'

interface State {
  // 菜单数据
  data: menuData[]
  // 是否已经加载动态路由 默认 false 没有
  asyncRouterMark: boolean
}

export const useMenuStore = defineStore('menu', {
  state: (): State => ({
    data: [],
    asyncRouterMark: false,
  }),

  actions: {
    async getMenuData() {
      const { data } = await getAllMenuData()
      this.data = data
    },
    setAsyncRouterMark(state: boolean) {
      this.asyncRouterMark = state
    },
  },
})
