import React from 'react';
import classNames from 'classnames';
import GroupContext, { IRadioContext } from './GroupContext';

export interface IRadioGroupProps {
  value?: any;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: (e:any) => void;
  isValueEqual?: (value1: any, value2: any) => boolean;
  className?: string;
  style?: React.CSSProperties;
  direction?: string;
  children?: React.ReactNode;
  type?: string;
}

export function RadioGroup(props: IRadioGroupProps) {
  const {
    value,
    disabled = false,
    readOnly = false,
    isValueEqual = Object.is,
    className,
    style,
    children,
    direction='',
    type='',
    onChange,
  } = props;

  const ctx = React.useMemo<IRadioContext>(
    () => ({
      value,
      disabled,
      readOnly,
      direction,
      type,
      isValueEqual,
      onRadioChange: onChange,
    }),
    [value, disabled, readOnly, direction, type, isValueEqual, onChange]
  );

  const classes = classNames(`ha-radio-group`,
    {
      // [`${prefix}-checkbox-group`]: true,
      [`ha-radio-group--horizontal`]: direction==='horizontal'
    },
    className
  );

  return (
    <GroupContext.Provider value={ctx}>
      <div className={classes} style={style}>
        {children}
      </div>
    </GroupContext.Provider>
  );
}

export default RadioGroup;
