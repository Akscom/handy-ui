import React, {FC, useEffect, useState} from 'react';
import classNames from 'classnames'
import TabBar from './TabBar'
import TabPane from './TabPane'

interface TabsPorps{
    tabs?: any;
    initialPage?: number | string; // 初始化Tab, index or key
    animated?:boolean;
    tabBarTextStyle?: React.CSSProperties | any; // tabBar所有样式
    activeColor?: string; // 选中态颜色
    inactiveColor?: string; // 默认态颜色
    underlineStyle?: React.CSSProperties | any; // 下划线样式
    goToTab?: (index: number) => void;
    onChange?:(tab: any, index: number) => void;
    onTabClick?:(tab: any, index: number) => void;
}

export interface PropsType extends TabsPorps {
    prefixCls?: string;
}

const Tabs:FC<PropsType>=(props)=>{
    const {tabs, prefixCls, animated, children}=props

    const getTabIndex=(props: any) => {
      const { page, initialPage, tabs } = props;
      const param = (page !== undefined ? page : initialPage) || 0;
  
      let index = 0;
      if (typeof (param as any) === 'string') {
        tabs.forEach((t:any, i:any) => {
          if (t.key === param) {
            index = i;
          }
        });
      } else {
        index = param as number || 0;
      }
      return index < 0 ? 0 : index;
    }

    const [activeIndex, setActiveIndex] = useState(getTabIndex(props))

    const getSubElements = () => {
        let subElements: { [key: string]: React.ReactNode } = {};
    
        return (defaultPrefix: string = '$i$-', allPrefix: string = '$ALL$') => {
          if (Array.isArray(children)) {
            children.forEach((child: any, index) => {
              if (child.key) {
                subElements[child.key] = child;
              }
              subElements[`${defaultPrefix}${index}`] = child;
            });
          } else if (children) {
            subElements[allPrefix] = children;
          }
          return subElements;
        };
    }

    const getSubElement=(
        tab: any,
        index: number,
        subElements: (defaultPrefix: string, allPrefix: string) => { [key: string]: any },
        defaultPrefix: string = '$i$-',
        allPrefix: string = '$ALL$'
      ) =>{
        const key = tab.key || `${defaultPrefix}${index}`;
        const elements = subElements(defaultPrefix, allPrefix);
        let component = elements[key] || elements[allPrefix];
        if (component instanceof Function) {
          component = component(tab, index);
        }
        return component || null;
    }

    const renderContent=()=>{
        let tabCache:any[] = []
        const listItem:any[]=[];
        const value = `${-activeIndex * 100}%`;
        const translate = `${value}, 0px`;
        const styles:React.CSSProperties = animated ? {transform: `translate3d(${translate}, 1px)`} : {position: `relative`, left: `${-activeIndex * 100}%`}
        const classes = classNames('ha-tabs-content-wrap', {
          'ha-tabs-content-wrap-animated': animated
        })
        return  (
          <div className={classes} style={styles}>
            {
                tabs.map((tab:any, index:number) => {
                    // tabCache[index] = getSubElement(index);
                    tabCache[index] = getSubElement(tab, index, getSubElements());
                    const cls = classNames('ha-tabs-pane-wrap', {
                      [`ha-tabs-pane-wrap-active`]: index === activeIndex,
                      [`ha-tabs-pane-wrap-inactive`]: index !== activeIndex
                    })
                    listItem.push(<TabPane className={cls} key={`tab_${index}`}>{tabCache[index]}</TabPane>)
                })
                    
             }
            {listItem}
        </div>
      )
    }

    const handleGoToTab=(index:number)=>{
      setActiveIndex(index)
    }

    const renderTabBar=() =>{
      return <TabBar {...props} renderTab={tabs} goToTab={handleGoToTab} activeTab={activeIndex} />
    }

    return (
      <div className={`${prefixCls} ${prefixCls}-horizontal ${prefixCls}-top`}>
        <div className={`${prefixCls}-tab-bar-wrap`}>
            {renderTabBar()}
        </div>
        {renderContent()}
      </div>
    )
}

Tabs.defaultProps={
    prefixCls: 'ha-tabs',
    animated: false
}

export default Tabs