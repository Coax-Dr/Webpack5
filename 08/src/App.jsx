import React, {useState} from "react";

const App = () => {
  const [title, setTitle] = useState("模块热替换456");
  console.log("热更新123123");
  return (
    <div>{title}</div>
  )
}

export default App;