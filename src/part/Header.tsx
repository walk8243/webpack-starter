import React from 'react';
import { MDCTopAppBar } from '@material/top-app-bar';
import Menu from './Menu';

import '../sass/header.scss';

export default class Header extends React.Component<HeaderProps, HeaderState> {
	private header: MDCTopAppBar | null = null;
	private menuRef: React.RefObject<Menu>;
	static readonly defaultProps = {
		visible: true,
		topbarClass: 'mdc-top-app-bar',
		title: '',
	};

	constructor(props: HeaderProps) {
		super(props);
		this.state = {
			height: 0,
		};

		this.menuRef = React.createRef<Menu>();

		this.openMenu = this.openMenu.bind(this);
	}

	render() {
		return this.props.visible ? (
			<header id="header" className={this.props.topbarClass!}>
				<div className="mdc-top-app-bar__row">
					<section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
						<button
								className="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button"
								aria-label="Open navigation menu"
								onClick={this.openMenu}
							>
							menu
						</button>
						<span className="mdc-top-app-bar__title">{this.props.title}</span>
					</section>
				</div>
				<Menu ref={this.menuRef} />
			</header>
		) : (
			<header />
		);
	}

	protected openMenu() {
		this.menuRef.current?.openMenu();
	}

	componentDidMount() {
		if(!this.props.visible) return;
		this.header = new MDCTopAppBar(document.getElementById('header')!);
		this.menuRef.current?.setPosition(0, this.getHeaderHeight());
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
	topbarClass?: string,
	title?: string,
};

export type HeaderState = {
	height: number,
};
