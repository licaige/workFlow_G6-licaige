import React from 'react';
import { message, Popconfirm } from 'antd';
import HistoryRule from '@/router/history';
// import { $Api } from '../api'

export default function SignOut() {
	const confirm = () => {
		const { LinkTo, Location } = HistoryRule();
		// const { from } = Location.pathname || { from: { pathname: '/login' } };
		LinkTo('/login', { replace: true });
		// window.location.href = "/login";
		// $Api.logout()
		// .then((res) => {
		//     console.log("logoutRes:", res);
		//     this.props.history.replace(from);
		// })
		// .catch(function (error) {
		//     console.log(error);
		// });
	};

	const cancel = () => {
		message.error('取消退出！');
	};

	return (
		<>
			<Popconfirm title="确定要退出登录吗?" onConfirm={confirm} onCancel={cancel} okText="退出" cancelText="取消">
				<span>注销</span>
			</Popconfirm>
		</>
	);
}
