
# BackToTop 返回顶部


## 基本用法
```jsx
import React, { FC, useState , useRef, CSSProperties, useEffect} from 'react';
import Totop from './components/to-top'

const App:FC=()=>{
  const list = [];
  for (let i = 0; i < 100; i++)
  list.push(<p key={+i}>第 {i + 1} 行</p>);
  const containerRef = useRef<HTMLInputElement>(null);

  return (
    <>
     <div ref={containerRef} id="box" style={{ overflow: 'auto'}}  >{list}</div>
      <Totop
        getContainer="#box"
        onClick={() => console.log('click back to top')}
        visibleDistance= {200}
      >
        <div style={{
          width: 60,
          height: 60,
          lineHeight: '60px',
          textAlign: 'center',
          backgroundColor: '#fff',
          color: '#999',
          fontSize: 20,
          borderRadius: 30,
          boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.2)',
          cursor: 'pointer',
        }}>
          Up
        </div>
      </Totop>
    </>
  )
}

export default App
```
