const toFormData = (obj: Record<string, any>): FormData => {
  const formData = new FormData()

  Object.entries(obj).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      if (value.length > 0 && value[0] instanceof File) {
        value.forEach((file) => {
          formData.append(key, file)
        })
      } else {
        value.forEach((v, i) => {
          formData.append(`${key}[${i}]`, v)
        })
      }
    } else {
      formData.append(key, value)
    }
  })

  return formData
}

export { toFormData }
