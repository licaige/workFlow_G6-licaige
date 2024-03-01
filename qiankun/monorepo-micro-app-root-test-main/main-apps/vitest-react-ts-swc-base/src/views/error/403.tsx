import React, { Component } from 'react';

class NoAccess extends Component {
	render() {
		const { location }: any = this.props;
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
