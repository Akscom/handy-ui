```jsx
import React, { useState } from 'react';
import Switch from './components/switch'

const App: React.FC = () => {
  const [value, setValue] = useState(false)

  return (
    <>
      <Switch 
        checked={value}
        onChange={(val:any) => {
          setValue(val)
        }}
      />

      <Switch 
        checked={value}
        activeColor="#07c160" 
        inactiveColor="#ee0a24"
        size="24px"
      />
    </>
  );
}

export default App
```