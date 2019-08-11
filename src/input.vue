<!--  -->
<template>
<div class = "wrapper">
    <input type="text" v-model = "value">
</div>

</template>

<script>
export default {
  name:'g-input',
  props:{
    value:{
      type:String
    }

  },
  data () {
    return {
    };
  }
}

</script>
<style lang='scss' scoped>
$height:32px;
$border-color:#999;
$border-color-hover:#666;
$border-radius:4px;
$font-size:14px;
.wrapper{
  > input{
    height:$height;
    border:1px solid $border-color;
    border-radius:$border-radius;
    padding:0 8px;
    font-size:$font-size;
    &:hover{
      border-color:$border-color-hover
    }
  }
}
</style>
