 ```jsx
 {/* 基础用法 */}
<Cell title="单元格" value="内容" />
<Cell title="单元格" value="内容" label="描述信息" />

{/* 展示图标 */}
<Cell title="单元格" icon="location-o" >
   <button onClick={(e)=>console.log('按钮~~~')}>按钮</button>
</Cell>
<Cell title="单元格" icon="location-o" />


{/* 展示箭头 */}
<Cell title="单元格" isLink />
<Cell title="单元格" isLink value="内容" />
<Cell title="单元格" isLink arrowDirection="down" value="内容down" />

{/* 页面导航 */}
<Cell title="URL 跳转" isLink url="/vant/mobile.html" />
<Cell title="路由跳转" isLink to="index" />

{/* 分组标题 */}
<CellGroup title="分组1">
<Cell title="单元格" value="内容" />
</CellGroup>
<CellGroup title="分组2">
<Cell title="单元格" value="内容" />
</CellGroup> 

{/* 垂直居中 */}
<Cell center title="单元格" value="内容" label="描述信息" onClick={() => {console.log('~~~~~~')}} />
```