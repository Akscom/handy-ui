import React,{FC, useState, useEffect} from 'react';
import { Component } from 'react';
import classNames from 'classnames';

import Star from './Star';
// import { start } from 'repl';
// import { DisabledContext, IDisabledContext } from '../disabled';

export interface IRateProps {
  onChange?: (value: number) => void;
  value?: number;
  allowClear?: boolean;
  allowHalf?: boolean;
  className?: string;
  count?: number;
  disabled?: boolean;
  style?: React.CSSProperties;
  prefix?: string;
  readOnly?: boolean;
  icon?: string // 自定义图标
  size?: string | number
}


export interface IRateState extends IRateProps {
  starRefs?: Array<any>;
  hoverValue?: number | null;
}

function refArray(length: number): Array<any> {
  const refs = [];
  for (let i = 0; i < length; i += 1) {
    refs.push(React.createRef<HTMLDivElement>());
  }
  return refs;
}

const Rate:FC<IRateState>=(props)=>{
  const {
    count=5, allowHalf, style, prefix,  disabled ,  className, value, readOnly,
    allowClear, onChange, ...restProps
  } = props

  const [hoverValue, setHoverValue] = useState<any>(null)
  const [starRefs, setStarRefs] = useState(refArray(count))

 const handleOnClick = (event: React.MouseEvent<HTMLLIElement>, index: number) => {
    const _value = getStarValue(index, event.pageX);
    let isReset = false;
    if (allowClear) {
      isReset = _value === value;
    }
    onChange && onChange(isReset ? 0 : _value);
    let a = isReset? _value : null
    setHoverValue(_value)
  };

  const getStarValue=(index: number, x: number)=>{
    let value = index + 1;
    if (allowHalf) {
      const starEle = starRefs[index];
      const leftDis = starEle.getBoundingClientRect().left;
      const width = starEle.clientWidth;
      if (x - leftDis < width / 2) {
        value -= 0.5;
      }
    }
    return value;
  }

  useEffect(()=>{
    console.log(starRefs)
    if (count !== starRefs.length) {
      setStarRefs(refArray(count))
    }
  },[count])

  const getStarts=()=>{
    const stars = [];
    for (let index = 0; index < count; index++) {
      stars.push(
        <Star
        key={index}
        // ref={starRefs[index]}
        // ref = {(val) => {starRefs[index] = val}}
        cref={(ref:any) => starRefs[index] = ref }
        index={index}
        disabled={disabled}
        prefix={prefix}
        allowHalf={allowHalf}
        value={hoverValue !== null ? hoverValue : value}
        onClick={handleOnClick}
        readOnly={readOnly}
        {...restProps}
      />
      );
    }
    return stars
  }

  
    return (
      <ul
        className={classNames(
          `${prefix}-rate`,
          {
            [`${prefix}-rate-disabled`]: disabled,
            [`${prefix}-rate-readonly`]: readOnly,
          },
          className
        )}
        style={style}
      >
        {getStarts()}
      </ul>
    );
}

Rate.defaultProps = {
  value: 0,
  count: 5,
  allowHalf: false,
  allowClear: true,
  prefix: 'van',
  readOnly: false,
};

export default Rate;
