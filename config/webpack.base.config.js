const webpack = require('webpack');
const path = require('path');

const publicPath = '/';
const srcPath = path.join(__dirname, '../src');
const outputPath = path.resolve(__dirname, '../');


const config = {
	entry: [
		path.join(srcPath, 'index.js'),
	],

	output: {
		path: outputPath,
		publicPath: publicPath,
		filename: 'bundle-[hash].js',
	},

	resolve: {
		modules: [
			srcPath,
			path.resolve(__dirname, '../node_modules'),
		],
		extensions: ['.js', '.jsx'],
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'env',
							'react',
							'es2015',
							'stage-0',
						],
					},
				},
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
				],
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader',
				],
			},
			{
				test: /\.pcss$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
						},
					},
					'postcss-loader',
				],
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loader: 'url-loader',
				query: {
					name: '[name].[hash].[ext]',
					outputPath: 'images/',
					publicPath: publicPath,
				},
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				loader: 'file-loader',
				query: {
					name: '[name].[hash].[ext]',
					outputPath: 'fonts/',
				},
			},
		],
	},

};

module.exports = config;
