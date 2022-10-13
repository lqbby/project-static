// 上面这个代码处理过度动画（默认加上不用管）
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('sidenav-pinned')
    document.body.classList.add('ready')
  }, 200)
})

// 每个页面都会导入该js 统一的设置写这里即可
function tip(msg){
  const myToast = new bootstrap.Toast(document.querySelector('#myToast'), {
    delay:1000,
  })
  document.querySelector('#myToast').innerHTML = msg
  myToast.show()
}
// 配置xiaos基德值
axios.defaults.baseURL = 'http://ajax-api.itheima.net'
const usernameSelector = document.querySelector('.mb-0.font-weight-bold')
const usernameSelector1 = document.querySelector('.mb-0.text-white')
if(usernameSelector){
  usernameSelector.innerHTML = localStorage.getItem('username')
  usernameSelector1.innerHTML = localStorage.getItem('username')
}
const logout = document.querySelector('#logout')
if(logout){
  logout.onclick = function(){
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    location.href = './login.html'
  }
}