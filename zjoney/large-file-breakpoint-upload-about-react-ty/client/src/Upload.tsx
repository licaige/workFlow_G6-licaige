import React, { ChangeEvent, useState, useEffect } from "react";
import { Row, Col, Input, Button, message, Table, Progress } from 'antd';

import { request } from './utils'

const DEFAULT_SIZE = 1024 * 1024 * 100;
enum UploadedStatus {
  INIT,
  PAUSE,
  UPLOADING,
}
interface Part {
  chunk: Blob;
  size: number;
  filename?: string;
  chunk_name?: string;
  loaded?: number;
  percent?: number;
  xhr?: XMLHttpRequest;
}
interface Uploaded {
  filename: string;
  size: number;
}
function UploadApp() {
  const [uploadStatus, setUploadStatus] = useState<UploadedStatus>(UploadedStatus.INIT)
  const [currentFile, setCurrentFile] = useState<File>()
  const [objUrl, setObjUrl] = useState<string>('')
  const [filename, setFilename] = useState<string>('')
  const [hashPersent, setHashPersent] = useState<number>(0)
  const [partList, setPartList] = useState<Part[]>([])

  useEffect(() => {
    if (currentFile) {
      // let objURl = window.URL.createObjectURL(currentFile)
      // setObjUrl(objURl)
      // return () => window.URL.revokeObjectURL(objURl)
      // 优化
      const reader = new FileReader();
      reader.addEventListener('load', () => setObjUrl(reader.result as string));
      reader.readAsDataURL(currentFile);
    }
  }, [currentFile]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    let file: File = event.target.files![0];
    setCurrentFile(file);
    // reset() // 选择文件后重置
  }
  function calculateHash(partList: Part[]) {
    return new Promise((resolve, reject) => {
      const worker = new Worker('/hash.js');
      worker.postMessage({ partList });
      worker.onmessage = (event) => {
        const { percent, hash } = event.data;
        
        setHashPersent(percent)
        if (hash) {
          resolve(hash);
        }
      };
    });
  }
  function reset() {
    setUploadStatus(UploadedStatus.INIT)
    setHashPersent(0)
    setFilename('')
    setPartList([])
    setObjUrl('')
  }
  async function handleUpload() {
    if (!currentFile) {
      return message.error('请先选择文件')
    };
    if (!allowUpload(currentFile)) {
      return message.error('文件类型不支持')
    }
    setUploadStatus(UploadedStatus.UPLOADING)
   
    // const formData = new FormData();
    // formData.append('chunk', currentFile);// 添加文件，字段名为chunk
    // formData.append('filename', currentFile.name);// 添加文件名
    // let result = await request({
    //   url: '/upload',
    //   method: 'POST',
    //   data: formData,
    // });
    // console.log('result', result)
    // 1.分片
    let partList: Part[] = createChunks(currentFile);
    // 2.先计算这个对象哈希值 秒传的功能 webworker子进程计算哈希
    let fileHash = await calculateHash(partList);
    let lastDogIndex = currentFile.name.lastIndexOf('.'); //dog.jpg
    let extName = currentFile.name.slice(lastDogIndex);
    let filename = `${fileHash}${extName}`;// hash.jpg
    setFilename(filename)
    partList.forEach((item: Part, index) => {
      item.filename = filename;
      item.chunk_name = `${filename}-${index}`;
      item.loaded = 0;
      item.percent = 0;
    });
    setPartList(partList)
    await uploadParts(partList, filename);
    // partList.map(({ chunk, size }, index) => ({
    //   filename,
    //   chunk_name: `${filename}-${index}`,
    //   chunk,
    //   size,
    // }));
  }

  async function verify(filename: string) {
    return await request({
      url: `/verify/${filename}`,
    });;
  }
  async function uploadParts(partList: Part[], filename: string) {
    let { needUpload, uploadList } = await verify(filename)
    if (!needUpload) {
      return message.success('秒传成功')
    }
    try {
      let requests = createRequests(partList, uploadList, filename);
      await Promise.all(requests);
      await request({
        url: `/merge/${filename}`,
      });
      message.success('上传成功')
      reset() // 上传成功后重置
    }catch(e){
      message.error('上传失败或暂停!');
    }
    // await request({
    //   url: `/merge`,
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   data: JSON.stringify({filename}),
    // });
  }
  function createRequests(partList: Part[], uploadList: Uploaded[], filename: string) {
    return partList.filter((part: Part) => {
      let uploadFile = uploadList.find(item => item.filename === part.chunk_name)
      if (!uploadFile) {
        part.loaded = 0
        part.percent = 0; // 已经分片上传的进度0
        return true
      }
      if (uploadFile.size < part.chunk.size) {
        part.loaded = uploadFile.size;// 已经上传字节
        part.percent = Number((part.loaded / part.chunk.size * 100).toFixed(2)); // 已上传的百分比
        return true
      }
      return false
    }).map((part: Part) => {
      return request({
        url: `/upload/${filename}/${part.chunk_name}/${part.loaded}`,
        method: 'POST',
        headers: { 'Content-Type': 'application/octet-stream' }, // 'Content-Type': 'application/json
        data: part.chunk.slice(part.loaded),
        setXHR: (xhr: XMLHttpRequest) => part.xhr = xhr,
        onProgress: (event: ProgressEvent) => {
          part.percent = Number(((part.loaded! + event.loaded) / part.chunk.size * 100).toFixed(2));//采坑1
          console.log('part.percent', part.chunk_name, part.percent);
          setPartList([...partList])
        }
      });
    });
  }
  function handlePause() {
    partList.forEach((part: Part) => part.xhr && part.xhr.abort())
    setUploadStatus(UploadedStatus.PAUSE)
  }
  async function handleResume() {
    // 恢复上传或者刷新浏览器， 可以基于原来的partList继续上传
    setUploadStatus(UploadedStatus.UPLOADING)
    await uploadParts(partList, filename)

  }
  const columns = [
    {
      title: '分片名称',
      dataIndex: 'filename',
      key: 'filename',
      width: '20%'
    },
    {
      title: '进度',
      dataIndex: 'percent',
      key: 'percent',
      width: '80%',
      render: (value: number) => {
        return <Progress percent={value} />
      }
    }
  ]

  let totalPercent = partList.length > 0 ? partList.reduce((prev: number, current: Part) => prev + current.percent!, 0) / (partList.length * 100) * 100 : 0;
  console.log('totalPercent', totalPercent, partList)

  let uploadProgress = uploadStatus !== UploadedStatus.INIT ? (
    <>
      <Row>
        <Col span={4}>
          hash计算
        </Col>
        <Col span={20}>
          <Progress percent={hashPersent} />
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          总进度
        </Col>
        <Col span={20}>
          <Progress percent={totalPercent} />
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={partList}
        rowKey={record => record.chunk_name!}
      />
    </>
  ) : null
  return (
    <>
      <Row>
        <Col span={12}>
          <Input type="file" style={{ width: 300 }} onChange={handleChange} />
          {
            uploadStatus === UploadedStatus.INIT && <Button type="primary" onClick={handleUpload} style={{ marginLeft: 10 }}>上传</Button>
          }
          {
            uploadStatus === UploadedStatus.UPLOADING && <Button type="primary" onClick={handlePause} style={{ marginLeft: 10 }}>暂停</Button>
          }
          {
            uploadStatus === UploadedStatus.PAUSE && <Button type="primary" onClick={handleResume} style={{ marginLeft: 10 }}>恢复</Button>
          }
        </Col>
        <Col span={12}>
          {objUrl && <img src={objUrl} style={{ width: 100 }} />}
        </Col>
      </Row>

      {uploadProgress}
    </>
  )
}
function createChunks(file: File): Part[] {
  let current = 0;
  let partList: Part[] = [];
  while (current < file.size) {
    let chunk: Blob = file.slice(current, current + DEFAULT_SIZE);
    partList.push({ chunk, size: chunk.size, loaded: 0 });
    current += DEFAULT_SIZE;
  }
  return partList;
}
function allowUpload(file: File) {
  let isValidFileType = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/quicktime'].includes(file.type)
  if (!isValidFileType) {
    return message.error('文件类型不上传')
  }
  // 文件大小单位是字节  1024bytes=1kb  1024kb=1M  1024M=1G
  const isLessThan2G = file.size / 1024 / 1024 < 1024 * 1024 * 1024 * 2
  if (!isLessThan2G) {
    return message.error('文件大小不能超过2G')
  }
  return isValidFileType && isLessThan2G
}
// blob, 二进制， 流， arraybuffer
export default UploadApp;