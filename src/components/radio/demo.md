思路：
1、可以用input来做radio，使用它的disabled等属性
2、把自定义属性挂载在div上模拟input，从点击事件获取自定义属性，判断是true还是false

传递信息：
1）父组件把conetxt的属性方法传递给子组件radio调用
2) 直接在父组件里渲染子组件方法

```js
import React, { useState, useEffect } from 'react';
import Radio from './components/radio/Radio'
import RadioGroup from './components/radio/Group'

const App: React.FC = () => {
  const [value, setValue] = useState('male')
  const [checked, setCheck] = useState(false)


  return (
    <>
      <RadioGroup 
        value={value}
        onChange={(e:any)=>{
          console.log(e)
          setValue(e.target.value)
        }} 
        // direction="horizontal"
        type="cell"
      >
        <Radio value="male" 
          shape="square"
          iconSize="28px"
          checkedColor="#07c160"
        >男</Radio>
        <Radio value="female">女</Radio>
      </RadioGroup>

    </>
  )
}

export default App
```