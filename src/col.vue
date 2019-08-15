<template>
  <div class = "col" :class = "colClasses" :style = "colStyle">
      <slot></slot>
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
      phone:{
        type:Object,
        validator(value){
          let valid = true;
          let keys = Object.keys(value);
          keys.forEach((item) => {
           if(!['span','offset'].includes(item)){
             valid = false;
           }
          })
          return valid;
        }
      }
    },
    data(){
      return {
         gutter:0,
      }
    },
    computed:{
      colClasses(){
        return [`col-${this.span}`,this.offset && `offset-${this.offset}`]
      },
      colStyle(){
        return {
           paddingLeft:this.gutter/2 + 'px',
           paddingRight:this.gutter/2 + 'px',
         }
      }
    }
}
</script>

<style lang="scss" scoped>
.col{
  height:100px;
  border:2px solid green;
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
