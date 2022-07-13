const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    main: './src/js/main.js',
    lmh: './src/js/lmh.js',
    app: './src/app.js'
  }, // 入口文件
  output: { // 输出配置
    path: path.join(__dirname, '/dist'), // 输出的路径  必须要引用path模块使用绝对路径
    filename: 'js/[name].js' // 输出的文件名
    // publicPath: 'http://cdn.com' // 发布上线后的文件地址
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        include: path.join(__dirname, './src/')
      },
      {
        test: /\.html$/,
        use: 'html-loader',
        exclude: /(node_modules|bower_components)/,
        include: path.join(__dirname, './src/components/')
      },
      {
        test: /\.tpl$/,
        use: [
          {
            loader: 'ejs-loader',
            options: {
              esModule: false,
              variable: 'date'
            }
          }
        ],
        exclude: /(node_modules|bower_components)/,
        include: path.join(__dirname, './src/components/')
      },
      {
        test: /\.(scss|css)$/,
        use: [{
            loader: "style-loader" // 将 JS 字符串生成为 style 节点
          }, {
            loader: "css-loader", // 将 CSS 转化成 CommonJS 模块
            options: { // 查询参数 importLoaders，用于配置「css-loader 作用于 @import 的资源之前」有多少个 loader。
              importLoaders: 1 // 0 => 无 loader(默认); 1 => postcss-loader; 2 => postcss-loader, sass-loader
            }
          }, {
            loader: 'postcss-loader'
          },{
            loader: "sass-loader" // 将 Sass 编译成 CSS
        }]
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        },{
          loader: 'image-webpack-loader'
        }],
        exclude: /(node_modules|bower_components)/,
        include: path.join(__dirname, './src/assets/')
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]-[hash:5].[ext]',
            outputPath: 'images/'
          }
        },
        exclude: /(node_modules|bower_components)/,
        include: path.join(__dirname, './src/assets/')
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
      template: 'index.html', // html文件模板
      filename: 'all.html', // 输出的文件名
      inject: 'head', // script标签插入位置
      minify: { // 压缩文件
        removeComments: true, // 删除注释
        collapseWhitespace: true // 删除空格
      }
    }),
    new htmlWebpackPlugin({
      template: 'index.html', // html文件模板
      filename: 'index.html', // 输出的文件名
      chunks: ['app', 'main'], // html引用的js
      minify: { // 压缩文件
        removeComments: true, // 删除注释
        collapseWhitespace: true // 删除空格
      }
    }),
    new htmlWebpackPlugin({
      template: 'index.html', // html文件模板
      filename: 'lmh.html', // 输出的文件名
      inject: 'head', // script标签插入位置
      chunks: ['app', 'lmh'], // html引用的js
      minify: { // 压缩文件
        removeComments: true, // 删除注释
        collapseWhitespace: true // 删除空格
      }
    }),
    new htmlWebpackPlugin({
      template: 'index.html', // html文件模板
      filename: 'exclude.html', // 输出的文件名
      inject: 'head', // script标签插入位置
      excludeChunks: ['app'], // html不引用的js  适用于生成的js过多的情况下
      minify: { // 压缩文件
        removeComments: true, // 删除注释
        collapseWhitespace: true // 删除空格
      }
    }),
  ]
}