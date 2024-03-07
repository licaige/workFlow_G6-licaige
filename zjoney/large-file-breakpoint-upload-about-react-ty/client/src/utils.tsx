

interface OPTIONS {
  method?: string,
  url: string,
  baseUrl?: string,
  headers?: any,
  data?: any,
  setXHR?: any,
  onProgress?: any
}
export function request(options: OPTIONS): Promise<any> {
  let defaultOption = {
    method: 'GET',
    baseUrl: 'http://localhost:8000',
    headers: {},
    data: {}, // post请求的时候，请求体中的内容
  }
  options = { ...defaultOption, ...options, headers: { ...defaultOption.headers, ...(options.headers || {}) } };
  return new Promise((resolve: Function, reject: Function) => {
    let xhr = new XMLHttpRequest();
    xhr.open(options.method!, options.baseUrl + options.url);
    for (let key in options.headers) {
      xhr.setRequestHeader(key, options.headers[key])
    }
    xhr.responseType = 'json';
    xhr.upload.onprogress = options.onProgress;
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.response)
        } else {
          reject(xhr.response)
        }
      }
    };
    if(options.setXHR) {
      options.setXHR(xhr)
    }
    xhr.send(options.data);
  })
}