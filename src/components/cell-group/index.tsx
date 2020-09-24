import React, {FC, useState, ChangeEvent, useEffect, useRef, createContext, MouseEventHandler} from 'react'
import classNames from 'classnames'


export interface CellGroupProps {
    title?: string,
}

const CellGroup:FC<CellGroupProps>=(props)=>{
    const {title, children, ...restProps} = props

    return ( 
        <>
        {title?<div className="van-cell-group__title">{title}</div>:null}
        <div className="van-cell-group van-hairline--top-bottom">
           {children}
        </div>
        </>
    )

}


CellGroup.defaultProps={
}

export default CellGroup