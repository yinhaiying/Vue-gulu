## Vue-Press 实现官网的制作



#### 使用ClientOnly解决build报错的问题

在进行build的时候，出现浏览器访问限制的报错。可以通过使用`ClientOnly`进行包裹。
`button.md`
```
<ClientOnly>
  <button-demo></button-demo>
</ClientOnly>
```

#### 部署
1. 在 docs/.vuepress/config.js 中设置正确的 base.
```
base:'/Vue-gulu/',
```
2. 在你的项目中，创建一个如下的 `deploy.sh` 文件（请自行判断去掉高亮行的注释）
3. 在命令行中运行`deploy.sh`
```
./deploy.sh
```
