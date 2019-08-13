## Toast

#### 需求分析

1. 弹出toast,然后自动关闭，关闭延迟时间的设置
2. 弹出toast，点击后关闭，可能存在回调
3. 保证只有一个toast,如果允许多个toast,则必须出现在同一位置。

#### 使用方式

参考其他的UI组件，用户是如何使用Toast。
```
  created(){
    this.$toast('这是一条展示信息');
  }
```
通常来说我们一般会在一个方法中或者其他任意需要调用的地方通过`this.$toast`在各个组件中直接使用。
最简单的实现方法是直接将其加在Vue的原型身上。
```
import 'Vue' from 'vue'
Vue.prototype.$toast = function(message){
  console.log(message)
}
```
但是直接在原型上写`$toast`存在一定的问题，比如:
1. 用户可能无意间自己在原型上定义了`$toast`，这样的话就会改写我们的设计。这有可能带来麻烦。
2. 我们在挂载原型时，先通过了`import`引入了`Vue`，但是用户可能会引入不同版本的Vue。这可能带来冲突。
因此，最好的方法是通过`plugin`来实现。
```
export default {
  install(vue,options){
    Vue.prototype.$toast = function(){
      console.log('我是一个toast插件')
    }
  }
}

```
使用`plulgin`解决了这两方面问题：
1. 用户想要使用插件，必须通过`Vue.use()`来注册，也就是说他自己会判断需不需要使用这个组件。
如果他不想在原型上挂载`$toast`，那么他可以选择不注册即可。
2. 我们并没有直接引入`Vue`,我们的`Vue`来自于用户自己引入的`Vue`，不会存在问题。

