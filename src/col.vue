<template>
  <div class = "col" 
       :class = "[`col-${span}`,offset && `offset-${offset}`]" :style = "{paddingLeft:`${gutter/2}px`,paddingRight:`${gutter/2}px`}">
    <div style = "border:3px solid green">
      <slot></slot>
    </div>
  </div>
</template>    

<script>
export default {
    name:'Gulu-Col',
    props:{
      span:{
        type:[Number,String]
      },
      offset:{
        type:[Number,String]
      },

    },
    created(){

    },
    mounted(){
    },
    data(){
      return {
         gutter:0
      }
    }
}
</script>

<style lang="scss" scoped>
.col{
  height:100px;
  // background:grey;
  // border:1px solid red;
  // padding:0 10px;
  @for $index from 1 to 24 {
      &-#{$index}{
        width:($index / 24) * 100%;
      }
  }
  @for $n from 1 to 24 {
      &.offset-#{$n}{
        margin-left:($n / 24) * 100%;
      }
  }
}   

</style>