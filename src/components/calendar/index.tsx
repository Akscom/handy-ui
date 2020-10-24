import React, {FC, useState, ChangeEvent, useEffect, useRef, createContext, MouseEventHandler, ReactNode} from 'react'
import classNames from 'classnames'
import DateTool from '../utils/date';
import CalendarMonthView from './Month'

const CN_DAY_NAME = ['日', '一', '二', '三', '四', '五', '六'];

export interface BaseCalendarProps {
    value?: Date | Date[];
    defaultValue?: Date | Date[];
    min?: Date;
    max?: Date;
    multiple: boolean;
    dateRender?: (value?: any) => void;
    disabledDate?: (value?: Date) => boolean;
    onChange?: (value?: Date[]) => void;
}

export interface CalendarProps extends BaseCalendarProps {
  prefixCls?: string;
  className?: string;
}
  
const parseState = (props: CalendarProps) => {
    const { defaultValue, multiple} = props;
    let { value } = props;
    let tmpValue!: Date[];
    value = value || defaultValue;
    value = (
      Object.prototype.toString.call(value) === '[object Array]'
        ? value
        : (value && [value]) || []
    ) as Date[];
  
    // 注掉该逻辑，强制根据 multiple 控制节点个数，后面改进
    // tmpValue = value.map(item => DateTool.parseDay(item));
    tmpValue = value
      .slice(0, multiple ? 2 : 1)
      .map((item: Date) => DateTool.parseDay(item));
    // 排序过滤
    tmpValue = tmpValue!.sort((item1: Date, item2: Date) => +item1 - +item2);
    const min = props.min ? DateTool.parseDay(props.min) : new Date();
    const startMonth = DateTool.cloneDate(min, 'dd', 1);
    const max = props.max ? DateTool.parseDay(props.max) : DateTool.cloneDate(min, 'y', 1);
    const endMonth = DateTool.cloneDate(max, 'dd', DateTool.getDaysByDate(max));
  
    // min、max 排序
    const duration = [min, max].sort(
      (item1: Date, item2: Date) => +item1 - +item2,
    );
  
    const tmp = {
      value: tmpValue,
      min: duration[0],
      max: duration[1],
      startMonth,
      endMonth,
      // 是否是入参更新(主要是月份跨度更新，需要重新定位)
      refresh: false,
      // 注掉该逻辑，强制根据 multiple 控制节点个数，后面改进
      // steps:Math.max(tmp.value.length, tmp.defaultValue.length);
      steps: multiple ? 2 : 1,
      // 初始化点击步数
      multiple,
    };
  
    return tmp;
  };
  
const Calendar:FC<CalendarProps>=(props)=>{
    const { prefixCls, multiple, className, dateRender, disabledDate, onChange} = props;
    // let newState= parseState(props)
    let [newState, setNewState] = useState(parseState(props))
    const {value, min, max , steps} = newState

    let now = new Date();
    // 月份缓存数据
    let cache = {
      now: `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`,
    };

    let [step, setStep] = useState(1)

    // 当前月份dom数据缓存
    // private nodes?: object;
    let [nodes, setNodes] = useState({})

    let [_value, setValue] = useState(value)


    let [prevValue, setPrevValue] = useState(value)
    let [prevMultiple, setPreMultiple] = useState(multiple)
    let [prevMax, setPrevMax] = useState(max)
    let [prevMin, setPrevMin] = useState(min)


    const stateFromProps = (nextProps:any)=>{
      if (
        ('value' in nextProps && nextProps.value !== prevValue)
        || ('multiple' in nextProps && nextProps.multiple !== prevMultiple)
        || ('min' in nextProps && nextProps.min !== prevMin)
        || ('max' in nextProps && nextProps.max !== prevMax)
      ) 
      {

        setNewState(parseState(nextProps))
        setStep(step ? 1 : step)
        setPrevValue(value)
        setPrevMax(max)
        setPrevMin(min)
        setPreMultiple(multiple)
      }
    }

    useEffect(()=>{
        stateFromProps(props)
    },[props])

    const renderMonth = (dateMonth: Date) => {
      const key = `${dateMonth.getFullYear()}-${dateMonth.getMonth()}`;
      return (
        <CalendarMonthView
          prefixCls={prefixCls}
          key={key}
          min={min}
          max={max}
          value={value}
          dateMonth={dateMonth}
          dateRender={dateRender}
          disabledDate={disabledDate}
          onDateClick={handleDateClick}
          // ref={(n) => { this.nodes![key] = n; }}
        />
      );
    };

  // 生成星期条
  const renderWeekBar = () => {
    const content = CN_DAY_NAME.map((week:any) => (
      <li key={week} className={`${prefixCls}__bar__item`}>
        {week}
      </li>
    ));
    return <ul className={`${prefixCls}__bar`}>{content}</ul>;
  };

  // 生成日历内容
  const renderMonths=()=>{
    const arr = Array.from({ length: DateTool.getMonthCount(min, max) });
    const content = arr.map((_item, i) => renderMonth(DateTool.cloneDate(min, 'm', i)));
    return <section className={`${prefixCls}__body`}>{content}</section>;
  }

  // 日期点击事件，注意排序
  const handleDateClick =  (date: Date) => {
    if (step === 1) {
      value.splice(0, value.length);
    }
    value[step - 1] = date;
    value.sort((item1: Date, item2: Date) => +item1 - +item2);
    setValue(value)
    setStep( step >= steps ? 1 : step + 1)
    if(step >= steps && typeof onChange === 'function' ){
      onChange(value);
    }
  };

    return (
      <>
        <div className={classNames(prefixCls, className)}>
          {renderWeekBar()}
          {renderMonths()}
        </div>
      </>
    )
}

Calendar.displayName = 'Calendar';
Calendar.defaultProps = {
  prefixCls: 'ha-calendar',
  multiple: false,
  min: new Date(),
  dateRender: (date: any) => date.getDate(),
  disabledDate: () => false,
};

export default Calendar
