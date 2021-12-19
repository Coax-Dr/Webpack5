import './js/title';
if (module.hot) {
  module.hot.accept(["./js/title.js"], (index) => {
    console.log("index is ", index)
  }) 
}
const p = new Promise((resolve, reject) => {
  console.log("promise");
})

// foo();
console.log("123456")