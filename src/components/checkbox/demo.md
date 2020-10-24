```jsx
import React, { useState, useEffect } from 'react';
import Checkbox from './components/checkbox/Checkbox'
import CheckboxGroup from './components/checkbox/Group'

const App: React.FC = () => {
  const [checkedList, setChecked] = useState(['Item 1'])
  const [checkedListt, setCheckedt] = useState(['Apple'])
  const [checked, setAChecked] = useState(true)

  // const CheckboxGroup = Checkbox.Group;
  const ITEMS = ['Item 1', 'Item 2', 'Item 3'];
  const checkedAll = !!checkedList.length && checkedList.length === ITEMS.length;
  // const indeterminate = !!checkedList.length && checkedList.length !== ITEMS.length;
  const handleCheckedAll = (e:any )=> {
    let arr =ITEMS.slice()
    if(e.target.checked){
      setChecked(arr)
    }else{
      setChecked([])
    }
  };

  const handleChange=(checkedList:any)=> {
    console.log("checkedList"+checkedList)
    setChecked(checkedList)
  }
  return (
    <>
      <div>
        {/* 基础 */}
        <Checkbox>复选框</Checkbox>
        <Checkbox checked={checked} disabled value='hh' shape="square" onChange={(e)=>{setAChecked(e.target.checked)}}>自定义形状</Checkbox>
        <Checkbox checked={checked} checkedColor="#07c160">自定义颜色</Checkbox>
        <Checkbox checked={checked} iconSize="24px">自定义大小</Checkbox>
        {/* <Checkbox value={checked}>-->待优化
          自定义图标 
          <img className="img-icon" src={checked ? img.activeIcon : img.inactiveIcon} />
        </Checkbox> */}
        <Checkbox checked={checked} disabled>禁用状态</Checkbox>

        {/* 待优化 */}
        {/* <Checkbox checked={checked} labelDisabled onChange={(e)=>{setAChecked(e.target.checked)}}>禁用文本点击</Checkbox>  */}

        {/* 复选框组 */}
        <Checkbox
          checked={checkedAll}
          // indeterminate={indeterminate}
          onChange={handleCheckedAll}
        >
          全选
        </Checkbox>

        <div style={{ margin: '5px 0', height: 1, background: '#dcdee0' }} />

        <CheckboxGroup
          value={checkedList}
          onChange={handleChange}
        >
          {ITEMS.map(item => {
            return (
              <Checkbox key={item} value={item}>
                {item}
              </Checkbox>
            );
          })}
        </CheckboxGroup>



        <CheckboxGroup value={checkedListt} onChange={(e)=>{
          setCheckedt(e);
          console.log(e)
        }}
        direction="horizontal"
        // max={2}-->待优化
        >
          <Checkbox value="Apple">苹果</Checkbox>
          <Checkbox value="Pear">梨子</Checkbox>
          <Checkbox value="Orange">橘子</Checkbox>
          <Checkbox value="OrangeDisabled" disabled>烂苹果</Checkbox>
        </CheckboxGroup>

        <Checkbox checked={checked} onChange={(e)=>{
          setAChecked(e.target.checked)
          console.log(e)
        }}>Checkbox</Checkbox>


        {/* 搭配单元格组件使用 */}

        <CheckboxGroup value={checkedListt} onChange={(e)=>{
          setCheckedt(e);
          console.log(e)
        }}
        type="cell"
        >
          <Checkbox value="Apple">苹果</Checkbox>
          <Checkbox value="Pear">梨子</Checkbox>
          <Checkbox value="Orange">橘子</Checkbox>
          <Checkbox value="OrangeDisabled" disabled>烂苹果</Checkbox>
        </CheckboxGroup>

        
      </div>
    </>
  )
}

export default App
```