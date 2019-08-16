## Layout 组件

#### 需求分析：

参考其他UI库，观察它们是如何使用Layout布局的。然后设计自己的组织方式。
```
   <g-layout>
     <g-header></g-header>
     <g-content></g-content>
     <g-footer></g-footer>
   </g-layout>

```
然后添加新的特征：
1. content区域占满整个屏幕除去`header`,`footer`等区域的内容。
```
.content{
  flex-grow:1;
}
```

2. 如何实现`layout`中有`sider`和`content`时进行左右布局。
解决思路是：当发现`layout`下面出现`sider`,那么就改变`layout`的`flex-direction`为`row`。
想要判断子组件中是否有`sider`,需要给`sider`组件进行命名
`layout.vue`
```
  mounted(){
    // 根据子组件的名字，判断子组件中是都存在sider
    this.$children.forEach((vm) => {
      if(vm.$options.name === 'GuluSider'){
        this.layoutClass.hasSider = true;
      }
    })
  }
```
3. 如何实现`sider`在外边的结构。如下：
```
   <g-layout style = "height:100vh">
     <g-sider>sider</g-sider>
     <g-layout>
        <g-header class = "demo">header</g-header>
        <g-content class = "demo">content</g-content>
        <g-footer class = "demo">footer</g-footer>
     </g-layout>
   </g-layout>
```
这种结构会带来一个新的问题，那就是右侧`layout`没有充满右侧区域。
这时候我们可以给layout增加一个新的样式，让它作为子元素时也能够充满。
```
.layout{
  border:2px solid #000;
  display:flex;
  flex-grow:1; // layout本身作为子元素充满屏幕
  flex-direction:column;
    &.hasSider{
    flex-direction:row;
  }
}


```
