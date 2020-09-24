import React,{FC, useEffect} from 'react';
import classNames from 'classnames';
import GroupContext from './GroupContext';

const GroupContextProvider = GroupContext.Provider;

export interface ICheckboxGroupProps {
  value?: any[];
  isValueEqual?: (value1: any, value2: any) => boolean;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: (values: any[]) => void;
  className?: string;
  direction?: string;
  style?: React.CSSProperties;
  prefix?: string;
  max?: number | string;
  type?: string;
}

const CheckboxGroup:FC<ICheckboxGroupProps>=(props)=>{
  const {
    className,
    prefix,
    style,
    children,
    value: prevValue,
    disabled = false,
    readOnly = false,
    direction,
    max,
    type = "",
    isValueEqual= Object.is,
    onChange,
  } = props;
  // context!: IDisabledContext;

  // useEffect(()=>{
  //   console.log(disabled)
  // })

 const getGroupContext = (
      maybeValue: any[] | unknown,
      type: string,
      disabled: boolean,
      readOnly: boolean,
      isValueEqual: (value1: any, value2: any) => boolean
    ) => {
      let value;
      if (Array.isArray(maybeValue)) {
        value = maybeValue;
      } else {
        value = [];
      }
      return {
        value,
        type,
        disabled,
        readOnly,
        isValueEqual,
        onChange: onCheckboxChange,
      };
    }

  const onCheckboxChange = (child: any) => {
    if (!onChange) {
      return;
    }
    const value = prevValue ? prevValue.slice() : [];
    const index = value.findIndex(it => isValueEqual(it, child));
      
    // if (max && value.length >= 3) {
    //   return;
    // }

    if (index !== -1) {
      value.splice(index, 1);
    } else {
      value.push(child);
    }

    onChange(value);
  };

    const classes = classNames(`van-checkbox-group`,
      {
        // [`${prefix}-checkbox-group`]: true,
        [`van-checkbox-group--horizontal`]: direction==='horizontal'
      },
      className
    );

    return (
      <GroupContextProvider value={getGroupContext(prevValue, type, disabled, readOnly, isValueEqual)} >
        <div className={classes} style={style}>
          {children}
        </div>
      </GroupContextProvider>
    );
}

CheckboxGroup.defaultProps = {
  prefix: 'zent',
  isValueEqual: Object.is, // 判断两个值是否相等
  value: []
};

// CheckboxGroup.contextType = DisabledContext;

export default CheckboxGroup;
