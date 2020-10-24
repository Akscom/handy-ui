import React ,{FC, useState, useEffect} from 'react';
import classNames from 'classnames';

interface PropsType{
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    onChange?: (checked?: boolean) => void;
    className?: string;
    activeColor?: string; // 打开时对应的值
    inactiveColor?: string; // 关闭时对应的值
    size?: string
}
  
interface SwitchProps extends PropsType {
    prefixCls?: string;
}

const Switch:FC<SwitchProps>=(props)=>{

  const { prefixCls, checked, size, className, activeColor, inactiveColor, disabled, onChange } = props;
  const [_checked, setChecked] = useState(checked)

  const onValueChange = () => {
    if (disabled) {
      return;
    }
    const newChecked = !_checked;
    setChecked(newChecked)
    onChange && onChange(newChecked);
  };

  const classes = classNames(prefixCls, className, {
    [`${prefixCls}--disabled`]: disabled,
    [`${prefixCls}--on`]:_checked
  });

  const styles = {background: _checked ? activeColor : inactiveColor, fontSize:size}

  return (
      <>
        <div role="switch" aria-checked={_checked} className={classes} style={styles} onClick={onValueChange}>
          <div className="ha-switch__node"></div>
        </div>
      </>
  );
}

Switch.displayName = 'Switch';

Switch.defaultProps = {
    prefixCls: 'ha-switch',
    disabled: false,
    checked: false
};


export default  Switch