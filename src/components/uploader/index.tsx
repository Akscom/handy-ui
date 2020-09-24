import React, { FC, useEffect, useRef, useState, MouseEvent, ChangeEvent} from 'react';
import classNames from 'classnames'
import { readFile } from './utils'

interface ImageFile {
    url: string;
    [key: string]: any
  }
interface BasePropsType {
    // accept?: string
    // name?: number | string
    // multiple?: boolean
    // maxSize?: number | string  // 文件大小限制，单位为byte
    // maxCount?: number | string  // 文件上传数量限制
    afterRead?: () => void
    beforeRead?: () => void
    beforeDelete?: () => void
    style?: React.CSSProperties;
    files?: Array<ImageFile>;
    onChange?: (files: Array<ImageFile>, operationType: string, index?: number) => void;
    onImageClick?: (index?: number, files?: Array<ImageFile>) => void;
    onAddImageClick?: (e: React.MouseEvent) => void;
    onFail?: (msg: string) => void;
    selectable?: boolean;
    multiple?: boolean;
    accept?: string;
    length?: number | string;
    capture?: any; // 本应该是boolean | string; 但是因为@types/react中interface InputHTMLAttributes<T>定义问题，写成any跳过ts检查
    disableDelete?: boolean; // 是否隐藏删除按钮，默认false
    resultType?: 'dataUrl' | 'text' | 'file';
}

export interface UploaderProps extends BasePropsType {
    prefixCls?: string;
    className?: string;
}
  
const Uploader: FC<UploaderProps> = (props) => {
    const { accept, multiple, files = [], capture, disableDelete, selectable, resultType='dataUrl', beforeRead, children, ...restProps } = props

    const fileInput = useRef<HTMLInputElement>(null)
    const [ fileList, setFileList ] = useState<ImageFile[]>(files || [])

    useEffect(()=>{
        console.log(files)
    },[])

    const onAfterRead=(files:any, oversize:any) =>{

    }

    const uploadFiles = (files: FileList) => {
        console.log(files)
        let _files = Array.from(files)
        if(Array.isArray(_files)){
            Promise.all(_files.map((file) => readFile(file, resultType))).then(
                (contents) => {
                    console.log(contents)
                  const fileList = _files.map((file, index) => {
                    let result = { file, status: '', message: '',content: null as any };
                    // if (contents[index]) {
                    //   result.content = contents[index];
                    // }
      
                    return result;
                  });
      
                  onAfterRead(fileList, false);
                }
              );
        } else{
            readFile(_files, resultType).then((content) => {
                const result = { file: files, status: '', message: '',content: null as any  };
                if (content) {
                  result.content = content;
                }
                onAfterRead(result, false);
            });
        }
       
    }

    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        // if (fileInput.current){
        //     console.log(fileInput.current.value)
        // }
        const files = e.target.files
        // console.log(files)
        if(!files) {
          return
        }
        uploadFiles(files)
        // if (fileInput.current) {
        //   fileInput.current.value = ''
        // }


        // const fileSelectorEl = this.fileSelectorInput;
        // if (fileSelectorEl && fileSelectorEl.files && fileSelectorEl.files.length) {
        //   const files = fileSelectorEl.files;
        //   const imageParsePromiseList = []
        //   for (let i = 0; i < files.length; i++) {
        //     imageParsePromiseList.push(this.parseFile(files[i], i))
        //   }
        //   Promise.all(imageParsePromiseList)
        //     .then(imageItems => this.addImage(imageItems))
        //     .catch(
        //       error => {
        //         if (this.props.onFail) {
        //           this.props.onFail(error);
        //         }
        //       },
        //     )
        // }
        // if (fileSelectorEl) {
        //   fileSelectorEl.value = '';
        // }
    }

    const renderFile=()=>{
        const imgItemList: any[] = [];

        // files.map((image: any, index: number) => (
        files.forEach((image: any, index: number) => {
            imgItemList.push(   <div className="van-uploader__preview" key={image.url}>
            <div className="van-image van-uploader__preview-image">
                <img src={image.url} className="van-image__img" style={{objectFit:"cover"}} />
            </div>
            <i className="van-icon van-icon-clear van-uploader__preview-delete"></i>
        </div>)
        });

        const selectEl = (
            <div className="van-uploader__wrapper" key="select">
                <div className="van-uploader__upload">
                    <i className="van-icon van-icon-photograph van-uploader__upload-icon"></i>
                    {/* <input type="file" accept="image/*" className="van-uploader__input" /> */}
                    <input
                        // ref={(input) => { if (input) { fileSelectorInput = input; } }}
                        ref={fileInput}
                        type="file"
                        accept={accept}
                        // tslint:disable-next-line:jsx-no-multiline-js
                        onChange={onFileChange}
                        multiple={multiple}
                        // capture={capture}
                        className="van-uploader__input"
                    />
                </div>
            </div>
        )

        let allEl = selectable ? imgItemList.concat([selectEl]) : imgItemList

        return allEl
    }

    return (
        <>
            <div className="van-uploader">
                {renderFile()}
            </div>
        </>
    )
}

Uploader.defaultProps = {
    prefixCls: 'am-image-picker',
    files: [],
    onChange: ()=>{},
    onImageClick: ()=>{},
    onAddImageClick: ()=>{},
    onFail: ()=>{},
    selectable: true,
    multiple: true,
    accept: 'image/*',
    length: 4,
    disableDelete: false,
    resultType:'dataUrl'
}

export default Uploader