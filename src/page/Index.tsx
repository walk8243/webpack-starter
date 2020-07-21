import React from 'react';
import Common from '../lib/CommonComponent';

import '../sass/page/home.scss';

export default class Index extends Common {
	render() {
		return (
			<div className="page home">
				<p>Hello React With TypeScript!</p>
			</div>
		)
	}
}

Index.renderApp();
