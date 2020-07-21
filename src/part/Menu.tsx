import React from 'react';

export default class Menu extends React.Component<MenuProps, MenuState> {
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
}

export type MenuProps = {};
export type MenuState = {};
