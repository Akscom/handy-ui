import React, {FC, useEffect, useState} from 'react';
import classNames from 'classnames';
import Icon from '../icon';

export interface IRateStarProps {
  prefix?: string;
  value: any;
  allowHalf?: boolean;
  disabled?: boolean;
  onClick?(e: React.MouseEvent<HTMLLIElement>, index: number): void;
  index: number;
  readOnly?: boolean;
  cref?:any
  icon?: string // 自定义图标
  size?: string | number
}

const Star:FC<IRateStarProps>=(props)=>{
  const { disabled, value, prefix, icon, size, readOnly, cref, allowHalf, index, onClick } = props;
  const disableEdit = disabled || readOnly;

  const [isFull, setIsFull] = useState(index + 1 <value)
  const [isZero, setIsZero] = useState(false)
  const [isHalf, setIsHalf] = useState(allowHalf && value + 0.5 === index + 1)
  const [isPart, setIsPart] = useState(readOnly && index + 1 > value && index + 1 === Math.ceil(value))

  const getConfig = (value:any) => {
    const starValue = index + 1;
    const _isFull = starValue <= value;
    const _isZero = starValue > Math.ceil(value);
    const _isHalf = allowHalf && value + 0.5 === starValue;
    const _isPart = readOnly && starValue > value && starValue === Math.ceil(value);
    setIsFull(_isFull)
    setIsZero(_isZero)
    setIsHalf(_isHalf)
    setIsPart(_isPart)
  }
  
  useEffect(()=>{
    getConfig(value)
  },[value])

  const handleOnClick = (e: React.MouseEvent<HTMLLIElement>) => {
    onClick && onClick(e, index)
    getConfig(value)
  };

  const getFloatValue = () => {
    return `${(value * 100) % 100}%`;
  };

  const classes= classNames(`van-rate__item `,{
    [`${prefix}-rate__icon--full`]: isFull,
    [`${prefix}-rate__icon--half`]: isHalf,
    // [`${prefix}-rate-star-zero`]: isZero,
    // [`${prefix}-rate-star-part`]: isPart,
  })

    return (
      <li
      ref={cref}
      className={classes}
      onClick={disableEdit ? undefined : handleOnClick}
    >
      {/* <i
        className='van-icon van-icon-star van-rate__icon'
        style={readOnly ? { width: getFloatValue() } : undefined}
      >
      </i> */}
      <Icon name={icon}  className='van-rate__icon' size={size} />
      <Icon name={icon}  className='van-rate__icon van-rate__half' size={size} />
    </li>
    );
}

Star.defaultProps={
  icon:'star'
}

export default Star