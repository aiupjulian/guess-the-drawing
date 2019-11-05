const path = require('path');
const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
require('dotenv').config({ path: path.resolve(process.cwd(), '../../.env') });

const clientDirectory = __dirname;
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
        // SERVER CONFIG
        new DefinePlugin({
            SERVER_HOST: JSON.stringify(process.env.SERVER_HOST),
            SERVER_PORT: JSON.stringify(process.env.SERVER_PORT),
        }),
    ],
    resolve: {
        extensions: ['*', '.webpack.js', '.web.js', '.js', '.json', '.jsx'],
    },
    // CLIENT CONFIG
    serve: {
        content: clientOutputDirectory,
        host: process.env.CLIENT_HOST,
        port: process.env.CLIENT_PORT,
    },
};
