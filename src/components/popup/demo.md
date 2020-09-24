```
import React,{ useState} from 'react';
import Popup from './components/popup'

const App: React.FC=()=>{
  const [isShow, seTShow]=useState(false)
  const [isShow2, seTShow2]=useState(false)
  const [isShow3, seTShow3]=useState(false)

  const getContainer=()=> {
    return document.querySelector('#content');
  }
    return (
      <div>
        <div id="content"></div>
       <button  onClick={() => seTShow(true)}>开启</button>
        <Popup
          visible={isShow}
          onMaskClick={() => seTShow(false)}
          direction="top"
        >
          <div className="popup-box-1">
            <button onClick={() => seTShow(false)}>关闭弹层</button>
          </div>
        </Popup>

        <button  onClick={() => seTShow2(true)}>开启</button>
        <Popup
          visible={isShow2}
          onMaskClick={() => seTShow2(false)}
          direction="center"
          // afterOpen={() => console.log('打开2啦啦啦~~~~~~')}
          // afterClose={() => console.log('关闭2啦啦啦~~~~~')}
          getContainer="#content"
          // getContainer={getContainer()}
          // getContainer="html"
        >
          <div className="popup-box-2">
            <button onClick={() => seTShow2(false)}>关闭弹层</button>
          </div>
        </Popup>

        <button  onClick={() => seTShow3(true)}>底部</button>
        <Popup
          visible={isShow3}
          onMaskClick={() => seTShow3(false)}
          direction="bottom"
        >
          <div className="popup-box-3">
            <button onClick={() => seTShow3(false)}>关闭弹层</button>
          </div>
        </Popup>
      </div>
    )
}

export default App
```