
import React, {FC, useEffect, useState, PureComponent, MouseEvent, CSSProperties, ReactPortal } from 'react';
import { createPortal } from 'react-dom';
import {getNodeFromSelector} from '../utils'
import throttle from '../utils/throttle';
import Events from '../utils/events';

export interface TotopProps {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  speed?: number;
  visibleDistance?: number;
  scrollContainer?: any;
  getContainer?: any
  onClick?: (event?: MouseEvent<HTMLElement>) => void;
}


const Totop:FC<TotopProps>=(props)=>{
  const { prefixCls, className, style, visibleDistance=400, scrollContainer = window, speed, getContainer, onClick, children  } = props;
  const [visible, setVisible] = useState(false)

  const [timer, setTimer] = useState(0 as any)

  const [scorllTop, setScorllTop] = useState(0);

  const [flag, setFlag] = useState(true)

  const handleScroll = (event:any) => {
    const _scrollTop = scrollContainer === window? ((event.srcElement ? event.srcElement.documentElement.scrollTop : false) 
    || window.pageYOffset || (event.srcElement ? event.srcElement.body.scrollTop : 0)): (event.srcElement ? event.srcElement.scrollTop:0) ;
    console.log(_scrollTop)
    if(_scrollTop > visibleDistance){
      setVisible(true)
    }else{
      setVisible(false)
    }
    setScorllTop(_scrollTop)
  };

  const scrollToTop = (e:any) => {
    onClick && onClick(e)
    document.documentElement.scrollTop = 0
  };

  useEffect(()=>{
    document.body.style.overflow = 'auto';
    Events.on(window, 'scroll', throttle(handleScroll, 200));
    return () => Events.off(window, 'scroll', handleScroll);
    // window.addEventListener('scroll', throttle(handleScroll))
    // return () => window.removeEventListener('scroll', handleScroll);
  }, []); 

  const renderPortal=(): ReactPortal | null => {
    const containerStyle: CSSProperties = {
      display: !visible ? 'none' : 'inline',
      position: 'fixed',
      bottom: 50,
      right: 50,
      ...style,
    };

    return createPortal(
      <>
        <div className={prefixCls} style={containerStyle} onClick={scrollToTop}>
          {children}
        </div>
      </>,
     getNodeFromSelector(getContainer)|| document.body,
    );
  }

  return <> 
      {renderPortal()}
    </>
}

Totop.displayName = 'Totop';

Totop.defaultProps = {
  prefixCls: 'za-back-to-top',
  speed: 100,
  visibleDistance: 400,
  scrollContainer: window,
};

export default  Totop