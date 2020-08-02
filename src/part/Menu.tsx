import React from 'react';
import { MDCMenu } from '@material/menu';

export default class Menu extends React.Component<MenuProps, MenuState> {
	private menu: MDCMenu | null = null;

	constructor(props: MenuProps) {
		super(props);
	}

	render() {
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

	componentDidMount() {
		this.menu = new MDCMenu(document.querySelector('.mdc-menu')!);
	}

	openMenu() {
		if(this.menu) this.menu.open = true;
	}

	setPosition(x: number, y: number) {
		this.menu?.setAbsolutePosition(x, y);
	}
}

export type MenuProps = {};
export type MenuState = {};
