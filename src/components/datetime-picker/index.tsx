import React, { FC, useState , TouchEvent, useEffect, MouseEvent} from 'react';
import DatePickerView from './DatePickerView'
import Popup from '../popup'

interface DatePickerProps {
  mode?: 'year' | 'month' | 'date' | 'time' | 'datetime';
  value?: string | Date;
  defaultValue?: string | Date;
  wheelDefaultValue?: string | Date;
  onChange?:(e:any)=>void;
  valueMember?:string;
  minuteStep?: number;
  min?: object | string;
  max?: object | string;
  title?: string;
  onConfirm?:(e:any)=>void;
  onCancel?:(e:any)=>void;
  visible?:boolean; 
}

const DatePicker:FC<DatePickerProps>=(props)=>{
  const {visible, title, onConfirm, onCancel, ...restProps} = props
  const [selectedVal, setValue] = useState([])

  const handleOnChange=(value:any)=>{
    setValue(value)
  }

  const handleOnConfirm=(e:MouseEvent<HTMLElement>)=>{
    onConfirm && onConfirm(selectedVal)
    onCancel && onCancel(e)
  }

  return (
    <>
    <Popup
      visible={visible}
      // onMaskClick={handleOnCancel}
      direction="bottom"
    >
      <div className="van-picker__toolbar">
        <button type="button" className="van-picker__cancel" onClick={onCancel}>取消</button>
        <div className="van-ellipsis van-picker__title">{title?title:'标题'}</div>
        <button type="button" className="van-picker__confirm" onClick={handleOnConfirm}>确认</button>
      </div>
      <DatePickerView
       {...restProps}
       onChange={handleOnChange}
      /> 
    </Popup>
    </>
  )
}

export default DatePicker;
