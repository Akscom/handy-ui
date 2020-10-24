import React ,{FC, MouseEvent} from 'react';
import classNames from 'classnames';
import GroupContext from './GroupContext';
import Cell from '../cell'

export interface IRadioProps {
  value?: any;
  disabled?: boolean;
  readOnly?: boolean;
  width?: number | string;
  className?: string;
  checked?: boolean;
  shape?: string,
  iconSize?: number | string,
  checkedColor?: string,
  onChange?: (e: any) => void;
  style?: React.CSSProperties;
  // children?: React.ReactNode;
  children?: any;
}

const Radio:FC<IRadioProps>=(props)=>{
  const {
    className,
    style,
    children,
    // value 不要放到 input 上去
    value,
    width,
    shape,
    iconSize,
    checkedColor,
    checked: _3,
    disabled = false,
    readOnly  = false,
    onChange,
  } = props
  const groupCtx = React.useContext(GroupContext);
  const cxOnChange = groupCtx && groupCtx.onRadioChange;

  let checked: boolean;
  if (groupCtx) {
    checked = groupCtx.isValueEqual(groupCtx.value, props.value);
  } else {
    checked = !!props.checked;
  }

  const onChangeVal = (event: MouseEvent<HTMLElement>) => {
    console.log(event)
    const e = Object.create(event);
    e.target = {
      ...props,
      type: 'radio',
      checked: !(event.currentTarget.getAttribute('aria-checked') === 'true'),
    };
    console.log(e)
    if (cxOnChange) {
      cxOnChange(e);
    } else {
      onChange && onChange(e);
    }
  }

  const classes = classNames('ha-radio',{
    [`ha-checkbox--disabled`]: disabled,
    [`ha-radio--horizontal`]: groupCtx && groupCtx.direction === 'horizontal'
    // [`ha-checkbox--label-disabled`]: labelDisabled
  })
  const iconClasses=classNames('ha-radio__icon  ',{
      [`ha-radio__icon--round`]: shape!=='square',
      [`ha-radio__icon--square`]: shape==='square',
      [`ha-radio__icon--checked`]: checked,
      [`ha-checkbox__icon--disabled`]: disabled
  })
  const colorStyle = {borderColor: checked? checkedColor:'',backgroundColor:checked? checkedColor:''}
  
  const radioRender = (
      <div role="radio" className={classes}  tab-index="-1" aria-checked={!!checked} onClick={onChangeVal} >
        <div className={iconClasses}  style={{fontSize: iconSize}}>
          <i className="ha-icon ha-icon-success" style={colorStyle}></i>
        </div>
        {groupCtx && groupCtx.type === 'cell'?null: children !== undefined &&<span className="ha-radio__label">{children}</span> }
    </div>
  )

  if (groupCtx && groupCtx.type === 'cell') {
    return (
        <Cell title={children} value="" onClick={onChangeVal}>
          {radioRender}
        </Cell>
    );
  }
  return radioRender
}

export default Radio
