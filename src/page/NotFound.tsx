import React from 'react';
import Common from '../lib/CommonComponent';

export default class NotFound extends Common {
	render() {
		return (
			<div className="page">
				<p>NotFound!</p>
			</div>
		);
	}
}

NotFound.renderApp();
