<template>
  <button class = "g-button">按钮</button>
</template>


<script>
// Vue提供了语法糖，可以直接导出一个对象即可。
// Vue.component('g-button', {
//   template:`<button class = "g-button">按钮</button>`
// })
export default  {
  template:``
}
</script>

<style lang="scss">
   .g-button{
     font-size:var(--font-size);
     height:var(--button-height);
     padding:0 1em; /* 按钮最好不要把宽度写死。通过padding来控制就好*/
     border-radius:var(--border-radius);
     border:1px solid var(--border-color);
     background:var(--button-bg);
    &:hover{
      border-color:var(--border-color-hover)
    }
    &:active{
      background-color:var(--button-active-bg)
    }
    &:focus{
      outline:none;
    }
   }

</style>

