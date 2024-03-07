export const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

export const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
