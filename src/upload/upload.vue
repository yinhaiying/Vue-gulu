<template>
  <div class = "gulu-uploader">
    <div @click = "onUploadClick">
      <slot></slot>
    </div>
    <div ref = "temp" style = "width:0;height:0;overflow:hidden"></div>
    <!-- <img :src="url" alt="" class=""> -->
    <ol>
      <li v-for = "file in fileList" :key = "file.name">
        <img :src="file.url" alt="" width = "100" height = "100">
        {{file.name}}
      </li>
    </ol>
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
    },
    fileList:{
      type:Array,
      default:() => []
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
        let file = oInput.files[0];
        this.uploadFile(file);
        oInput.remove();
      })
      //在这里手动触发input的click事件。
      oInput.click();
    },
    uploadFile(file){
        // 上传文件
        let formData = new FormData();
        formData.append(this.name,file);
        let {name,size,type} = file;
        // 开始发送请求
        let xhr = new XMLHttpRequest();
        xhr.open(this.method,this.action);
        xhr.onload = () =>{
          //通过用户自己定义函数来确定如何解析后台返回的参数
          let url = this.parseResponse(xhr.response);
          this.url = url;
          // 上传成功之后，将上传成功图片信息放到fileList中
          //处理重复的name
          while(this.fileList.filter((item) => item.name === name).length > 0){
            let dotIndex = name.lastIndexOf('.');
            let nameWithoutExtension = name.substring(0,dotIndex);
            let extension = name.substring(dotIndex);
            name = nameWithoutExtension + '(1)' + extension;
          }
          this.$emit('update:fileList',[...this.fileList,{name,type,size,url}])
          this.fileList.push({name,size,type})
        };
        xhr.send(formData);
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
