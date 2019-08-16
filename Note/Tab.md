## 

#### 需求分析：
1. 切换Tab
2. icon
3. 方向控制
4. 右侧添加按钮
其实需求分析就是思考一下用户该如何使用你的代码：
```
    <g-tabs>
        <g-tabs-head>
            <g-tabs-item name = "tab1"></g-tabs-item>
            <g-tabs-item name = "tab2"></g-tabs-item>
        </g-tabs-head>
        <g-tabs-body>
            <g-tabs-pane name = "tab1"></g-tabs-pane>
            <g-tabs-pane name = "tab2"></g-tabs-pane>
        </g-tabs-body>
    </g-tabs>
```
先确定大致的代码书写，然后再逐渐往上添加功能。