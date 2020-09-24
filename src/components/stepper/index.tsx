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

// export interface StepperStates {
//   value: number;
//   prevPropsValue: number;
//   lastValue: number;
// }


const Stepper:FC<StepperProps>=(props)=>{
    const { prefixCls, className, step=1, shape, decimal, disabled, inputWidth, buttonSize ,  min, max, onChange, onInputChange} = props;
    const [_value, setValue] = useState(0)
    const [_prevPropsValue, setPrevPropsValue] = useState(0)
    const [_lastValue, setLastValue] = useState(0)
    useEffect(()=>{
      console.log(props)
    })

//   static getDerivedStateFromProps(nextProps: StepperProps, prevState: StepperStates) {
//     if (
//       typeof nextProps.value !== 'undefined'
//       && nextProps.value !== prevState.prevPropsValue
//     ) {
//       const value = Number(getValue(nextProps, 0));

//       return {
//         value,
//         lastValue: value,
//         prevPropsValue: value,
//       };
//     }

//     return null;
//   }

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
    // value = this.formatNumber(value);

    // // format range
    // value = value === '' ? 0 : +value;
    // value = isNaN(value) ? this.min : value;
    // value = Math.max(Math.min(this.max, value), this.min);

    // format decimal
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

    // const cls = classNames(prefixCls, className, {
    //   [`${prefixCls}--${shape}`]: !!shape,
    //   [`${prefixCls}--${size}`]: !!size,
    //   [`${prefixCls}--disabled`]: disabled,
    // });

    // const buttonSize = (size === 'lg') ? 'sm' : 'xs';

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
            className="van-stepper__input" 
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
      {/* <span className={cls}> */}
        {/* <Button
          className={`${prefixCls}__sub`}
          size={buttonSize}
          disabled={this.isSubDisabled()}
          shape={shape}
          onClick={this.onSubClick}
        >
          <Icon type="minus" />
        </Button> */}

        {/* <button onClick={onSubClick}> - </button>
        <input
          className={`${prefixCls}__input`}
          type="tel"
          value={_value}
          disabled={disabled}
          onChange={(e) => !disabled && handleOnInputChange(e.target.value)}
          onBlur={() => !disabled && onInputBlur(_value)}
        />

        <button onClick={onPlusClick}> + </button> */}

        {/* <Button
          className={`${prefixCls}__plus`}
          size={buttonSize}
          disabled={this.isPlusDisabled()}
          shape={shape}
          onClick={this.onPlusClick}
        >
          <Icon type="add" />
        </Button> */}
      {/* </span> */}
      </>
    );
}

Stepper.displayName = 'Stepper';

Stepper.defaultProps = {
  prefixCls: 'van-stepper',
  // shape: 'radius',
  disabled: false,
  step: 1,
};

export default Stepper