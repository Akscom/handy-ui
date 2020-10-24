```js
import React, { FC, useState , useRef, CSSProperties, useEffect} from 'react';
import Uploader from './components/uploader'

const App:FC=()=>{
  const data = [{
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    status: 'uploading',
    message: '上传中...',
  }, {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    status: 'failed',
    message: '上传失败',
  }];
  const [files, setFiles] = useState(data)

  const onChange = (files:any, index:any) => {
    console.log(files,  index);
    setFiles(files)
  }

  const onBeforeRead = (arg:any)=>{
    // return new Promise((resolve, reject) => {
    //   let img = new File(['foo'], 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg', {
    //     type: 'image/jpeg',
    //   });
    //   resolve(img);
    // })
    return true
  }

  return (
  <div>
    <Uploader 
    files={files}
    afterRead={onChange}
    beforeRead={onBeforeRead}
    // maxCount={4}
    // multiple={false}
    />
  </div>
  )
}

export default App
```