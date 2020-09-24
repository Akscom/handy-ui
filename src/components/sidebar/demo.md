Sidebar 侧边导航

```jsx
import React, { FC, useState , useRef, CSSProperties, useEffect} from 'react';
import Sidebar from './components/sidebar'
import SidebarItem from './components/sidebar/SidebarItem'

const App:FC=()=>{
  return (
  <div>
    <Sidebar activeIndex={2} onChange={(value:any)=>{
      console.log(value)
    }}>
      <SidebarItem title="标签名称" dot/>
      <SidebarItem title="标签名称" badge="5"/>
      <SidebarItem title="标签名称" badge="99+" />
    </Sidebar>
  </div>
  )
}

export default App
```