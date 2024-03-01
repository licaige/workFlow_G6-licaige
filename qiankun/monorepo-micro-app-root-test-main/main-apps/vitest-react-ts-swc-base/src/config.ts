// 开发环境地址
const config: Record<string, string> = {
	mainreact: 'http://localhost:3600',
	sidebar: 'http://localhost:3606',
	subreact: 'http://localhost:3601',
	subvue3: 'http://localhost:3602',
	// nextjs: 'http://localhost:3008',
	// nuxtjs: 'http://localhost:3009',
};

// 线上环境地址
if (process.env.NODE_ENV === 'production') {
	// 基座应用和子应用部署在同一个域名下，这里使用location.origin进行补全
	Object.keys(config).forEach(key => {
		config[key] = window.location.origin;
	});

	// 在部署后，nextjs11和nuxtjs2依然和开发环境保持一致，绑定5006和6006端口，这里单独处理
	const { protocol, hostname } = window.location;
	config.nextjs = `${protocol}//${hostname}:5006`;
	config.nuxtjs = `${protocol}//${hostname}:6006`;
}

export default config;
