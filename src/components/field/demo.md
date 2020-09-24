```jsx
{/* 基础用法 */}
<Field placeholder="请输入用户名" value={textVal} onChange={(e)=>{console.log(e); seTextVal(e) }}/>

{/* 自定义类型 */}
<Field label="文本" 
value={textVal} 
onChange={(e)=>{ seTextVal(e) }}
onFocus={(e)=>{console.log('onFocus~~~~~')}}
onBlur={(e)=>{console.log('onBlur~~~~~')}}
/>
{textVal}
<Field type="tel" label="手机号" value={textVal} onChange={(e)=>{console.log(e)}}/>
<Field type="digit" label="整数" value={textVal} onChange={(e)=>{console.log(e);}}/>
<Field type="number" label="数字" value={textVal} onChange={(e)=>{console.log(e);}}/>
<Field type="password" label="密码" value={textVal} onChange={(e)=>{console.log(e);}}/>

{/* 插入按钮 */}
<Field label="按钮文本" value={textVal} onChange={(e)=>{console.log(e);}} >
<button style={{width:'100px'}} onClick={(e)=>{ console.log('点击按钮~~~')}}>点击</button>
</Field>

{/* 显示图标*/}
<Field label="文本"  leftIcon="smile-o" rightIcon="warning-o" value={textVal} 
onChange={(e)=>{console.log(e)}}
clickLeftIcon={(e)=>{console.log('clickLeftIcon')}}
clickRightIcon={(e)=>{console.log('clickRightIcon')}}
/>

{/* 清除文本*/}
<Field label="文本" labelWidth="60" leftIcon="smile-o" clearable value={textVal} onChange={(e)=>{console.log(e);}}/>

{/* 高度自适应 */}
<Field label="留言" type="textarea" autosize clearable value={textVal}  onChange={(e)=>{}} />

{/* 显示字数统计  --- 待优化*/} 
<Field label="留言" type="textarea" count rows={3} maxlength={10} clearable value={textVal} onChange={(e)=>{console.log(e);}}/>

{/* 输入框内容对齐 */}
<Field label="文本" inputAlign="right" value={textVal} onChange={(e)=>{console.log(e);}}/>

{/* 禁用输入框 */}
<Field label="文本" value="输入框只读" readonly />
<Field label="文本" value="输入框已禁用" disabled />

{/* 错误提示 */}
<Field label="文本" value="输入框只读" required/>
```