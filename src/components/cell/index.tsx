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

    const classes = classNames('ha-cell',{
        [`ha-cell--center`]:center,
    })
    const arrowClases = classNames('ha-icon ',{
        [`ha-icon-arrow`]:isLink && !arrowDirection,
        [`ha-icon-arrow-${arrowDirection}`]: arrowDirection,

    },'ha-cell__right-icon')

    return ( 
        <div className={classes} onClick={onClick}>
            {icon?<i className={`ha-icon ha-icon-${icon}`}></i>:null}
            <div className="ha-cell__title">
                <span>{title}</span>
                {label? <div className="ha-cell__label">{label}</div>:null}
            </div>
           {value?<div className="ha-cell__value">
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