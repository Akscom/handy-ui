import React, {FC, useState, ChangeEvent, useEffect, useRef, createContext, MouseEventHandler} from 'react'
import classNames from 'classnames'
import Icon from '../icon';

export interface CellProps {
    title?: string,
    value?:number | string,
    label?:string,
    icon?:string,
    isLink?: boolean,
    arrowDirection?: 'left' | 'up' | 'down',
    center?:boolean,
    url?:string,
    to?:string,
    onClick?: MouseEventHandler<HTMLElement>
}

const Cell:FC<CellProps>=(props)=>{
    const {title, value, label, icon, arrowDirection, center, isLink, onClick, children, ...restProps} = props

    const classes = classNames('van-cell',{
        [`van-cell--center`]:center,
    })
    const arrowClases = classNames('van-icon ',{
        [`van-icon-arrow`]:isLink && !arrowDirection,
        [`van-icon-arrow-${arrowDirection}`]: arrowDirection,

    },'van-cell__right-icon')

    return ( 
        <div className={classes} onClick={onClick}>
            {icon?<i className={`van-icon van-icon-${icon}`}></i>:null}
            <div className="van-cell__title">
                <span>{title}</span>
                {label? <div className="van-cell__label">{label}</div>:null}
            </div>
           {value?<div className="van-cell__value">
                <span>{value}</span>
            </div>:null} 
            {children ? children : null}
            {isLink?<i className={arrowClases}></i>:null}
        </div>
    )

}


Cell.defaultProps={
}

export default Cell