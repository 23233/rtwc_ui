import React, {useEffect, useMemo, useRef, useState} from 'react';
import {fileUploadResp, inputAreaRef, InputAreaView} from '@rtwc/ui';
import {Btn, EmojiItem, EmojiView, Lmg, Spin} from '@rtwc/ui';
import classNames from 'classnames';

export interface inlineReplyInputResult {
  value?: string;
  imgs?: fileUploadResp[];
}

export interface inlineReplyInputParams {
  /** 初始化的文字信息 */
  value?: string;
  /** 最多输入文字字数 */
  maxValueSize?: number;
  /** 初始化图片列表 */
  imgs?: fileUploadResp[];
  /** 图片点击 */
  onImgClick?: (now: fileUploadResp) => void
  /** 图片上传最大数量 推荐9张*/
  fileLimit?: number;
  /** 图片上传是否支持多选 */
  multiple?: boolean;
  /** 存在时才会显示图像上传图标 */
  onFileUpload?: (file: File[]) => Promise<fileUploadResp[]>;
  /** 图片上传出错 */
  onFileFail?: (files: File[], err: Error) => void;
  /** 当图片删除 */
  onFileRemove?: (select: fileUploadResp) => Promise<boolean>
  /** 当前用户头像 若有则显示 */
  avatar?: string;
  onSend: (values: inlineReplyInputResult) => void;
  /** 回复发帖的用户昵称 */
  replyUserName?: string;
  /** 回复发帖的内容 */
  replyContent?: string;
  /** 回复的类名 */
  replyCls?: string;
  /** 下级元素可以重复自己 */
  children?: React.ReactNode;
  /** 下级元素父级包裹类名 */
  childrenCls?: string;
}

