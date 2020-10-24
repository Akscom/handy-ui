# Drag 拖拽

## 基本用法
```jsx
import React, { useEffect, useState, useRef } from 'react';
import Drag from './components/drag'

let currentPoint = [0, 0];

const App = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [point, setPoint] = useState([0, 0]);
  const [drag, setDrag] = useState(false);

  useEffect(() => {
    if(boxRef && boxRef.current && containerRef && containerRef.current){
      const { width, height } = boxRef.current.getBoundingClientRect() ;
      const { width: containerWidth, height: containerHeight } = containerRef.current.getBoundingClientRect();
      currentPoint[0] = Math.round(Math.random() * (containerWidth - width));
      currentPoint[1] = Math.round(Math.random() * (containerHeight - height));
    }
    setPoint(currentPoint);
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const onDragStart = (event:any, dragState:any) => {
    console.log('onDragStart', dragState);
    setDrag(true);
  };

  const onDragMove = (event:any, dragState:any) => {
    console.log('onDragMove', dragState);

    if(boxRef && boxRef.current && containerRef && containerRef.current && dragState.offsetX  && dragState.offsetY){
      const { width, height } = boxRef.current.getBoundingClientRect();
      const { width: containerWidth, height: containerHeight } = containerRef.current.getBoundingClientRect();

      let newX = currentPoint[0] + dragState.offsetX;
      let newY = currentPoint[1] + dragState.offsetY;

      if (newX < 0) {
        newX = 0;
      }
      if (newX > containerWidth - width) {
        newX = containerWidth - width;
      }
      if (newY < 0) {
        newY = 0;
      }
      if (newY > containerHeight - height) {
        newY = containerHeight - height;
      }

      setPoint([newX, newY]);
    }
    return true;
  };

  const onDragEnd = (event:any, dragState: any) => {
    console.log('onDragEnd', dragState);
    currentPoint = point;
    setDrag(false);
  };

  return (
    <div
      ref={containerRef}
      style={{
        height: 300,
        backgroundColor: '#ddd',
        position: 'relative'
      }}
    >
      <Drag
        onDragStart={onDragStart}
        onDragMove={onDragMove}
        onDragEnd={onDragEnd}
      >
        <div
          ref={boxRef}
          style={{
            display: 'inline-block',
            transform: `translate3d(${point[0]}px, ${point[1]}px, 0)`,
          }}
        >
          {
            drag
              ? <button>Let me go!</button>
              : <button>Catch me~</button>
          }
        </div>
        
      </Drag>
    </div>
  );
}

export default App
```



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| onDragStart | (event?: MouseEvent \| TouchEvent, dragState?: DragState) => void | - | 触摸/点击 起始时触发的事件 |
| onDragMove | (event?: MouseEvent \| TouchEvent, dragState?: DragState) => boolean | - | 拖拽移动时触发的事件 |
| onDragEnd | (event?: MouseEvent \| TouchEvent, dragState?: DragState) => void | - | 触摸/点击 结束时触发的事件 |

### DragState
| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| startTime | Date | new Date() | 起始时间 |
| startX | number | - | 起始点x坐标 |
| startY | number | - | 起始点y坐标 |
| offsetX | number | - | 横向偏移量 |
| offsetY | number | - | 纵向偏移量 |