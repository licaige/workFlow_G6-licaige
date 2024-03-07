const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const cors = require('cors')

// 存储上传文件的目录
const uploadDir = path.join(__dirname, 'uploads');

// 使用Multer中间件处理文件上传
const upload = multer({ dest: uploadDir });

app.use(cors())
// 处理POST请求，上传图片
app.post('/upload', upload.single('file'), (req, res) => {
  // req.file 包含上传的文件信息
  if (!req.file) {
    return res.status(400).send('No files were uploaded.');
  }
  // 返回上传成功的消息
  res.send('File uploaded successfully.');
});

// 启动服务器
app.listen(4000, () => {
  console.log('Server started on http://localhost:4000');
});
