import React from 'react';
import { render } from 'react-dom';

export default class Index extends React.Component {
	render() {
		return (
			<div className="page home">
				<p>Hello React With TypeScript!</p>
			</div>
		)
	}
}

render(<Index />, document.getElementById('root'));
