const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './windows/index.ts',
        background: './windows/background.ts',
        in_game: './windows/in_game.ts'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.ts?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.ts']
    },
    output: {
        path: `${__dirname}/dist`,
        filename: 'windows/[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './windows/index.html',
            filename: `${__dirname}/dist/windows/index.html`,
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            template: './windows/background.html',
            filename: `${__dirname}/dist/windows/background.html`,
            chunks: ['background']
        }),
        new HtmlWebpackPlugin({
            template: './windows/in_game.html',
            filename: `${__dirname}/dist/windows/in_game.html`,
            chunks: ['in_game']
        })
    ]
}