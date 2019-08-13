<template>
  <div class = "toast">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name:'Gulu-toast'
}

</script>

<style lang = "scss" scoped>
$height: 40px;
$font-size:14px;
$toast-bg:rgba(0,0,0,0.75);
.toast{
  position:fixed;
  top:0;
  left:50%;
  transform:translateX(-50%);
  font-size:$font-size;
  line-height:1.8;
  height:$height;
  display:flex;
  align-items:center;
  background:$toast-bg;
  box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.50);
  color:#fff;
  padding:0 16px;
}
</style>
