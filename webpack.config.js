const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const parentDirectory = __dirname;
const clientDirectory = path.join(parentDirectory, 'client');
const clientOutputDirectory = path.join(clientDirectory, 'dist');

const mode = 'development';

module.exports = {
    name: 'client',
    target: 'web',
    entry: path.join(clientDirectory, 'index.jsx'),
    mode,
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: [
                    clientDirectory,
                ],
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                include: [
                    clientDirectory,
                ],
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                    'sass-loader',
                ],
            },
        ],
    },
    output: {
        path: clientOutputDirectory,
        filename: 'bundle.js',
    },
    plugins: [
        new CleanWebpackPlugin([clientOutputDirectory]),
        new HtmlWebpackPlugin({
            template: path.join(clientDirectory, 'index.html'),
            favicon: path.join(clientDirectory, 'favicon.ico'),
            meta: { viewport: 'width=device-width, initial-scale=1' },
        }),
    ],
    resolve: {
        extensions: ['*', '.webpack.js', '.web.js', '.js', '.json', '.jsx'],
    },
    serve: {
        content: clientOutputDirectory,
        port: 8080,
    },
};
