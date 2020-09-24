```js
import React, { FC, useState , useRef, CSSProperties, useEffect} from 'react';
import Uploader from './components/uploader'

const App:FC=()=>{
  const data = [{
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
  }, {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    id: '2122',
  }];
  const [files, setFiles] = useState(data)

  const onChange = (files:any, type:any, index:any) => {
    console.log(files, type, index);
    setFiles(files)
  }

  return (
  <div>
    <Uploader 
    files={files}
    onChange={onChange}
    // onImageClick={(index, fs) => console.log(index, fs)}
    // selectable={files.length < 7}
    // multiple={false}
    />
  </div>
  )
}

export default App
```