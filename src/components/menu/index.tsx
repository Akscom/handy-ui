import React, {useState, createContext} from 'react'
import classNames from 'classnames'
import {MenuItemProps} from './menuItem'

type MenuMode = 'horizontal'|'vertical'
type SelectCallback = (selectedIndex: string) => void

export interface MenuProps {
    defaultIndex?:string // 默认 active 的菜单项的索引值
    className?: string
    mode?: MenuMode
    style?: React.CSSProperties,
    // children: React.ReactNode,
    onSelect?: SelectCallback, // 点击菜单项触发的回掉函数
    defaultOpenSubMenus?: string[]; // 设置子菜单的默认打开 只在纵向模式下生效
}

interface IMenuContext{
    index: string,
    onSelect?: SelectCallback,
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];  
}

export const MenuContext = createContext<IMenuContext>({index: '0'})

const Menu: React.FC<MenuProps> = (props) => {
    const { className, mode, style, children, defaultIndex, onSelect} = props
    const [ currentActive, setActive ]=useState(defaultIndex)
    const classes = classNames('viking-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical',
    })
    const handleClick = (index: string) => {
        setActive(index)
        if(onSelect){
            onSelect(index)
        }
    }
    const passedContext: IMenuContext = {
        index:currentActive ? currentActive : '0',
        onSelect: handleClick
    }
    const renderChildren = () => {
        return React.Children.map(children, (child, index)=>{
            const childElement = child as React.FunctionComponentElement<MenuItemProps>  // 类型断言
            const { displayName } = childElement.type
            // 判断子内容是否menuitem
            if(displayName === 'MenuItem'|| displayName === 'SubMenu'){
                return React.cloneElement(childElement, {index: index.toString()})
            }else{
                console.log('warning: Menu has a child which is not a MenuItem component')
            }
        })
    }
    return (
        <ul className={classes} style={style} data-testid="test-menu">
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: [],
}

export default Menu
