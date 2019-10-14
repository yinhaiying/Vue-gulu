<template>
  <div class = "popover" @click = "onClick">
      <div class = "content-wrapper" v-if = "visible">
        <slot name = "content"></slot>
      </div>
      <slot></slot>
  </div>
</template>

<script>
export default {
    name:'GuluPopover',
    data(){
        return {
            visible:false
        }
    },
    methods:{
        onClick(){
            this.visible = !this.visible;
            console.log('outer' + this.visible)
                if(this.visible == true){
                    console.log('1')
                    let x = () => {
                        this.visible = false;
                        document.removeEventListener('click',x)
                    }
                    setTimeout(() => {
                        document.addEventListener('click',x);
                    },1000);
                }


        } 
    }
}
</script>

<style lang="scss" scoped>
.popover{
    display:inline-block;
    vertical-align: top;
    position:relative;
    .content-wrapper{
        position:absolute;
        left:0;
        bottom:100%;
        border:1px solid red;
        box-shadow: 0 0 3px rgbe(0,0,0,0.5);
    }
}
</style>