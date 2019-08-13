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
      alert('我是一个toast插件')
    }
  }
}

```
使用`plulgin`解决了这两方面问题：
1. 用户想要使用插件，必须通过`Vue.use()`来注册，也就是说他自己会判断需不需要使用这个组件。
如果他不想在原型上挂载`$toast`，那么他可以选择不注册即可。
2. 我们并没有直接引入`Vue`,我们的`Vue`来自于用户自己引入的`Vue`，不会存在问题。

#### 初步实现
目前的话，我们能够听过alert弹出一条信息。然而浏览器自带的alert样式非常丑，而且没办法控制
其位置。通常来说我们可以通过自定义一个`div`来实现类似于`alert`的效果，如下：
```
    Vue.prototype.$toast = function(message){
      let oDiv = document.createElement('div');
      oDiv.innerText = message;
      document.body.appendChild(oDiv)
    }
```
但是，在Vue中去操作DOM是非常不推荐的做法。我们最好使用Vue的方法来写。

##### 使用Vue.extend(component)动态创建组件

之前在进行单元测试的时候，我们经常使用`Vue.extend(Button)`来动态地创建组件。
因此，这里我们要动态地创建一个`toast`。我们可以先在`toast.vue`中加入插槽，
插槽是为了让我们能够把内容填充进去。
```
  <div class = "toast">
    <slot></slot>
  </div>
```
然后通过`Vue.extend(Toast)`动态地创建一个`toast`，并将其添加到`body`中。
```
  install(Vue,options){
    Vue.prototype.$toast = function(message){
      // 生成一个toast组件，然后放到body中
      const Constructor = Vue.extend(Toast);
      let toast = new Constructor();
      toast.$slots.default = [message];
      toast.$mount(); //必须使用$mount()进行挂载，否则所有的生命周期的函数都不会执行
      document.body.appendChild(toast.$el)
    }
  }
```

#### 让Toast持续几秒后关闭
1. 传入`autoClose`和`autoCloseDelay`参数控制关闭和持续时间
```
  props:{
    autoClose:{
      type:Boolean,
      default:true
    },
    autoCloseDelay:{
      type:Number,
      default:3
    }
  }

```
2. 通过`setTimeout`来控制n秒后关闭。
```
  mounted(){
    if(this.autoClose){
      setTimeout(() => {
        this.close();
      },this.autoCloseDelay * 1000)
    }
  }
 ```
 3. 通过`this.$el.remove()`方法移除组件中的元素，通过` this.$destroy()`移除元素身上绑定的事件等。实现组件的销毁。
```
  methods:{
    // 移除组件
    close(){
      this.$el.remove(); //把元素从body中移出
      this.$destroy();// 把元素身上绑定的所有事件等移除。
    }
  }
```


#### 添加可关闭按钮

我们先观察其他组件，比如element-ui对可关闭的使用。

```
  this.$message({
    showClose: true,
    message: '恭喜你，这是一条成功消息',
    type: 'success'
  });
```

从上面我们可以知道，用户传入一个`showClose`来控制是否需要关闭。这里我们同样传入一个`closeButton`
对象来控制是否显示，以及显示后执行一些操作。

```
    this.$toast('这是一条展示这是一条展示这是一条展示这是一条展示',{
      closeButton:{
        text:'这是一个关闭吗',
        callback:function(toast){
          //获取到组件可以进行一些操作
        }
      }
    })
```
1. 首先我们需要在`plugin.js`中修改创建实例时接收的参数,通过`propsData`来接收传递过来的值。
```
  let toast = new Constructor({
    propsData:{
      closeButton:toastOptions.closeButton
    }
  });

```

2. 通过判断你是否传入`closeButton`来显示关闭按钮。
```
  <span  v-if = "closeButton" @click = "onClickClose">{{closeButton.text}}</span>
```

3. 用户手动关闭`toast`,为了避免用户不传callback或者传的不是一个函数，最好进行一下判断。
这里我们还可以向`callback`传递`this`,使得`callback`中可以操作组件。
```
    onClickClose(){
      this.close();
      if(this.closeButton && this.closeButton.callback && typeof this.closeButton.callback === 'function'){
        this.closeButton.callback(this);
      }
    }
```

#### 进一步优化
1. 目前我们使用的高度是固定的，当文字特别多的时候，就容易出现问题。因此，高度不能写死，选择最小高度即可。
```
.toast{
  min-height:$toast-min-height;
}

```
2. 父元素设置`min-height`，那么子元素的`height:100%`就不生效了。
解决办法：通过js来控制这个高度。
```
    this.$nextTick(() => {
      this.$refs.line.style.height = this.$refs.toast.getBoundingClientRect().height + 'px';
    })
```

#### 实现展示位置的设置
1. 使用时通过传递`position`参数来设置`toast`显示位置。
```
    this.$toast('这是一条展示一条展示这是一条展示',{
      position:'middle',
      closeButton:{
        text:'关闭',
        callback:function(toast){
        }
      }
    })
```
2. 修改`plugin.js`接收`position`参数
```
  let toast = new Constructor({
    propsData:{
      closeButton:toastOptions.closeButton,
      position:toastOptions.position
    }
  });
```
3. 通过`computed`来控制类。
```
  <div class = "toast" ref = "toast" :class = "toastClasses">
  computed: {
    toastClasses(){
      console.log(this.position)
      return {
        [`position-${this.position}`]:true
      }
    }
  },
```
4. `position-top`样式的设置
```
  &.position-top{
    top:0;
    transform:translateX(-50%);
  }
  &.position-bottom{
    bottom:0;
    transform:translateX(-50%);
  }
  &.position-middle{
    top:50%;
    transform:translate(-50%);
  }
```


#### 实现只能出现一个toast
目前我们已经能够实现创建一个功能较为完善的`toast`，但是当我们反复点击时，会不断地创建`toast`。
这是不符合逻辑的,当我们多次点击时只应该出现一个`toast`。

**解决思路**：每次创建一个新的`toast`的时候，我们就干掉前一个`toast`实例。

1. 将之前的创建`toast`过程封装为一个函数。创建函数可以方便返回一个`toast`。
```
function createToast({Vue,message,propsData}){
  // 生成一个toast组件，然后放到body中
  const Constructor = Vue.extend(Toast);
  let toast = new Constructor({propsData});
  toast.$slots.default = [message];
  toast.$mount(); //必须使用$mount()进行挂载，否则所有的生命周期的函数都不会执行
  document.body.appendChild(toast.$el);
  return toast
}
```
2. 通过定义一个变量`currentToast`来接收当前`toast`，然后判断当前`toast`是否有值。
如果有值，那么通过调用实例中的`close`方法，删除实例。
```
let currentToast ;
export default {
  install(Vue,options){
    Vue.prototype.$toast = function(message,toastOptions){
      if(currentToast){
        //实例创建完成以后在这里也可以调用toast实例中的方法。
        currentToast.close();
      }
      currentToast = createToast({Vue,message,propsData:toastOptions});
    }
  }
}

```
