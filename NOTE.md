# css-loader



# file-loader
## 作用：处理不同格式的图片，将图片拷贝到指定的目录，并对图片文件名进行修改
## 配置：
```
{
  test: /\.(png|svg|gif|jpe?g)$/,
  use: ['file-loader']
}
```
## 注意：
### 使用commonJS规范导入图片时
> require()函数默认返回module对象，如果想要正常使用图片，有两种方式
(1) 将const imgsrc = require('xxx') 改写为 const imgsrc = require('xxx').default
(2) 在webpack.config.js中对file-loader进行配置
```
{
  test: /\.(png|svg|gif|jpe?g)$/,
  use: [{ loader: 'file-loader', options: { esModule: false } }]
}
```

### 当使用ESModule规范方式导入图片时
> 由于ESModule规范方式默认使用default，所以可以正常使用。
```
import imgSrc from 'xxx'
const oImg = document.createElement('img');
oImg.src = imgSrc; // 可以正常使用
```
### 配置file-loader打包后生成的文件的名称
#### 常见的占位符
> [ext]: 扩展名
> [name]: 文件名
> [hash]: 根据文件内容使用md4生成的文件的hash，防止文件名重复
> [hash:<length>]: 截取hash
> [path]: 

```
{
  test: /\.(png|svg|gif|jep?g)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[name].[hash:6].[ext]',
        outputPath: 'img'
        // file-loader打包后生成的文件将要存放的文件夹
      }
    }
  ]
}
```
### file-loader处理图片打包时存在的缺陷
> 每个被打包的图片，都会进行一个请求，当图片很多时会严重影响页面的响应速度
# url-loader 将图片转化为base64 uri的形式注入到页面中，减少了图片请求的次数

## url-loader与file-loader的最佳实践
> 当个别图片体积较大时采用file-loader进行拷贝，当图片体积较小时，采用url-loader进行转化为base64
> 调用url-loader时会自动调用file-loader
```
{
  test: /\.(png|jpg|svg|gif|jpeg)$/,
  options: {
    limit: 25 * 1024
    // 当图片的体积超过25kb时，采用file-loader。当图片体积小于25kb时，采用url-loader
  }
}
```
# Webpack5资源模块
> 在Webpack5中，对资源的处理已经被整合到资源模块asset module中。
> 因此在处理图片资源时不需要使用file-loader、url-loader。
> asset/resource --> file-loader，asset/inline --> url-loader。

## asset/resource --> file-loader
```
{
  test: /\.(png|svg|gif|jpe?g)$/,
  type: 'asset/resource',
  generator: {
    filename: 'img/[name].[hash:6][ext]'
  }
}
```
## asset/inline --> url-loader
```
{
  test: /\.(png|svg|gif|jpe?g)$/,
  type: 'asset/inline'
}
```
## asset --> file-loader/url-loader 也可以用于对图标字体文件的打包
```
{
  test: /\.(png|svg|gif|jpe?g)$/,
  type: 'asset',
  generator: {
    filename: 'img/[name].[hash:6][ext]'
  },
  parser: {
    dataUrlCondition: {
      maxSize: 200 * 1024
    }
  }
}
```

# loader与plugin的特点与区别：
## loader 对特定的模块类型进行转换
> 特定模块：字体、图标、图片等等webpack无法识别的文件类型
## plugin 在整个webpack打包周期中进行更多的工作
> 更多工作：比如压缩文件


# plugin 插件
## 外部
### clean-webpack-plugin 清除打包目录
### html-webpack-plugin 自动创建一个html文件作为模板html

## webpack自带插件
### DefinePlugin 对自定义html模板中的常量进行赋值




# babel 处理js在不同浏览器平台的兼容问题，例如将JSX TS ES6+ 转化为浏览器可以识别的js.

## @babel/core babel核心库 babel-core仅仅只是一个平台，仅仅只有babel-core不能进行任何工作，还需要配合其他的包
> @babel/plugin-transform-arrow-functions 对箭头函数进行转化的插件
npx babel src --out-dir build --plugins=@babel/plugin-transform-arrow-functions
> @babel/plugin-transform-block-scoping 将const\let转化为var
> @babel/preset-env babel的预设
> 注意：在babel的预设(@babel/preset-env)已经存在大部分的设置包含以上的插件
## @babel/cli babel命令行工具
npx babel src --out-dir build

## babel-loader
```
{
  test: /\.js$/,
  use: [{
    loader: 'babel-loader',
    options: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: 'chrome 91'
          }
        ]
        ]
    }
  }]
}
```
### babel-loader配置文件
> .babelrc
> babel.config.js
> 注意.browserslistrc 文件不仅仅可以针对css对浏览器进行兼容，还可以针对js对浏览器进行兼容。

## polyfill