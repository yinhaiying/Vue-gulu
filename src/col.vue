<template>
  <div class = "col" :class = "[`col-${span}`]">
    <slot></slot>
  </div>
</template>    

<script>
export default {
    name:'Gulu-Col',
    props:{
      span:{
        type:[Number,String]
      }
    }
}
</script>

<style lang="scss" scoped>
.col{
  height:100px;
  background:grey;
  border:1px solid red;
  @for $index from 1 to 24 {
      &-#{$index}{
        width:($index / 24) * 100%;
      }
  }
}   

</style>