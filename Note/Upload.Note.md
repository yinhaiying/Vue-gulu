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
