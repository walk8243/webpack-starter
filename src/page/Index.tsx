import React from 'react';
import Common from '../lib/CommonComponent';

import '../sass/page/home.scss';

export default class Index extends Common {
	static readonly BASE_PAGE_TITLE = 'React With TypeScript';

	render() {
		return (
			<div className="page home">
				<p>Hello React With TypeScript!</p>
			</div>
		)
	}
}

Index.renderApp();
