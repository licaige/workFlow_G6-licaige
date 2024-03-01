import React from 'react';
import { Layout, Flex, Spin, Typography } from 'antd';
import { iteratee } from 'lodash-es';

interface LaodingProps {
	isLoad: boolean;
	text?: string;
}
export default function Loading({ isLoad, text }: LaodingProps) {
	// if (!isLoad) return null;

	return (
		<>
			{isLoad && (
				<Layout>
					<Flex align="center" gap="middle">
						<div className="loader" style={{ width: '100vw', height: '100vh' }}>
							<Spin size="large" />
							{text ? <Typography.Text style={{ marginTop: 30 }}>{text}</Typography.Text> : null}

							<style>{`
								.loader {
									display: flex;
									flex-direction: column;
									justify-content: center;
									align-items: center;
								}
							`}</style>
						</div>
					</Flex>
				</Layout>
			)}
		</>
	);
}
