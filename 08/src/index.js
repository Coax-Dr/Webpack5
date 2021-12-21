import './js/title';
import App from './App.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
if (module.hot) {
  // 检测是否开启模块热替换
  module.hot.accept(["./js/title.js", "./App.jsx"], (index) => {
    // 规定使用模块热替换的模块以及回调函数
    console.log("index is ", index)
  }) 
}
ReactDOM.render(<App />, document.getElementById("app"));