<template>
  <div class = "gulu-uploader">
    {{fileList}}
    <div @click = "onUploadClick">
      <slot></slot>
    </div>
    <div ref = "temp" style = "width:0;height:0;overflow:hidden"></div>
    <!-- <img :src="url" alt="" class=""> -->
    <ol>
      <li v-for = "(file,index) in fileList" :key = "file.name">
        <img :src="file.url" alt="" width = "100" height = "100">
        {{file.name}}
        <button @click = "onRemoveFile(index)">删除</button>
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
    beforeUpload(file,newName){
      let {type,size} = file;
      let newFile = {name:newName,type,size,status:'uploading'};
      console.log(newFile)
      this.$emit('update:fileList',[...this.fileList,newFile]);
    },
    uploadFile(file){
      let {name,size,type} = file;
      let newName = this.generateName(name);

      this.beforeUpload(file,newName);

       // 上传文件
      let formData = new FormData();
      formData.append(this.name,file);
      this.doUploadFile(formData,(response) =>{
        //通过用户自己定义函数来确定如何解析后台返回的参数
        let url = this.parseResponse(response);
        this.url = url;
        this.$emit('update:fileList',[...this.fileList,{name:newName,type,size,status:'success'}])
      },() => {
        this.uploadError(newName);
      })

    },
    uploadError(newName){
      let errorFile = this.fileList.filter((item) => item.name === newName)[0];
      let index = this.fileList.indexOf(errorFile)
      let fileCopy = JSON.parse(JSON.stringify(this.fileList));
      fileCopy[0].status = "fail";
      let fileListCopy = [...this.fileList];
      fileListCopy.splice(index,1,fileCopy);
      this.$emit('update:fileList',fileCopy)
    },
    doUploadFile(formData,success,fail){
        // 开始发送请求
        let xhr = new XMLHttpRequest();
        xhr.open(this.method,this.action);
        xhr.onload = function(){
          success(xhr.response)
          // fail()
        }
        xhr.send(formData);
    },
    generateName(name){
          while(this.fileList.filter((item) => item.name === name).length > 0){
            let dotIndex = name.lastIndexOf('.');
            let nameWithoutExtension = name.substring(0,dotIndex);
            let extension = name.substring(dotIndex);
            name = nameWithoutExtension + '(1)' + extension;
          }
          return name;
    },
    createInput(){
      // 创建Input
      let oInput = document.createElement('input');
      oInput.type = 'file';
      this.$refs.temp.appendChild(oInput);
      return oInput
    },
    onRemoveFile(index){
     let isRemove = window.confirm('你确定要删除这张图片吗');
     if(isRemove){
      let copy = [...this.fileList];
      copy.splice(index,1);
      //使用update进行更新
      this.$emit('update:fileList',copy)
     }

    }
  }

}
</script>script


<style lang="scss">

</style>
