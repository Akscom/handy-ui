import {FC, PureComponent, cloneElement, ReactElement, MouseEvent, TouchEvent, useState, useEffect } from 'react';
import Events from '../utils/events';
import DragProps, { DragEvent, DragState } from './PropsType';

const Drag: FC<DragProps> = (props) => {
  const { children, onDragStart, onDragMove, onDragEnd, ...restProps} = props
  const [currentX, setCurrentX] = useState(0)
  const [currentY, setCurrentY] = useState(0)
  const [dragState, setDragState ] = useState(Object.create(null))

  const isDragStart = () => {
    return dragState.startX !== undefined && dragState.startY !== undefined;
  }

  const onTouchStart = (event: TouchEvent | MouseEvent) => {
    // 取消默认事件
    // event.preventDefault()
    // console.log('onTouchStart')

    if ('touches' in event) {
      const touch = event.touches[0]
      setDragState({
        startTime: new Date(),
        startX: touch.pageX,
        startY: touch.pageY
      })
    } else {
      setDragState({
        startTime: new Date(),
        startX: event.clientX,
        startY: event.clientY
      })

      Events.on(document.body, 'mousemove', onTouchMove);
      Events.on(document.body, 'mouseup', onTouchEnd);
    }

    const state: DragState = {
      ...dragState,
    };

    if (typeof onDragStart === 'function') {
      onDragStart(event, state);
    }
  };

  const onTouchMove = (event: TouchEvent | MouseEvent) => {
    // 取消默认事件
    // event.preventDefault()
    // console.log('onTouchMove')

    if (!isDragStart) return false;

    if ('touches' in event) {
      const touch = event.touches[0]
      setCurrentX(touch.pageX)
      setCurrentY(touch.pageY)
    } else {
      setCurrentX(event.clientX)
      setCurrentY(event.clientY)
    }

    const offsetX = currentX! - dragState.startX!;
    const offsetY = currentY! - dragState.startY!;

    const state: DragState = {
      ...dragState,
      offsetX,
      offsetY,
    };

    if (typeof onDragMove === 'function') {
      onDragMove(event, state);
    }
    setDragState(state)
  };

  const onTouchEnd = (event: TouchEvent | MouseEvent) => {
    // 取消默认事件
    // event.preventDefault()
    // console.log('onTouchEnd')
    if (!isDragStart) return false;

    if (!('touches' in event)) {
      Events.off(document.body, 'mousemove', onTouchMove);
      Events.off(document.body, 'mouseup', onTouchEnd);
    }

    if (typeof onDragEnd === 'function') {
      onDragEnd(event, dragState);
    }
    setDragState(Object.create(null))
  };


  return cloneElement(children as ReactElement<any>, {
    onTouchStart: onTouchStart,
    onTouchMove: onTouchMove,
    onTouchEnd: onTouchEnd,
    onMouseDown: onTouchStart,
    onMouseMove: onTouchMove,
    onMouseUp: onTouchEnd,
  });
}

export default Drag