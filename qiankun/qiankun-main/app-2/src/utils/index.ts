import path from 'path-browserify'

/**
 * @param { 提取文件后缀 }
 */
export const getFileExtName = (fileUrl: string) => {
  return path.extname(fileUrl)
}
