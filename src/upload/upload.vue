<template>
  <div class = "gulu-uploader">
    <div @click = "onUploadClick">
      <slot></slot>
    </div>
    <div ref = "temp" style = "width:0;height:0;overflow:hidden"></div>
    <img :src="url" alt="" class="">
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
    },
    parseResponse:{
      type:Function,
      required:true
    }
  },
  data(){
    return {
      url:'about:blank'
    }
  },
  methods:{
    onUploadClick(){
      let oInput = this.createInput();
      // 监听Input
      oInput.addEventListener('change',() => {
        this.uploadFile(oInput)
      })
      //在这里手动触发input的click事件。
      oInput.click();
    },
    uploadFile(oInput){
        // 上传文件
        let file = oInput.files[0];
        let formData = new FormData();
        formData.append(this.name,file);
        // 开始发送请求
        let xhr = new XMLHttpRequest();
        xhr.open(this.method,this.action);
        xhr.onload = () =>{
          //通过用户自己定义函数来确定如何解析后台返回的参数
          let url = this.parseResponse(xhr.response);
          this.url = url;
        };
        xhr.send(formData)
        oInput.remove();
    },
    createInput(){
      // 创建Input
      let oInput = document.createElement('input');
      oInput.type = 'file';
      this.$refs.temp.appendChild(oInput);
      return oInput

    }
  }

}
</script>script


<style lang="scss">

</style>
