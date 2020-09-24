待优化：
1、黏性滚动

```jsx
import React, { FC, useState , useRef, CSSProperties, useEffect} from 'react';
import Tabs from './components/tabs'

const tabs = [
  // { title: <span>First Tab</span> },
  // { title: <span>Second Tab</span> },
  // { title: <span>Third Tab</span> },
  { title: '1st Tab' },
  { title: '2nd Tab' },
  { title: '3rd Tab' },
  { title: '4th Tab' },
  { title: '5th Tab' },
  { title: '6th Tab' },
  { title: '7th Tab' },
  { title: '8th Tab' },
  { title: '9th Tab' },
];

const App:FC=()=>{
  return (
  <div>
    <Tabs tabs={tabs}
      initialPage={1}
      onChange={(tab:any, index:any) => { console.log('onChange', index, tab); }}
      onTabClick={(tab:any, index:any) => { console.log('onTabClick', index, tab); }}
      animated
      tabBarTextStyle={{fontSize:'16px', lineHeight: '24px'}}
      // activeColor='#f60'
      // inactiveColor='blue'
      // underlineStyle={{border: '1px #f60 solid'}}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
        Content of 1 tab
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
        Content of 2 tab
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
        Content of 3 tab
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
        Content of 4 tab
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
        Content of 5 tab
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
        Content of 6 tab
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
        Content of 7 tab
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
        Content of 8 tab
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
        Content of 9 tab
      </div>
    </Tabs>
  </div>
  )
}

export default App
```