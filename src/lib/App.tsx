import React from 'react';
import { render } from 'react-dom';
import Common from '../lib/CommonComponent';
import Header from '../part/Header';
import Footer from '../part/Footer';

import '../sass/style.scss';

export default class App extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = {
			headerHeight: 0,
		};
	}

	render() {
		return (
			<React.Fragment>
				<header>
					<Header visible={this.props.header} root={this} />
				</header>
				<div id="main" className="container" style={{ paddingTop: this.state.headerHeight }}>
					<main>
						<this.props.main root={this} />
					</main>
					<footer>
						<Footer visible={this.props.footer} root={this} />
					</footer>
				</div>
			</React.Fragment>
		);
	}

	static renderApp(main: AppProps['main'], id: string = 'root') {
		const isFrame = main.isFrameVisible();
		render(<this main={main} header={isFrame.header} footer={isFrame.footer} />, document.getElementById(id));
	}
}

export type AppProps = {
	header: boolean,
	footer: boolean,
	main: typeof Common,
};

export type AppState = {
	headerHeight: number,
};
