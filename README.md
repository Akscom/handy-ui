## handy-ui
handy-ui是一个基于React hook开发的组件库，兼容移动端，用于个人对前端技术和交互设计的学习与探索、及工作上的需求</br>
仅供参考，暂时不建议在正式项目中使用

- [x] 基础组件
    - [x] button  按钮 
    - [x] cell    单元格
    - [x] icon    图标 
    - [x] popup   弹出层  
    - [ ] image   图片 
    - [ ] style   内置样式 
    - [x] toast   轻提示
    - [x] menu    目录

- [x] 表单组件
    - [x] field     输入框  
    - [x] radio     单选框  
    - [x] checkbox  复选框  
    - [x] picker    选择器 
    - [x] calendar  日历   
    - [x] datePicker 日期选择器 
    - [x] uploader   文件上传
    - [x] rate      评分
    - [x] stepper   进步器
    - [x] switch    开关
    - [ ] searchBar 搜索栏

- [x] 反馈组件
    - [x] Loading 加载
    - [ ] actionSheet  动作面板
    - [ ] dialog       弹出框
    - [ ] dropdownMenu 下拉菜单
    

- [x] 展示组件
    - [x] carousel 轮播
    - [x] skeleton 骨架屏
    - [x] backToTop 返回顶部
    - [x] drag 拖拽
    - [ ] imagePreview 图片预览

- [x] 导航组件
    - [x] tabs 标签页
    - [x] sidebar 侧边导航



## 组件实现思路

### 无缝轮播图
1. 无缝轮播：当切换到最后一个轮播图时，如何悄无声息回到第一张
核心思想：
1）把第一张图复制并push到最后一个位置，复制之前的最后一张图并unshift到第一个位置
2）在div上绑定transitionend事件，用来监听CSS完成过渡后触发，
    2.1）当切换到最后一张图时，马上在回调事件上设置第一张（transform），把currentIndex设置为0
    2.2）当切换上一张，到达第一张时，马上在回调事件上设置回到最后一张，把current设置为length-1
```html
<!--vant的思路：不额外创建dom，而是判断将要切换到第一张或最后一张时加transform--> 
<div style="width: 1440px; transition-duration: 500ms; transform: translateX(-1440px);">
    <div style="width: 360px; transform: translateX(1440px);">1</div>
    <div style="width: 360px;">2</div>
    <div style="width: 360px;">3</div>
    <div style="width: 360px;">4</div>
   <!-- 切换到第一张时
   <div class="van-swipe-item" style="width: 360px; transform: translateX(1440px);">4</div>
   --> 
</div>
```
2. 自动播放
3. 加手势切换

优化点：
- 使用useMemo（记忆计算结果）和useCallback（记忆函数体）都会在组件第一次渲染的时候执行，之后会在其依赖的变量发生改变时再次执行；
- 定时器中，使用setState的函数模式解决setState时数据不实时更新问题

### 拖拽


### 骨架屏
可以用ui组件当作骨架屏，可以用[loader]或者plugin来实现

ui组件思路：用div作为占位符，相当于用图片代替

loader思路：</br>
1）babylon解释器把代码字符串转化为AST树
2）babel-traverse对AST树进行解析遍历出整个树的path（在这里可以对代码进行改造）
3）plugin转换出新的AST树 
4）输出新的代码字符串

plugin思路：
起个服务器访问页面，把内容抓下来转成骨架屏的元素，然后把改造的dom元素变成html内容，替换到 `<div id ='root'><!--shell--></div>`里

使用：将loading属性设置成false表示内容加载完成，此时会隐藏占位图，并显示Skeleton的组件

<!-- 区别：plugin是build时直接打包成html -->

[参考](https://github.com/danilowoz/react-content-loader)