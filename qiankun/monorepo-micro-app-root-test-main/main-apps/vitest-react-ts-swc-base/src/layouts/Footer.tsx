import React from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;

export default function Foot(props: any, context?: any): React.ReactElement<any, any> {
	return (
		<Footer className="foot">
			Explorer Design ©{new Date().getFullYear()} Created by &nbsp;
			<a
				href="https://github.com/Explorer-Wu"
				target="_blank"
			>
				Explorer Wu
			</a>
			<style>{`
				.foot {
					with: 100%;
					line-height: 36px;
					padding: 10px 50px;
					text-align: center;
					font-size: 10px;
				}
			`}</style>
		</Footer>
	);
}
