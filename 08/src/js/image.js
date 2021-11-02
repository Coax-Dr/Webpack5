import '../css/bg.css';
function packImg() {
  const ele = document.createElement('div');

  // 创建image标签
  const img = document.createElement('img');
  // img.src = require('../img/01.jpg').default;
  /**
   * webpack5默认不会直接取用module对象的default属性
   * 而是直接获取到module对象，所以这里的src属性接收到的是module对象
   * 需要webpack5默认取用default属性，需要进行配置
   * 如果不使用webpack5进行esModule属性进行配置，同时又不愿意使用default
   * 我们可以使用esModule的导入规范。import imgSrc from '../img/01.jpg'
   */
  img.src = require('../img/01.jpg');
  ele.appendChild(img);

  // 给元素设置背景图片
  const oDiv = document.createElement('div');
  oDiv.className = 'img';

  ele.appendChild(oDiv);

  return ele;
}

document.body.appendChild(packImg());