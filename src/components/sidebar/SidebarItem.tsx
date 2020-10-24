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
    let cls = classNames(['ha-sidebar-item', {'ha-sidebar-item--select': isActive}])
    return (
        <>
            <div  className={cls} {...restProps}>
                <div className="ha-sidebar-item__text">{title}
                    {dot?<div className="ha-info ha-info--dot ha-sidebar-item__info"></div>:''}
                    {badge?<div className="ha-info ha-sidebar-item__info">{badge}</div>:''}
                </div>
            </div>
        </>
    )
}

export default SidebarItem