(async () => {
	let pathname = location.pathname;
	if(/\/$/.test(pathname)) {
		pathname += 'index';
	}

	try {
		const response = await fetch(`${pathname}.js`);
		if(response.status != 200) { throw new Error(`status is not 200. [${response.status}]`); }

		const scriptTag = document.createElement('script');
		scriptTag.src = `${pathname}.js`;
		document.getElementsByTagName('body')[0].appendChild(scriptTag);
	} catch (error) {
		console.error(error);
		location.href = '/not-found';
	}
})();
