const ApiCommon = [
	{
		name: 'getGlobals',
		url: '/api/global',
		method: 'get',
	},
	{
		name: 'getWeathers',
		url: '/api/weathers',
		method: 'get',
	},
	{
		name: 'getTeamsMsg',
		url: '/api/teams',
		method: 'get',
	},
	{
		name: 'getActivities',
		url: '/api/activities',
		method: 'get',
	},
	{
		name: 'getArticleList',
		url: '/api/articles',
		method: 'get',
	},
	{
		name: 'getArticleCon',
		url: `/api/articles/`, // :${id}
		method: 'get',
	},
	{
		name: 'addArticle', // 更新token
		url: '/api/articles',
		method: 'post',
	},
	{
		name: 'editArticle',
		url: `/api/articles/`, // ${id}
		method: 'put',
	},
	{
		name: 'delArticle',
		method: 'delete',
		url: `/api/articledel/`, // ${id}
	},
	{
		name: 'updateTpls',
		method: 'post',
		url: '/api/templates',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		formdata: true,
	},
];

export default ApiCommon;
