#造轮子

## Button

1. 使用`Vue.component`来实现一个简单的全局`button`组件
```
Vue.component('g-button', {
  template:`<button>Hi</button>`
})
```
在`index.html`中使用这个组件
```
  <div id="app">
    {{msg}}
    <g-button></g-button>
  </div>
```
通过`Css`变量来设置样式
```
    :root{
      --button-height:32px;
      --font-size:14px;
      --button-bg:white;
      --button-active-bg:#eee;
      --border-radius:4px;
      --color:#333;
      --border-color:#999;
      --border-color-hover:#666;
    }
```
2. 引入`parcel`
目前我们已经实现了一个简单的`button`组件，但是我们可以发现我们的js在`button.js`中，我们的css在`index.html`
,我们的html结构在`button.js`的`template`中。行为结构样式不是跟vue组件一样在一个单独的`.vue`中，想要实现这种
效果，我们需要引入打包工具，因此我们需要使用`parcel`或者`webpack`进行打包。
