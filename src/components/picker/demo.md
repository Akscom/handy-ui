```jsx
// 单个选项

import React, { useState, useEffect } from 'react';
import Picker from './components/picker'
import Popup from './components/popup'

const App: React.FC = () => {
  const [isShow3, seTShow3]=useState(false)
  const userData = {
    list: [
      {label: '杜保坤', value: 0},
      {label: '况宏瑞', value: 1},
      {label: '盘维', value: 2},
      {label: '杨泉', value: 3},
      {label: '福娃', value: 4},
      {label: 'Lincal', value: 5},
      {label: '记忆残骸', value: 6},
      {label: 'Raoh', value: 7},
      {label: '铁甲飞龙', value: 8},
      {label: '吴泽兵', value: 9},
      {label: '邱福龙', value: 10},
      {label: '小泥巴', value: 11},
    ],
    // defaultValue: {label: '邱福龙', value: 10},
    defaultValue:10,
    displayValue (item:any) {
      return item.label;
    }
  }

  const [defaultValue, setdefaultValue] = useState(userData.defaultValue)

  const handleChangeUser =(data:any) =>{
    data = data || {}
    console.log('data')
    console.log(data)
    setdefaultValue(data)
  }


  return (
    <>
     
      {/* <Picker
        title="标题"
        show-toolbar
        options={columns}
        onConfirm={(e:any)=>{console.log('ok', e)}}
        onCancel={(e:any)=>console.log('ok', e)}
        onChange={(e:any)=>console.log('ok', e)}
      /> */}

      <button  onClick={() => seTShow3(true)}>底部</button>
        <Popup
          visible={isShow3}
          onMaskClick={() => seTShow3(false)}
          direction="bottom"
        >
          <div className="popup-box-3">
            <button onClick={() => seTShow3(false)}>关闭弹层</button>
            <Picker
              onChange={handleChangeUser}
              columns={userData.list}
              defaultValue={defaultValue}
            />
          </div>
        </Popup>
    </>
  )
}

export default App
```





暂存
```jsx
    // 格式化单列数据
    const formatColumnValue = (columnData, value) => {
    const newColumnData = cloneDeep(columnData);
    let newValue = cloneDeep(value);
    // 兼容简单选中值
    let columnValue;
    if (typeof newValue !== 'undefined') {
      if (Object.prototype.hasOwnProperty.call(newValue, 'value')) {
        columnValue = newValue.value;
      } else {
        columnValue = newValue;
      }
    }
    newValue = undefined;
  
    // 遍历每一项
    for (let i = 0; i < newColumnData.length; i++) {
      let cell = newColumnData[i];
  
      // 兼容非对象的数据
      if (typeof cell !== 'object') {
        newColumnData[i] = {
          text: cell,
          value: cell,
        };
        cell = newColumnData[i];
      }
  
      // 补全缺失数据
      if (!Object.prototype.hasOwnProperty.call(cell, 'text')) {
        cell.text = cell.value;
      }
      if (!Object.prototype.hasOwnProperty.call(cell, 'value')) {
        cell.value = cell.text;
      }
  
      // 定位选中值
      if (cell.value === columnValue) {
        newValue = cell;
      }
    }
  
    // 默认选中第一项
    if (typeof newValue !== 'object') {
      [newValue] = newColumnData;
    }
  
    return {
      columnData: newColumnData,
      columnValue: newValue,
    };
  };

    // 格式化多列数据
    const formatDataValue = (data = [], value = []) => {
    // 兼容单列数据的缩略写法
    let newData = cloneDeep(data);
    let newValue = cloneDeep(value);
    if (!isArray(newData[0])) {
      newData = [newData];
    }
    if (!isArray(newValue)) {
      newValue = [newValue];
    }
  
    // 遍历数据模型
    newData = newData.map((columnData, column) => {
      // 格式化列数据
      const ret = formatColumnValue(columnData, value[column]);
      newValue[column] = ret.columnValue;
      return ret.columnData;
    });
  
    return {
      data: newData,
      value: newValue,
    };
  };

```



例子：
```jsx

import React, { useState, useEffect } from 'react';
import Picker from './components/picker/index'

const App: React.FC = () => {
  const cascade = {
    dataSource:[
      {
        value: '1',
        label: '北京市',
        children: [
          { value: '11', label: '海淀区' },
        ],
      },
      {
        value: '2',
        label: '上海市',
        children: [
          { value: '21', label: '杨浦区' },
          { value: '22', label: '静安区' },
        ],
      },
      {
        value: '3',
        label: '广东省',
        children: [
          { value: '31', 
            label: '广州市' ,
            children:[
              { value: '311', label: '天河区' },
              { value: '312', label: '黄埔区' },
              { value: '313', label: '海珠区' },
            ]
          },
          { value: '32', label: '佛山市' ,
            children: [
              { value: '321', label: '佛山市1' },
              { value: '322', label: '佛山市2' },
              { value: '323', label: '佛山市3' },
              { value: '324', label: '佛山市4' },
              { value: '325', label: '佛山市5' },
              { value: '326', label: '佛山市6' },
              { value: '326', label: '佛山市7' },
              { value: '326', label: '佛山市8' },
              { value: '326', label: '佛山市9' },
              { value: '326', label: '佛山市10' },
              { value: '326', label: '佛山市11' },
            ]
          },
          { value: '33', 
            label: '江门市' ,
            children:[
              { value: '311', label: '江门市1' },
              { value: '312', label: '江门市2' },
              { value: '313', label: '江门市3' },
            ]
          },
        ],
      },
    ],
    defaultValue: ['3', '32', '323'],
    valueMember:'code'
  }
  const [newVal, setNewVal] = useState('')
  const [isShow, setShow] = useState(false)

  const handleChange=(val:any)=>{
    let arr:any=[]
    console.log(val)
    val.forEach((item:any)=>{
      arr.push(item.label)
    })
    console.log(arr)
    setNewVal(arr)
  }

  return (
    <>
      <button  onClick={() => {
        setShow(true)
      }}>底部</button>

      <Picker 
        title="普通模式"
        // onChange={val(e)=>console.log(e)}
        onConfirm={handleChange}
        onCancel={(e)=>{
          console.log(e)
          setShow(false)
        }}
        columns={cascade.dataSource}
        defaultValue={cascade.defaultValue}
        popupVisible={isShow}
      /> 
      {newVal? newVal.toString().replace(/\,/g, ' / '):''}
    </>
  )
}

export default App
```