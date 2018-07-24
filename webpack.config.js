const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry: {
        app: './src/index.js',
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: '测试webpack页面标题'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    mode: 'development',
    // mode: 'production',
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
        }]
    }
}