const path = require('path');
const { DefinePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'boundle.js',
    path: path.resolve(__dirname, './dist'),
    // assetModuleFilename: 'img/[name].[hash:6][ext]'
    // 配置asset module处理后的资源的存放路径
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              esModule: false
              // css-loader在webpack5中在图片的导入操作时会默认使用CommonJS规范，因此导入的实际上时module
            }
          },
          'postcss-loader'
        ],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
      // {
        // test: /\.(png|svg|gif|jpg|jpe?g)$/,
        // use: [
          // {
            // loader: 'file-loader',
            // options: {
              // esModule: false, // 是否转化为esModule
              // name: '[name].[hash:6].[ext]', 
              // 规定file-loader打包后的文件名规则
              // name表示沿用文件本身的名称 
              // hash:6表示根据文件独有的内容生成特定的截取6位的hash
              // ext表示沿用文件的扩展名
              // outputPath: 'img' 
              // 将file-loader打包生成的文件输出到dist目录下的img文件夹中
              // 如果不写该option，可以直接将name属性定义为'img/[name].[hash:6].[ext]'
            // }
          // }
        // ]
      // }
      // {
      //   test: /\.(png|svg|gif|jpe?g)$/,
      //   use: [{
      //     loader: 'url-loader',
      //     options: {
      //       esModule: false,
      //       name: 'img/[name]_[hash:6].[ext]',
      //       limit: 50 * 1024
      //     }
      //   }]
      // }
      // {
      //   test: /\.(png|svg|gif|jpe?g)$/,
      //   type: 'asset/resource', 
      //   // asset/resource --> file-loader
      //   generator: {
      //     filename: 'img/[name].[hash:6][ext]'
      //     // asset module模块处理后资源的存放路径已经资源文件的命名规则
      //   }
      // }
      // {
      //   test: /\.(png|svg|gif|jpe?g)$/,
      //   type: 'asset/inline',
      //   // asset/inline --> url-loader
      // }
      {
        test: /\.(png|svg|gif|jpe?g)$/,
        type: 'asset', 
        // 只配置asset相当于既可以使用asset/resource(file-loader)还可以使用asset/inline(url-loader)
        generator: {
          filename: 'img/[name].[hash:6][ext]'
          // 资源文件打包后输出路径
        },
        parser: {
          dataUrlCondition: {
            maxSize: 200 * 1024
            // 配置asset/inline解析资源的最大体积，大于这个体积就使用asset/resource打包
          }
        }
      },
      {
        test: /\.(ttf|woff2?)$/,
        // 对图标字体文件进行打包
        type: 'asset/resource',
        generator: {
          filename: 'font/[name].[hash:6][ext]'
        }
      },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
            // plugins: [
            //   '@babel/plugin-transform-arrow-functions',
            //   '@babel/plugin-transform-block-scoping'
            // ]
          }
        }]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    // CleanWebpackPlugin 自动清除打包目录
    new HtmlWebpackPlugin({
      title: 'Webpack5',
      template: path.resolve(__dirname, './public/index.html')
      // 配置html模板的路径
      // html-webpack-plugin插件默认会生成一个模板
      // 但是由于大多数情况下，页面都是在特定的模板下搭建的
      // 所以template可以配置开发者自己想要的模板
      // html-webpack-plugin会用<script></script>将boundle.js文件插入自定义的模板
    }),
    new DefinePlugin({
      BASE_URL: '"./"'
      // 在自定义的html模板中有一个BASE_URL常量
    })
    // DefinePlugin 对自定义的html模板中的常量进行赋值
  ]
}