import React, {FC, useState, ChangeEvent, useEffect, useRef, createContext, MouseEventHandler} from 'react'
import classNames from 'classnames'

export type LoadingType = 'circular' | 'spinner';

export interface BasePropsType {
    prefixCls?: string;
    className?: string;
}

interface LoadingProps extends BasePropsType {
    type?: LoadingType;
    size?: string | number;
    color?: string;
    vertical?: boolean;
    textSize?: string | number;
}

const Loading:FC<LoadingProps>=(props)=>{
    const { prefixCls, color, size, type, vertical, children } = props;
    
    const LoadingIcon=()=>{
        if (type === 'spinner') {
            const Spin = [];
            for (let i = 0; i < 12; i++) {
              Spin.push(<i />);
            }
            return Spin;
        }

        return(
            <svg viewBox="25 25 50 50" className={`${prefixCls}__circular`}>
                <circle cx="50" cy="50" r="20" fill="none"></circle>
            </svg>
        )
    }

    const classes = classNames(`${prefixCls}`,{
        [`${prefixCls}--spinner`]:type === 'spinner',
        [`${prefixCls}--circular`]:type === 'circular',
        [`${prefixCls}--vertical`]:vertical === true
    })

    const classesSpinner = classNames(`${prefixCls}__spinner`,{
        [`${prefixCls}__spinner--spinner`]:type === 'spinner',
        [`${prefixCls}__spinner--circular`]:type === 'circular'
    })

    const styles = {color: color, width: size, height: size,}

    return (
        <>
        <div className={classes}>
            <span className={classesSpinner} style={styles}>
                {LoadingIcon()}
            </span>
           {children?<span className={`${prefixCls}__text`}> 加载中... </span>:'' } 
        </div>
        </>
    );
}

Loading.defaultProps={
    prefixCls: 'ha-loading',
    color: '#c9c9c9',
    type: 'circular',
    size: '30px',
    textSize: '14px',
    vertical: false
}

export default Loading