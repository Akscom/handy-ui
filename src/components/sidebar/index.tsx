import React, {FC, useEffect, useRef, useState, MouseEvent} from 'react';
import classNames from 'classnames'

interface SidebarProps{
    activeIndex?:number;
    onChange?:(e:any)=>void;
    className?:string;
}

const Sidebar:FC<SidebarProps>=(props)=>{
    let {children, className, activeIndex, onChange, ...restProps} = props
    const [_activeIndex, setActiveIndex] = useState(activeIndex)

    let cloneChildren = React.Children.map(children, (child:any, index)=>{
        // const childElement = child as React.FunctionComponentElement<SidebarItemProps>  // 类型断言
        if (child) {
          return React.cloneElement(child, {
            isActive: _activeIndex === index,
            onClick:(e:MouseEvent)=>{
                setActiveIndex(index)
                onChange && onChange(index)
            }
          })
        }
        return child
    })

    return (
        <div className={classNames(['ha-sidebar', className])} {...restProps}>
            {cloneChildren}
        </div>
    )
}

Sidebar.defaultProps={
    activeIndex:0
}

export default Sidebar