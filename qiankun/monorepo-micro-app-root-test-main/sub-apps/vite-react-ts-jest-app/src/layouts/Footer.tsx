import React from "react";
// import { Layout } from 'antd';
// const { Footer } = Layout;

export default function Foot(props: any, context?: any): React.ReactElement<any, any> {
	return (
		<div className="foot">
			Explorer Design ©2022 Created by &nbsp;
			<a href="https://github.com/Explorer-Wu" target="_blank">
				Explorer Wu
			</a>
		</div>
	);
}
