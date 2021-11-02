# file-loader
## 作用：处理不同格式的图片，常见的由png、jpg、svg、jpeg
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
(1) 将const imgsrc = require('xxx) 改写为 const imgsrc = require('xxx).default
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