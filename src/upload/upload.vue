<template>
  <div class = "gulu-uploader">
    <div @click = "onUploadClick">
      <slot></slot>
    </div>
    <div ref = "temp" style = "width:0;height:0;overflow:hidden"></div>
  </div>
</template>


<script>
export default {
  name:'Upload',
  props:{
    name:{
      type:String,
      required:true
    },
    method:{
      type:String,
      default:'POST'
    },
    action:{
      type:String,
      required:true
    }
  },
  methods:{
    onUploadClick(){
      let oInput = document.createElement('input');
      oInput.type = 'file';
      this.$refs.temp.appendChild(oInput);
      oInput.addEventListener('change',() => {
        let file = oInput.files[0];
        let formData = new FormData();
        formData.append(this.name,file);
        // 开始发送请求
        let xhr = new XMLHttpRequest();
        xhr.open(this.method,this.action);
        xhr.onload = function(){
          console.log(xhr.response)
        };
        xhr.send(formData)
        oInput.remove();
      })

      //在这里手动触发input的click事件。
      oInput.click();
    }
  }

}
</script>script


<style lang="scss">

</style>
