
```jsx
import React, { useState } from 'react';
import DatePicker from './components/datetime-picker'

const App: React.FC = () => {
  const date = {
    value: '',
    wheelDefaultValue: '',
  }

  const time = {
    visible: false,
    value: '',
  }

  const datetime = {
    visible: false,
    value: '',
  }

  const [isShow, setShow] = useState(datetime.visible)
  

  return (
    <>
    {/* <DatePicker
      // visible={date.visible}
      // visible={visible}
      // title="选择日期"
      // cancelText="取消"
      mode="date"
      value={date.value}
      min="2007-01-03"
      max="2022-11-23"
      wheelDefaultValue="2018-09-13"
      onChange={(val:any)=>{
        const d = new Date(val); 
        const c=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); 
        console.log(c)
      }}
    /> */}

    {/* <DatePicker
      mode="time"
      value={time.value}
      onChange={(val:any)=>{
       console.log(val)
      }}
    /> */}
     <button  onClick={() => {
        setShow(true)
      }}>点击</button>
    <DatePicker
      visible={isShow}
      mode="datetime"
      value={time.value}
      min="2019-1-13"
      // onChange={(val:any)=>{
      //  console.log(val)
      // }}
      onConfirm={(val:any)=>{
        console.log(val)
      }}
      onCancel={(e)=>{
        setShow(false)
      }}
    />
    </>
  )
}

export default App
```