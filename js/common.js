// 上面这个代码处理过度动画（默认加上不用管）
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('sidenav-pinned')
    document.body.classList.add('ready')
  }, 200)
})


// 每个页面都会导入该js 统一的设置写这里即可
/**
 * 作用：在当前页面出现一个提示消息 过一会自己就会消失
 * 用户体验更好的alert 
 * @param {提示的文本} msg 
 */

function tip(msg) {
  // new bootstrap.Toast(toastEl, option) 
  const myToast = new bootstrap.Toast(document.querySelector("#myToast"), {
    delay:1000
  })
  document.querySelector("#myToast .toast-body").innerHTML = msg
  myToast.show()//显示
}

// 配置ajax基地址
axios.defaults.baseURL = 'http://ajax-api.itheima.net'


// 把用户名字从本地存储拿出来,然后渲染到页面中(index.html,student.html) 
const usernameSelector = document.querySelector(".mb-0.font-weight-bold")
// console.log(usernameSelector);
if (usernameSelector) {//有二个页面是没有这个东西,register.html,login.html 
  usernameSelector.innerHTML = localStorage.getItem('username')
}


// 退出功能 因为有二个页面有这个功能
const logoutBtn = document.querySelector('#logout')
if (logoutBtn) {
  logoutBtn.onclick = function () { 
    localStorage.removeItem('username')
    localStorage.removeItem('token')
    location.href = './login.html'
  }
}


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  config.headers.Authorization = localStorage.getItem('token')
  // 在发送请求之前做些什么
  return config;//什么也没有做 原样返回
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // console.log(response);
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data 
}, function (error) {
  console.dir(error)
  //防止token过了有效期 直接让用户重新登录
  if (error.response.status === 401) {
    //说明token是过期了
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    location.href = './login.html'
  }
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});