const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const parentDirectory = __dirname;
const clientDirectory = path.join(parentDirectory, 'client');
const serverDirectory = path.join(parentDirectory, 'server');
const clientOutputDirectory = path.join(clientDirectory, 'dist');
const serverOutputDirectory = path.join(serverDirectory, 'dist');

const mode = 'development';

const clientConfig = {
    name: 'client',
    entry: path.join(clientDirectory, 'index.jsx'),
    mode,
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
        }),
    ],
    resolve: {
        extensions: ['*', '.webpack.js', '.web.js', '.js', '.json', '.jsx'],
    },
};

const serverConfig = {
    name: 'server',
    target: 'node',
    entry: path.join(serverDirectory, 'index.js'),
    mode,
    module: {
        rules: [
            {
                test: /\.(js)$/,
                include: [
                    serverDirectory,
                ],
                loader: 'babel-loader',
            },
        ],
    },
    output: {
        path: serverOutputDirectory,
        filename: 'bundle.js',
    },
    plugins: [
        new CleanWebpackPlugin([serverOutputDirectory]),
    ],
};

module.exports = [serverConfig, clientConfig];