const InlineReplyInput: React.FC<inlineReplyInputParams> = ({
                                                              value = '',
                                                              imgs = [],
                                                              fileLimit = 9,
                                                              multiple = false,
                                                              maxValueSize = 255,
                                                              onImgClick,
                                                              onFileUpload,
                                                              onFileFail,
                                                              onFileRemove,
                                                              avatar,
                                                              replyUserName = '',
                                                              replyContent = '',
                                                              replyCls = 'text-sm bg-gray-100 text-black text-opacity-70',
                                                              onSend,
                                                              children,
                                                              childrenCls = 'pl-6 mt-1',
                                                            }) => {
  const inputRef = useRef<inputAreaRef>(null);
  const upload = useRef<HTMLInputElement>(null);
  const [emojiShow, setEmojiShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [fileList, setFileList] = useState<fileUploadResp[]>(imgs);

  useEffect(() => {
    if (emojiShow) {
      const h = (e: any) => {
        setEmojiShow(false);
      };
      document.addEventListener('click', h);
      return () => {
        document.removeEventListener('click', h);
      };
    }
  }, [emojiShow]);

  const onEmojiSelect = (d: EmojiItem) => {
    inputRef.current?.insertEmoji(d.code);
  };
  const onEmojiToggle = (e: any) => {
    // 阻止冒泡
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setEmojiShow(!emojiShow);
  };

  // 选择了图片
  const onUploadSelect = async (e: any) => {
    const files = e.target.files;
    console.log('select file', files);
    if (fileList?.length + files.length > fileLimit) {
      onFileFail && onFileFail(files, new Error(`图片上传超出${fileLimit}张限制,请重选`))
      return;
    }
    if (onFileUpload) {
      setLoading(true);
      try {
        const resp = await onFileUpload(files);
        setFileList([...fileList, ...resp]);
      } catch (e: any) {
        console.error('上传图片出错', e, files);
      } finally {
        setLoading(false);
      }
    }
  };


  const onImgRemove = async (item: fileUploadResp) => {

    if (onFileRemove) {
      try {
        const r = await onFileRemove(item)
        if (!r) {
          return
        }
      } catch (e) {
        console.error("图片删除错误", item, e)
        return
      }
    }
    const index = fileList.findIndex((b) => b?.origin == item?.origin);
    if (index >= 0) {
      fileList.splice(index, 1);
      setFileList([...fileList]);
    }
  };

  const renderEmoji = useMemo(() => {
    return (
      <EmojiView
        onSelect={onEmojiSelect}
        showBorder={false}
        className={'gap-0.5 text-xl md:flex md:flex-wrap'}
      />
    );
  }, []);

  const onSendClick = () => {
    const p = {
      value: inputRef?.current?.getValue(),
    } as inlineReplyInputResult;
    if (fileList?.length) {
      p.imgs = fileList;
    }
    onSend(p);
  };

  return (
    <div>
      {!!replyUserName && (
        <div
          className={`flex items-center flex-nowrap overflow-hidden gap-1 p-1 rounded ${classNames(
            replyCls,
          )}`}
        >
          <div className={'flex-shrink-0 select-none'}>--</div>
          <div className={'w-32 overflow-hidden whitespace-nowrap flex-shrink-0'}>
            {replyUserName}
          </div>
          <div className={'flex-shrink-0 select-none'}>:</div>
          <div className={'flex-grow truncate'}>{replyContent}</div>
        </div>
      )}
      <Spin loading={loading} block customBgColor={'rgba(0,0,0,.15)'}>
        <div className={'flex gap-0.5 relative'}>
          {!!avatar && (
            <div className={`flex-shrink-0 box-content rounded-full w-6 h-6 overflow-hidden`}>
              <Lmg src={avatar} useBk alt={'头像'}/>
            </div>
          )}

          <div className={'flex-grow'}>
            <InputAreaView
              ref={inputRef}
              initValue={value}
              heightStyle={{minHeight: 24, maxHeight: 280}}
              className={'border-b'}
              fontCls={'text-sm leading-5'}
              maxValueSize={maxValueSize}
            />

            {/*图片展示*/}
            <div className={'flex justify-start flex-wrap items-center gap-0.5 mt-1'}>
              {fileList?.map((d, i) => {
                return (
                  <div key={`img${i}`} className={'border rounded'}>
                    <div
                      className={'w-8 h-8 cursor-pointer overflow-hidden'}
                      onClick={() => onImgClick && onImgClick(d)}
                    >
                      <Lmg src={d?.thumbnail || d?.origin} useBk/>
                    </div>
                    <p
                      className={
                        'text-xs text-center text-black text-opacity-30 border-t cursor-pointer hover:bg-red-400 hover:text-white'
                      }
                      onClick={() => onImgRemove(d)}
                    >
                      移除
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/*工具栏*/}
          <div className={'flex-shrink-0 flex'}>
            <div title={'新增表情'}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="28"
                height="28"
                className={'cursor-pointer select-none transition-all hover:scale-110'}
                onClick={onEmojiToggle}
              >
                <path fill="#ffca28" d="M44 24c0 11-9 20-20 20S4 35 4 24 13 4 24 4s20 9 20 20z"/>
                <path fill="#6d4c41" d="M21 23c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4z"/>
                <path
                  fill="#fff"
                  d="M17 21.5c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5.7-1.5 1.5-1.5 1.5.7 1.5 1.5z"
                />
                <path
                  fill="#b76c09"
                  d="M24 37c-1.7 0-3-.5-3.9-1.4C19 34.5 19 33.1 19 33h2c0 .3.2 2 3 2 4.1 0 5-4 5-4.2l2 .4c-.4 2-2.4 5.8-7 5.8zm3.8-12.4-1.6-1.2c.1-.1 1.8-2.4 4.8-2.4s4.7 2.3 4.8 2.4l-1.6 1.2S32.9 23 31 23s-3.2 1.6-3.2 1.6z"
                />
              </svg>

              {emojiShow && (
                <div
                  className={'absolute left-0 -bottom[7.5rem] z-20 rounded bg-white bg-opacity-70'}
                >
                  {renderEmoji}
                </div>
              )}
            </div>
            {!!onFileUpload && (
              <div title={'新增图片'}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="30"
                  height="30"
                  className={'cursor-pointer select-none transition-all hover:scale-110'}
                  onClick={() => upload.current?.click()}
                >
                  <path
                    fill="#F57C00"
                    d="M40 41H8c-2.2 0-4-1.8-4-4V11c0-2.2 1.8-4 4-4h32c2.2 0 4 1.8 4 4v26c0 2.2-1.8 4-4 4z"
                  />
                  <path fill="#FFF9C4" d="M35 13a3 3 0 1 0 0 6 3 3 0 1 0 0-6z"/>
                  <path fill="#942A09" d="M20 16 9 32h22z"/>
                  <path fill="#BF360C" d="m31 22-8 10h16z"/>
                </svg>

                <input
                  type="file"
                  accept={'image/*'}
                  multiple={multiple}
                  style={{display: 'none'}}
                  ref={upload}
                  onChange={onUploadSelect}
                />
              </div>
            )}
          </div>

          <div className={'flex-shrink-0'}>
            <Btn info={'发送'} size={'less'} ripple onClick={onSendClick} className={'mt-0.5'}/>
          </div>
        </div>
      </Spin>

      {!!children && <div className={classNames(childrenCls)}>{children}</div>}
    </div>
  );
};
export default InlineReplyInput;
