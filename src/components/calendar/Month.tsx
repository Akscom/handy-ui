import React, {FC, useState, ChangeEvent, useEffect, useRef, createContext, MouseEventHandler, ReactNode, isValidElement} from 'react'
import classNames from 'classnames'
import DateTool from '../utils/date';

export interface BaseCalendarMonthProps {
    value: Date[];
    min: Date;
    max: Date;
    dateMonth: Date;
    dateRender?: (value?: any) => void;
    disabledDate?: (value?: Date) => boolean;
    onDateClick?: (value?: any) => void;
}
  
export interface CalendarMonthProps extends BaseCalendarMonthProps {
    prefixCls?: string;
}

const CalendarMonthView:FC<CalendarMonthProps>=(props,state)=>{
    const {min, max, prefixCls, value, dateMonth ,dateRender, disabledDate, onDateClick} = props;
    let [_value, setValue] = useState([])
    let [_dateMonth, setDateMonth] = useState(dateMonth)
    // 月份最小值
    let [_min, setMin] = useState(min)
    // 月份最大值
    let [_max, setMax] = useState(max)
    let now = new Date();
    // 月份缓存数据
    let cache = {
      now: `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`,
    };
  
    // 上次是否落点在当前月份内
    let [lastIn, setLastIn] = useState(false)
  
    // 当前组件是否需要更新
    let [isRefresh, setIsRefresh] = useState(true)
  
    // 当前月份的dom
    let [node, setNode] = useState(null)


    // 检查当前是否需要更新
    const checkRefresh = (props: CalendarMonthProps) => {
        const { dateRender: dateRenderProp, disabledDate: disabledDateProp } = props;
        let dateMonthState = _dateMonth
        if (dateRender !== dateRenderProp || disabledDate !== disabledDateProp) {
        return true;
        }

        if ((+dateMonth - +dateMonthState) !== 0) {
        return true;
        }

        if ((+min - +_min !== 0) || (+max - +_max !== 0)) {
        return true;
        }

        let isIn!: boolean;

        if (value.length > 0) {
            const currMonth = DateTool.cloneDate(dateMonth, 'dd', 1);
            const min1 = DateTool.cloneDate(value[0], 'dd', 1);
            const max1 = DateTool.cloneDate(value[value.length - 1], 'dd', 1);
            isIn = currMonth >= min1 && currMonth <= max1;
        }
        const result = !(!isIn && !lastIn);
        setLastIn(isIn)
        return result;
    };

    useEffect(()=>{
      let  _isRefresh = checkRefresh(props);
        if (_isRefresh) {
            setMin(props.min);
            setMax(props.max);
        }
        setIsRefresh(_isRefresh)

      let a = stateFromProps(props)
      setValue(a?.value)
      setDateMonth(a?.dateMonth)

    },[props])

    // const anchor = () => {
    //     if (node && node.scrollIntoViewIfNeeded) {
    //         node.scrollIntoViewIfNeeded();
    //     }
    // };

    const stateFromProps=(nextProps:any)=> {
        if (
          ('value' in nextProps && nextProps.value !== _value)
          || ('dateMonth' in nextProps && nextProps.dateMonth !== _dateMonth)
        ) {
          return {
            value: nextProps.value,
            dateMonth: nextProps.dateMonth,
          };
        }
        return null;
      }

    // 日期状态: 选中，区间
    const checkStatus = (date: Date) => {
      const disabled = date < DateTool.cloneDate(min, 'd', 0) || date > DateTool.cloneDate(max, 'd', 0);
      const res = {
        disabled: disabled || (disabledDate && disabledDate(date)),
        isSelected: _value.some((item) => DateTool.isOneDay(date, item)),
        isRange: _value.length > 1 && date > _value[0] && date < _value[_value.length - 1],
        rangeStart: _value.length > 1 && DateTool.isOneDay(date, _value[0]),
        rangeEnd: _value.length > 1 && DateTool.isOneDay(date, _value[_value.length - 1]),
      };
      lastIn = lastIn || res.isSelected || res.isRange;
      return res;
    };

    const renderDay = (day: number, year: number, month: number, firstDay: number) => {
        const date = new Date(year, month, day);
        const isToday = cache.now === `${year}-${month}-${day}`;
        const status = checkStatus(date);
        let txt = (date && dateRender && dateRender(date)) || '';
        if (typeof txt === 'object') {
          if (!isValidElement(txt)) {
            console.warn(
              'dateRender函数返回数据类型错误，请返回基本数据类型或者reactNode',
            );
            txt = '';
          }
        }
    
        const className = {
          d6: (day + firstDay) % 7 === 0,
          d7: (day + firstDay) % 7 === 1,
          [`${prefixCls}__day--disabled`]: status.disabled,
          [`${prefixCls}__day--today`]: isToday,
          [`${prefixCls}__day--selected`]: status.isSelected,
          [`${prefixCls}__day--range`]: status.isRange,
          'range-start': status.rangeStart,
          'range-end': status.rangeEnd,
          [`firstday-${firstDay}`]: day === 1 && firstDay,
        };
    
        return (
          <li
            key={`${year}-${month}-${day}`}
            className={classNames(`${prefixCls}__day`, className)}
            onClick={() => !status.disabled && date && onDateClick && onDateClick(date)}
          >
            {(txt && <div className={`${prefixCls}__day__content`}>{txt}</div>) || ''}
          </li>
        );
      };


    const renderContent = (year: number, month: number) => {
        const data = DateTool.getCurrMonthInfo(year, month);
        const { firstDay, dayCount } = data;
        return Array.from({ length: dayCount }).map((_item, i) => renderDay(i + 1, year, month, firstDay));
    };

    
    const year = dateMonth.getFullYear();
    const month = dateMonth.getMonth();
    const monthKey = `${year}-${month}`;

    return(
        <>
            <section
                key={monthKey}
                className={`${prefixCls}__month`}
                title={`${year}年${month + 1}月`}
                // ref={(n) => { node = n; }}
            >
              <div className="van-calendar__month-title">{`${year}年${month + 1}月`}</div>
              <ul>{renderContent(year, month)}</ul>
            </section>
        </>
    )
}

CalendarMonthView.defaultProps = {
    prefixCls: 'za-calendar',
    value: [],
    dateMonth: new Date(),
    min: new Date(),
    max: new Date(),
    dateRender: (date: Date) => date.getDate(),
    disabledDate: () => false,
  };


export default CalendarMonthView