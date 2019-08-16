<template>
  <div class = "col" :class = "colClasses" :style = "colStyle">
      <slot></slot>
  </div>
</template>

<script>

let validator = (value) => {
    let valid = true;
    let keys = Object.keys(value);
    keys.forEach((item) => {
      if(!['span','offset'].includes(item)){
        valid = false;
      }
    })
    return valid;
}

export default {
    name:'Gulu-Col',
    props:{
      span:{ type:[Number,String] },
      offset:{type:[Number,String]},
      ipad:{ type:Object,validator},
      narrowPc:{ type:Object,validator},
      pc:{ type:Object, validator},
      widePc:{ type:Object,validator}
    },
    data(){
      return {
         gutter:0,
      }
    },
    methods:{
      createClasses(obj,str = ""){
          if(!obj){
            return [];
          }
          // str的值是 ipad narrow-pc 
           let arr = [];
           if(obj.span){
             arr.push(`col-${str}-${obj.span}`)
           }
           if(obj.offset){
             arr.push(`col-${str}-${obj.offset}`)
           }
           return arr;
      }
    },
    computed:{
      colClasses(){
        const {span,offset,ipad,narrowPc,pc,widePc} = this;
        const createClasses = this.createClasses;
        return [
          ...createClasses({span,offset}),
          ...createClasses(ipad,'ipad'),
          ...createClasses(narrowPc,'narrow-pc'),
          ...createClasses(pc,'pc'),
          ...createClasses(widePc,'wide-pc')
        ]  
      },
      colStyle(){
        return {
           paddingLeft:this.gutter/2 + 'px',
           paddingRight:this.gutter/2 + 'px'
         }
      }
    }
}
</script>

<style lang="scss" scoped>
.col{
  height:100px;
  border:2px solid green;
  background:red;
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

  @media (min-width:577px){
    $class-prefix:ipad;
     @for $index from 1 to 24 {
      &-#{$class-prefix}-#{$index}{
        width:($index / 24) * 100%;
      }
     }
    $class-prefix:ipad;
    @for $n from 1 to 24 {
        &.#{$class-prefix}-offset-#{$n}{
          margin-left:($n / 24) * 100%;
        }
    }
  }
  
  @media (min-width:769px){
    $class-prefix:narrow-pc;
     @for $index from 1 to 24 {
      &-#{$class-prefix}-#{$index}{
        width:($index / 24) * 100%;
      }
     }
    $class-prefix:narrow-pc;
    @for $n from 1 to 24 {
        &.#{$class-prefix}-offset-#{$n}{
          margin-left:($n / 24) * 100%;
        }
    }
  }

  @media (min-width:992px){
    $class-prefix:pc;
     @for $index from 1 to 24 {
      &-#{$class-prefix}-#{$index}{
        width:($index / 24) * 100%;
      }
     }
    $class-prefix:pc;
    @for $n from 1 to 24 {
        &.#{$class-prefix}-offset-#{$n}{
          margin-left:($n / 24) * 100%;
        }
    }
  }

  @media (min-width:1201px){
    $class-prefix:wide-pc;
     @for $index from 1 to 24 {
      &-#{$class-prefix}-#{$index}{
        width:($index / 24) * 100%;
      }
     }
    $class-prefix:wide-pc;
    @for $n from 1 to 24 {
        &.#{$class-prefix}-offset-#{$n}{
          margin-left:($n / 24) * 100%;
        }
    }
  }
}



</style>
