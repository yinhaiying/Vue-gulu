#造轮子

## Button

####  使用`Vue.component`来实现一个简单的全局`button`组件
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
####  引入`parcel`
目前我们已经实现了一个简单的`button`组件，但是我们可以发现我们的js在`button.js`中，我们的css在`index.html`
,我们的html结构在`button.js`的`template`中。行为结构样式不是跟vue组件一样在一个单独的`.vue`中，想要实现这种
效果，我们需要引入打包工具，因此我们需要使用`parcel`或者`webpack`进行打包。
```
# 安装
npm i -D parcel-bundle

# 使用
parcel index.html
```
在使用`parcel`的过程中，出现报错，Vue使用的版本不对，解决办法是在`package.json`添加如下代码：
```
  "alias": {
    "vue" : "./node_modules/vue/dist/vue.common.js"
  }
```
再次启动parcel时，最好带上`--no-cache`清除缓存
```
parcel index.html --no-cache

```
通过`parcel`打包我们就实现了一个单文件组件`Button`，

#### 添加icon

1. icon和文字对齐的问题



2. icon位置的问题：
通过使用一个属性`icon-position`来控制左右，然后通过`icon-right`类来控制左右位置。
通过使用`flex`布局中的`order`可以控制元素的位置。
`html`
```
  <button class = "g-button" :class = "{[`icon-${iconPosition}`]:true}">
      <svg v-if = "icon" class="icon" >
        <use :xlink:href="`#i-${icon}`"></use>
      </svg>
      <div class = "content">
        <slot></slot>
      </div>
  </button>
```
`css`
```
    > .content{
      order:2;
    }
    > .icon{
      order:1;

    }

    &.icon-right{
      > .content{
        order:1;
      }
      > .icon{
        order:2;
      }
    }
```

3. 解决多个按钮不对齐的问题
通常只要是内联元素不对齐(设置了inline导致的)，只要加上`vertical-align`样式即可。
`vertical-align`的值只要不是默认值即可。
```
vertical-align:top;
```

4. 控制`iconPosition`的值只能输入`left`和`right`。
对用户输入进来的其他值进行校验。
```
    iconPosition:{
      type:String,
      default:'left',
      validator(value){
        if(value !== 'left' && value !== 'right'){
           return false;
        }else{
          return true;
        }
      }
    }
```

#### 实现icon的封装

当我们在实现`button`按钮的时候，我们使用了`icon`，当用户只是使用`icon`时，
他会写跟`button`中的`icon`一样重复的代码,因此，我们最好将`icon`封装好，直接
给用户使用，同时在`button`中使用封装好的组件。
`icon.vue`
```
<template>
    <svg v-if = "name" class="g-icon" >
      <use :xlink:href="`#i-${name}`"></use>
    </svg>
</template>
```

#### 添加loading效果
通过css的自定义动画来实现loading效果
`.button.vue`
```
    @keyframes spin{
      0%{
        transform:rotate(0deg);
      }
      100%{
        transform:rotate(360deg);
      }
    }
```
调用
```
<g-icon class = "loading" name = "loading" v-if = "icon"></g-icon>
.loading{
  animation:spin 1s infinite linear;
}
```

#### button-group组件的实现
1. `button-group`组件的实现思路
`button-group.vue`
```
<template>
  <div class = "g-button-group">
    <slot></slot>
  </div>
</template>

<style lang = "scss">
.g-button-group{
  display:inline-flex;
  > .g-button{
    border-radius:0;
    &:not(:first-child){
      margin-left:-1px;
    }
    &:first-child{
      border-top-left-radius:var(--border-radius);
      border-bottom-left-radius:var(--border-radius);
    }
    &:last-child{
      border-top-right-radius:var(--border-radius);
      border-bottom-right-radius:var(--border-radius);
    }
    &:hover{
      position:relative;
      z-index:1;
    }
  }
}
</style>
```

`button-group`的使用
```
    <g-button-group>
      <g-button icon = "left" >
          上一页
      </g-button>
      <g-button icon = "right" icon-position = "right" >
          下一页
      </g-button>
    </g-button-group>
```

2. `g-button-group`组件的子元素只能是`g-button`的实现思路。

首先考虑`this.$children`，发现它获取的都是Vue组件。因此我们查看`this.$el.children`
发现`this.$el`得到的是当前组件的结构。因此通过判断当前组件的子节点名称是不是`g-button`
`button-group.vue`
```
  mounted(){
    for(let node of this.$el.children){
      let name = node.nodeName.toLowerCase();
       if(name !== 'button'){
         console.warn(`g-button-group的子元素必须全是button,当前g-button-group中包含${name}`)
       }
    }
  }
```

#### 单元测试

1. BDD,TDD,Assert名词解释
BDD(Behavior Driven Development):行为驱动开发。感觉更多的是满足用户需求，用户有某个需求，就必须实现这个需求。

TDD(est-Driven Development):测试驱动开发。类似于满足测试通过即可。

Assert：断言。表示我主观认为
console.assert():用来实现简单的断言
```
console.assert(1 > 0) // 如果为真没有反应，如果为假就报错。
```
2. chai断言

哪些需要进行单元测试？
一般主要是看你有几个输入参数和各种事件。
```
  props:{
    icon:{},
    loading:{
      type:Boolean,
      default:false
    },
    iconPosition:{
      type:String,
      default:'left',
      validator(value){
        return (value === 'left' || value === 'right')
      }
    }
  }
```
比如上面的props中，有`icon`,`loading`和`iconPostion`三个属性。
因此至少需要三个测试用例。
然后在`button`中,还存在着`click`事件，需要对`click`进行单元测试。
```
  <button  @click = "$emit('click')">
   ...
  </button>
```

