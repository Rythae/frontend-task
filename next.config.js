const withSass = require('@zeit/next-sass');
module.exports = withSass({
	cssModules: true,
	cssLoaderOptions: {
		importLoaders: 1,
		localIdentName: '[local]__[hash:base64:5]',
	},
	sassLoaderOptions: {
		includePaths: ['theme'],
		outputStyle: 'compressed',
	},
	postcssLoaderOptions: {
		autoprefixer: true,
	},
});