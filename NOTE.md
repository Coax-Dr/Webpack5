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
