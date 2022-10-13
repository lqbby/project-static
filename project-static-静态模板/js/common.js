// 上面这个代码处理过度动画（默认加上不用管）
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('sidenav-pinned')
    document.body.classList.add('ready')
  }, 200)
})

// 每个页面都会导入该js 统一的设置写这里即可
// 创建了toast轻提示 元素
const myToast = new bootstrap.Toast(document.querySelector('#myToast'), {
  delay: 2000
})
function tip (msg) {
  // 将传入的msg设置为弹框的内容
  document.querySelector('#myToast .toast-body').innerHTML = msg
  // 调用 显示
  myToast.show()
}

// ---------- axios基地址设置 ----------
axios.defaults.baseURL = 'http://ajax-api.itheima.net'

// ---------- 设置用户名 ----------
// 设置用户名
const username = localStorage.getItem('username')
// 判断 是否存在 span 存在 设置
const nameSpan = document.querySelector('#navbar-main .font-weight-bold')
// if (nameSpan) {
//   nameSpan.innerHTML = username
// }
// nameSpan存在 再去设置内容
nameSpan && (nameSpan.innerHTML = username)

// ---------- 用户登出 ----------
const logoutBtn = document.querySelector('#logout')
// 逻辑短路
/*
  true&&true--->true
  false&&... --->false
  表达式1&&表达式2 
    表达式1的值为fasle 2直接不解析
    表达式1的值为true 2才会解析
*/
logoutBtn &&
  (logoutBtn.onclick = function () {
    // 删除用户信息 token
    localStorage.removeItem('username')
    localStorage.removeItem('token')
    // 去登录页
    window.location.assign('./login.html')
  })

// ---------- 添加 axios 的请求拦截器 ----------
// 请求发送之前 执行的回调函数
// 添加请求拦截器
// interceptors 拦截器
// request 请求
axios.interceptors.request.use(
  // config 本次请求的配置信息
  function (config) {
    // 在请求拦截器中 携带token 页面中的请求不需要额外的写法
    // headers 获取请求头 可以额外的添加内容
    config.headers.authorization = localStorage.getItem('token')
    // return config的目的 是把修改完毕之后的配置 传递给axios 继续发请求
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// ---------- 响应拦截器 ----------
// 添加响应拦截器
// response 响应
axios.interceptors.response.use(
  function (response) {
    // response 就获取到的内容 多了一个 data
    // 数据 剥离 外部可以少点一次data
    return response.data
  },
  function (error) {
    // error 请求失败的原因
    // error.response.xxx 可以获取 和之前页面中的try-catch中的写法一样
    // console.dir(error)
    if (error.response.status === 401) {
      // 删除缓存的内容
      // 去登录
      // 删除用户信息 token
      localStorage.removeItem('username')
      localStorage.removeItem('token')
      window.location.assign('./login.html')
    }
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
