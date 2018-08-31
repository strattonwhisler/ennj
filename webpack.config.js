const path = require('path');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    context: __dirname,
    node: {
        __filename: true
    },
    entry: {
        game: './test/Main.ts'
    },
    module: {
        rules: [{
            test: /\.ts?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
        }, {
            test: /\.(vs|fs)$/,
            use: 'raw-loader'
        }]
    },
    resolve: {
        extensions: ['.ts'],
        alias: {
            ennj: path.join(__dirname, 'src')
        },
    },
    plugins: [
        // new UglifyJSPlugin({
        //     uglifyOptions: {
        //         ecma: 6
        //     }
        // })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
