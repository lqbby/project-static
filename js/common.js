// 上面这个代码处理过度动画（默认加上不用管）
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('sidenav-pinned')
    document.body.classList.add('ready')
  }, 200)
})

// 每个页面都会导入该js 统一的设置写这里即可
function tip(msg) {
  const myToast = new bootstrap.Toast(document.querySelector('#myToast'), {
    delay: 1000,
  })
  document.querySelector('#myToast').innerHTML = msg
  myToast.show()
}
// 配置xiaos基德值
axios.defaults.baseURL = 'http://ajax-api.itheima.net'
const usernameSelector = document.querySelector('.mb-0.font-weight-bold')
const usernameSelector1 = document.querySelector('.mb-0.text-white')
if (usernameSelector) {
  usernameSelector.innerHTML = localStorage.getItem('username')
  usernameSelector1.innerHTML = localStorage.getItem('username')
}
const logout = document.querySelector('#logout')
if (logout) {
  logout.onclick = function () {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    location.href = './login.html'
  }
}

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    config.headers.Authorization = localStorage.getItem('token')
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
