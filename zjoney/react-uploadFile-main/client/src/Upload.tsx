import React, { ChangeEvent, useState, useEffect } from 'react';
import { Row, Col, Input, Button, message, Table, Progress } from 'antd';
import { request } from './utils';
const DEFAULT_SIZE = 1024 * 1024 * 100;
enum UploadStatus {
    INIT,
    PAUSE,
    UPLOADING
}
interface Part {
    chunk: Blob;
    size: number;
    filename?: string;
    chunk_name?: string;
    loaded?: number;
    percent?: number;
    xhr?: XMLHttpRequest
}
interface Uploaded {
    filename: string;
    size: number
}
function Upload() {
    let [uploadStatus, setUploadStatus] = useState<UploadStatus>(UploadStatus.INIT);
    let [currentFile, setCurrentFile] = useState<File>();
    let [objectURL, setObjectURL] = useState<string>('');
    let [hashPercent, setHashPercent] = useState<number>(0);
    let [filename, setFilename] = useState<string>('');
    let [partList, setPartList] = useState<Part[]>([]);

    useEffect(() => {
        if (currentFile) {
            /*   let objectURL = window.URL.createObjectURL(currentFile);
              setObjectURL(objectURL);
              return () => window.URL.revokeObjectURL(objectURL); */
            const reader = new FileReader();
            reader.addEventListener('load', () => setObjectURL(reader.result as string));
            reader.readAsDataURL(currentFile);
        }
    }, [currentFile]);
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        let file: File = event.target.files![0];
        setCurrentFile(file);
    }
    function calculateHash(partList: Part[]) {
        return new Promise(function (resolve) {
            let worker = new Worker("/hash.js");
            worker.postMessage({ partList });
            worker.onmessage = function (event) {
                let { percent, hash } = event.data;
                setHashPercent(percent);
                if (hash) {
                    resolve(hash);
                }
            }
        });
    }
    function reset() {
        setUploadStatus(UploadStatus.INIT);
        setHashPercent(0);
        setPartList([]);
        setFilename('');
    }
    async function handleUpload() {
        if (!currentFile) {
            return message.error('你尚未选择文件');
        }
        if (!allowUpload(currentFile)) {
            return message.error('不支持此类文件的上传');
        }
        setUploadStatus(UploadStatus.UPLOADING);
        //分片上传
        let partList: Part[] = createChunks(currentFile);
        //先计算这个对象哈希值  秒传的功能 通过webworker子进程来去计算哈希
        let fileHash = await calculateHash(partList);
        let lastDotIndex = currentFile.name.lastIndexOf('.');//dog.jpg
        let extName = currentFile.name.slice(lastDotIndex);//.jpg
        let filename = `${fileHash}${extName}`;// hash.jpg
        setFilename(filename);
        partList.forEach((item: Part, index) => {
            item.filename = filename;
            item.chunk_name = `${filename}-${index}`;
            item.loaded = 0;
            item.percent = 0;
        });
        setPartList(partList);
        await uploadParts(partList, filename);
    }
    async function verify(filename: string) {
        return await request({
            url: `/verify/${filename}`,
        })
    }
    async function uploadParts(partList: Part[], filename: string) {
        let { needUpload, uploadList } = await verify(filename);
        if (!needUpload) {
            return message.success('秒传成功');
        }
        try {
            let requests = createRequests(partList, uploadList, filename);
            await Promise.all(requests);
            await request({ url: `/merge/${filename}` });
            message.success('上传成功');
            reset();
        } catch (error) {
            message.error('上传失败或暂停');
            //uploadParts(partList, filename);
        }
    }
    function createRequests(partList: Part[], uploadList: Uploaded[], filename: string) {
        return partList.filter((part: Part) => {
            let uploadFile = uploadList.find(item => item.filename === part.chunk_name);
            if (!uploadFile) {
                part.loaded = 0;//已经上传的字节数0
                part.percent = 0;//已经上传的百分比就是0 分片的上传过的百分比
                return true;
            }
            if (uploadFile.size < part.chunk.size) {
                part.loaded = uploadFile.size;// 已经上传的字节数
                part.percent = Number((part.loaded / part.chunk.size * 100).toFixed(2));//已经上传的百分比
                return true;
            }
            return false;
        }).map((part: Part) => request({
            url: `/upload/${filename}/${part.chunk_name}/${part.loaded}`,//请求的URL地址
            method: 'POST',//请求的方法
            headers: { 'Content-Type': 'application/octet-stream' },//指定请求体的格式
            setXHR: (xhr: XMLHttpRequest) => part.xhr = xhr,
            onProgress: (event: ProgressEvent) => {
                part.percent = Number(((part.loaded! + event.loaded) / part.chunk.size * 100).toFixed(2));
                console.log('part.percent', part.chunk_name, part.percent);
                setPartList([...partList]);
            },
            data: part.chunk.slice(part.loaded) //请求体
        }))
    }
    async function handlePause() {
        partList.forEach((part: Part) => part.xhr && part.xhr.abort());
        setUploadStatus(UploadStatus.PAUSE);
    }
    async function handleResume() {
        setUploadStatus(UploadStatus.UPLOADING);
        await uploadParts(partList, filename);
    }
    const columns = [
        {
            title: '切片名称',
            dataIndex: "filename",
            key: 'filename',
            width: '20%'
        },
        {
            title: '进度',
            dataIndex: "percent",
            key: 'percent',
            width: '80%',
            render: (value: number) => {
                return <Progress percent={value} />
            }
        }
    ]
    let totalPercent = partList.length > 0 ? partList.reduce(
        (acc: number, curr: Part) => acc + curr.percent!, 0) / (partList.length * 100) * 100
        : 0
    let uploadProgress = uploadStatus !== UploadStatus.INIT ? (
        <>
            <Row>
                <Col span={4}>
                    HASH总进度:
                </Col>
                <Col span={20}>
                    <Progress percent={hashPercent} />
                </Col>
            </Row>
            <Row>
                <Col span={4}>
                    总进度:
                </Col>
                <Col span={20}>
                    <Progress percent={totalPercent} />
                </Col>
            </Row>
            <Table
                columns={columns}
                dataSource={partList}
                rowKey={row => row.chunk_name!}
            />
        </>
    ) : null;
    return (
        <>
            <Row>
                <Col span={12}>
                    <Input type="file" style={{ width: 300 }} onChange={handleChange} />
                    {
                        uploadStatus === UploadStatus.INIT && <Button type="primary" onClick={handleUpload} style={{ marginLeft: 10 }}>上传</Button>
                    }
                    {
                        uploadStatus === UploadStatus.UPLOADING && <Button type="primary" onClick={handlePause} style={{ marginLeft: 10 }}>暂停</Button>
                    }
                    {
                        uploadStatus === UploadStatus.PAUSE && <Button type="primary" onClick={handleResume} style={{ marginLeft: 10 }}>恢复</Button>
                    }

                </Col>
                <Col span={12}>
                    {objectURL && <img src={objectURL} style={{ width: 100 }} />}
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
        partList.push({ chunk, size: chunk.size });
        current += DEFAULT_SIZE;
    }
    return partList;
}
function allowUpload(file: File) {
    let isValidFileType = ["image/jpeg", "image/png", "image/gif", "video/mp4"].includes(file.type);
    if (!isValidFileType) {
        message.error('不支持此类文件上传');
    }
    //文件大小的单位是字节  1024bytes=1k*1024=1M*1024=1G*2=2G
    const isLessThan2G = file.size < 1024 * 1024 * 1024 * 2;
    if (!isLessThan2G) {
        message.error('上传的文件不能大于2G');
    }
    return isValidFileType && isLessThan2G;
}

export default Upload;
//blob,二进制，流 arraybuffer  Buffer