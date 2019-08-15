## Grid 栅格

#### 用例分析

想象一下用户会如何使用栅格系统:
- g-row
- g-column
- span
- gutter
```
<g-row gutter = "12">
  <g-col span = "12"></g-col>
  <g-col span = "12"></g-col>
</g-row>
<g-row gutter = "12">
  <g-col span = "8"></g-col>
  <g-col span = "8"></g-col>
  <g-col span = "8"></g-col>
</g-row>
<g-row gutter = "12">
  <g-col span = "6"></g-col>
  <g-col span = "6"></g-col>
  <g-col span = "6"></g-col>
  <g-col span = "6"></g-col>
</g-row>
<g-row gutter = "12">
  <g-col span = "2"></g-col>
  <g-col span = "22"></g-col>
</g-row>
```
#### 网格宽度的划分

由于是进行24部分进行划分，因此用户可以设置1至24之间的任何值，也就是说我们需要给出1至24之间的任何值对应的宽度。如下所示：样式的设置通过属性值`.col[data-span = "1"]`来进行设置。
```
      .col[data-span = "1"]{
        width:4.166666%;
      }
      .col[data-span = "2"]{
        width:8.333333%;
      }
      .col[data-span = "3"]{
        width:12.500000%;
      }
      .col[data-span = "4"]{
        width:16.666667%;
      }
      .col[data-span = "5"]{
        width:20.833333%;
      }
      .col[data-span = "22"]{
        width:91.666667%;
      }
```
我们需要进行24等分划分，也就是说需要重复计算并写24次，这实在是太麻烦啦。而且完全没有必要。
因此，我们考虑使用`sass`来实现。
给每一个`col`元素添加`col-${i}`等属性
```
  @for $index from 1 to 24 {
      &-#{$index}{
        width:($index / 24) * 100%;
      }
  }
```

#### offset偏移的实现
通过设置`margin-left`来控制偏移。偏移的长度通过`offset`来控制。
```
<div class = "col" :class = "[`col-${span}`,offset && `offset-${offset}`]" >
    <slot></slot>
</div>

@for $n from 1 to 24 {
    &.offset-#{$n}{
      margin-left:($n / 24) * 100%;
    }
}
```

#### column之间的gutter间距的设置

由于我们在设置`offset`时已经设置了`margin`,因此，当我们再次通过`margin`设置间距时，
两个`margin`之间会出现问题。因此，这里我们考虑通过`padding`来进行设置。
`col.vue`
```
.col{
  padding:0 10px;
}
```
但是给每一个`column`设置`padding`,会导致第一个左边和最后一个右边也存在一个`padding`,
使得整个盒子的宽度始终小于页面2个`padding`的宽度，这里需要进行解决。
`row.vue`
```
.row{
  display:flex;
  margin:0 -10px;
}
```
但是我们需要根据row中传递过来得gutter来动态设置`margin`和`padding`。
这里我们需要考虑如何将`row`中的值传递给`col`组件。这里我们通过`$children`
来进行传值。获取到每一个子元素，然后给每一个子元素绑定要传递的`gutter`值。
`.row.vue`
```
    mounted(){
      this.$children.forEach((vm) => {
        // 获取每一个子元素，然后给子元素绑定gutter
        vm.gutter = this.gutter;
      })
    }
```
不明白为什么一定要在data中接收这个值。如果在`props`中接收或者不接受就会报错。
`col.vue`
```
    data(){
      return {
         gutter:0
      }
    }
```

最后分别给`.row`和`.col`中动态设置`margin`和`padding`
`row.vue `
```
<div class = "row" :style = "{'marginLeft':`-${gutter/2}px`,'marginRight':`-${gutter/2}px`}">
```
`col.vue`
```
<div class = "col" :style = "{paddingLeft:`${gutter/2}px`,paddingRight:`${gutter/2}px`}">
```

#### 代码重构
代码重构是对代码进行一些局部的优化，而不是完全重写。重构的原则是针对：
1. 一些重复的代码

对于重复的代码最好将其抽离出来，哪怕只有一行代码，这样的话在下次进行修改时就能够避免只修改某几个地方，
而忽略了替他地方，从而留下bug。

2. 难以让人看懂的代码
  有些代码可能是逻辑比较复杂，而有些代码则是让人读起来不太方便。这样的代码也尽量进行重构。比如：
```
<div class = "row" :style = "{'marginLeft':`-${gutter/2}px`,'marginRight':`-${gutter/2}px`}">
```
上面的`:style`看起来就非常长，而且如果有更多的属性就显得不太好读。因此，我们可以考虑对其进行修改。
我们通过使用`data`中来保存这个变量。
```
    data(){
      return {
        rowStyle:{
          marginLeft:-this.gutter/2 + 'px',
          marginRight:-this.gutter/2 + 'px'
        }
      }
    },
```
但是，这里会带来新的问题，也就是这里的`roleStyle`依赖于`gutter`属性。在`Vue`如果一个属性依赖于其他属性，
那么其他属性发生变化了，这个属性不会自动变化。如果想让其进行变化，需要使用`computed`。
```
    computed:{
      rowStyle(){
        return {
          marginLeft:-this.gutter/2 + 'px',
          marginRight:-this.gutter/2 + 'px'
        }
      }
    },

```

再比如`col.vue`中的这一段代码,下面的class也可以进行优化
```
  <div class = "col" :class = "[`col-${span}`,offset && `offset-${offset}`]" :style = "colStyle">
```
同样在`computed`中对其进行抽离
```
    computed:{
      colClasses(){
        return [`col-${this.span}`,this.offset && `offset-${this.offset}`]
      },
    }

```
