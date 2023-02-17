import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from "@/store/user.js";
import qs from 'qs'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  timeout: 15000,
  responseType: 'json',
  headers: { 'content-type': 'application/json' },
})

api.interceptors.request.use(
  request => {
    /**
     * 全局拦截请求发送前提交的参数
     * 以下代码为示例，在请求头里带上 token 信息
     */
    // 是否将 POST 请求参数进行字符串化处理
    const userStore = useUserStore()
    if (userStore.token !== '') {
      request.headers['Authorization'] = userStore.token
    }
    if (request.method === 'post'||request.method === 'put'||request.method === 'delete') {
      // console.log(request.data)
      // if (request.data&&!(request.data instanceof FormData)) {
      //   request.data=qs.stringify(request.data)
      // }
      // request.data = qs.stringify(request.data, {
      //     arrayFormat: 'brackets'
      // })
    }
    return request
  }
)

api.interceptors.response.use(
  response => {
    /**
     * 全局拦截请求发送后返回的数据，如果数据有报错则在这做全局的错误提示
     * 假设返回数据格式为：{ code: 200, message: '', data: '' }
     * 规则是当 code 为 200 时表示请求成功，否则会展示错误的message
     */
    console.log(response.data.type)
    if (response.data.code === 200 || response.data.type === 'audio/mpeg') {
      // 请求成功并且没有报错
      return Promise.resolve(response)
    } else {
        // 这里做错误提示
      ElMessage.error(response.data.message)
      return Promise.reject(response)
    }
  },
  error => {
    let message = error.message
    if (message === 'Network Error') {
      message = '后端网络故障'
    } else if (message.includes('timeout')) {
      message = '接口请求超时'
    } else if (message.includes('Request failed with status code')) {
      message = '接口' + message.substr(message.length - 3) + '异常'
    }
    ElMessage({
      message,
      type: 'error'
    })
    return Promise.reject(error)
  }
)

export default api
