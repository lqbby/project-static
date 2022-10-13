# git命令文档
这三个命令只要电脑不重装系统，不用再设置了
git config --global user.name "用户名"
git config --global user.email "邮箱"
git config --global --list 

一个项目只要设置一次（上班的时候这个命令我们不用写）
git init --> 一个新的项目需要在刚开始的时候初始化一次 让这个项目被git管理

每天要用得上的命令

三个区:工作区 暂存区（索引区) 仓库

git add . 
git commit -m "提交说明"


查看状态 可以不用
git status 
红 东西在工作区
绿色 东西在暂存区
白色 干净了

版本：只要commit一次，仓库中就会多一个版本，我们可以实现版本的切换 （使用很少）
git log 查看有几个历史版本 
git reset --hard 版本号 切换版本
git reflog 看回收站中历史版本

分支相关的操作
1. git branch 查看有几个分支
2. git branch 分支名 创建分支
3. git checkout 分支名 切换分支
4. git checkout -b 分支名 创建并切换分支
5. git merge 分支名 当前分支没有，别的分支有，我们就可以去合并别的分支 一般是master合别的分支 （合并分支一般是主管做的）
注意事项：切换分支之前要确保当前工作区和仓库是同步（干净的） 



## 什么是git
git就是一个分布式的版本控制软件

1. 分布式：有很多节点  只要有一个节点存在 其他的节点坏了 也可以恢复（安全）
2. 不联网可以操作大部分的功能 联网可以同步代码到码云服务器

## git配置（新电脑第一次安装git需要配置一下账号和邮箱）
git config --global user.name "用户名"
git config --global user.email "邮箱"
git config --global --list 

## 三个区
- 工作区
- 暂存区
- 本地仓库 （本地就是自己电脑）

## git常见命令
- git init 初始化git仓库（一个项目只要做一次）
- git add .
- git commit -m "提交" (版本 只要提交了一次就会在本地仓库中多一个版本)
- git status (查看文件状态 到底是处于哪个区)
- 切换版本 git reset --hard 版本号
- 切到过去之后新的就没了，git reflog 可以看到回收站中的版本
- git log 查看版本

## 分支
我们以后上班的时候不可能在主分支master上写代码
产品经理/老板有一个需求就会在项目管理软件上指派给我们 我们就会根据这个需求创建一个对应的分支

安全 隔离

- git branch 
- git branch 分支名 
- git checkout 分支名
- git checkout -b 分支名
- git merge 分支名（必须记住）

## 分支冲突
原因：多个分支修改了同一个文件的同一个地方
冲突了git不能自动解决 只能程序员自己手动解决 二个人一起解决

