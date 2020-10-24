import React, { FC, Component, useEffect, useState } from 'react';
import isEqual from 'lodash/isEqual';
// import BaseDatePickerViewProps from './PropsType';
import PickerColumn from '../picker/PickerColumn';
// import removeFnFromProps from '../picker-view/utils/removeFnFromProps';
import { isExtendDate, parseState } from './utils/parseState';

interface DatePickerViewProps{
  mode?: 'year' | 'month' | 'date' | 'time' | 'datetime';
  value?: string | Date;
  defaultValue?: string | Date;
  wheelDefaultValue?: string | Date;
  onChange?:(e:any)=>void;
  valueMember?:string;
  minuteStep?: number;
  min?: object | string;
  max?: object | string;
}

const DATETIME = 'datetime';
const DATE = 'date';
const TIME = 'time';
const MONTH = 'month';
const YEAR = 'year';
const ONE_DAY = 24 * 60 * 60 * 1000;
const locale = {
  year: '年',
  month: '月',
  day: '日',
  hour: '时',
  minute: '分',
}

// 获取当月天数
const getDaysInMonth = (date:any) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

// 补齐格式
const pad = (n:any) => {
  return n < 10 ? `0${n}` : n;
};

const cloneDate = (date:any) => {
  return new Date(+date);
};

const setMonth = (date:any, month:any) => {
  date.setDate(Math.min(date.getDate(), getDaysInMonth(new Date(date.getFullYear(), month))));
  date.setMonth(month);
};

const getGregorianCalendar = (year:any, month:any, day:any, hour:any, minutes:any, seconds:any) => {
  return new Date(year, month, day, hour, minutes, seconds);
};

