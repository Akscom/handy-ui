import React ,{FC, MouseEvent, useState, useEffect} from 'react';
import classNames from 'classnames';
import {isDef} from '../utils/index'

interface PropsType {
    shape?: string;
    value?: number;
    defaultValue?: number;
    step?: number;
    min?: number;
    max?: number;
    disabled?: boolean;
    onInputChange?: (value?: number) => void;
    onChange?: (value?: number) => void;
    inputWidth?:string 
    buttonSize?:string
    decimal?:number|string
}

interface StepperProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

const Stepper:FC<StepperProps>=(props)=>{
  const { prefixCls, className, step=1, shape, decimal, disabled, inputWidth, buttonSize ,  min, max, onChange, onInputChange} = props;
  const [_value, setValue] = useState(0)
  const [_prevPropsValue, setPrevPropsValue] = useState(0)
  const [_lastValue, setLastValue] = useState(0)
  useEffect(()=>{
    console.log(props)
  })

  const handleOnInputChange = (value: string) => {
    const _value = Number(value);
    const { onInputChange } = props;
    setValue(_value)
    onInputChange && onInputChange(_value)
  };

  const onInputBlur = (value: number | string) => {
   let  val = Number(value);
    if (Number.isNaN(val)) {
      val = _lastValue;
    }
    if (min && min !== null && value < min) {
      val = min;
    }
    if (max && max !== null && value > max) {
      val = max;
    }

    setValue(val)
    setLastValue(val)

    onChange && onChange(val)
  };

  const format=(value:any)=>{
    if (isDef(decimal)) {
      value = value.toFixed(decimal);
    }

    return value;
  }

  const onSubClick = () => {
    if (isSubDisabled()) {
      return;
    }
    let newValue = Number(_value) - step;
    newValue = format(newValue)
    onInputBlur(newValue);
  };

  const onPlusClick = () => {
    if (isPlusDisabled()) {
      return;
    }
    let newValue = Number(_value) + step;
    newValue = format(newValue)
    onInputBlur(newValue);
  };

  const isSubDisabled = () => {
    if (min === null) {
      return false;
    }
    return (min && _value <= min) || disabled;
  };

  const isPlusDisabled = () => {
    if (max === null) {
      return false;
    }
    return (max && _value >= max) || disabled;
  };

    const classes = classNames(`${prefixCls}`, {
      [`${prefixCls}--round`]: isDef(shape)
    })

    const minusClasses=classNames(`${prefixCls}__minus`,{
      [`${prefixCls}__minus--disabled`]: isSubDisabled()
    })

    const plusClasses=classNames(`${prefixCls}__plus`,{
      [`${prefixCls}__plus--disabled`]: isPlusDisabled()
    })

    return (
      <>
        <div className={classes}>
          <button 
            type="button" 
            className={minusClasses} 
            onClick={onSubClick}
            style={{width: buttonSize, height: buttonSize}}
          ></button>
          <input 
            className="ha-stepper__input" 
            type="tel"
            value={_value}
            disabled={disabled}
            onChange={(e) => !disabled && handleOnInputChange(e.target.value)}
            onBlur={() => !disabled && onInputBlur(_value)}
            style={{width: inputWidth, height: buttonSize}}
          />
          <button 
            type="button" 
            className={plusClasses} 
            onClick={onPlusClick}
            style={{width: buttonSize, height: buttonSize}}
          ></button>
        </div>
      </>
    );
}

Stepper.displayName = 'Stepper';

Stepper.defaultProps = {
  prefixCls: 'ha-stepper',
  // shape: 'radius',
  disabled: false,
  step: 1,
};

export default Stepper