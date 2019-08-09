#造轮子

## Button

####  实现简单的`button`组件
使用`Vue.component`来实现一个简单的全局`button`组件
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

3. Vue的组件单元测试
在vue中不必为了可测性在组件中做任何特殊的操作，导出原始设置就可以了：
```
// 导入 Vue.js 和组件，进行测试
import Vue from 'vue'
import MyComponent from 'path/to/MyComponent.vue'
```

如果我们要测试一个组件，那么我们需要通过js动态生成一个组件，
然后再去测试这个组件的输入和输出，而一个组价的输入和输出很多时候取决于`props`。

**编写可被测试的组件**
通过`import`导入的测试组件实际上是一个含有`Vue`各种属性的对象，
通过`Vue.extend(MyComponent)`能够得到一个构造器。
通过构造器进行实例化,动态生成一个组件，并将其挂载到DOM上或者内存中。
```
  const constructor = Vue.extend(Button);
  const button = new constructor({
    propsData:{
      icon:'settings`'
    }
  });
  button.$mount('#test');
```
`propsData`用于传递`props`中的值。

接下来对组价中的各种属性进行测试，通过`button.$el`可以获取到当前挂载的组件。
然后可以以类似于操作DOM的元素进行获取测试目标。
```
  let useElement = button.$el.querySelector('use');
  expect(useElement.getAttribute('xlink:href')).to.eq('#i-settings')
```
实现一个完整的测试用例：
```
// iconPosition的值 影响order的值 右侧order 2
{
  //想要获取属性，必须把它挂载到页面的元素身上
  const div = document.createElement('div');
  document.body.appendChild(div)
  const constructor = Vue.extend(Button);
  const vm = new constructor({
    propsData:{
      icon:'settings',
      loading:true,
      iconPosition:"right"
    }
  });
  vm.$mount(div);
  let svg = vm.$el.querySelector('svg');
  let {order} = window.getComputedStyle(svg);
  expect(order).to.eq('2');
  vm.$el.remove();
  vm.$destroy();
}
```
**编写点击事件的测试用例**
如下所示：通过使用chai断言来实现单元测试，希望得到的期望是被监听的函数执行了。
而不是函数中的内容是否正确。
```
{
  const constructor = Vue.extend(Button);
  const vm = new constructor({
    propsData:{
      icon:'settings',
    }
  });
  vm.$mount();
  vm.$on('click',function(){
    console.log('1')
  })
  //希望监听的这个函数被执行。而不是函数执行中的内容是正确的。
  //哪怕它是错误的，但是它也被执行了，说明click事件被处罚了。
  //这就表示测试通过了。
  let button = vm.$el;
  button.click();
}
```
因此我们希望能够实现判断监听函数是否执行。这需要使用到`chai-spies`来实现。
```
import spies from 'chai-spies'
chai.use(spies);
{
  const constructor = Vue.extend(Button);
  const vm = new constructor({
    propsData:{
      icon:'settings',
    }
  });
  vm.$mount();
  // spy间谍函数把原来要监听的函数替代了。
  const spy = chai.spy(function(){});
  vm.$on('click',spy)
  let button = vm.$el;
  button.click();
  //这个spy函数是否被调用可以被监控到
  //把原来不能监控的函数替代成了可以被监控的spy函数。
  expect(spy).to.have.been.called();
}
```

## 自动化测试

### 需求分析

到目前为止，我们已经实现了通过`chai`来对代码进行单元测试。但是在测试过程中，我们每写
一个测试用例，就需要手动刷新浏览器，而且还需要手动打开浏览器。当我们有非常多的测试用例的
时候，这样操作起来就比较麻烦，我们能不能实现一种能够自动帮助我们打开浏览器，自动刷新，
自动进行测试的功能。这就是**自动化测试**。

### 使用 Karma + Mocha做单元测试
- Karma（[ˈkɑrmə] 卡玛）是一个测试运行器，它可以呼起浏览器，加载测试脚本，然后运行测试用例
  通俗地认为Karma是一个可以帮你打开浏览器的工具。
- Mocha（[ˈmoʊkə] 摩卡）是一个单元测试框架/库，它可以用来写测试用例
- Sinon（西农）是一个 spy / stub / mock 库，用以辅助测试（使用后才能理解）

### 步骤
1. 安装各种工具
```
npm i -D karma karma-chrome-launcher karma-mocha karma-sinon-chai mocha sinon sinon-chai karma-chai karma-chai-spies
```
2. 创建`karma.conf.js`文件
```
module.exports = function (config) {
  config.set({

      // base path that will be used to resolve all patterns (eg. files, exclude)
      basePath: '',
         // frameworks to use
         // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
         frameworks: ['mocha', 'sinon-chai'],
         client: {
             chai: {
                 includeStack: true
             }
         },


         // list of files / patterns to load in the browser
         files: [
             'dist/**/*.test.js',
             'dist/**/*.test.css'
         ],


         // list of files / patterns to exclude
         exclude: [],


         // preprocess matching files before serving them to the browser
         // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
         preprocessors: {},


         // test results reporter to use
         // possible values: 'dots', 'progress'
         // available reporters: https://npmjs.org/browse/keyword/karma-reporter
         reporters: ['progress'],


         // web server port
         port: 9876,


         // enable / disable colors in the output (reporters and logs)
         colors: true,


         // level of logging
         // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
         logLevel: config.LOG_INFO,


         // enable / disable watching file and executing tests whenever any file changes
         autoWatch: true,


         // start these browsers
         // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
         browsers: ['ChromeHeadless'],


         // Continuous Integration mode
         // if true, Karma captures browsers, runs the tests and exits
         singleRun: false,

         // Concurrency level
         // how many browser should be started simultaneous
         concurrency: Infinity
     })
 }

