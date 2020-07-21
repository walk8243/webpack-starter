import React from 'react';
import App from './App';

export default class CommonComponent<P extends CommonComponentProps = CommonComponentProps> extends React.Component<P> {
	static readonly BASE_PAGE_TITLE: string = 'Birthday Message Page';
	static readonly isFrame?: isFrameVisible;

	constructor(props: P) {
		super(props);
	}

	componentDidMount() {
		this.setTitle();
	}

	setTitle(title?: string, isSiteName: boolean = true) {
		if(title) {
			if(isSiteName) {
				document.title = `${title} | ${CommonComponent.BASE_PAGE_TITLE}`;
			} else {
				document.title = title;
			}
		} else {
			document.title = CommonComponent.BASE_PAGE_TITLE;
		}
	}

	static renderApp() {
		App.renderApp(this);
	}

	static isFrameVisible() {
		return {
			header: this.isFrame == undefined ? true : (typeof this.isFrame == 'boolean' ? this.isFrame : (this.isFrame.header == undefined ? true : this.isFrame.header)),
			footer: this.isFrame == undefined ? true : (typeof this.isFrame == 'boolean' ? this.isFrame : (this.isFrame.footer == undefined ? true : this.isFrame.footer)),
		};
	}
}

export type isFrameVisible = boolean | { header?: boolean, footer?: boolean };

export type CommonComponentProps = {
	root: App,
};
