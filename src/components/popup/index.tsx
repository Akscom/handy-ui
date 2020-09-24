import React, {FC, CSSProperties, useEffect, useState,  } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import {getNodeFromSelector} from '../utils'

export type ContainerType = HTMLElement | (() => HTMLElement);
export interface PopupProps {
  visible?: boolean,
  direction?: 'top' | 'right' | 'bottom' | 'left' | 'center',
  animationType?:
    'fade' | 'door' | 'flip' | 'rotate' | 'zoom' |
    'moveUp' | 'moveDown' | 'moveLeft' | 'moveRight' |
    'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight',
  animationDuration?: number,
  width?: string | number,
  mask?: boolean,
  maskType?: 'transparent' | 'normal',
  destroy?: boolean,
  afterOpen?: () => void,
  afterClose?: () => void,
  onMaskClick?: () => void,
  getContainer?: any,
  prefixCls?: string,
  className?: string,
}

const Popup:FC<PopupProps>=(props)=>{
  const {
    prefixCls,
    animationType,
    animationDuration,
    direction,
    mask,
    children,
    width,
    visible, afterClose, afterOpen, className = '',
    onMaskClick, getContainer
  } = props;

  const [isShow, setShow] = useState(visible)
 
  useEffect(()=>{
    console.log(getContainer)
    console.log(direction)
  },[]) 

  useEffect(()=>{
    let adiv = document.querySelectorAll('.za-popup') 
    let overlay = document.querySelectorAll('.za-mask') 
    if(visible){
      setShow(true)
      setTimeout(()=>{
        let adiv = document.querySelectorAll('.za-popup')
        adiv[0].classList.add(`${prefixCls}--show`);
        afterOpen && afterOpen()
      },200)
    }else{
      if(adiv[0]){
        console.log('关闭~~~~~')
        adiv[0].classList.remove(`${prefixCls}--show`)
        mask && overlay[0].classList.remove(`za-fade-enter`)
        mask && overlay[0].classList.add(`za-fade-leave`)
        setTimeout(()=>{
          setShow(false)
          afterClose && afterClose()
        },200)
      }
    }
  },[visible]) 

  const renderMask = () => {
    // const { mask,  animationDuration, visible } = this.props;
    // const { isPending } = this.state;
    const animationState = visible ? 'enter' : 'leave';
    const maskCls = classnames('za-mask', {
      [`za-fade-${animationState}`]: visible,
    });
    const animationDuration=200
    const maskStyle: CSSProperties = {
      WebkitAnimationDuration: `${animationDuration}ms` ,
      animationDuration: `${animationDuration}ms`,
    };
    return (
      mask && <div className={maskCls} style={maskStyle} onClick={onMaskClick}></div>
    );
  };

  const handleMaskClick = (e:any) => {
    e.stopPropagation();
    onMaskClick && onMaskClick();
  };

  const getComponent = () => {
    const animationState = visible ? 'enter' : 'leave';
    const cls = {
      wrapper: classnames(`${prefixCls}__wrapper`, {
        [`za-fade-${animationState}`]: direction === 'center' ,
      }),
      popup: classnames(prefixCls, {
        [`${prefixCls}--${direction}`]: !!direction,
        [`${prefixCls}--nomask`]: direction === 'center' && !mask,
        [`za-${animationType}-${animationState}`]: direction === 'center' ,
      }),
    };

    const wrapStyle: CSSProperties = direction === 'center'
      ? {
        WebkitAnimationDuration: `${animationDuration}ms`,
        animationDuration: `${animationDuration}ms`,
      }
      : {};

    const popupStyle: CSSProperties = direction === 'center'
      ? {
        width,
        WebkitAnimationDuration: `${animationDuration}ms`,
        animationDuration: `${animationDuration}ms`,
      }
      : {
        WebkitTransitionDuration: `${animationDuration}ms`,
        transitionDuration: `${animationDuration}ms`,
        WebkitTransitionProperty: 'transform',
        transitionProperty: 'transform',
      };

    if (!mask) {
      return (
        <div
          className={cls.popup}
          style={popupStyle}
          role="dialog"
        >
          {children && children}
        </div>
      );
    }

    return (
      <>
        {renderMask()}
        <div
          role="dialog"
          className={cls.wrapper}
          style={wrapStyle}
          onClick={(e) => {
            handleMaskClick(e);
          }}
        >
          <div
            className={cls.popup}
            style={popupStyle}
            role="document"
          >
            {children && children}
          </div>
        </div>
      </>
    );
  };

  // const handleAnimation = () => {
  //   let adiv = document.querySelectorAll('.za-popup')
  //   if (visible) {
  //     // if (popup) {
  //     //   _container.classList.remove(`${prefixCls}--hidden`);
  //     //   popup.focus();
  //     //   popup.classList.add(`${prefixCls}--show`);
  //     // }
  //     console.log(adiv)
  //     adiv[0].classList.add(`${prefixCls}--show`);
  //     // adiv[0].add(`${prefixCls}--show`)
  //     // adiv.classList.add('name')
  //   } else {
  //     // adiv[0].classList.remove(`${prefixCls}--show`);
  //   }
  // };

  return  <>
    {isShow ? ReactDOM.createPortal(getComponent(), getNodeFromSelector(getContainer)|| document.body):null}
    </>
}

Popup.defaultProps={
  prefixCls: 'za-popup',
  visible: false,
  mask: true,
  direction: 'bottom',
  animationType: 'fade',
  animationDuration: 200,
}

export default Popup