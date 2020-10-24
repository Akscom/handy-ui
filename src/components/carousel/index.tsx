import React, { FC, useState, Component, useEffect, useRef, useMemo, useCallback, cloneElement, Children, CSSProperties } from 'react'
import classnames from 'classnames'
import PropsType from './PropsType'
import Events from '../utils/events'
import Drag from '../drag'

export interface CarouselProps extends PropsType {
  prefixCls?: string
  className?: string
}

const Carousel: FC<CarouselProps> = (props) => {
  const { prefixCls, activeIndex=0, animationDuration=300, autoPlay, showPagination, autoPlayIntervalTime=3000, children, loop, direction,
    swipeable, moveDistanceRatio, moveTimeSpan,  className, height, style, slideToNum, jumpToNum, onChange, onChangeEnd} = props;

  const [currentIndex, setCurrentIndex] = useState(activeIndex)
  const [activeChanged, setActiveChange] = useState(false)
  const [translateX, setTranslateX] = useState(0)
  const [translateY, setTranslateY] = useState(0)
  const [duration, setDuration] = useState(animationDuration)

  const [timer, setTimer] = useState<NodeJS.Timeout|any>(null)

  const domRefs = useRef<HTMLDivElement>(null)


  // 判断当前是否在最后一页
  const isLastIndex = () => {
    return currentIndex && currentIndex >= children.length - 1
  }

  // 判断当前是否在第一页
  const isFirstIndex = () => {
    return currentIndex && currentIndex <= 0
  }

  // 是否横向移动
  const isDirectionX = () => {
    return (['left', 'right'].indexOf(direction!) > -1)
  }
  // 移动到指定编号
  const onMoveTo = (index:number, animationDuration:number) => {
    const previousIndex = currentIndex;
    if(domRefs.current){
      setTranslateX(()=>-(domRefs as any).current.offsetWidth * (index as any + loop))
      setTranslateY(()=>-(domRefs as any).current.offsetHeight * (index as any + loop))
    }
    setCurrentIndex(()=>index)
    // const activeIndexChanged = previousIndex !== index;
    // setActiveChange(activeIndexChanged)
    if (typeof onChange === 'function') {
      onChange(index);
    }
  };

  // 滑动到指定编号
  const onSlideTo = (index:number) => {
    onMoveTo(index, duration);
  };

  // 静默跳到指定编号
  const onJumpTo = (index:number) => {
    onMoveTo(index, 0);
  };

  // 下一页
  const handleNext = () => {
    onSlideTo(currentIndex + 1);
  }

  // 上一页
  const handlePrev = () => {
    onSlideTo(currentIndex - 1);
  }

  const onInterval = useCallback(() => setInterval(() => handleNext(), animationDuration + autoPlayIntervalTime), [
    currentIndex,
  ])

  useEffect(()=>{
    // 设置起始位置编号
    onJumpTo(currentIndex);
  },[])

  useEffect(
    () => {
      const timerId = autoPlay && onInterval()
      setTimer(timerId)
      return () => {
        timerId && clearInterval(timerId)
      }
    },
    [currentIndex]
  )

  useEffect(()=>{
    onSlideTo(slideToNum as number)
  },[slideToNum])

  useEffect(()=>{
    onJumpTo(jumpToNum as number)
  },[jumpToNum])

  // 暂停自动轮播
  const pauseAutoPlay =()=>{
    timer && clearInterval(timer)
  }


  // 处理节点（首尾拼接）
  const parseItems = (props:any) => {
    if (props.children.length === 0) {
      return
    }

    // 增加头尾拼接节点
    const items = [].concat(props.children)
    const firstItem = items[0]
    const lastItem = items[items.length - 1]

    if (props.loop) {
      items.push(firstItem)
      items.unshift(lastItem)
    }

    // 节点追加后重排key
    const newItems = React.Children.map(items, (element: any, index) => {
      return cloneElement(element, {
        key: index,
        className: classnames(`${props.prefixCls}__item`, element.props.className),
      })
    })
    return newItems
  }

  // 更新窗口变化的位置偏移
  const resize = () => {
    onJumpTo(currentIndex);
  };

  useEffect(()=>{
    if(domRefs.current){
      // domRefs.current.style.WebkitTransformDuration = `${animationDuration}ms`;
      domRefs.current.style.transitionDuration = `${duration}ms`;
      // domRefs.current.style.WebkitTransform = `translate3d(${x}px, ${y}px, 0)`;
      domRefs.current.style.transform = `translate3d(${translateX}px, 0px, 0)`;
    }
  },[translateX, duration])

  const transitionEnd = () => {
    if(domRefs.current){
      domRefs.current.style.transitionDuration = `0ms`;
      if(currentIndex > children.length-1){
        domRefs.current.style.transform = `translate3d(-${domRefs.current.offsetWidth*1}px, 0px, 0)`;
        setCurrentIndex(()=>0)
      }else if(currentIndex <0){
        domRefs.current.style.transform = `translate3d(-${domRefs.current.offsetWidth*children.length}px, 0px, 0)`;
        setCurrentIndex(()=>2)
      }
    }
    if (typeof onChangeEnd === 'function' ) {
      onChangeEnd(currentIndex);
    }
  };

  const renderPaginationItem = (_result:any, index:number) => {
    const paginationItemCls = classnames(`${prefixCls}__pagination__item`, {
      [`${prefixCls}__pagination__item--active`]: index === currentIndex,
    });

    return (
      <div
        key={`pagination-${index}`}
        className={paginationItemCls}
        onClick={() => onSlideTo(index)}
      />
    );
  };

  const renderPagination = () => {
    return showPagination && (
      <div className={`${prefixCls}__pagination`}>
        {Children.map(children, renderPaginationItem)}
      </div>
    );
  };


  const itemsStyle: CSSProperties = {};

  const aDirection = isDirectionX() ? 'horizontal' : 'vertical';
  const cls = classnames(prefixCls, className, `${prefixCls}--${aDirection}`);

  if (!isDirectionX()) {
    itemsStyle.height = height;
  }

  const content = (
    <div
      ref={domRefs}
      className={`${prefixCls}__items`}
      onTransitionEnd={transitionEnd}
      style={itemsStyle}
    >
      {parseItems(props)}
    </div>
  );

  // 触屏事件
  const onDragStart = () => {
    if (!swipeable) {
      return false;
    }
    // 跳转到头尾
    const maxLength = children!.length;

    if (currentIndex <= 0) {
      onJumpTo(0);
    } else if (activeIndex >= (maxLength - 1)) {
      onJumpTo(maxLength - 1);
    }

    // 暂停自动轮播
    pauseAutoPlay();
  };

  const onDragMove = (event:any, rest:any) => {
    const {offsetX, offsetY} = rest
    if (!swipeable) {
      return false;
    }
    const distanceX = Math.abs(offsetX);
    const distanceY = Math.abs(offsetY);

    if (
      isDirectionX()
      && (
        distanceX < 5
        || (distanceX >= 5 && distanceY >= 1.73 * distanceX)
      )
    ) {
      return false;
    }

    if (
      !isDirectionX()
      && (
        distanceY < 5
        || (distanceY >= 5 && distanceX >= 1.73 * distanceY)
      )
    ) {
      return false;
    }

    // 设置不循环的时候
    if (!loop) {
      // 在尾页时禁止拖动
      if (isLastIndex()) {
        if (
          (isDirectionX() && offsetX < 0)
          || (!isDirectionX() && offsetY < 0)
        ) {
          return false;
        }
      }

      // 在首页时禁止拖动
      if (isFirstIndex()) {
        if (
          (isDirectionX() && offsetX > 0)
          || (!isDirectionX() && offsetY > 0)
        ) {
          return false;
        }
      }
    }

    event.preventDefault();
    setTranslateX(x=>x + offsetX)
    setTranslateY(y=>y + offsetY)

    return true;
  };

  const onDragEnd = (_event:any, rest:any) => {
    const { offsetX, offsetY, startTime} = rest

    if (!swipeable) {
      return false;
    }
    if (!offsetX && !offsetY) {
      return;
    }

    const timeSpan = new Date().getTime() - startTime.getTime();
    if(domRefs.current){
      const ratio = isDirectionX()
        ? Math.abs(offsetX / domRefs.current.offsetWidth)
        : Math.abs(offsetY / domRefs.current.offsetHeight);
   
      // 判断滑动临界点
      // 1.滑动距离超过0，且滑动距离和父容器长度之比超过moveDistanceRatio
      // 2.滑动释放时间差低于moveTimeSpan
      if (ratio >= moveDistanceRatio! || timeSpan <= moveTimeSpan!) {
        const action = (isDirectionX() && offsetX > 0) || (!isDirectionX() && offsetY > 0)
          ? 'prev'
          : 'next';

        setCurrentIndex(i=>{
          let num =  (action === 'next') ? i + 1 : i - 1
          onSlideTo(num);
          return num
        })
       
      }

    }
    // 恢复自动轮播
    // startAutoPlay();
  };

  return (
    <>
      {/* <button onClick={handlePrev}>-</button> &nbsp;
      <button onClick={handleNext}>+</button> &nbsp;
      <button onClick={pauseAutoPlay}>stop</button>  */}
      <div className={cls} style={style}>
        <Drag
          onDragStart={onDragStart}
          onDragMove={onDragMove}
          onDragEnd={onDragEnd}
        >
          {content}
        </Drag>
        {renderPagination()}
      </div>
    </>
  )
}

Carousel.defaultProps = {
  prefixCls: 'ha-carousel',
  direction: 'left',
  height: 160,
  loop: true,
  activeIndex: 0,
  animationDuration: 300,
  swipeable: true,
  autoPlay: false,
  autoPlayIntervalTime: 3000,
  moveDistanceRatio: 0.5,
  moveTimeSpan: 300,
  showPagination: true,
}

export default Carousel
