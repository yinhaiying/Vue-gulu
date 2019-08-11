<!--  -->
<template>
<div class = "wrapper" :class = "{'error':error}">
    <input type="text" 
        :value = "value" 
        :disabled = "disabled" 
        :readonly = "readonly" 
        @change = "$emit('change',$event)"
        @input = "$emit('input',$event.target.value)"
        @focus = "$emit('focus',$event)"
        @blur = "$emit('blur',$event)">
    <template v-if = "error">
      <Icon name = "error" class = "icon-error"></Icon>
      <span class = "error-message">{{error}}</span>  
    </template>
</div>

</template>

<script>
import Icon from './icon.vue'

export default {
  name:'g-input',
  components:{
    Icon:Icon
  },
  props:{
    value:{
      type:String
    },
    disabled:{
      type:Boolean,
      default:false
    },
    readonly:{
      type:Boolean,
      default:false
    },
    error:{
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
$box-shadow-color:rgba(0,0,0,0.5);
$red:#F1453D;
.wrapper{
  font-size:$font-size;
  display:inline-flex;
  align-items:center;
  > :not(:last-child){
    margin-right:.5em;
  }
  > input{
    height:$height;
    border:1px solid $border-color;
    border-radius:$border-radius;
    padding:0 8px;
    font-size:$font-size;
    &:hover{
      border-color:$border-color-hover
    }
    &:focus{
      box-shadow:inset 0 1px 3px $box-shadow-color;
      outline:none;
    }
    &[disabled],&[readonly]{
      border-color:#aaa;
      color:#aaa;
      cursor: not-allowed;
    }
  }
  &.error{
    >input{
      border-color:$red;
    }
  }
  .icon-error{
    fill:$red;
  }
  .error-message{
    color:$red;
  }
}
</style>
