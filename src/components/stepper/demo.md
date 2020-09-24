```jsx
import React, { useState } from 'react';
import Stepper from './components/stepper'

const App: React.FC = () => {
  const [value, setValue] = useState(1)

    return (
      <>
        {/* 设置上下限（-3 ~ 3） 尺寸*/}
        <Stepper
          value={value}
          onInputChange={(val:any) => {
            console.log('onInputChange:', val);
          }}
          onChange={(val:any) => {
            setValue(val)
            console.log('onChange:', val);
          }}
          min={-3} 
          max={3}
          inputWidth="40px" 
          buttonSize="32px"
        />

        {/* 设置步长  圆形 */}
        <Stepper
          value={value}
          onInputChange={(val:any) => {
            console.log('onInputChange:', val);
          }}
          onChange={(val:any) => {
            setValue(val)
            console.log('onChange:', val);
          }}
          step={0.2}
          decimal={1}
          shape='round'
        />

        <Stepper
          value={value}
          disabled
        />
      </>
    );
}

export default App
```