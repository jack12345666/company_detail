import axios from 'axios'
import { getCookieToken } from './utils'
import { BASEURL } from './config'
import { Toast } from 'vant'

const errorHandle = status => {
  // 判断状态码
  switch (status) {
    case 500:
      Toast('找不到此服务，可能是在路上~')
      break
    case 503:
      Toast('服务器开小差了~请稍后')
      break
    default:
      Toast('网络错误')
  }

  return { data: '' }
}

// 新建了一个 axios 实例
const request = axios.create({
  baseURL: BASEURL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  withCredentials: true
})

request.interceptors.request.use(
  config => {
    if (config.url !== '/companyHome/searchCompanys') {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner'
      })
    }
    config.headers['Authorization'] = encodeURIComponent(getCookieToken())
    return config
  },
  // 请求错误
  error => {
    Promise.reject(error)
  }
)

// 处理响应数据
request.interceptors.response.use(
  // 请求成功
  res => {
    Toast.clear()
    if (res.data.code === '0') {
      return res.data
    } else if (res.data && res.data.code !== '0') {
      Toast(res.data.desc)
    }

    return Promise.resolve(res.data)
  },
  err => {
    Toast.clear()
    const { response } = err
    if (response) {
      errorHandle(response.status, response.data)
      return Promise.reject(response.data)
    }
    return { data: '' }
  }
)

export default request
