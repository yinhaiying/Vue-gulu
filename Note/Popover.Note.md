## Popover

### 需求分析
1. 触发方式(trigger)：hover激活,click激活,focus激活等。
2. 弹窗框的显示位置：最重要的不是弹窗的显示和隐藏。而是显示位置的确定。 在不同浏览器下，显示位置差别等。
3. 弹窗里面内容的嵌套。怎么把内容展示出来。

### 使用方式
先分析一下,popover到底实现了什么?简单的来说，它不就是实现了这样一个功能：点击一个按钮，弹出一个div。
我们可以直接通过下面的简单代码显示:
```
<div v-if = "show" class = "popover">展示内容</div>
<button @click = "show = true">点击</button> 
```
然后通过class来控制展示内容的显示位置。也就是说，实际上popover实现的功能只是：
1. 不需要写class,帮助用户定义好了位置。
2. 不需要写click事件。

也就是我们需要实现的是这样：
```
<div>展示内容</div>
<button>点击</button>
```
那么如何让展示内容和点击关联起来了。
```
<g-popover>
    <div>展示内容</div>
    <button>点击</button>
</g-popover>
```






