const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const IS_PROD = process.env.NODE_ENV === 'production';

const CHUNK_GAME = 'game';
const CHUNK_ENNJ = 'ennj';
const CHUNK_VENDOR = 'vendor';

module.exports = {
    mode: IS_PROD ? 'production' : 'development',
    devtool: 'inline-source-map',
    entry: {
        [CHUNK_GAME]: './src/game/main.ts'
    },
    resolve: {
        extensions: ['.js', '.ts', '.vs', '.fs']
    },
    module: {
        rules: [{
            test: /\.ts$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
        }, {
            test: /\.(vs|fs)$/,
            use: 'raw-loader'
        }]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: CHUNK_VENDOR,
                    chunks: 'all'
                },
                ennj: {
                    test: /[\\/]src\/ennj[\\/]/,
                    name: CHUNK_ENNJ,
                    chunks: 'all'
                }
            }
        },
        runtimeChunk: 'single'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'head'
        }),
        new CopyWebpackPlugin([
            './src/styles.css'
        ])
    ],
    devServer: {
        contentBase: './res',
        contentBasePublicPath: '/res'
    }
};
