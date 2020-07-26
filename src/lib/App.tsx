import React from 'react';
import { render } from 'react-dom';
import Common from './CommonComponent';
import Header from '../part/Header';
import Footer from '../part/Footer';

import '../sass/style.scss';

export default class App extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = {
			windowHeight: 0,
			headerHeight: 0,
			footerHeight: 0,
		};
	}

	render() {
		return (
			<>
				<Header visible={this.props.header} root={this} title={this.props.main.BASE_PAGE_TITLE} />
				<div id="main" className="container" style={{ paddingTop: this.state.headerHeight, minHeight: this.state.windowHeight - this.state.footerHeight }}>
					<main>
						<this.props.main root={this} />
					</main>
				</div>
				<Footer visible={this.props.footer} root={this} />
			</>
		);
	}

	static renderApp(main: AppProps['main'], id: string = 'root') {
		const isFrame = main.isFrameVisible();
		render(<this main={main} header={isFrame.header} footer={isFrame.footer} />, document.getElementById(id));
	}

	componentDidMount() {
		this.setState({ windowHeight: window.innerHeight });
	}
}

export type AppProps = {
	header: boolean,
	footer: boolean,
	main: typeof Common,
};

export type AppState = {
	windowHeight: number,
	headerHeight: number,
	footerHeight: number,
};
