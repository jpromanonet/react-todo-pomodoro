const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfigs = require('./webpack.base.config.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = webpackMerge(baseConfigs, {
  devServer: {
    port: 3000,
    host: '0.0.0.0',
    disableHostCheck: true,
    historyApiFallback: true,
  },

	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, '../index.html'),
		}),
	],
});

