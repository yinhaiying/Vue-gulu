# Vue-gulu

## 介绍

这是学习Vue的过程中做的一个框架，希望能够进一步提高自己的编码能力。

## 开始使用

1. Css样式设置
  使用本框架前，请在Css中开启`border-box`
  ```
  *{box-sizing:border-box;}
  *::before{box-sizing:border-box}
  *::after{box-sizing:border-box}
  ```

  你还需要设置默认颜色样式(后续会使用Scss变量替换)

  ```
      :root{
        --button-height: 32px;
        --font-size: 14px;
        --button-bg: white;
        --button-active-bg: #eee;
        --border-radius: 4px;
        --color: #333;
        --border-color: #999;
        --border-color-hover: #666;
      }
  ```

2. 安装
```
npm i -S vue-gulu-test-v1
```
3. 引入
```
import {Button,ButtonGroup,Icon} from 'vue-gulu-test-v1'
import 'vue-gulu-test-v1/dist/index.css
```
4. 引入`svg,symbols`
```
<script src="//at.alicdn.com/t/font_967315_mfplf9jexca.js"></script>
```

## 文档


## 提问

## 变更记录
