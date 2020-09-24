```jsx
import React, { useState } from 'react';
import Rate from './components/rate'

const App: React.FC = () => {
  const [value, setValue] = useState(0)

  return (
    <>
      <Rate 
        value={value} 
        onChange={(val:any)=>{
          // setValue(val)
          console.log(val)
        }} 
        allowHalf 
        icon="like"
        // disabled
        // size="20"
      />
    </>
  );
}

export default App
```