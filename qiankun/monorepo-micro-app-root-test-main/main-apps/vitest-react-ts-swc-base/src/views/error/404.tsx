import React, { type ReactElement } from 'react';

export default function NoMatch(props: any, context?: any): ReactElement<any, any> | null {
	const { location }: any = props;

	return (
		<>
			<h3 className="error">404!</h3>
			<p>
				No match for <code>{location.pathname}</code>
			</p>
		</>
	);
}
