import React, {useState, useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './index'
import {MenuItemProps} from './menuItem'

export interface SubMenuProps{
  index?:string,
  title:string,
  className?:string
}

const SubMenu:React.FC<SubMenuProps> = ({index, title, children, className})=>{
  const [menuOpen, setOpen] = useState(false)
  const context = useContext(MenuContext)
  const classes = classNames('menu-item submenu-item', className, {
    'is-active':context.index === index,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical'
  })
  const handleClick = (e:React.MouseEvent)=>{
    e.preventDefault()
    setOpen(!menuOpen)
  }
  let timer: any
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setOpen(toggle)
    }, 300)
  }
  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {}
  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true)},
    onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false)}
  } : {}
  const renderChildren = () =>{ // 渲染下拉菜单里的内容
    const subMenuClasses = classNames('viking-submenu', {
      'menu-opened': menuOpen
    })
    const childrenComponent = React.Children.map(children,(child, i)=>{
      const childElement = child as React.FunctionComponentElement<MenuItemProps>  // 类型断言
      const { displayName } = childElement.type
      // 判断子内容是否menuitem
      if(displayName === 'MenuItem'){
        return childElement
      }else{
          console.log('warning: SubMenu has a child which is not a MenuItem component')
      }
    })
    return (
      <ul className={subMenuClasses}>
        {childrenComponent}
      </ul>
    )
  }
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className = "submenu-title" {...clickEvents}>
        {title}
      </div>
      {renderChildren()}
    </li>
  )

}

SubMenu.displayName = "SubMenu"
export default SubMenu