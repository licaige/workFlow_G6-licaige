import { AxiosRequestConfig } from 'axios';

// type ConfigPostStream = {
// 	data: string;
// 	url: string;
// };
// 上传流文件
const StreamPost = <T extends AxiosRequestConfig>(config: T) => {
	const url = config.url;
	const data = JSON.parse(config.data);
	const form: any = document.createElement('form');
	form.action = url;
	form.method = 'post';
	form.style.display = 'none';
	for (let [pkey, pvalue] of Object.entries(data as object)) {
		const input = document.createElement('input');
		input.name = pkey;
		input.value = pvalue;
		form.appendChild(input);
	}

	const button = document.createElement('input');
	button.type = 'submit';
	form.appendChild(button);
	document.body.appendChild(form);
	form.submit();
	document.body.removeChild(form);
};

// type ConfigGetStream = {
// 	params: object;
// 	baseURL?: string;
// 	url?: string;
// }; <T extends ConfigGetStream>(config: T)

// 读取流文件
function StreamGet<T extends AxiosRequestConfig>(config: T) {
	const params: Array<string> = [];
	// interface ConfigParams {
	// 	[key: string]: string
	// }  Object.entries(config.params as ConfigParams)

	for (let [pkey, pvalue] of Object.entries(config.params)) {
		params.push(`${pkey}=${pvalue}`);
	}
	const url = params.length ? `${config.baseURL || '' + config.url || ''}?${params.join('&')}` : `${config.baseURL || '' + config.url || ''}`;
	const iframe = document.createElement('iframe');
	iframe.style.display = 'none';
	iframe.src = url;
	iframe.onload = function () {
		document.body.removeChild(iframe);
	};
	document.body.appendChild(iframe);
}

// 下载文件
export const downloadFile = (res: any) => {
	const blob = new Blob([res.data]);
	// 兼容不同浏览器的URL对象
	const URL = window.URL || window.webkitURL || (window as any).mozURL;
	const downloadUrl = URL.createObjectURL(blob);
	// 创建下载链接
	let downLink = document.createElement('a');
	//设置下载的名称,根据后端res.headers里返回数据设定
	downLink.download = decodeURIComponent(res.headers['content-disposition']).split('=')[1];
	downLink.href = downloadUrl;
	downLink.style.display = 'none'; // 隐藏的可下载链接
	document.body.appendChild(downLink);
	downLink.click();
	// 然后移除
	document.body.removeChild(downLink);
	// 释放blob URL地址
	window.URL.revokeObjectURL(downloadUrl);
};

function downloadElement(blob: any, filename: string, reader?: any) {
	// 兼容不同浏览器的URL对象
	const URL = window.URL || window.webkitURL || (window as any).mozURL;

	// 创建a标签，用于跳转至下载链接
	const tempLink = document.createElement('a');
	tempLink.style.display = 'none';

	let blobURL;
	if (reader) {
		// 生成的base64编码
		blobURL = reader.result;
	} else {
		// 创建新的URL并指向File对象或者Blob对象的地址
		blobURL = URL.createObjectURL(blob);
	}

	tempLink.href = blobURL;
	tempLink.setAttribute('download', decodeURI(filename));
	// 兼容：某些浏览器不支持HTML5的download属性
	if (typeof tempLink.download === 'undefined') {
		tempLink.setAttribute('target', '_blank');
	}
	// 挂载a标签
	document.body.appendChild(tempLink);
	tempLink.click();
	document.body.removeChild(tempLink);
	if (!reader) {
		// 释放blob URL地址
		URL.revokeObjectURL(blobURL);
	}
}

function convertRes2Blob(response: any, type?: string) {
	// 提取文件名
	// const fileName = response.headers['content-disposition'].match(/filename=(.*)/)[1]
	const fileName = encodeURI(response.config.url.split('/').pop());
	// 将二进制流转为blob
	const streamBlob = new Blob([response.data], { type: 'application/octet-stream' });
	if (type === 'read') {
		let fileReader = new FileReader();
		// const zipBlob = new Blob([response.data], {type: 'application/zip'});
		// 传入被读取的blob对象
		fileReader.readAsDataURL(streamBlob);
		fileReader.onload = function () {
			try {
				let jsonData = JSON.parse(response.data);
				if (jsonData.code) {
					console.log(jsonData.msg);
				}
			} catch (err) {
				// 解析成对象失败，说明是正常的文件流
				downloadElement(streamBlob, fileName, fileReader);
			}
		};
		// fileReader.readAsText(streamBlob)
	} else {
		// 已经从标准中废弃
		// if (typeof window.navigator.msSaveBlob !== 'undefined') {
		// 	// 兼容IE，window.navigator.msSaveBlob：以本地方式保存文件
		// 	window.navigator.msSaveBlob(streamBlob, decodeURI(fileName));
		// }
		downloadElement(streamBlob, fileName);
	}
}

export { StreamPost, StreamGet, convertRes2Blob };
