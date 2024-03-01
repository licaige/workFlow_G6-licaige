import React, { PureComponent } from 'react';
import HistoryRule from '@/router/history';
class NoAccess extends PureComponent {
	render() {
		console.log('No Acces:', this.props);
		return (
			<>
				<h3>403!</h3>
				<p>
					No Access for <code>{location.pathname}</code>
				</p>
			</>
		);
	}
}

export default NoAccess;
