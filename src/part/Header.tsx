import React from 'react';
import { MDCTopAppBar } from '@material/top-app-bar';
import { MDCMenu } from '@material/menu';
import App from '../lib/App';

import '../sass/header.scss';

export default class Header extends React.Component<HeaderProps, HeaderState> {
	private header: MDCTopAppBar | null = null;
	private menu: MDCMenu | null = null;
	static readonly defaultProps = {
		visible: true,
		topbarClass: 'mdc-top-app-bar',
		title: '',
	};

	constructor(props: HeaderProps) {
		super(props);
		this.state = {
			menuOpen: false,
			height: 0,
		};

		this.operateMenu = this.operateMenu.bind(this);
	}

	render() {
		return this.props.visible ? (
			<header id="header" className={this.props.topbarClass!}>
				<div className="mdc-top-app-bar__row">
					<section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
						<button
								className="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button"
								aria-label="Open navigation menu"
								onClick={this.operateMenu}
							>
							menu
						</button>
						<span className="mdc-top-app-bar__title">{this.props.title}</span>
					</section>
				</div>
				{this.renderMenu()}
			</header>
		) : (
			<header />
		);
	}

	renderMenu() {
		return (
			<div className="mdc-menu mdc-menu-surface">
				<nav>
					<ul className="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical">
						<li className="mdc-list-item" role="menuitem">
							<a href="/home">Home</a>
						</li>
					</ul>
				</nav>
			</div>
		);
	}

	protected operateMenu() {
		if(this.menu) this.menu.open = !this.state.menuOpen;
		this.setState({ menuOpen: !this.state.menuOpen });
	}

	componentDidMount() {
		if(!this.props.visible) return;
		this.header = new MDCTopAppBar(document.querySelector(`.${this.props.topbarClass!}`)!);
		this.menu = new MDCMenu(document.querySelector('.mdc-menu')!);
		this.menu.setAbsolutePosition(0, this.getHeaderHeight());
		this.props.root.setState({ headerHeight: this.getHeaderHeight() });
	}

	getHeaderHeight() {
		if(this.header == null) {
			return 0;
		} else {
			return this.header.getDefaultFoundation()['adapter'].getTopAppBarHeight();
		}
	}
}

export type HeaderProps = {
	visible: boolean,
	root: App,
	topbarClass?: string,
	title?: string,
};

export type HeaderState = {
	menuOpen: boolean,
	height: number,
};
