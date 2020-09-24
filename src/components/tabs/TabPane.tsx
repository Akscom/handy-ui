
import React, {FC, useEffect} from 'react';

export interface TabPaneProps {
    // key?: any;
    className?: string;
    role?: string;
    active?: boolean;
    fixX?: boolean;
    fixY?: boolean;
}

const TabPane:FC<TabPaneProps>=(props)=>{
    const {children, active, fixX, fixY,  ...restProps }=props

    return (
        <div  {...restProps}  >
            {children? children:''}
        </div>
    )
}

TabPane.defaultProps = {
    fixX: true,
    fixY: true,
};

export default TabPane