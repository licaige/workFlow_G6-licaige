import React, { Component } from 'react';
import HistoryRule, { usePrevious } from '@/router/history';

function NoMatch() {
	const { Location }: any = HistoryRule();
	// const prevLocation = usePrevious(history);
	console.log('No match:', location, Location, history);
	return (
		<>
			<h3>404!</h3>
			<p>
				No match for <code>{Location.pathname}</code>
			</p>
		</>
	);
}

export default NoMatch;
