import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import classNames from 'classnames'

export enum ButtonSize{
    Large = 'lg',
    Middle = 'md',
    Small = 'sm'
}

export enum ButtonType{
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link'
}

interface BaseButtonProps{
    className?:string,
    disabled?: boolean,
    size?:ButtonSize,
    btnType?: ButtonType,
    children: React.ReactNode,
    href?: string
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement> // & 合并参数
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>  // Partial 转为可选

const Button: FC<ButtonProps> = (props) => {
    const {btnType, disabled, className, size, children, href, ...restProps} = props 

    // btn, btn-lgs, btn-primary
    const classes = classNames('btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled':( btnType === ButtonType.Link ) && disabled
    })

    console.log(ButtonType)

    // 有link的返回a标签，否则都是button标签，disabled本身在button标签上，而在a标签的class上
    if(btnType === ButtonType.Link && href){
        return (
            <a className={classes} href={href} {...restProps}>{children}</a>
        )
    }else{
        return (
            <button className={classes} disabled={disabled} {...restProps}>{children}</button>
        )
    }
}

Button.defaultProps = {
    disabled: false,
    btnType: ButtonType.Default
}

export default Button