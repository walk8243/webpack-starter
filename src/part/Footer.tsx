import React from 'react';

import '../sass/footer.scss';

export default class Footer extends React.Component<FooterProps> {
	private footer: HTMLElement | null = null;
	static readonly defaultProps = {
		visible: true,
	};

	constructor(props: FooterProps) {
		super(props);
	}

	render() {
		return this.props.visible ? (
			<footer id="footer">
				<p>© 2020 walk8243.</p>
			</footer>
		) : (
			<footer />
		);
	}

	componentDidMount() {
		this.footer = document.getElementById('footer');
	}

	getHeaderHeight() {
		if(this.footer == null) {
			return 0;
		} else {
			return this.footer.clientHeight;
		}
	}
}

export type FooterProps = {
	visible: boolean,
};
