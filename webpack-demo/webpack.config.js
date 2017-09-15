const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: { // 多页面需要多路口
    vendor: ['jquery', './src/js/common.js'],
    index: './src/js/index.js',
    cart: './src/js/cart.js'
  },
  output: { // 输出入口
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].js',
    publicPath: '' // 一般用于cdn文件前缀
  },
  module: { // 需要用到的解析模块
    rules: [
      {
        test: /\.css$/,
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['./dist'], {
      root: path.join(__dirname, ''),
      verbose: true,
      dry: false
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      chunks: ['index', 'vendor'],
      minify: { // 压缩html文件
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'cart.html',
      template: './src/cart.html',
      chunks: ['cart', 'vendor'],
      minify: { // 压缩html文件
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new webpack.ProvidePlugin({ // 加载第三方库
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new webpack.optimize.CommonsChunkPlugin({ // 抽取公共部分
      name: 'vendor',
      chunks: ['index', 'cart', 'vendor'],
      minChunks: 3
    }),
    new webpack.optimize.UglifyJsPlugin({ // 压缩文件
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('style.css')
  ],
  devtool: '#source-map'
}