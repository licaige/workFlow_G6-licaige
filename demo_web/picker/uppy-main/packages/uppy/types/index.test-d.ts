import * as Uppy from '..'
// eslint-disable-next-line import/newline-after-import
;(() => {
  const uppy = new Uppy.Uppy({ autoProceed: false })
  uppy.use(Uppy.Dashboard, { trigger: '#up_load_file_01' })
  uppy.use(Uppy.DragDrop, { target: '#ttt' })
  uppy.use(Uppy.XHRUpload, {
    bundle: true,
    endpoint: 'xxx',
    fieldName: 'up_load_file',
  })
  uppy.on('upload-success', (fileCount, { body, uploadURL }) => {
    console.log(fileCount, body, uploadURL, ` files uploaded`)
  })
})()
;(() => {
  const uppy = new Uppy.Uppy({ autoProceed: false })
    .use(Uppy.Dashboard, { trigger: '#select-files' })
    .use(Uppy.GoogleDrive, {
      target: Uppy.Dashboard,
      companionUrl: 'https://companion.uppy.io',
    })
    .use(Uppy.Instagram, {
      target: Uppy.Dashboard,
      companionUrl: 'https://companion.uppy.io',
    })
    .use(Uppy.Webcam, { target: Uppy.Dashboard })
    .use(Uppy.ScreenCapture)
    .use(Uppy.Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })

  uppy.on('complete', (result) => {
    console.log('Upload result:', result)
  })
})()
;(() => {
  const uppy = new Uppy.Uppy()
  uppy.use(Uppy.DragDrop, { target: '.UppyDragDrop' })
  uppy.use(Uppy.Tus, { endpoint: '//tusd.tusdemo.net/files/' })
})()
