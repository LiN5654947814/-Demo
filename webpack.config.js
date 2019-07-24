const path = require('path')

const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin.js')

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'), //入口文件 即需要打包的源代码
  mode: 'development',
  output: {
    filename: 'main.js', //会自动生成打包后的main.js在 dist中
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://www.liulongbin.top:3005/api/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    // 自动打开浏览器
    open: false,
    // 端口
    port: 8081,
    //指定托管的根目录
    contentBase: path.resolve(__dirname, 'dist'),
    // 启动热加载
    hot: true,
    // 此路径下的打包文件可以在浏览器访问
    publicPath: '/'
  },

  module: {
    //
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },

      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      {
        test: /\.(png|svg|jpg|gif|ttf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 102400, //设定图片的字节大小 可以把base64变成url
              name: '[hash:8]-[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), //热更新的模块对象

    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/dist/index.html'), //指定模版页面
      filename: 'index.html'
    }),
    new VueLoaderPlugin()
  ]

  // resolve: {
  //   alias: {
  //     "vue$":"vue/dist/vue.js"
  //   }
  // }
}
