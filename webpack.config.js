const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const baseDir = path.resolve(__dirname);
const srcDir = path.join(baseDir, './src');
const targetExtensions = [ '.ts', '.tsx', '.js', '.jsx' ];
const targetExtensionRegExp = new RegExp(`\.(${targetExtensions.map((e) => e.slice(1)).join('|')})$`);

const pages = getPages(path.join(srcDir, './page')).reduce((previous, current) => { return { ...previous, [current.entrypoint]: current.filepath }; }, {});

module.exports = setting = {
	entry: {
		'_index': path.join(srcDir, './index.tsx'),
		...pages,
	},
	output: {
		path: path.resolve(baseDir, './dist'),
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [{
					loader: 'ts-loader',
				}]
			},
			{
				test: /\.s[ac]ss$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							implementation: require('sass'),
							sassOptions: {
								includePaths: [ './node_modules' ],
								fiber: require('fibers'),
							},
						}
					},
				]
			},
			{
				test: /\.(jpe?g|png)$/,
				loaders: 'file-loader?name=[name].[ext]'
			}
		],
	},
	resolve: {
		extensions: targetExtensions,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(srcDir, './index.html'),
			chunks: []
		}),
		new FaviconsWebpackPlugin(path.join(srcDir, './img/favicon.svg')),
	],
};

function getPages(dirpath) {
	const files = getFiles(dirpath);
	return files.map((file) => {
		const filepath = path.resolve(file.path, file.name);
		return {
			filepath,
			entrypoint: convertRequestPath(path.relative(dirpath, filepath)),
		};
	});
}

function getFiles(dirpath) {
	const files = fs.readdirSync(dirpath, { withFileTypes: true });
	return files.map((file) => {
		return file.isDirectory() ? getFiles(`${dirpath}/${file.name}`)
			: {
				path: dirpath,
				name: file.name,
			};
	}).flat();
}

function convertRequestPath(filepath) {
	return filepath
			.replace('\\', '/')
			.split('/')
			.map((chunk) => {
				return (chunk[0].toLowerCase() + chunk.slice(1))
						.replace(/[A-Z]/g, (str) => '-'+str.toLowerCase());
			})
			.join('/')
			.replace(targetExtensionRegExp, '');
}
