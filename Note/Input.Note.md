## Input

#### 用例分析：

Input使用场景：
- 输入
- 赋值粘贴
- 键盘tab空位
- 敲击回车
- 不可输入
- 校验
- 输入提示
- 清空

状态：
normal
disabled
readonly
hover
focus
error
success

一共有`noraml`,`disabled`,`readonly`,`hover`,`focus`五种常见状态。这五种常见状态又可以和`error`和`success`结合,所以一共由于十五种状态。

#### Input的常见事件
通常情况下，应当处理`input`事件,`change`事件,`focus`事件,`blur`事件。


#### 如何测试input的change等事件。

我们需要对`input`的`change`等事件进行测试。也就是说我们需要监听`change`的回调函数
被执行了。也就是说，我们需要知道如何手动使用js触发`change`事件，并能够传递参数。
```
    it('支持change事件',() => {
      vm = new Constructor({}).$mount();
      const callback = sinon.fake();
      // 监听事件
      vm.$on('change', callback);
      // 触发事件
      let event = new Event('change');
      let inputElement = vm.$el.querySelector('input');
      inputElement.dispatchEvent(event);
      // 断言
      expect(callback).to.have.been.calledWith(event);
    })
```
通过使用测试用例来驱动开发，之哟啊测试用例通过了，说明开发没有问题。
这就是典型的`TDD`。

#### 双向绑定的实现
双向绑定的实现就是：
1. 接收一个value属性。(属性名必须是`value`)
2. 触发一个`input`事件(事件名称必须是`input`)，同时让value的值等于`$event.target.value`
(事件的第一个参数必须是`$event.target.value`)。
```
    <input type="text" 
        :value = "value" 
        @input = "$emit('input',$event.target.value)">
```
#### 兼容双向绑定测试用例的修改
之前我们进行测试时，传入的都是参数是`event`,如下：
```
expect(callback).to.have.been.calledWith(event.target.value);
```
但是，现在的话由于我们需要监听input传进来的值，也就是说我们需要监听`event.target.value`。
但是由于我们是通过js创建的`event`对象，它实际上没有`target`属性，因此我们需要给`event`对象
添加`target`属性。
```
          vm = new Constructor({}).$mount();
          const callback = sinon.fake();
          // 监听事件
          vm.$on('input', callback);
          // 触发事件
          let inputElement = vm.$el.querySelector('input');
          let event = new Event('input');
          // 添加value属性
          Object.defineProperty(
            event,'target',{
                value:{value:'hello'},
                enumerable:true
            }
        )
        inputElement.dispatchEvent(event);
        // 断言
        expect(callback).to.have.been.calledWith('hello');
```
