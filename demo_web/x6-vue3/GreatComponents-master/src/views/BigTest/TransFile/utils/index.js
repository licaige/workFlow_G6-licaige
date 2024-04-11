export async function processHandle(handle) {
  if (handle.kind === 'file') {
    return handle
  }
  handle.children = []
  // 得到异步迭代器
  const iter = handle.entries()
  for await(const item of iter) {
    handle.children.push(await processHandle(item[1]))
  }
  return handle
}

export function directoryFlat(directory) {
  const res = []
  function directoryFlatFun(directory) {
    if (Array.isArray(directory.children) && directory.children.length > 0) {
      res.push(...directory.children)
      for (let i = 0; i < directory.children.length; i++) {
        directoryFlatFun(directory.children[i])
      }
    }
  }
  directoryFlatFun(directory)
  return res
}

export function filterFileType(fileList, type) {
  return fileList.filter(item => type.indexOf(item.name.split('.')[item.name.split('.').length - 1]) !== -1)
}

export function downloadFile(file) {
  // 创建一个临时的URL指向文件对象
  const fileUrl = URL.createObjectURL(file);
 
  // 创建一个a标签
  const downloadLink = document.createElement('a');
 
  // 设置a标签属性
  downloadLink.href = fileUrl;
  downloadLink.download = file.name; // 指定下载文件名，如果不指定，通常会是文件的URL
 
  // 添加到文档
  document.body.appendChild(downloadLink);
 
  // 触发下载
  downloadLink.click();
 
  // 清理
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(fileUrl); // 释放URL对象
}
