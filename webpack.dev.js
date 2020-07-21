const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
    mode: 'development',
	devServer: {
		port: 9000,
		serveIndex: false,
		historyApiFallback: true,
	},
});
