// 上面这个代码处理过度动画（默认加上不用管）
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('sidenav-pinned')
    document.body.classList.add('ready')
  }, 200)
})

// 每个页面都会导入该js 统一的设置写这里即可


function tip(ts) {
  const myToast = new bootstrap.Toast(document.querySelector("#myToast"),{
    dalay:1000
  })
  document.querySelector("#myToast .toast-body").innerHTML = msg
  myToast.show()
}


// 配置ajax基地址
axios.defaults.baseURL = 'http://ajax-api.itheima.net'