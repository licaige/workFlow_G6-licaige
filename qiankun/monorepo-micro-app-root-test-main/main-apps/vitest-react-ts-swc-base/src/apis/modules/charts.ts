import { asyncModuleApi } from '../index';
import type { ApiFnMap } from '../../typings/axios';

const ApiChartOpts = [
	{
		name: 'getCapacityData',
		method: 'get',
		url: '/api/charts/capacity',
	},
	{
		name: 'getVisitsData',
		method: 'get',
		url: '/api/charts/visits',
	},
	{
		name: 'getVsStatus',
		method: 'get',
		url: '/api/charts/status',
		// params: {
		// 	type: type
		// },
	},
];

export const ApiChart: ApiFnMap = asyncModuleApi(ApiChartOpts);
