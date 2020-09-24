# Carousel 走马灯

```jsx
import React, { FC, useState , RefObject} from 'react';
import ReactDOM from 'react-dom'
// import InfiniteScroller from './components/infinite-scroller'
import { Carousel, Button } from 'zarm';

const ITEMS = [
  'https://static.zhongan.com/website/health/zarm/images/banners/1.png',
  'https://static.zhongan.com/website/health/zarm/images/banners/2.png',
  'https://static.zhongan.com/website/health/zarm/images/banners/3.png',
];

  
const contentRender = () => {
  return ITEMS.map((item, i) => {
    return (
      <div className="carousel__item__pic" key={+i}>
        <img src={item} alt="" draggable={false} />
      </div>
    );
  });
}

const App:FC=()=>{
  let domRef:any
  return (
    <div style={{width:'100%', overflow: 'hidden'}}>
      <Carousel
        ref={(ref)=> domRef = ref}
        loop
        direction="left"
        onChange={(index) => {
          console.log(`onChange: ${index}`);
        }}
      >
        {contentRender()}
      </Carousel>
      <div className="controls">
        <Button
          block
          size="sm"
          onClick={() => {
            domRef.onJumpTo(0);
          }}
        >
          无动画切换指定页
        </Button>

        <Button
          block
          size="sm"
          onClick={() => {
            domRef.onSlideTo(2);
          }}
        >
          滑动到指定页
        </Button>
      </div>
    </div>
  )
}

export default App
```