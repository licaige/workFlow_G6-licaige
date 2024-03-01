import ip from 'ip';
import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const host = ip.address();

console.log("host: " + host);

// 所有托管得静态资源都在public 目录下
app.use(express.static(path.join(__dirname, 'public')));

// 启动服务
app.listen(4444, host);
console.log(`server start at http://${host}:4444/`);