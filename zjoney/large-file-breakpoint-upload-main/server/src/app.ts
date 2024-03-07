import express, { Request, Response, NextFunction } from 'express';
import logger from 'morgan';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';//500
import createError from 'http-errors';
import cors from 'cors';
import path from 'path';
import fs from 'fs-extra';
import { TEMP_DIR, mergeChunks, PUBLIC_DIR } from './utils';
let app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.resolve(__dirname, 'public')));
app.post('/upload/:filename/:chunk_name/:start', async function (req: Request, res: Response, _next: NextFunction) {
  let { filename, chunk_name } = req.params;
  let start: number = Number(req.params.start);
  let chunk_dir = path.resolve(TEMP_DIR, filename);
  let exist = await fs.pathExists(chunk_dir);
  if (!exist) {
    await fs.mkdirs(chunk_dir);
  }
  let chunkFilePath = path.resolve(chunk_dir, chunk_name);
  //flags append 后面断点续传 
  let ws = fs.createWriteStream(chunkFilePath, { start, flags: 'a' });
  req.on('end', () => {
    ws.close();
    res.json({ success: true });
  });
  req.on('error', () => {
    ws.close();
  });
  req.on('close', () => {
    ws.close();
  });
  req.pipe(ws);
});
app.get('/merge/:filename', async function (req: Request, res: Response) {
  let { filename } = req.params;
  await mergeChunks(filename);
  res.json({ success: true });
});
//每次先计算hash值 
app.get('/verify/:filename', async (req: Request, res: Response): Promise<any> => {
  let { filename } = req.params;
  let filePath = path.resolve(PUBLIC_DIR, filename);
  let existFile = await fs.pathExists(filePath);
  if (existFile) {
    return {
      success: true,
      needUpload: false //因为已经上传过了，所以不再需要上传了，可以实现秒传
    }
  }
  let tempDir = path.resolve(TEMP_DIR, filename);
  let exist = await fs.pathExists(tempDir);
  let uploadList: any[] = [];
  if (exist) {
    uploadList = await fs.readdir(tempDir);
    uploadList = await Promise.all(uploadList.map(async (filename: string) => {
      let stat = await fs.stat(path.resolve(tempDir, filename));
      return {
        filename,
        size: stat.size //现在的文件大写 100M  30M
      }
    }));
  }
  res.json({
    success: true,
    needUpload: true,
    uploadList //已经上传的文件列表
  });
});
/* app.post('/upload', async function (req: Request, res: Response, next: NextFunction) {
  let form = new multiparty.Form();
  form.parse(req, async (err: any, fields, files) => {
    if (err) {
      return next(err);
    }
    let filename = fields.filename[0];//'dog.jpg' 
    let chunk = files.chunk[0];//{}
    await fs.move(chunk.path, path.resolve(PUBLIC_DIR, filename), { overwrite: true });
    res.json({ success: true });
  });
}); */
/**
fields { filename: [ 'dog.jpg' ] }
files {
  chunk: [
    {
      fieldName: 'chunk',
      originalFilename: 'dog.jpg',
      path: 'C:\\Users\\张仁阳\\AppData\\Local\\Temp\\Di8EC5szolDXl7pMQXvGuJlt.jpg',
      headers: [Object],
      size: 10140
    }
  ]
}
 */
app.use(function (_req: Request, _res: Response, next: NextFunction) {
  next(createError(404));
});
app.use(function (error: any, _req: Request, res: Response, _next: NextFunction) {
  res.status(error.status || INTERNAL_SERVER_ERROR);
  res.json({
    success: false,
    error
  });
});
export default app;

/**
 1.跨域传cookie 1.origin不能用* 2  xhr.withCredential:include    all
 * 传来的肯定是流
const ws = fs。createWriteStream('xxxx');
req.pipe(ws)
 */