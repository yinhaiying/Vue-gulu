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