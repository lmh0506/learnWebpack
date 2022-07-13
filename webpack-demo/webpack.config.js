const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'production',
  devtool: 'eval-cheap-module-source-map',
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
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.uglifyJsMinify,
        // `terserOptions` options will be passed to `uglify-js`
        // Link to options - https://github.com/mishoo/UglifyJS#minify-options
        terserOptions: {},
      }),
    ],
    splitChunks: {
      chunks: 'async',
      minChunks: 3,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
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
    new MiniCssExtractPlugin({
      filename: "style.css"
    })
  ]
}