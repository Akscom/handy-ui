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