const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "production",
    entry: {
        popup: path.resolve(__dirname, "..", "src", "popup.ts"),
    },
    output: {
        path: path.join(__dirname, "../dist"),
        filename: "[name].js",
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "public", to: ".", globOptions: { ignore: ["**/*.ts"] } },
            ],
        }),
        new HtmlWebpackPlugin({
            template: "./src/popup.html",
            filename: "popup.html",
            chunks: ["popup"],
        })
    ],
};
