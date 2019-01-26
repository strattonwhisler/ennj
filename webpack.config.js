const path = require('path');

module.exports = {
    context: __dirname,
    node: {
        __filename: true
    },
    entry: {
        game: './test/main.ts'
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
    resolve: {
        extensions: ['.ts'],
        alias: {
            ennj: path.join(__dirname, 'src')
        },
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
