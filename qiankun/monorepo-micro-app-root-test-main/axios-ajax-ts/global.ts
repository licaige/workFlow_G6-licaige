// 自动添加请求模块
let result = {};
const Apis = import.meta.glob('./module/*.ts');

for (const path in Apis) {
	// 构造函数对象
	const className = Apis[path].default;
	// modules[path.replace(/\.\/\modules\/|\.js/g, '')]
	const { name } = className;
	result[name] = className;
}

export default result;