const DatePickerView:FC<DatePickerViewProps>=( props )=>{
  const {  min, max,  mode, valueMember, minuteStep, onChange } = props;
  const { date, wheelDefault } = parseState(props)
  const [ _date, setDate] = useState(date)

 const getNewDate = (values:any, index:number) => {
    // function isValidKey(key: any, obj: {[propName: string]: any}): key is keyof typeof obj {
    //   return key in obj;
    // }
    // const a = isValidKey(index, values) && values[index][valueMember!]
    const value = parseInt(values[valueMember!], 10); // 表示传入的源数据是个10进制数据
    const newValue = cloneDate(getDate());
    if (mode === YEAR || mode === MONTH || mode === DATE || mode === DATETIME) {
      switch (index) {
        case 0:
          newValue.setFullYear(value);
          break;
        case 1:
          setMonth(newValue, value);
          break;
        case 2:
          newValue.setDate(value);
          break;
        case 3:
          newValue.setHours(value);
          break;
        case 4:
          newValue.setMinutes(value);
          break;
        default:
          break;
      }
    } else {
      switch (index) {
        case 0:
          newValue.setHours(value);
          break;
        case 1:
          newValue.setMinutes(value);
          break;
        default:
          break;
      }
    }
    return clipDate(newValue);
  };

  const getColsValue = () => {
    const { mode } = props;
    const date = getDate();

    let dataSource: any[] = [];
    let value: any[] = [];

    if (mode === YEAR) {
      dataSource = getDateData();
      value = [date.getFullYear()];
    }
    if (mode === MONTH) {
      dataSource = getDateData();
      value = [date.getFullYear(), date.getMonth()];
    }
    if (mode === DATE || mode === DATETIME) {
      dataSource = getDateData();
      value = [date.getFullYear(), date.getMonth(), date.getDate()];
    }
    if (mode === DATETIME) {
      dataSource = dataSource.concat(getTimeData());
      value = value.concat([date.getHours(), date.getMinutes()]);
    }
    if (mode === TIME) {
      dataSource = getTimeData();
      value = [date.getHours(), date.getMinutes()];
    }

    return {
      dataSource,
      value,
    };
  };

 const getDateData = () => {
    const date = getDate();
    const yearCol: object[] = [];
    const monthCol: object[] = [];
    const dayCol: object[] = [];

    const selectYear = date.getFullYear();
    const selectMonth = date.getMonth();
    const minYear = getMinYear();
    const maxYear = getMaxYear();

    for (let i = minYear; i <= maxYear; i += 1) {
      yearCol.push({
        label: i + locale!.year,
        value: i,
      });
    }

    if (mode === YEAR) {
      return [yearCol];
    }

    let minMonth = 0;
    let maxMonth = 11;
    if (selectYear === minYear) {
      minMonth = getMinMonth();
    }
    if (selectYear === maxYear) {
      maxMonth = getMaxMonth();
    }

    for (let i = minMonth; i <= maxMonth; i += 1) {
      monthCol.push({
        label: i + 1 + locale!.month,
        value: i,
      });
    }

    if (mode === MONTH) {
      return [yearCol, monthCol];
    }

    let minDay = 1;
    let maxDay = getDaysInMonth(date);

    if (selectYear === minYear && selectMonth === minMonth) {
      minDay = getMinDay();
    }

    if (selectYear === maxYear && selectMonth === maxMonth) {
      maxDay = getMaxDay();
    }

    for (let i = minDay; i <= maxDay; i += 1) {
      dayCol.push({
        label: i + locale!.day,
        value: i,
      });
    }

    if (mode === DATE) {
      return [yearCol, monthCol, dayCol];
    }

    return [yearCol, monthCol, dayCol];
  };

 const getTimeData = () => {
    const date = getDate();
    const hourCol: object[] = [];
    const minuteCol: object[] = [];

    let minHour = 0;
    let maxHour = 23;
    let minMinute = 0;
    let maxMinute = 59;

    const minDateHour = getMinHour();
    const maxDateHour = getMaxHour();
    const minDateMinute = getMinMinute();
    const maxDateMinute = getMaxMinute();
    const selectHour = date.getHours();

    if (mode === DATETIME) {
      const selectYear = date.getFullYear();
      const selectMonth = date.getMonth();
      const selectDay = date.getDate();
      const minYear = getMinYear();
      const maxYear = getMaxYear();
      const minMonth = getMinMonth();
      const maxMonth = getMaxMonth();
      const minDay = getMinDay();
      const maxDay = getMaxDay();

      if (selectYear === minYear && selectMonth === minMonth && selectDay === minDay) {
        minHour = minDateHour;
        if (selectHour === minHour) {
          minMinute = minDateMinute;
        }
      }

      if (selectYear === maxYear && selectMonth === maxMonth && selectDay === maxDay) {
        maxHour = maxDateHour;
        if (selectHour === maxHour) {
          maxMinute = maxDateMinute;
        }
      }
    } else {
      minHour = minDateHour;
      if (selectHour === minHour) {
        minMinute = minDateMinute;
      }

      maxHour = maxDateHour;
      if (selectHour === maxHour) {
        maxMinute = maxDateMinute;
      }
    }

    for (let i = minHour; i <= maxHour; i += 1) {
      hourCol.push({
        label: locale!.hour ? (i + locale!.hour) : pad(i),
        value: i,
      });
    }

    for (let i = minMinute; i <= maxMinute; i += minuteStep!) {
      minuteCol.push({
        label: locale!.minute ? (i + locale!.minute) : pad(i),
        value: i,
      });
    }

    return [hourCol, minuteCol];
  };

  const getDate=()=> {
    return clipDate(_date || wheelDefault || getDefaultDate());
  }

  const getDefaultDate = () => {
   
    // 存在最小值且毫秒数大于现在
    if (min && getMinDate().getTime() >= Date.now()) {
      return getMinDate();
    }
    if (minuteStep && minuteStep > 1 && (mode === DATETIME || mode === TIME)) {
      return new Date(new Date().setMinutes(0));
    }
    return new Date();
  };

  const getMinYear = () => {
    return getMinDate().getFullYear();
  };

  const getMaxYear = () => {
    return getMaxDate().getFullYear();
  };

  const getMinMonth = () => {
    return getMinDate().getMonth();
  };

  const getMaxMonth = () => {
    return getMaxDate().getMonth();
  };

  const getMinDay = () => {
    return getMinDate().getDate();
  };

  const getMaxDay = () => {
    return getMaxDate().getDate();
  };

  const  getMinHour = () => {
    return getMinDate().getHours();
  };

  const getMaxHour = () => {
    return getMaxDate().getHours();
  };

  const getMinMinute = () => {
    return getMinDate().getMinutes();
  };

  const getMaxMinute = () => {
    return getMaxDate().getMinutes();
  };

  const getMinDate = () => {
    const minDate = isExtendDate(min);
    return minDate || getDefaultMinDate();
  };

  const getMaxDate = () => {
    const maxDate = isExtendDate(max);
    return maxDate || getDefaultMaxDate();
  };

  const getDefaultMinDate = () => {
    return getGregorianCalendar(2000, 0, 1, 0, 0, 0);
  };

  const getDefaultMaxDate = () => {
    return getGregorianCalendar(2030, 11, 30, 23, 59, 59);
  };

  const clipDate = (date:any) => {
    const { mode } = props;
    const minDate = getMinDate();
    const maxDate = getMaxDate();
    if (mode === DATETIME) {
      if (date < minDate) {
        return cloneDate(minDate);
      }
      if (date > maxDate) {
        return cloneDate(maxDate);
      }
    } else if (mode === DATE || mode === MONTH || mode === YEAR) {
      if (+date + ONE_DAY <= +minDate) {
        return cloneDate(minDate);
      }
      if (date >= +maxDate + ONE_DAY) {
        return cloneDate(maxDate);
      }
    } else {
      const maxHour = maxDate.getHours();
      const maxMinutes = maxDate.getMinutes();
      const minHour = minDate.getHours();
      const minMinutes = minDate.getMinutes();
      const hour = date.getHours();
      const minutes = date.getMinutes();
      if (hour < minHour || (hour === minHour && minutes < minMinutes)) {
        return cloneDate(minDate);
      }
      if (hour > maxHour || (hour === maxHour && minutes > maxMinutes)) {
        return cloneDate(maxDate);
      }
    }
    return date;
  };

    const { dataSource, value } = getColsValue();

    const handleChange=(selected:any, index:number) =>{
      const newValue = getNewDate(selected, index);
      setDate(newValue)
      onChange && onChange(newValue);
    }

    useEffect(()=>{
      setDate(getDate())
    },[])

    const getColumns=()=>{
      return dataSource.map((item:any, index:any) => (
          <PickerColumn
            key={index}
            level={index}
            onChange={handleChange}
            columns={item}
            defaultValue={value[index]}
          />
    ));
  }

    return (
      <>
        <div className="ha-picker__columns">
          {getColumns()}
        </div>
      </>
    )
}

DatePickerView.defaultProps = {
    mode: DATE,
    value: '',
    defaultValue: '',
    minuteStep: 1,
    valueMember: 'value',
  };

export default DatePickerView