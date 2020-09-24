import React, {FC, useState, ChangeEvent, useEffect, useRef, createContext, MouseEventHandler} from 'react'
import classNames from 'classnames'

const  prefixCls = 'van'

export interface IconProps{
    name?: string,
    dot?: Boolean,
    badge?: string | number,
    color?: string;
    size?: string | number,
    classPrefix?: string,
    tag?: keyof HTMLElementTagNameMap | string
    className?: string,
    onClick?: MouseEventHandler<HTMLElement>
}

function isImage(name?: string): boolean {
    return name ? name.indexOf('/') !== -1 : false;
  }

const Icon : FC<IconProps> = (props) => {
    const {name, dot, badge, color, size, className, onClick, ...rest} = props
    const imageIcon = isImage(name)
    const classes = classNames(`${prefixCls}-icon`, className ,{
        [`${prefixCls}-icon-${name}`]: !imageIcon
    })
    return (
        <i className={classes} style={{color:color, fontSize: `${size}px`}} onClick={onClick}>
            {imageIcon && <img className='van-icon__image' src={name} /> }
            {dot && <div className="van-info van-info--dot"></div>}
            {badge && <div className="van-info">{ badge }</div>}
        </i>
    )
}


Icon.defaultProps = {
    dot: false
}

export default Icon