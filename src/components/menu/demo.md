```jsx
<Menu  defaultIndex={'0'} onSelect={(index)=>console.log(index)}> 
    <MenuItem>ssss1</MenuItem>
    <SubMenu title="dropdown" >
        <MenuItem index="1-0">ssss2</MenuItem>
        <MenuItem index="1-1">ssss3</MenuItem>
    </SubMenu>
    <SubMenu title="111" index="2">
        <MenuItem index="2-0">ssss2</MenuItem>
        <MenuItem index="2-1">ssss3</MenuItem>
    </SubMenu>
    <MenuItem>ssss2</MenuItem>
    <MenuItem>ssss3</MenuItem>
</Menu>
```