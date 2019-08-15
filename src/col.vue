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
      phone:{ type:Object,validator},
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
    computed:{
      colClasses(){
        const {span,offset,phone,ipad,narrowPc,pc,widePc} = this;
        return [
          `col-${span}`,
          offset && `offset-${offset}`,
          ...(phone && [`col-phone-${phone.span}`]),
          ...(ipad && [`col-ipad-${ipad.span}`]),
          ...(narrowPc && [`col-narrow-pc-${narrowPc.span}`]),
          ...(pc && [`col-pc-${pc.span}`]),
          ...(widePc && [`col-wide-pc-${widePc.span}`])
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

  @media (max-width:576px){
    $class-prefix:phone;
     @for $index from 1 to 24 {
      &-#{$class-prefix}-#{$index}{
        width:($index / 24) * 100%;
      }
     }
    $class-prefix:phone;
    @for $n from 1 to 24 {
        &.#{$class-prefix}-offset-#{$n}{
          margin-left:($n / 24) * 100%;
        }
    }
  }
  @media (min-width:577px) and (max-width:768px){
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
  @media (min-width:769px) and (max-width:992px){
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
