import React, {FC, useEffect, useRef, useState, Children} from 'react';
import classNames from 'classnames'

export interface SidebarItemProps{
    title?:string
    onSelect?:()=>void;
    isActive?:boolean;
    dot?:boolean;
    badge?:number|string;
}

const SidebarItem:FC<SidebarItemProps>=(props)=>{
    const {title, isActive, dot, badge, ...restProps} = props
    // const classes = classNames('van-sidebar-item',{
    //     [`van-sidebar-item--select`]:activeIndex 
    //   }
    // )

    // useEffect(()=>{
    //     console.log(dot)
    //     console.log(badge)
    // },[])
    let cls = classNames(['van-sidebar-item', {'van-sidebar-item--select': isActive}])
    return (
        <>
            <div  className={cls} {...restProps}>
                <div className="van-sidebar-item__text">{title}
                    {dot?<div className="van-info van-info--dot van-sidebar-item__info"></div>:''}
                    {badge?<div className="van-info van-sidebar-item__info">{badge}</div>:''}
                </div>
            </div>
        </>
    )
}

export default SidebarItem