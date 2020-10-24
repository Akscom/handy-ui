import React, {FC, useState,  ChangeEvent, useEffect, useRef, createContext, MouseEventHandler, ReactNode} from 'react'
import ReactDOM from 'react-dom';
import classNames from 'classnames'
import Popup from '../popup'
import domUtil from '../utils/dom';
import {isValidKey} from '../utils/index'
import Loading from '../loading'
import Icon from '../icon'
import { types } from 'util';

interface PropsType{
    type?:'text'|'loading'| 'success'| 'fail' |'html'
    // position?: 'middle'| 'top' | 'bottom'
    // message?:string
    // icon?:string
    // overlay?:boolean
    // forbidClick?:boolean // 是否禁止背景点击
    // closeOnClick?:boolean  // 是否在点击后关闭
    // closeOnClickOverlay?:boolean  // 是否在点击遮罩层后关闭
    // loadingType?:'circular'|'spinner' 
    // duration?:number
    // className?:string
    // onOpened?:()=>void // 完全展示后的回调函数
    // onClose?:()=>void // 关闭时的回调函数
    // transition?:string  // 动画类名
    // getContainer?:string
    visible?: boolean;
    duration?: number; // 自动关闭前停留的时间（单位：毫秒）
    content?: ReactNode;
    getContainer?: any;
    afterClose?: () => void;
    mask?: boolean;
    onMaskClick?: () => void;
    show?:()=>void
}

export interface ToastProps extends PropsType {
    prefixCls?: string;
    className?: string;
    destroy?: boolean;
    hide?:()=>void;
}
  
const contentIsToastProps = (content:any): content is ToastProps => typeof content === 'object' && 'content' in content;

let handyToast: HTMLDivElement | null;

let toastContainer: HTMLElement;
    
let timer:any;

const defaultProps = {
  // duration: SHORT,
  // mask: true,
  prefixCls: 'ha-toast',
  visible: false,
  duration: 3000,
  mask: false,
  destroy: true,
};

const unmountNode = () => {
  if (handyToast) {
    ReactDOM.render(<></>, handyToast);
    toastContainer.removeChild(handyToast);
    handyToast = null;
  }
};

const Toast:FC<ToastProps>=(props)=>{
    let nProps = Object.assign(defaultProps, props)
    const {prefixCls, visible, mask, className, duration, type, content, afterClose, ...others } = nProps;
    const handleAfterClose=()=>{
      unmountNode()
      afterClose && afterClose()
    }

    return (
        <>
        <Popup
            direction="center"
            maskType="transparent"
            width="70%"
            {...others}
            visible={visible}
            mask={mask}
            afterClose={handleAfterClose}
        >
         <div className={prefixCls}>
          {type === 'success'? <Icon name="success" />:null}
          {type === 'fail'? <Icon name="fail" />:null}
          {type === 'loading'? <Loading size="24px" />:null}
          <div className={`${prefixCls}__container`}>{content}</div>
         </div>
      </Popup>
        </>
    )
}

const show = function ( content: any, )  {
    unmountNode();
    const {duration, type} = content
    if (!handyToast) {
        handyToast = document.createElement('div') 
        handyToast.classList.add('ha-toast-container')
      if (contentIsToastProps(content) && content.className) {
        handyToast.classList.add(content.className);
      }
      
      toastContainer = contentIsToastProps(content) ? domUtil.getMountNode(content.getContainer) : domUtil.getMountNode();
      toastContainer.appendChild(handyToast);
    }
    if (handyToast) {
      const props = contentIsToastProps(content)
        ? { ...defaultProps, ...content, ...{ visible: true, getContainer: handyToast } }
        : { ...defaultProps, ...{ visible: true, getContainer: handyToast, content } };
      ReactDOM.render(
        <Toast {...props} />,
        handyToast,
      );

      if((duration as number) > 0){
        timer = setTimeout(() => {
            hide();
            clearTimeout(timer);
        }, duration);
      }
    }
};

const hide = () => {
    if (handyToast) {
      ReactDOM.render(
        <Toast visible={false} />,
        handyToast,
      );
    }
};

export default {
    show(config:any) {
      return show({...config, type:'text'});
    },
    loading(config:any) {
      return show({...config, type:'loading'});
    },
    success(config:any) {
      return show({content:config, type:'success'});
    },
    fail(config:any) {
      return show({content:config, type:'fail'});
    }
}
