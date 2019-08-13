<template>
  <div class = "toast">
    <slot></slot>
    <div class = "line"></div>
    <span  v-if = "closeButton" @click = "onClickClose">{{closeButton.text}}</span>
  </div>
</template>

<script>

export default {
  name:'Gulu-toast',
  props:{
    autoClose:{
      type:Boolean,
      default:true
    },
    autoCloseDelay:{
      type:Number,
      default:50
    },
    closeButton:{
      type:Object,
      default:function(){
        return {
          text:'关闭',
          callback:undefined
        }
      }
    }
  },
  created(){
    console.log(this.closeButton)
  },
  mounted(){
    if(this.autoClose){
      setTimeout(() => {
        this.close();
      },this.autoCloseDelay * 1000)
    }
  },
  methods:{
    close(){
      this.$el.remove(); //把元素从body中移出
      this.$destroy();// 把元素身上绑定的所有事件等移除。
    },
    onClickClose(){
      this.close();
      if(this.closeButton && this.closeButton.callback && typeof this.closeButton.callback === 'function'){
        this.closeButton.callback(this);
      }
    }
  }
}

</script>

<style lang = "scss" scoped>
$height: 40px;
$font-size:14px;
$toast-bg:rgba(0,0,0,0.75);
.toast{
  position:fixed;
  top:0;
  left:50%;
  transform:translateX(-50%);
  font-size:$font-size;
  line-height:1.8;
  height:$height;
  display:flex;
  align-items:center;
  background:$toast-bg;
  box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.50);
  color:#fff;
  padding:0 16px;
  .line{
    margin:8px;
    border-left:1px solid #fff;
    height:100%;
  }
}
</style>
