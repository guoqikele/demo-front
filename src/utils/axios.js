import axios from 'axios'
import { Loading, Message } from 'element-ui'
import router from '../router/index.js'

let loading

function startLoading () {
  loading = Loading.service({
    lock: true,
    text: '加载中....',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

function endLoading () {
  loading.close()
}

// 请求拦截
axios.interceptors.request.use(
  (confing) => {
    startLoading()
    // 登录不走
    var url = confing.url
    if (url.endsWith('/sys/user/login')) {
      return confing
    }
    // 设置请求头
    confing.headers.common = {
      'authorization': sessionStorage.getItem('access-token') ? sessionStorage.getItem('access-token') : router.push({ path: '/login' }),
      'sessionId': sessionStorage.getItem('sessionId') ? sessionStorage.getItem('sessionId') : router.push({ path: '/login' })
    }
    return confing
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截

axios.interceptors.response.use(
  (response) => {
    endLoading()
    return response
  },
  (error) => {
    Message.error(error.response.data)
    endLoading()

    // 获取状态码
    const { status } = error.response

    if (status === 401) {
      Message.error('请重新登录')
      // 清除token
      localStorage.removeItem('eToken')
      // 跳转到登录页面
      router.push('/login')
    }
    return Promise.reject(error)
  }
)
export default axios
