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

#### 响应式设计

如果我们希望在不同尺寸屏幕下展示不同的布局样式，那么就需要考虑响应式设计了。
响应式的设计思路是我们给不同的宽度设置不同的`span`和`offset`等。
比如在PC上，`span`是4,那么到了手机端，我们可以设计`span`是12。这样的话就能够实现
在不同宽度上有不同的表现。如下所示：我们通过默认的span表示pc端，通过`phone-span`来
表示手机端。
```
  <g-row>
    <g-col span = "4" offset = "1" phone-span = "12" phone-offset = "2"> </g-col>
  </g-row>

```
但是，上面的这种表示会带来一个问题，那就是如果有非常多的属性，比如除了`span`还有`offset`,`gutter`
等，每一种设备都需要重新写一遍。而且我们还需要针对每一种设备写一份Css样式。这样肯定是不合理的。
因此，我们可以考虑始终使用同样的`span`
```
<g-col span = "4" offset = "1" :phone = "{span:12,offset:2}"> </g-col>
```
然后给`col`组件添加`phone`属性
`col.vue`
```
    phone:{
      type:Object,
      validator(value){
        let valid = true;
        let keys = Object.keys(value);
        keys.forEach((item) => {
          if(!['span','offset'].includes(item)){
            valid = false;
          }
        })
        return valid;
      }
    }

```

然后通过媒体查询来设置`phone`

```
@media(max-width:576px){
  // 这里根据获取的phone来设置样式
}

```
从上面的分析可知，我们需要在css中根据获取的属性`phone`来设置css。
然后在css中是无法获取到js中的变量的。除非我们把css写到html标签中去。
但是在一个html标签中写很长的css是不合适的，通常的做法是通过一个class来
控制这些样式，然后再通过js来控制`class`。
`col.vue`

```

      colClasses(){
        const {span,offset,phone} = this;
        //添加一个phoneClass
        let phoneClass = [];
        if(phone){
          phoneClass = [`col-phone-${phone.span}`]
        }
        return [
          `col-${span}`,
          offset && `offset-${offset}`,
          ...phoneClass
          ]
      },

```
然后我们通过媒体查询来进行类的切换。这里切记手机的样式一定要写在下面。
因为手机的样式只有在满足屏幕尺寸的情况下才会出现。而之前的样式是在正常情况下展示。
当两种样式同时出现的时候，后面一种会覆盖前面的样式。这样的话展示的就是手机的样式了。
通过这种方式来实现响应式布局。
```
.col{
  height:100px;
  border:2px solid green;
  @for $index from 1 to 24 {
      &-#{$index}{
        width:($index / 24) * 100%;
      }
  }
  @for $n from 1 to 24 {
      &.offset-#{$n}{
        margin-left:($n / 24) * 100%;
      }
  }

  @media (max-width:1000px){
    $class-prefix:phone;
     @for $index from 1 to 24 {
      &-#{$class-prefix}-#{$index}{
        width:($index / 24) * 100%;
      }
     }
    $class-prefix:phone;
    @for $n from 1 to 24 {
        &.#{$class-prefix}-offset-#{$n}{
          margin-left:($n / 24) * 100%;
        }
    }
  }
}
```

接下来给不同尺寸的屏幕添加类和样式：
`colClasses`:
```
    colClasses(){
      const {span,offset,phone,ipad,narrowPc,pc,widePc} = this;
      return [
        `col-${span}`,
        offset && `offset-${offset}`,
        ...(phone && [`col-phone-${phone.span}`]),
        ...(ipad && [`col-ipad-${ipad.span}`]),
        ...(narrowPc && [`col-narrow-pc-${narrowPc.span}`]),
        ...(pc && [`col-pc-${pc.span}`]),
        ...(widePc && [`col-wide-pc-${widePc.span}`])
      ]
    },
```
对上面的代码进行优化：
```
      createClasses(obj,str = ""){
          if(!obj){
            return [];
          }
          // str的值是 ipad narrow-pc
           let arr = [];
           if(obj.span){
             arr.push(`col-${str}-${obj.span}`)
           }
           if(obj.offset){
             arr.push(`col-${str}-${obj.offset}`)
           }
           return arr;
      }
    }

```

#### 单元测试

栅格布局的单元测试和之前的UI组件的单元测试有所不同。
`Row`组件单元测试
1. 栅格布局中设计到两个组件，`Row`和`Col`，而且两个组件之间是相互依赖的。
因此进行单元测试时需要同时测试这两个组件。
```
     it('可以接收gutter', () => {
         const oDiv = document.createElement('div');
         document.body.appendChild(oDiv);
         const ColConstructor = Vue.extend(Col);
         const col = new ColConstructor({ })
         const RowConstructor = Vue.extend(Row)
         const row = new RowConstructor({
            propsData: {
                gutter: 20
            }
         })
         // 进行不下去了
         row.$destroy()
     })

```
2. 需要同时创建`Col`和`Row`的实例，而且需要将`Col`的实例作为`Row`的子元素。
而`Vue`中好像并没有提供绑定使用js绑定`children`的api。只提供了使用html进行设置
得到children。因此，我们需要考虑使用`html`的方式来进行单元测试。
```
     it('可以接收gutter', () => {
         const oDiv = document.createElement('div');
         document.body.appendChild(oDiv);
         Vue.component('g-row',Row);
         Vue.component('g-col',Col);
         oDiv.innerHTML = `
           <g-row gutter = '20' >
             <g-col></g-col>
           </g-row>
         `
         const vm = new Vue({
             el:oDiv
         })
         console.log(vm.$el.outerHTML);
     })

```
3. 通过使用`Vue.component`来注册组件，然后手动通过HTML来创建测试。但是我们会发现一个新的
问题，那就是`g-col`中的`padding`总是为0。这设计到父子组件的创建过程的先后问题。在Vue中父组件
和子组件的`mounted`事件都是异步的,也就是说我们此时通过`console.log`进行打印,`col`还没有挂载完成，
因此得到的`padding-left`始终为0。解决办法是使用异步的测试方法。ps:通常情况需要测试的值在出现在钩子
函数中,可能需要使用异步。如果是需要测试css,那么通常需要把它放到页面中，而不能只挂载到内存中。

```
     it('可以接收gutter', (done) => {
         const oDiv = document.createElement('div');
         document.body.appendChild(oDiv);
         Vue.component('g-row',Row);
         Vue.component('g-col',Col);
         oDiv.innerHTML = `
           <g-row gutter = '20' >
             <g-col></g-col>
           </g-row>
         `
         const vm = new Vue({
             el:oDiv
         })
         setTimeout(() => {
            console.log(vm.$el.outerHTML);
            done();
         },0)
     })

```
`Col`组件单元测试

```
     it('可以接收offset', () => {
      const oDiv = document.createElement('div');
      const Constructor = Vue.extend(Col);
      document.body.appendChild(oDiv);
      const vm = new Constructor({
        propsData:{
          offset:1
        }
      }).$mount(oDiv)
      console.log(vm.$el)
      expect(vm.$el.classList.contains('offset-1')).to.eq(true);
      vm.$el.remove();
      vm.$destroy();
     })

```
