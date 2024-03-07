import { ExtractPropTypes, PropType } from 'vue'

// 编写组件的时候 需要定义组件所需要的属性，有了属性之后在去实现

// 给每个文件进行包装 包装一个全新的类型

export interface UploadFile {
  // input框
  uid?: number
  name: string
  url?: string // new ObjectURL
  percentage?: number
  raw?: File
  size?: number
  status: string
}
export type UploadFiles = UploadFile[]

// 给组件的使用也定义一些类型 , 给用户去使用的类型
export const baseProps = {
  FileList: {
    type: Array as PropType<UploadFiles>,
    default: () => [] as const
  },
  action: {
    type: String,
    default: ''
  },
  multiple: {
    type: Boolean,
    default: false
  },
  // input中所需要的类型
  name: {
    type: String,
    default: 'file'
  },
  accept: {
    type: String,
    default: ''
  },
  // 上传文件调用ajax 需要的
  method: {
    type: String,
    default: 'post'
  },
  headers: {
    type: Object,
    default: () => ({})
  },
  data: {
    type: Object,
    default: () => ({})
  },
  drag:{
    type:Boolean,
    default: false
  }
} as const

export type UploadRawFile = File & { uid: number }
export type UploadProgressEvent = ProgressEvent & { pecetange: number }
const NOOP = () => {}
export const uploadProps = {
  ...baseProps,
  onPreview: {
    // 预览的时候 可以用这个回调拿到上次的图片
    type: Function as PropType<(file: UploadFile) => void>,
    default: NOOP
  },
  beforeUpload: {
    type: Function as PropType<
      (file: UploadRawFile) => Promise<boolean> | boolean
    >,
    default: NOOP
  },
  onChange: {
    type: Function as PropType<(file: UploadFile) => void>,
    default: NOOP
  },
  beforeRemove: {
    type: Function as PropType<
      (file: UploadFile, uploadFiles: UploadFiles) => Promise<boolean> | boolean
    >,
    default: NOOP
  },
  onRemove: {
    type: Function as PropType<
      (file: UploadFile, uploadFiles: UploadFiles) => void
    >,
    default: NOOP
  },
  onProgress: {
    type: Function as PropType<
      (
        file: UploadProgressEvent,
        uploadFile: UploadFile,
        uploadFiles: UploadFiles
      ) => void
    >,
    default: NOOP
  },
  onSuccess: {
    type: Function as PropType<
      (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => void
    >,
    default: NOOP
  },
  onError: {
    type: Function as PropType<
      (err: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => void
    >,
    default: NOOP
  }
} as const

export type UploadProps = ExtractPropTypes<typeof uploadProps>

let id = 0;
export const genId = () =>id++