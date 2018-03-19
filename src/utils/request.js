import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
// import store from '../store'
// import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(response => {
  if (response.data.items !== undefined) {
    let count = 1
    for (let i = 0; i < response.data.items.length; i++) {
      response.data.items[i].serial = count + ''
      count++
    }
  }

  if (response.data) {
    return response.data
  } else {
    return response
  }
},
error => {
  console.log('err' + error)// for debug
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
})

export default service
