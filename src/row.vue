<template>
  <div class = "row" :style = "rowStyle">
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
    computed:{
      rowStyle(){
        return {
          marginLeft:-this.gutter/2 + 'px',
          marginRight:-this.gutter/2 + 'px'
        }
      }
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
  flex-wrap:wrap;
}

</style>
