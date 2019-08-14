<template>
  <div class = "toast" ref = "toast" :class = "toastClasses">
    <div>
      <slot></slot>
    </div>
    <div class = "line" ref = "line"></div>
    <span class = "close"  v-if = "closeButton" @click = "onClickClose">{{closeButton.text}}</span>
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
      default:3,
      validator:(value) =>{
        return typeof value === 'number'
      }
    },
    closeButton:{
      type:Object,
      default:function(){
        return {
          text:'关闭',
          callback:undefined
        }
      }
    },
    position:{
      type:String,
      default:'top',
      validator:(value) => {
        return ['top','bottom','middle'].indexOf(value) > -1;
      }
    }
  },
  mounted(){
    this.updateStyle();
    this.execAutoClose();
  },
  computed: {
    toastClasses(){
      return {
        [`position-${this.position}`]:true
      }
    }
  },
  methods:{
    execAutoClose(){
      if(this.autoClose){
        setTimeout(() => {
          this.close();
        },this.autoCloseDelay * 1000)
      }
    },
    updateStyle(){
      // 为了解决min-height带来的问题
      this.$nextTick(() => {
        this.$refs.line.style.height = this.$refs.toast.getBoundingClientRect().height + 'px';
      })
    },
    close(){
      this.$el.remove(); //把元素从body中移出f
      this.$emit('close');// 触发一个close事件，告诉组件我已经关闭了。
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
$toast-min-height: 40px;
$font-size:14px;
$toast-bg:rgba(0,0,0,0.75);
$animation-duration:.5s;
@keyframes slide-up{
  0%{ opacity:0;transform:translate(-50%,100%)}
  100%{ opacity:1;transform:translate(-50%,0%)}
}
@keyframes slide-down{
  0%{ opacity:0;transform:translate(-50%,-100%)}
  100%{ opacity:1;transform:translate(-50%,0%)}
}
@keyframes fade-in{
  0%{ opacity:0}
  100%{ opacity:1}
}
.toast{
  position:fixed;

  font-size:$font-size;
  line-height:1.8;
  border-radius:4px;
  min-height:$toast-min-height;
  display:flex;
  align-items:center;
  background:$toast-bg;
  box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.50);
  color:#fff;
  left:50%;
  padding:0 16px;
  .line{
    margin:0 8px;
    border-left:1px solid #fff;
    height:100%;
  }
  .close{
    flex-shrink: 0;
  }
  &.position-top{
    top:0;
    transform:translateX(-50%);
    border-top-left-radius:0px;
    border-top-right-radius:0px;
    animation:slide-down $animation-duration linear;
  }
  &.position-bottom{
    bottom:0;
    transform:translateX(-50%);
    border-bottom-left-radius:0px;
    border-bottom-left-radius:0px;
    animation:slide-up $animation-duration linear;
  }
  &.position-middle{
    top:50%;
    transform:translate(-50%);
    animation:fade-in $animation-duration linear;
  }
}
</style>
