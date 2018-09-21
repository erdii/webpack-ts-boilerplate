const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = async (_env, argv) => {
	// we don't use env, but arg.mode is either "production" or "development"
	const isDev = argv.mode === "development";

	const config = {
		entry: "./src/index.ts",
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: "ts-loader",
					exclude: /node_modules/,
				},
				{
					test: /\.css$/,
					use: [
						isDev ? "style-loader" : MiniCssExtractPlugin.loader,
						"css-loader",
					],
				},
			],
		},
		resolve: {
			extensions: [".tsx", ".ts", ".js"],
		},
		plugins: [
			new CleanWebpackPlugin([path.resolve(__dirname, "dist")]),
			new HtmlWebpackPlugin({
				title: "webpack-ts-boilerplate"
			}),
			new MiniCssExtractPlugin({
				filename: isDev ? "static/css/[name].css" : "static/css/[name].[contenthash].css",
				chunkFilename: isDev ? "static/css/[id].css" : "static/css/[id].[contenthash].css",
			}),
			new webpack.HashedModuleIdsPlugin(),
		],
		output: {
			filename: isDev ? "static/js/[name].js" : "static/js/[name].[contenthash].js",
			chunkFilename: isDev ? "static/js/[id].chunk.js" : "static/js/[id].[contenthash].chunk.js",
			path: path.resolve(__dirname, "dist"),
			publicPath: "/",
		},
		optimization: {
			runtimeChunk: "single",
			splitChunks: {
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name: "vendors",
						chunks: "all",
					},
				},
			},
		},

		devtool: isDev ? "eval-source-map" : "source-map",
		devServer: {
			contentBase: path.resolve(__dirname, "dist"),
			hot: true,
		}
	};

	if (isDev) {
		config.plugins.push(new webpack.HotModuleReplacementPlugin());
	}

	return config;
}
