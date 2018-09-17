
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        app: './client/index.js',
    },
    devServer: {
        contentBase: './dist',
        historyApiFallback: true, // location改变有hashchange效果 不是get requrest
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Pob',
            template: "./public/index.html",
            filename: "./index.html"
        })
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [{                                   // css loader
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.(png|svg|jpg|gif)$/,           // image loader
            use: [
                'file-loader'
            ]
        }, {
            test: /\.(woff|woff2|eot|ttf|otf)$/,    // font loader
            use: [
                'file-loader'
            ]
        }, {
            test: /\.(csv|tsv)$/,                   // data loader
            use: [
                'csv-loader'
            ]
        }, {
            test: /\.xml$/,
            use: [
                'xml-loader'
            ]
        }, {                                         // babel loader
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {                                         // html loader
            test: /\.html$/,
            use: [
                {
                    loader: "html-loader"
                }
            ]
        }]
    }
}