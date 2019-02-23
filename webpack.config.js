const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
		main: './src/client/application.js',
	},
    output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	devServer: {
		historyApiFallback: true,
		port: 3000,
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: "babel-loader",
			}
		}, {
			test: /\.(sa|sc|c|le)ss$/,
			loaders: ['style-loader', 'css-loader', 'sass-loader']
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/client/index.html',
		}),
	]
};