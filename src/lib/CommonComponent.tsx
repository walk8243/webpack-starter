import React from 'react';
import App from './App';

export default class CommonComponent<P extends CommonComponentProps = CommonComponentProps> extends React.Component<P> {
	static readonly BASE_PAGE_TITLE: string = 'Birthday Message Page';
	static readonly isFrame: isFrameVisible;

	constructor(props: P) {
		super(props);
	}

	componentDidMount() {
		this.setTitle();
	}

	setTitle(title?: string, isSiteName: boolean = true) {
		const baseTitle = (this.constructor as typeof CommonComponent).BASE_PAGE_TITLE;
		if(title) {
			if(isSiteName) {
				document.title = `${title} | ${baseTitle}`;
			} else {
				document.title = title;
			}
		} else {
			document.title = baseTitle;
		}
	}

	static renderApp() {
		App.renderApp(this);
	}

	static isFrameVisible() {
		return {
			header: this.isFrameByType('header'),
			footer: this.isFrameByType('footer'),
		};
	}

	protected static isFrameByType(type: 'header' | 'footer') {
		if(this.isFrame == undefined) {
			return true;
		} else if(typeof this.isFrame == 'boolean') {
			return this.isFrame;
		} else if(this.isFrame[type] == undefined) {
			return true;
		} else if(typeof this.isFrame[type] == 'boolean') {
			return this.isFrame[type] as boolean;
		} else {
			return true;
		}
	}
}

export type isFrameVisible = boolean | { header?: boolean, footer?: boolean } | undefined;

export type CommonComponentProps = {
	root: App,
};
