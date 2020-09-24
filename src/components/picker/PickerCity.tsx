import React, {FC, useEffect, TouchEvent, useState} from 'react'
import classNames from 'classnames'
import PickerColumn from './PickerColumn'
import cloneDeep from 'lodash/cloneDeep';
export type DataSource = Array<{ [key: string]: any; children?: DataSource }>;

interface PickerCityProps {
    columns?: DataSource;
    defaultValue?:any;
    // cascade?:boolean; // 是否联动
    onChange?:(e:any)=>void;
    onConfirm?:(e:any)=>void;
}

// 判断类型
const getDataType=(columns:any)=> {
    const firstColumn = columns[0] || {};
    if (firstColumn.children) {
        return 'cascade';
    }
    if (firstColumn.values) {
        return 'object';
    }
    return 'text';
}

const parseProps=(props:any)=> {
    const { columns, readOnly } = props;
    let value = cloneDeep(props.defaultValue || []);
    // 过滤undefinded
    value = value.filter((i:any) => i);
    let cursor = columns;
    const newOptions = [];
    const confirmedValue = value.length ? value : [];
    for (let deep = 0; cursor; deep += 1) {
      let index = 0;
      newOptions[deep] = cursor.map((o:any, i:any) => {
        const option = {
          value: o.value,
          label: o.label,
          defaultChecked: o.defaultChecked,
        };
        let val = value[deep];
        if (typeof val === 'object' && 'value' in value[deep]) {
          val = value[deep].value;
        }
        if (o.value === val) {
          index = i;
          value[deep] = option;
        }
        return option;
      });
      const checkedCursor = cursor.find((o:any) => o.defaultChecked);
  
      if ((!value || !value.length) && checkedCursor) {
        cursor = checkedCursor.children;
      } else {
        cursor = cursor[index] ? cursor[index].children : null;
      }
    }
    // when its readOnly mode show whatever passed in values
    if (readOnly && columns && columns.length <= 0) {
      const values = value.map((v:any) => ({ label: v, value: v }));
      return {
        columns: [],
        value: values,
        confirmedValue: values,
        originOptions: columns,
      };
    }
    return {
        columns: newOptions,
        value,
        confirmedValue,
        originOptions: columns,
    };
}

// 获取选中数据
function parseState(value:any, options:any) {
    // 过滤value，如果数组存在undefinded则过滤掉
    const filterdValue = value.filter((item:any) => item);
    let cursor = options;
    const newOptions = [];
    const newValue = cloneDeep(filterdValue);
    for (let deep = 0; cursor; deep += 1) {
      let index = 0;
      let valueIsFound = false;
      newOptions[deep] = cursor.map((o:any, i:number) => {
        const option = {
          value: o.value,
          label: o.label,
        }; 
        if (deep in filterdValue && o.value === filterdValue[deep].value) {
          index = i;
          newValue[deep] = option;
          valueIsFound = true;
        }
        return option;
      });
      if (!valueIsFound) {
        [newValue[deep]] = newOptions[deep];
      }
      cursor = cursor[index] ? cursor[index].children : null;
    }
    return {
        columns: newOptions,
        value: newValue,
    };
  }

const PickerCity:FC<PickerCityProps>=(props)=>{
    const {columns, defaultValue, onChange, children} = props
    // 判断类型
    // const dataType = getDataType(columns)
    // 数据格式化
    const {columns:cols, value} = parseProps(props)
    const [formatData, setFormatData] = useState(cols)
    const [selectedVal, setSelectedVal] = useState(value)
    const [_defaultValue, setDefaultValue] = useState(defaultValue)

    const changeSelectVal=(level= 0, selectedValue:any) =>{
     let arr = selectedVal.slice(0, level);
      arr[level] = {
        value: selectedValue.value,
        label: selectedValue.label,
      };
      if (selectedValue.children && selectedValue.children.length) {
        arr[level + 1] = {};
      }
      return arr
    }

    const handleChange=(value:any, level:any) =>{
      console.log(value)
      let val = changeSelectVal(level, value)
      setSelectedVal(val)
      const {columns:col, value:defaultVal} = parseState(val, columns)
      setFormatData(col)

      // 获取默认值['3','31','311']
      let arr:any = []
      defaultVal.forEach((item:any) => {
          arr.push(item.value)
      });
      setDefaultValue(arr)

      onChange && onChange(defaultVal);
    }

    const getColumns=()=>{
        return formatData.map((item:any, index:any) => (
            <PickerColumn
              // ref={`domRef${index}`}
              key={index}
              level={index}
              onChange={handleChange}
              columns={item}
              defaultValue={_defaultValue[index]}
            />
        ));
    }
    
    return (
        <>
        <div className="van-picker__columns" >
          {getColumns()}
        </div>
        </>
    )
}

export default PickerCity






// export const isCascader = ({ dataSource }) => {
//     return dataSource && dataSource[0] && !isArray(dataSource[0]);
//   };