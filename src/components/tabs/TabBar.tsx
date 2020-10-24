
import React, {FC, useEffect, useState, useRef, TouchEvent} from 'react';
import classNames from 'classnames'
import Drag from '../drag';

interface TabBarProps {
  goToTab?: (index: number) => void;
  tabs?: any;
  activeTab?: number;
  animated?: boolean;
  renderTab?: (tab: any) => React.ReactNode;
  renderUnderline?: (style: React.CSSProperties | any) => React.ReactNode;
  page?: number;
  onTabClick?: (tab: any, index: number) => void;
  instanceId?: number,
  tabBarBackgroundColor?: string;
  activeColor?: string;
  inactiveColor?: string;
  tabBarTextStyle?: React.CSSProperties | any;
  underlineStyle?: React.CSSProperties | any;
}

interface PropsType extends TabBarProps {
    prefixCls?: string;
}

const TabBar:FC<PropsType>=(props)=>{
    const {tabs = [], animated, page = 0, activeTab = 0, renderTab,
        goToTab, onTabClick,
        tabBarTextStyle,
        activeColor,
        inactiveColor,
        underlineStyle,
        instanceId, ...restProps }=props

    const getTabSize = (page: number, tabLength: number) => 100 / Math.min(page, tabLength);

    const [activeIndex, setactiveIndex] = useState(activeTab)
    const [lastOffset, setLastOffset] = useState(0)
    const [translate, setTranslate] = useState('')

    const [size, setSize]=useState(getTabSize(page, tabs.length))

    const onPress= (index: number) => {
      onTabClick && onTabClick(tabs[index], index);
      goToTab && goToTab(index);
      setactiveIndex(index)

      const needScroll = index >= 1 && index < tabs.length-1;
      let value=''
      if(needScroll){
        value=`${-size*(index-1)}%, 0px`
      }
      setTranslate(value)
      setLastOffset(-size*(index-1))
    }

    const handleOnDragEnd=(event:any, ...rest:any)=>{
      const {offsetX} = rest[0]
      let _offsetX=offsetX+lastOffset
      if( _offsetX < -200 ){
        _offsetX = -200
      }else if(_offsetX > 10){
        _offsetX = 0
      }else{
        _offsetX=offsetX+lastOffset
      }
      setTranslate(`${_offsetX}%, 0px`)
    }

    const renderTabs = (t: any, i: number, size: number) => {
        const textStyle = { ...tabBarTextStyle } as React.CSSProperties;
        let cls = `ha-tabs-default-bar-tab`;
        let ariaSelected = false;
        if (activeIndex === i) {
          cls += ` ${cls}-active`;
          ariaSelected = true;
          if (activeColor) {
            textStyle.color = activeColor;
          }
        } else if (inactiveColor) {
          textStyle.color = inactiveColor;
        }
    
        return <div key={`t_${i}`}
          style={{
            ...textStyle,
            width: `${size}%` ,
          }}
          id={`m-tabs-${instanceId}-${i}`}
          role="tab"
          aria-selected={ariaSelected}
          className={cls}
          onClick={() => onPress(i)}
        >
          {/* {renderTab ? renderTab(t) : t.title} */}
          {t.title}
        </div>;
      }
    return (
        <div className="ha-tabs-default-bar ha-tabs-default-bar-animated ha-tabs-default-bar-top" style={{backgroundColor: 'rgb(255, 255, 255)'}}>
           <div className="ha-tabs-default-bar-prevpage"></div>
           <Drag
            // onDragStart={handleOnDragStart}
            // onDragMove={handleOnDragMove}
            onDragEnd={handleOnDragEnd}
          >
           <div  className="ha-tabs-default-bar-content" style={{transform: `translate3d(${translate}, 1px)`, transitionDuration:'0.3s'}}>
              { tabs.map((t:any, i:number) => {
                      return renderTabs(t, i, size);
                })
              }
              <div className="ha-tabs-default-bar-underline" style={{width: `${size}%`, left: `${size * activeIndex}%`, ...underlineStyle}}></div>
          </div>  
          </Drag>
          <div className="ha-tabs-default-bar-nextpage"></div>
        </div>
    )
}

TabBar.defaultProps = {
    // prefixCls: 'tabs-tab-bar',
    animated: true,
    tabs: [],
    goToTab: () => { },
    activeTab: 0,
    page: 3,
    underlineStyle: {},
    tabBarBackgroundColor: '#fff',
    activeColor: '',
    inactiveColor: '',
    tabBarTextStyle: {},
}

export default TabBar