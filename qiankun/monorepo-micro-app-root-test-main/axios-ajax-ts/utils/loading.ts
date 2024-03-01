import { debounce } from 'lodash-es';

//防抖：将 300ms 间隔内的关闭 loading 便合并为一次。防止连续请求时， loading闪烁的问题。
export const debHideLoading = debounce(
	(that: any) => {
		if (that.otherOpts?.loading) {
			that.otherOpts.closeLoading();
		}
		that.loading = false;
	},
	300, // 需要延迟的毫秒数
	{
		maxWait: 600, // 允许被延迟的最大值
		leading: false, // 指定在延迟开始前调用
		trailing: true, // 指定在延迟结束后调用
	},
);

//显示loading
export function showLoading(fhttp: any, that: any, target?: string): void {
	// 这个判断很重要，因为关闭时加了抖动，此时loading对象可能还存在，
	// 但loadingReqCount已经变成0.避免这种情况下会重新创建个loading
	if (fhttp.loadingReqCount === 0 && !that.loading) {
		that.otherOpts.loading(target || 'body');
	}
	fhttp.loadingReqCount++;
}

//隐藏loading
export function hideLoading(fhttp: any, that: any) {
	fhttp.loadingReqCount--;
	// 做个保护
	fhttp.loadingReqCount = Math.max(fhttp.loadingReqCount, 0);
	if (fhttp.loadingReqCount === 0) {
		//关闭loading
		debHideLoading(that);
	}
}
