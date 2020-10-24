# Carousel 走马灯
```jsx
import React, { FC, useState, useRef, RefObject} from 'react';
import ReactDOM from 'react-dom'
import Carousel from './components/carousel'
import Button from './components/button'


const ITEMS = [
  'https://image1.suning.cn/uimg/cms/img/160327461137381272.jpg?format=_is_1242w_610h',
  'https://oss.suning.com/adpp/creative_kit/material/picture/20201020-bfc5c9da6948439e97b62e288c74a5eef7b4059ace1149de.jpg?format=_is_1242w_610h',
  'https://oss.suning.com/aps/aps_learning/iwogh/2020/10/22/12/iwoghBannerPicture/0c8f8cb45dd94aee8d42e1128d03aa1a.png?format=_is_1242w_610h',
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
  // const carouselRef = useRef<HTMLDivElement>();
  const [slideNum , setSlideNum] = useState(0)
  const [jumpNum , setJumpNum] = useState(0)
  const containerRef: RefObject<HTMLElement> = useRef(null)
  return (
    <>
      <Carousel
        autoPlay
        loop
        direction="left"
        onChange={(index) => {
          console.log(`onChange: ${index}`);
        }}
        slideToNum={slideNum}
        jumpToNum={jumpNum}
      >
        {contentRender()}
      </Carousel>
      <div className="controls">
        <button
          onClick={() => {
            setJumpNum(2)
          }}
        >
          无动画切换指定页
        </button>
 
        <button
          onClick={() => {
            setSlideNum(2)
          }}
        >
          滑动到指定页
        </button>
      </div> 
    </>
  )
}

export default App
```
