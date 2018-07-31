import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

const parentDir = path.join(__dirname, '../');
const outputDirectory = `${parentDir}/client/dist/`;

export default {
    entry: [
        path.join(parentDir, '/client/index.js'),
    ],
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.less$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    output: {
        path: `${parentDir}/client/dist`,
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: parentDir,
        historyApiFallback: true,
    },
    plugins: [
        new CleanWebpackPlugin([outputDirectory]),
        new HtmlWebpackPlugin({
            template: './client/index.html',
            favicon: './client/favicon.ico',
        }),
    ],
};