```
3. 新建`test/button.test.js`用来存放`button`的测试用例
```
const expect = chai.expect;
 import Vue from 'vue'
 import Button from '../src/button'

 Vue.config.productionTip = false
 Vue.config.devtools = false

 describe('Button', () => {
     it('存在.', () => {
         expect(Button).to.be.ok
     })
     it('可以设置icon.', () => {
         const Constructor = Vue.extend(Button)
         const vm = new Constructor({
         propsData: {
             icon: 'settings'
         }
         }).$mount()
         const useElement = vm.$el.querySelector('use')
         expect(useElement.getAttribute('xlink:href')).to.equal('#i-settings')
         vm.$destroy()
     })
     it('可以设置loading.', () => {
         const Constructor = Vue.extend(Button)
         const vm = new Constructor({
         propsData: {
             icon: 'settings',
             loading: true
         }
         }).$mount()
         const useElements = vm.$el.querySelectorAll('use')
         expect(useElements.length).to.equal(1)
         expect(useElements[0].getAttribute('xlink:href')).to.equal('#i-loading')
         vm.$destroy()
     })
     it('icon 默认的 order 是 1', () => {
         const div = document.createElement('div')
         document.body.appendChild(div)
         const Constructor = Vue.extend(Button)
         const vm = new Constructor({
         propsData: {
             icon: 'settings',
         }
         }).$mount(div)
         const icon = vm.$el.querySelector('svg')
         expect(getComputedStyle(icon).order).to.eq('1')
         vm.$el.remove()
         vm.$destroy()
     })
     it('设置 iconPosition 可以改变 order', () => {
         const div = document.createElement('div')
         document.body.appendChild(div)
         const Constructor = Vue.extend(Button)
         const vm = new Constructor({
         propsData: {
             icon: 'settings',
             iconPosition: 'right'
         }
         }).$mount(div)
         const icon = vm.$el.querySelector('svg')
         expect(getComputedStyle(icon).order).to.eq('2')
         vm.$el.remove()
         vm.$destroy()
     })
     it('点击 button 触发 click 事件', () => {
         const Constructor = Vue.extend(Button)
         const vm = new Constructor({
         propsData: {
             icon: 'settings',
         }
         }).$mount()

         const callback = sinon.fake();
         vm.$on('click', callback)
         vm.$el.click()
         expect(callback).to.have.been.called

     })
 })
```

4. 创建测试脚本
在 package.json 里面找到 scripts 并改写 scripts
```
 "scripts": {
     "dev-test": "parcel watch test/* --no-cache & karma start",
     "test": "parcel build test/* --no-cache --no-minify && karma start --single-run"
 },
```
`parcel build test/*`:表示`parcel`会运行`build`下面的`test`目录下的所有一级文件。
`--no-cache`:表示不要缓存
`--no-minify`:不要进行压缩，这里压缩容易出现问题。
`parcel build test/* --no-cache --no-minify`：实现的功能就是把test目录下的测试文件
打包到dist下面。比如`test/button.test.js`就会被打包成`dist/button.test/js`。之所以
需要进行打包是因为我们在`test/button.test.js`文件中使用了`import`等浏览器无法识别的语法。
比如`import Vue`打包后就会变成把Vue的源代码拷贝进来，然后将`Vue`当成一个变量使用。

`karma start`:启动`karma`。通过`karma.conf.js`配置文件
`--single-run`:只运行一次。



5. 运行测试脚本
`npm run test`: 一次性运行。
在运行的过程中，会帮助我们打包js,打开浏览器，输入网址，运行测试用例，关闭浏览器，将浏览器的错误信息展示出来。
