const path = require('path');
const baseDir = path.resolve(__dirname);

module.exports = setting = [
	...[ './src/js/index.js' ].map(getJsSetting),
	...[ './src/sass/style.scss' ].map(getStyleSetting),
];

function getJsSetting(targetFile) {
	const filename = path.relative(path.resolve(baseDir, './src/js'), targetFile);
	return {
		entry: targetFile,
		output: {
			path: baseDir,
			filename: filename
		},
		module: {
			rules: [{
				test: /\.m?js$/,
				use: [{
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}]
			}]
		},
	};
}

function getStyleSetting(targetFile) {
	const filepathObject = path.parse(path.relative(path.resolve(baseDir, './src/sass'), targetFile));
	return {
		entry: targetFile,
		output: {
			path: baseDir,
			filename: `style-bundle-${path.join(filepathObject.dir, filepathObject.name).replace(['/', '\\'], '_')}.js`,
		},
		module: {
			rules: [{
				test: /\.s[ac]ss$/i,
				use: getStyleUse(path.join(filepathObject.dir, filepathObject.name+'.css'))
			}]
		},
	};
}

function getStyleUse(bundleFilename) {
	return [
		{
			loader: 'file-loader',
			options: {
				name: bundleFilename,
			},
		},
		{ loader: 'extract-loader' },
		{ loader: 'css-loader' },
		{
			loader: 'sass-loader',
			options: {
				implementation: require('sass'),
				sassOptions: {
					includePaths: ['./node_modules'],
					fiber: require('fibers'),
				},
			}
		},
	];
}
