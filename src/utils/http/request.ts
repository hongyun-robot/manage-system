import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import type { RequestConfig, RequestInterceptors } from './types'

class Request {
  // 实例
  instance: AxiosInstance
  // 拦截器对象
  interceptorsObj?: RequestInterceptors
  // 存放取消请求控制器列表
  abortControllerMap: Map<string, AbortController>

  constructor(config: RequestConfig) {
    this.instance = axios.create(config)
    this.abortControllerMap = new Map()
    this.interceptorsObj = config.interceptors

    // 请求拦截器
    this.instance.interceptors.request.use(
      (res: InternalAxiosRequestConfig) => {
        const controller = new AbortController()
        const url = res.url || ''
        res.signal = controller.signal
        this.abortControllerMap.set(url, controller)
        return res
      },
      (err: any) => err
    )

    this.instance.interceptors.request.use(
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.requestInterceptorsCatch
    )
    this.instance.interceptors.response.use(
      this.interceptorsObj?.responseInterceptors,
      this.interceptorsObj?.responseInterceptorsCatch
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        const url = res.config.url || ''
        this.abortControllerMap.delete(url)
        return res.data
      },
      (err: any) => err
    )
  }

  request<T>(config: RequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config as any)
      }
      this.instance
        .request<any, T>(config)
        .then(res => {
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors<T>(res)
          }

          resolve(res)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  }

  // 取消全部请求
  cancelAllRequest() {
    for (const [, controller] of this.abortControllerMap) {
      controller.abort()
    }
    this.abortControllerMap.clear()
  }

  // 取消单个请求
  cancelRequest(url: string | string[]) {
    const urlList = Array.isArray(url) ? url : [url]
    for (const _url of urlList) {
      this.abortControllerMap.get(_url)?.abort()
      this.abortControllerMap.delete(_url)
    }
  }
}

export default Request
