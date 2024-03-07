module.exports = {
	lintOnSave: false,
	productionSourceMap: false,
	devServer: {
		proxy: 'http://news-at.zhihu.com/api/4'
	}
};