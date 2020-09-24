```jsx
import React, { useState } from 'react';
import Toast from './components/toast'
import Icon from './components/icon'

const App: React.FC = () => {
  const showToast=()=>{
    Toast.show({
      content: '指定5秒后自动关闭',
      duration: 5000,
      afterClose: () => {
        console.log('Toast已关闭');
      }
    });
  }

  const loadingToast=()=>{
    Toast.loading({
      content: '加载中...',
      duration: 3000,
      mask:true, // 禁用背景点击
      afterClose: () => {
        console.log('Toast已关闭');
      }
    });
  }

  const successToast=()=>{
    Toast.success('Load success !');
  }

  const failToast=()=>{
    Toast.fail('Load success !!!');
  }


    return (
      <>

        {/* <button  onClick={() => seTShow(true)}>开启</button>
        <Popup
          visible={isShow}
          onMaskClick={() => seTShow(false)}
          direction="center"
          // afterOpen={() => console.log('打开2啦啦啦~~~~~~')}
          // afterClose={() => console.log('关闭2啦啦啦~~~~~')}
          getContainer="#content"
          // getContainer={getContainer()}
          // getContainer="html"
        >
          <div className="popup-box-2">
            <button onClick={() => seTShow(false)}>关闭弹层</button>
          </div>
        </Popup> */}

      {/* <h1>文字提示</h1>  */}
      <button onClick={showToast}>文字提示</button>

      {/* <h1>加载提示</h1> */}
      <button onClick={loadingToast}>加载提示</button>
      {/* <button onClick={loadingToast}>自定义加载图标</button> */}

      {/* <h1>成功/失败提示</h1> */}
      <button onClick={successToast}>成功提示</button>
      <button onClick={failToast}>失败提示</button>

      {/* <h1>自定义图标</h1> */}
      {/* <button onClick={showToast}>自定义图标</button>
      <button onClick={showToast}>展示图片</button> */}

      {/* <h1>动态更新提示</h1> */}
      {/* <button onClick={showToast}>动态更新提示</button> */}
      </>
    );
}

export default App
```