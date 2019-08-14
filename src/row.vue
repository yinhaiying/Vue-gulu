<template>
  <div class = "row" :style = "{'marginLeft':`-${gutter/2}px`,'marginRight':`-${gutter/2}px`}">
    <slot></slot>
  </div>
</template>    

<script>
export default {
    props:{
      gutter:{
        type:[Number,String],
        default:0
      }
    },
    created(){
    },
    mounted(){
      this.$children.forEach((vm) => {
        // 获取每一个子元素，然后给子元素绑定gutter
        vm.gutter = this.gutter;
      })
    }
}
</script>

<style lang="scss" scoped>
.row{
  display:flex;
  margin:0 -10px;
}
    
</style>