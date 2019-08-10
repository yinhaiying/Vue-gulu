# Vue-gulu
这是一个Vue造轮子项目

### 使用本框架前，请在CSS中开启border-box

```
box-sizing:border-box;
```

### 项目运行
```
parcel index.html --no-cache
```

### 发布版本
```
npx parcel build index.js --no-minify --no-cache
npm publish
```

### 常见错误处理

碰到一些人为不可能的错误，就记住去删除缓存，删除dist文件
```
rm -rf .cache dist

```
