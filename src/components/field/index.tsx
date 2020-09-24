import React, {FC, useState, ChangeEvent, useEffect, useRef, createContext, MouseEventHandler} from 'react'
import classNames from 'classnames'
import Icon from '../icon';

type InputType = 'text'|'textarea'|'password'|'tel'|'digit'|'number'

const  prefixCls = 'van'
export type InputEventHandler = (value?: string) => void;

export interface InputProps {
    type?: InputType,
    label?: String,
    value?: string,
    placeholder?:string, // 占位提示文字
    disabled?: Boolean,
    readonly?: Boolean,
    required?: Boolean,
    maxlength?: number|string,
    border?: Boolean,
    clearable?: Boolean,
    inputAlign?: String,  // 输入框对齐方式
    labelAlign?: String // 左侧文本对齐方式
    labelWidth?: number | string,
    className?: String,
    autosize?: Boolean,
    count?: Boolean,
    rows?: number,
    leftIcon?: string,
    rightIcon?: string,
    onChange? : (value: string) => void,
    onFocus?: (value?: string) => void,
    onBlur?: (value?: string) => void,
    clickLeftIcon?: (value?:any) => void,
    clickRightIcon?: (value?:any) => void
}

// count 
const regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]|\n/g;

function countSymbols(text = '') {
    const t = text.trim()
    return t.replace(regexAstralSymbols, '_').length;
}

const Field : FC<InputProps> =(props) =>{
    // 取出各种属性
    const {type, label, value, placeholder, disabled, readonly, maxlength, border, clearable, 
        inputAlign, labelAlign, labelWidth, autosize, count, rows, leftIcon, rightIcon,  className, children, required, 
        onChange, onFocus, onBlur, clickLeftIcon, clickRightIcon ,...restProps} = props
    // 根据属性计算不同的className
    // 根据属性判断是否添加节点
    const classes = classNames(`${prefixCls}-cell__value ${prefixCls}-field__value `, className, {
        [`${prefixCls}-cell__value--alone`]: label,
    })

    const inputClasses = classNames(`${prefixCls}-field__control `,{
        [`${prefixCls}-field__control--right`]: inputAlign === 'right'
    })

    const labelClasses = classNames(`${prefixCls}-cell__title ${prefixCls}-field__label`,{
        [`${prefixCls}-cell--required`]: required
    })

    const [ inputValue, setInputValue ] = useState(value as string)

    let domRef = useRef<HTMLTextAreaElement>(null)

    // 想在组件更新时才发生某些操作  ComponentDidUpdate 方法 
    useEffect(()=>{
        if (domRef.current && autosize){
            let input = domRef.current
            input.style.height = 'auto'
            input.scrollTop = 0;
            input.style.height = `${input.scrollHeight}px`;
        }
    }) 

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setInputValue(value)
        onChange && onChange(value) 
    }               
   
    const onInputFocus=(e: React.FocusEvent<HTMLInputElement>)=>{
        const value = (e.target as any).value;
        onFocus && onFocus(value)
    }
    const onInputBlur=(e: React.FocusEvent<HTMLInputElement>)=>{
        const value = (e.target as any).value;
        onBlur && onBlur(value)
    }

    const handleClear = () => {
        if(domRef.current){
            domRef.current.value =''
        }
        setInputValue('')
        onChange && onChange('')
    }

    const characterLength = countSymbols(inputValue);

    // 限制长度
    const lengthCtrlProps: any = {};
    lengthCtrlProps.maxLength = maxlength || 300

    return (
        <div className="van-cell van-field">
            {leftIcon && <div className='van-field__left-icon' onClick={clickLeftIcon}><i className={`van-icon van-icon-${leftIcon}`}></i></div>}
            {label && <div className={labelClasses} style={{width:labelWidth+'px'}}><span>{label}</span></div>}
            <div className={classes}>
                <div className="van-field__body">
                   {type !== 'textarea'? 
                    <input 
                        ref={domRef} 
                        value={inputValue}
                        placeholder={placeholder} 
                        className={inputClasses} 
                        disabled={disabled}
                        readOnly={readonly}
                        {...lengthCtrlProps} 
                        onChange={onInputChange}
                        onFocus={onInputFocus}
                        onBlur={onInputBlur}
                    />:
                    <textarea 
                        ref={domRef} 
                        value={inputValue}
                        rows={rows} 
                        placeholder="请输入留言" 
                        className={inputClasses} 
                        disabled={disabled}
                        readOnly={readonly}
                        {...lengthCtrlProps} 
                        onChange={onInputChange}
                        onFocus={onInputFocus}
                        onBlur={onInputBlur}
                    />
                   } 
                    {children}
                    {rightIcon && <div className="van-field__right-icon" onClick={clickRightIcon}><i className={`van-icon van-icon-${rightIcon}`}></i></div>}
                    {clearable && (inputValue && inputValue.length>0)? <Icon name="clear" onClick={handleClear} /> : null}
                </div>
                {
                  count ? <div className="van-field__word-limit">
                        <span className="van-field__word-num">{characterLength}</span>/50
                    </div>: null
                }
                
            </div>
        </div>
    )
    
}

Field.defaultProps = {
    disabled: false,
    placeholder: '请输入文本',
    autosize: false,
    rows:1,
    inputAlign:'left'
}

export default Field