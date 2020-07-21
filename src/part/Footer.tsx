import React from 'react';
import App from '../lib/App';

import '../sass/footer.scss';

export default class Footer extends React.Component<FooterProps> {
	static readonly defaultProps = {
		visible: true,
	};

	constructor(props: FooterProps) {
		super(props);
	}

	render() {
		return this.props.visible ? (
			<React.Fragment>
				<p>© 2020 walk8243.</p>
			</React.Fragment>
		) : (
			<React.Fragment />
		);
	}
}

export type FooterProps = {
	visible: boolean,
	root: App,
};
