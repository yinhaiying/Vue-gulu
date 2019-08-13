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
Vue.prototype.$toast = function(message){
  console.log(message)
}
```
