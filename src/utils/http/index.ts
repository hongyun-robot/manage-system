import Request from './request'
import { RequestConfig } from './types'

const request = new Request({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 1000 * 60 * 5,
  interceptors: {
    requestInterceptors: config => {
      console.log('实例请求拦截器')
      return config
    },
    responseInterceptors: result => {
      console.log('实例响应拦截器')
      return result
    },
  },
})

interface requestConfig<T> extends RequestConfig {
  data?: T
}

interface Response<T> {
  code: number
  message: string
  data: T
}

const http = <D, T = any>(config: requestConfig<D>) => {
  const { method = 'GET' } = config
  if (method === 'get' || method === 'GET') {
    config.params = config.data
  }
  return request.request<Response<T>>(config)
}

export const get = <D, T = any>(url: string, params?: D, config?: requestConfig<D>) => {
  const temp: requestConfig<D> = {
    ...config,
    url,
    method: 'get',
    data: params
  }
  return http<D, T>(temp)
}

export const post = <D, T = any>(url: string, params?: D, config?: requestConfig<D>) => {
  const temp: requestConfig<D> = {
    ...config,
    url,
    method: 'POST',
    data: params,
  }
  return http<D, T>(temp)
}

export const del = <D, T = any>(url: string, params?: D, config?: requestConfig<D>) => {
  const temp: requestConfig<D> = {
    ...config,
    url,
    method: 'DELETE',
    params,
  }
  return http<D, T>(temp)
}

export const put = <D, T = any>(url: string, params?: D, config?: requestConfig<D>) => {
  const temp: requestConfig<D> = {
    ...config,
    url,
    method: 'PUT',
    data: params,
  }
  return http<D, T>(temp)
}

// 取消指定 url 请求
export const cancelRequest = (url: string | string[]) => {
  return request.cancelRequest(url)
}

// 取消全部请求
export const cancelAllRequest = () => {
  return request.cancelAllRequest()
}

export default http
