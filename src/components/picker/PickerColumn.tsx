import React, { FC, useState , TouchEvent, useEffect, useImperativeHandle} from 'react';
import _ from 'lodash';

const getIndex = (list:any, value:any) => {
  if (list && list.length < 1) {
    return 0;
  }
  // let index1 = _.findIndex(list, item);
  // let index2 = list.indexOf(item);
  // let index = Math.max(index1, index2);
  // if (index < 0) {
  //   throw new Error('list数组中不存在defaultValue');
  // }
  let count=0
  list.forEach((item:any, index:number) => {
    if(item.value === value){
      count = index
    }
  });
  
  return count;
}

interface PickerColumnProps {
  columns?:any;
  // title?:string;
  // onConfirm?:(e:any)=>void;
  // onCancel?:(e:any)=>void;
  level?:number;
  defaultValue?:any;
  onChange?:(e:any, level:any)=>void;
  onTouchStart?:(e:any)=>void;
}


const PickerColumn:FC<PickerColumnProps>=(props)=>{
  const { columns, defaultValue, level, onChange } = props
  // 初始化获得selectedIndex
  const getInitialIndex =()=> {
    let index = getIndex(columns, defaultValue);
    if (!columns && columns.length > 3) {
      index = Math.floor(columns.length / 2);
    }
    return index;
  }

  let [selectedIndex, setSelectedIndex] = useState(getInitialIndex())

  let [oldColumns, setColumns] = useState(columns)

  let itemHeight = 36;
  let [startY, setStartY] = useState(0)
  //当前拖动的Y坐标
  let [currentY, setCurrentY] = useState(0)
  let [styles, setStyles] = useState(`translate3d(0px, 36px, 0px)`)

  // const receiveProps=(nextProps)=> {
  //   const isEqual = _.isEqual(
  //     nextProps.data.defaultValue,
  //     this._defaultValue
  //   );
  //   if (!isEqual) {
  //     this._defaultValue = nextProps.data.defaultValue;
  //     this.selectedIndex = this.getReceivePropsIndex(nextProps.data);
  //     if (this.selectedIndex === 0) {
  //       this.setState({
  //         style: {
  //           transform: `translate3d(0px, ${this.itemHeight * 2}px, 0px)`
  //         }
  //       })
  //     }
  //   }
  // }
  
  useEffect(()=>{
    setSelectedValue(selectedIndex);
    setStyles(getInitialStyle()) 
  },[])

  // useEffect(()=>{
  //   if(_defaultValue!==defaultValue ){
  //     setDefaultValue(defaultValue)
  //     setSelectedIndex(getReceivePropsIndex(columns, defaultValue))
  //     if (selectedIndex === 0) {
  //       setStyles({transform: `translate3d(0px, ${itemHeight * 2}px, 0px)`})
  //     }
  //   }
  // },[defaultValue])

  useEffect(()=>{
    // 判断新传入的数据跟旧数据是否一样，不一样的时候false，才会执行初始传入的setIndex
    if(!_.isEqual(oldColumns, columns)){
      setColumns(columns)
      // 根据传入的值，判断index
      setSelectedIndex(getIndex(columns, defaultValue))
    }
  },[columns]) 

  const getInitialStyle = ()=> {
    let aCurrentY = 0;
    if (selectedIndex > 2) {
      aCurrentY = - (selectedIndex - 2) * itemHeight;
    } else {
      aCurrentY = (2 - selectedIndex) * itemHeight;
    }
    setCurrentY(aCurrentY)
    return  `translate3d(0px, ${ aCurrentY }px, 0px)`
  }

 const handleTouchStart= (e:TouchEvent<HTMLDivElement>) =>{
    e.preventDefault();
    if (columns.length <= 1) {
      return;
    }
    setStartY(e.nativeEvent.changedTouches[0].pageY)  // startY
  }

  const handleTouchMove =(e:TouchEvent<HTMLDivElement>) =>{
    e.preventDefault();
    if (columns.length <= 1) {
      return;
    }
    const pageY = e.nativeEvent.changedTouches[0].pageY;
    let distance = Number(pageY - startY);
    const y = currentY + distance;
    setStyles(`translate3d(0px, ${ y }px, 0px)`)
  }

  const handleTouchEnd =(e:TouchEvent<HTMLDivElement>) =>{
    let aCurrentY = currentY
    e.preventDefault();
    if (columns.length <= 1) {
      return;
    }
    const endY = e.nativeEvent.changedTouches[0].pageY
    // 实际滚动距离
    let v = Number(endY - startY);
    let val = v % itemHeight;
  
    // 计算出每次拖动的36px整倍数
    // setCurrentY(currentY+(v - value))
    aCurrentY += (v - val);
    // 正数y最大值
    const max1 = 2 * itemHeight;
    // 负数y最小值
    const max2 = (columns.length - 3) * itemHeight;
    if (aCurrentY > max1) {
      aCurrentY = max1
    }
    else if (aCurrentY > 0 && aCurrentY < max1) {
      aCurrentY = aCurrentY
    }
    else if (aCurrentY === max1) {
      aCurrentY = aCurrentY
    }
    else if (Math.abs(aCurrentY) > max2) {
      aCurrentY = -max2
    }
    setCurrentY(aCurrentY)

    countListIndex(aCurrentY); // 计算索引值
    setStyles(`translate3d(0px, ${ aCurrentY }px, 0px)`)
  }

  // 计算list数组索引
  const countListIndex =(pageY:any)=> {
    let n = pageY / itemHeight;
    n = n > 0 ? 2 - n : Math.abs(n) + 2;
    setSelectedValue(n);
  }

  // set选中值
  const setSelectedValue =(index:any) =>{
    const length = columns.length;
    if (length === 0) {
      callback(null);
      return;
    }
    if (index < 0 || index > length -1) {
      throw new Error('滑动取值索引数值出现错误'+ index);
    }
    setSelectedIndex(index)
    callback(columns[index])
  }

  // 回调
  const callback= (value:any) =>{
    onChange && onChange(value, level);
  }

  const getSelectedClass= (index:any) =>{
    if (columns.length === 1 ||  selectedIndex === index) {
      return 'ui-picker-item-selected';
    }
    return '';
  }

  const handleWrapperStart=(e:TouchEvent<HTMLDivElement>) =>{
    e.preventDefault();
  }

  const transformStyle = {
    transform: selectedIndex === 0 ? `translate3d(0px, ${itemHeight * 2}px, 0px)`: styles
  }

  return (
    <div className="ha-picker-column">
        <div className="ui-picker-wrapper" onTouchStart={handleWrapperStart}>
        <div className="ui-picker"
            style={transformStyle}
            // style = {style.transform ? state.style : style}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd = {handleTouchEnd}
            >
            {
            columns.map((item:any, index:any) => {
                // const displayValue = data.displayValue(data);
                return <div key={index}
                className={ 'ui-picker-item ' + getSelectedClass(index)}>
                {item.label}
                </div>
            })
            }
        </div>
        <div className="ui-picker-center"></div>
        </div>
      </div>
  )
}

export default PickerColumn;
