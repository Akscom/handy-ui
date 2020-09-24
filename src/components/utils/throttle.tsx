// const throttle = (func:any, delay:any) => {
//   let timer: any;
//   let startTime = Date.now();

//   return function(this:any, ...args: any[]){
//     const curTime = Date.now();
//     const remaining = delay - (curTime - startTime);

//     clearTimeout(timer);
//     if (remaining <= 0) {
//       func.apply(this, args);
//       startTime = Date.now();
//     } else {
//       timer = setTimeout(func, remaining);
//     }
//   };
// };

const throttle=(fn:any, wait = 300)=>{
  let flag = true // 初始化的时候开关为true
  console.log(flag)
  return function(this:any, ...args:any[]){
      console.log(flag)
      if(!flag) return   // 开关为false表示不能执行就返回
      flag = false   // 如果可以执行，先把开关设置成false，等seTimeout后执行
      setTimeout(()=>{
          fn.apply(this, args)
          flag = true    // 执行完把开关打开
      }, wait)

  }
}

export default throttle;
