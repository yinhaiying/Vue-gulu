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
这就是典型的`TDD`
