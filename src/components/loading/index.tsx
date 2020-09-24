import React, {FC, useState, ChangeEvent, useEffect, useRef, createContext, MouseEventHandler} from 'react'
import classNames from 'classnames'

export type LoadingType = 'circular' | 'spinner';

interface LoadingProps{
    type?: LoadingType;
    size?: string | number;
    color?: string;
    vertical?: boolean;
    textSize?: string | number;
}

const Loading:FC<LoadingProps>=(props)=>{
    const { color, size, type, vertical, children } = props;
    
    const LoadingIcon=()=>{
        if (type === 'spinner') {
            const Spin = [];
            for (let i = 0; i < 12; i++) {
              Spin.push(<i />);
            }
            return Spin;
        }

        return(
            <svg viewBox="25 25 50 50" className="van-loading__circular">
                <circle cx="50" cy="50" r="20" fill="none"></circle>
            </svg>
        )
    }

    const classes = classNames('van-loading ',{
        [`van-loading--spinner`]:type === 'spinner',
        [`van-loading--circular`]:type === 'circular',
        [`van-loading--vertical`]:vertical === true
    })

    const classesSpinner = classNames('van-loading__spinner',{
        [`van-loading__spinner--spinner`]:type === 'spinner',
        [`van-loading__spinner--circular`]:type === 'circular'
    })

    const styles = {color: color, width: size, height: size,}
    console.log(styles)

    return (
        <>
        <div className={classes}>
            <span className={classesSpinner} style={styles}>
                {LoadingIcon()}
            </span>
           {children?<span className="van-loading__text"> 加载中... </span>:'' } 
        </div>
        </>
    );
}

Loading.defaultProps={
    color: '#c9c9c9',
    type: 'circular',
    size: '30px',
    textSize: '14px',
    vertical: false
}

export default Loading