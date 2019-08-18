## Upload图片上传

#### 需求分析：
```
    <g-upload></g-upload>
```
其他的需求分析：
1. `accept`。上传时,`type`类型是`file`,accept表示能够接受的文件类型。
该属性的值必须为一个逗号分割的列表,包含了多个唯一的内容类型声明。可以是单独的
`.jpg`,`.png`,`.doc`,`.pdf`,也可以是一类文件类型，比如图片：`image/*`,
`video/*`

2. `action`图片要上传的服务器。

3. `name`上传之后图片的名字。

4. `fileList`参数是上传成功之后的链接。用户上传成功之后，服务器只返回这个url链接。
只要上传成功用户就会自动更新这个fileList。

```
    <g-upload
        accept = "images/*"
        action = "http://frank.com/upload"
        name = "avatar"
        :fileList = "fileList"
        @update:fileList = "">
      <button>上传</button>
      <div>只能上传300kb以内的png,jpg图片</div>
    </g-upload>
    <button>保存</button>
```

整个图片上传的流程：
1. 用户点击上传按钮，然后选择图片开始上传
2. 后台接收到上传的图片，会返回一个图片链接
3. 前端拿到图片链接后，将其设置成`img`的`src`属性。之前`img`是隐藏的。
   如果需要实现预览，也是拿到链接然后展示出来。



#### 使用form表单实现图片上传
1. action
2. method
3. enctype:对于`type`类型是`file`的`input`元素，必须设置`enctype`。



#### 使用ajax上传图片
```
form.addEventListener('submit',(e) => {
  //阻止form的默认事件
  e.preventDefault();
  // 把要上传的图片添加到formData中
  let formData = new FormData();
  let fileInput = document.querySelector('input[type = file]');
  formData.append('xxx',fileInput.file[0])
  // 使用ajax进行请求

  var xhr = new XMLHttpRequest();
  xhr.open('post',url);
  xhr.onload = function(){
    //设置返回时图片的src
    img.src = "预览时的链接"
  }

  xhr.send(formData)
})

```



#### 图片上传的后台实现
```
const express = require('express')
const multer  = require('multer')
const cors = require('cors')
const upload = multer({ dest: 'uploads/' })
const p = require('path')

const app = express()

app.options('/upload', cors())


app.put('/upload', cors(), upload.single('file'), function (req, res, next) {
  res.json({key: req.file.filename})
})
```


#### 上传组件的实现
我们先参考`element-ui`的`upload`组件的调用方式。
```
<el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
```
从上面我们可以看出，当用户点击上传的时候，会自动弹出一个对话框，让我们去选择要上传的文件。
这应该是`type`为`file`类型的`input`实现的功能。然而我们并没有在目前的代码中和页面中看到有
`input`,这说明这个`input`是用户点击后创建的。


#### 简单实现前端的ajax请求上传图片

```
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
        xhr.onload = () =>{
          //通过用户自己定义函数来确定如何解析后台返回的参数
          let url = this.parseResponse(xhr.response);
          this.url = url;
        };
        xhr.send(formData)
        oInput.remove();
      })
      //在这里手动触发input的click事件。
      oInput.click();
    }

```

这里用户最好自己定义上传图片时候，如何处理后台的数据。
`parseResponse`
```
    parseResponse:(response) => {
      let obj = JSON.parse(response)
     let url = `http://127.0.0.1:3000/preview/${obj.key}`
      return url;
    }
```

#### 创建一个fileList用来保存已经上传的图片
当我们上传成功之后，我们应该将上传成功的图片保存到一个列表中，方便前端
进行展示。
`uploadFile`
```
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
```
`index.html`
```
    <g-upload
        accept = "images/*"
        action = "http://127.0.0.1:3000/upload"
        name = "file"
        :parse-response = "parseResponse"
        :file-list.sync = "fileList"
        >
```
这种通过`upload`更新数据的方式非常简便，可以多尝试使用。

#### 删除已经上传的图片
```
    onRemoveFile(index){
     let isRemove = window.confirm('你确定要删除这张图片吗');
     if(isRemove){
      let copy = [...this.fileList];
      copy.splice(index,1);
      //使用update进行更新
      this.$emit('update:fileList',copy)
     }
```
这里关键是学会使用`update`来进行数据的更新。通过指定父组件中更新的数据，并传入新的数据。

#### 添加上传失败的处理
```
    uploadError(newName){
      let errorFile = this.fileList.filter((item) => item.name === newName)[0];
      let index = this.fileList.indexOf(errorFile)
      let fileCopy = JSON.parse(JSON.stringify(this.fileList));
      fileCopy[0].status = "fail";
      let fileListCopy = [...this.fileList];
      fileListCopy.splice(index,1,fileCopy);
      this.$emit('update:fileList',fileCopy)
    }
```

`uploadFile`
```
    this.doUploadFile(formData,(response) =>{
      //通过用户自己定义函数来确定如何解析后台返回的参数
      let url = this.parseResponse(response);
      this.url = url;
      this.$emit('update:fileList',[...this.fileList,{name:newName,type,size,status:'success'}])
    },() => {
      this.uploadError(newName);
    })
```
#### 解决用户选择图片时，如果选择取消。那么也会创建input的bug。
当用户选择图片时，没有选择图片而是点击了取消。而每次点击都会创建一个`input`,
如果多次取消，那么就会创建多个非常多的input。这存在一点问题。

解决办法是：每次创建之前都删除之前的input。
```
    createInput(){
      //每次创建之前都删除之前的input
      this.$refs.temp.innerHTML  = '';
      // 创建Input
      let oInput = document.createElement('input');
      oInput.type = 'file';
      this.$refs.temp.appendChild(oInput);
      return oInput
    },

```
