import React, { FC, useEffect, useRef, useState, MouseEvent, ChangeEvent} from 'react';
import classNames from 'classnames'
import { isPromise } from '../utils'
import Icon from '../icon'
import Loading from '../loading'

interface ImageFile {
    url: string,
    status: string,
    message: string,
    // [key: string]: any
}

type ResultType = 'dataUrl' | 'text' | 'file';

export interface BasePropsType {
  prefixCls?: string;
  className?: string;
}

interface UploaderProps extends BasePropsType {
    files?: Array<ImageFile>;
    accept?: string;
    multiple?: boolean; // 是否开启图片多选，部分安卓机型不支持
    disabled?: boolean;	// 是否禁用文件上传
    deletable?: boolean;
    maxCount?: number | string	
    maxSize?: number | string
    resultType?: ResultType
    beforeRead?: (files: any, arg:any) => any | Promise<any>; // 上传前置处理，上传前进行校验和处理
    afterRead?: (files: Array<ImageFile>, index?: number) => void ;
    beforeDelete?: (files: any, arg:any) => any | Promise<any>; 
    oversize?: () => void
    // // accept?: string
    // // name?: number | string
    // // multiple?: boolean
    // // maxSize?: number | string  // 文件大小限制，单位为byte
    // // maxCount?: number | string  // 文件上传数量限制
    // afterRead?: () => void
    // beforeRead?: () => void
    // beforeDelete?: () => void
    // style?: React.CSSProperties;
    // files?: Array<ImageFile>;
    // onChange?: (files: Array<ImageFile>, operationType: string, index?: number) => void;
    // onImageClick?: (index?: number, files?: Array<ImageFile>) => void;
    // onAddImageClick?: (e: React.MouseEvent) => void;
    // onFail?: (msg: string) => void;
    // selectable?: boolean;
    // length?: number | string;
    // capture?: any; // 本应该是boolean | string; 但是因为@types/react中interface InputHTMLAttributes<T>定义问题，写成any跳过ts检查
    // disableDelete?: boolean; // 是否隐藏删除按钮，默认false
    
}


  
const Uploader: FC<UploaderProps> = (props) => {
    const { prefixCls, accept, multiple, maxCount, maxSize, files = [], resultType = 'file', disabled, children, beforeRead, afterRead, oversize, ...restProps } = props

    const fileInput = useRef<HTMLInputElement>(null)
    const [fileList, setFileList ] = useState<ImageFile[]>(files || [])
    const [list, setList] = useState()

    const getDetail = (index = fileList.length) => {
        return {
        //   name: name,
          index,
        };
    }

    useEffect(()=>{
        console.log(maxCount)
    },[])

    const resetInput = () => {
        // /* istanbul ignore else */
        // if (this.$refs.input) {
        //   this.$refs.input.value = '';
        // }
    }

    const onAfterRead=(files:any, oversize:any) => {
      setFileList(arr=>{
        return arr.concat(Array.isArray(files)?[...files]:files)
      })
    }

    const onReadFile = (file: File, resultType: ResultType) =>{
        return new Promise((resolve) => {
          if (resultType === 'file') {
            resolve();
            return;
          }
      
          const reader = new FileReader();
      
          reader.onload = (event) => {
            resolve((event.target as FileReader).result);
          };
      
          if (resultType === 'dataUrl') {
            reader.readAsDataURL(file);
          } else if (resultType === 'text') {
            reader.readAsText(file);
          }
        });
    }

    const readFile =(files:any)=> {
        // const oversize = isOversize(files, this.maxSize);
        if (Array.isArray(files)) {
          const count = maxCount as number - fileList.length;

          if (files.length > count) {
            files = files.slice(0, count);
          }
          Promise.all(files.map((file:any) => onReadFile(file, resultType))).then(
            (contents) => {
              const fileList = files.map((file:any, index:number) => {
                const result:any = { file, status: '', message: ''}
  
                if (contents[index]) {
                   result.content = contents[index];
                }
  
                return result;
              });
  
              onAfterRead(fileList, oversize);
            }
          );
        } else {
            onReadFile(files, resultType).then((content) => {
            const result:any = { file: files, status: '', message: '' };
  
            if (content) {
              result.content = content;
            }
  
            onAfterRead(result, oversize);
          });
        }
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        let { files } = event.target;
  
        if ( disabled || !files?.length) {
          return;
        }

        let nFiles= files?.length === 1 ? files[0] : [].slice.call(files) 
  
        if (beforeRead) {
          const response = beforeRead(nFiles, getDetail());
          if (response == null) {
            resetInput();
            return;
          }
          if (isPromise(response)) {
            response.then((data) => {
                if (data) {
                  readFile(data);
                } else {
                  readFile(nFiles);
                }
              })
              .catch(resetInput);
            return;
          }
        }
        readFile(nFiles);
    }

    const onDelete =(file:any, index:number)=> {
      setFileList(arr=>{
        const list = arr.slice(0);
        list.splice(index, 1);
        return list
      })
    }

    const genPreviewMask = (item: ImageFile) => {
      const { status, message } = item;
      if (status === 'uploading' || status === 'failed') {
        const MaskIcon =
          status === 'failed' ? (
            // <Icon name="" class={bem('mask-icon')} />
            <Icon name="warning-o" className={`${prefixCls}__mask-icon`} />
          ) : (
            <Loading  />
          );

        return (
          <div className={`${prefixCls}__mask`}>
            {MaskIcon}
           {message && <div className={`${prefixCls}__mask-message`}>{item.message}</div>} 
          </div>
        );
      }
    }

    const genUpload = () =>{
      if (fileList.length >= (maxCount as number)) {
        return;
      }
      const selectEl = (
        <div className={`${prefixCls}__upload`}>
          <Icon name="photograph" className={`${prefixCls}__upload-icon`} />
          <input multiple={multiple} type="file" accept={accept} className={`${prefixCls}__input`} onChange={onChange} />
        </div>
      )
      return selectEl
    }

    const genPreviewList=()=>{
        const imgItemList: any[] = [];
        fileList.forEach((item: any, index: number) => {
            imgItemList.push(   
                <div className={`${prefixCls}__preview`} key={index}>
                    <div className={`ha-image ${prefixCls}__preview-image`}>
                        <img src={item.content || item.url} className='ha-image__img' style={{objectFit:'cover'}} />
                    </div>

                    
                    {genPreviewMask(item)}

                    <div className={`${prefixCls}__preview-delete`}>
                        <Icon name="cross" className={`${prefixCls}__preview-delete-icon`} 
                          onClick={(event) => {
                            event.stopPropagation();
                            onDelete(item, index);
                          }}
                        />
                    </div>
                </div>
            )
        });
        return imgItemList
    }

    return (
        <>
            <div className={`${prefixCls}`}>
                <div className={`${prefixCls}__wrapper`}>
                  {genPreviewList()}
                  {genUpload()}
                </div>
            </div>
        </>
    )
}

Uploader.defaultProps = {
  prefixCls: 'ha-uploader',
  files: [],
  multiple: true,
  accept: 'image/*',
  deletable: false,
  resultType:'dataUrl'
}

export default Uploader