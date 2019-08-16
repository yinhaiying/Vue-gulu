<template>
  <div class="layout" :class = "layoutClass">
    <slot></slot>
  </div>
</template>


<script>
export default {
  name:'GuluLayout',
  data(){
    return {
      layoutClass:{
        hasSider:false
      }
    }
  },
  mounted(){
    this.$children.forEach((vm) => {
      if(vm.$options.name === 'GuluSider'){
        this.layoutClass.hasSider = true;
      }
    })
  }
}
</script>


<style lang="scss" scoped>
.layout{
  border:2px solid #000;
  display:flex;
  flex-grow:1;
  flex-direction:column;
    &.hasSider{
    flex-direction:row;
  }
}
</style>
