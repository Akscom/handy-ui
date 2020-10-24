import React, { FC, useState , TouchEvent, useEffect, MouseEvent} from 'react';
import PickerCity from './PickerCity'
import Popup from '../popup'

interface PickerProps {
  columns?:any;
  title?:string;
  level?:number;
  defaultValue?:any;
  onChange?:(e:any)=>void;
  onConfirm?:(e:any)=>void;
  onCancel?:(e:any)=>void;
  popupVisible?:boolean;
}

const Picker:FC<PickerProps>=(props)=>{
  const { columns, defaultValue, title, popupVisible, onConfirm, onCancel} = props
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
      visible={popupVisible}
      // onMaskClick={handleOnCancel}
      direction="bottom"
    >
      <div className="ha-picker__toolbar">
        <button type="button" className="ha-picker__cancel" onClick={onCancel}>取消</button>
        <div className="ha-ellipsis ha-picker__title">{title?title:'标题'}</div>
        <button type="button" className="ha-picker__confirm" onClick={handleOnConfirm}>确认</button>
      </div>
      <PickerCity 
        onChange={handleOnChange}
        columns={columns}
        defaultValue={defaultValue}
      />
    </Popup>
    </>
  )
}

export default Picker;
