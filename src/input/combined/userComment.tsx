import React, {useEffect, useMemo, useRef, useState} from 'react';
import {inputAreaParams, inputAreaRef, InputAreaView, StarRate, starRateParams} from '@rtwc/ui';
import {Btn, EmojiItem, EmojiView, Lmg, Spin} from '@rtwc/ui';
import classNames from 'classnames';

export interface fileUploadResp {
  origin: string;
  thumbnail?: string;
}

export interface commentInputResult {
  value?: string;
  imgs?: fileUploadResp[];
  star?: number;
  links?: inputLinkParams[];
}

export interface inputLinkParams {
  title?: string;
  href: string;
}

export interface userCommentInputParams {
  /** 用户头像 */
  avatar: string;
  /** 默认input输入 */
  value?: string;
  /** 初始化图片列表 */
  imgs?: fileUploadResp[];
  /** 图片点击 */
  onImgClick?: (now: fileUploadResp) => void
  /** 初始化链接 */
  links?: inputLinkParams[];
  /** 图片上传最大数量 推荐9张*/
  fileLimit?: number;
  /** 图片上传是否支持多选 */
  multiple?: boolean;
  /** 进行图片上传 */
  onFileUpload?: (file: File[]) => Promise<fileUploadResp[]>;
  /** 图片上传出错 */
  onFileFail?: (files: File[], err: Error) => void;
  /** 当图片删除 */
  onFileRemove?: (select: fileUploadResp) => Promise<boolean>
  /** 输入框参数 */
  inputAttr?: inputAreaParams;
  /** 点击发送按钮 */
  onSend: (values: commentInputResult) => void;
  /** 用户头像类名 */
  logoCls?: string;
  /** 是否显示星星 */
  showStar?: boolean;
  /** 显示星星的参数 */
  starAttr?: starRateParams;
  /** 是否可以新增链接 */
  showLink?: boolean;
  /** 当链接点击删除 */
  onLinkRemove?: (select: inputLinkParams) => Promise<boolean>
  /** 下级元素可以重复自己 */
  children?: React.ReactNode;
  /** 下级元素父级包裹类名 建议与logoCls设置等值 */
  childrenCls?: string;
}

interface linkFcParams {
  onSuccess: (value: inputLinkParams) => void;
}

const LinkAddFc: React.FC<linkFcParams> = ({onSuccess}) => {
  const [href, setHref] = useState<string>('');
  const [info, setInfo] = useState<string>('');

  const onSend = () => {
    if (!href) {
      return;
    }
    onSuccess({
      href: href,
      title: info,
    });

    setHref('');
    setInfo('');
  };

  return (
    <div className={'flex items-center gap-1 rounded px-1 mb-1'}>
      <div className={'flex-shrink-0'}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 48 48"
          className={'select-none'}
        >
          <path
            fill="#1976D2"
            d="M38 14h-3c-5.514 0-10 4.486-10 10s4.486 10 10 10h3c5.514 0 10-4.486 10-10s-4.486-10-10-10m0 16h-3c-3.309 0-6-2.691-6-6s2.691-6 6-6h3c3.309 0 6 2.691 6 6s-2.691 6-6 6M13 14h-3C4.486 14 0 18.486 0 24s4.486 10 10 10h3c5.514 0 10-4.486 10-10s-4.486-10-10-10m0 16h-3c-3.309 0-6-2.691-6-6s2.691-6 6-6h3c3.309 0 6 2.691 6 6s-2.691 6-6 6"
          />
          <path fill="#42A5F5" d="M33 22H15a2 2 0 0 0 0 4h18a2 2 0 0 0 0-4"/>
        </svg>
      </div>
      <div className={'flex-grow'}>
        <input
          type="text"
          className={'text-sm p-1 border-b w-full'}
          placeholder={'请输入跳转地址'}
          value={href}
          onChange={(e) => setHref(e.target.value)}
        />
      </div>
      <div className={'flex-shrink-0'}>
        <input
          type="text"
          className={'text-sm p-1 border-b'}
          placeholder={'请输入链接说明'}
          value={info}
          onChange={(e) => setInfo(e.target.value)}
        />
      </div>
      <div className={'flex-shrink-0'}>
        <Btn info={'新增'} size={'little'} ripple onClick={onSend}/>
      </div>
    </div>
  );
};

// 左右两侧式输入框
const UserCommentInput: React.FC<userCommentInputParams> = ({
                                                              value = '',
                                                              imgs = [],
                                                              avatar,
                                                              fileLimit = 9,
                                                              multiple = false,
                                                              onImgClick,
                                                              onFileUpload,
                                                              onFileFail,
                                                              onFileRemove,
                                                              onLinkRemove,
                                                              inputAttr = {},
                                                              logoCls = 'w-10 h-10',
                                                              showStar = false,
                                                              starAttr = {},
                                                              links = [],
                                                              showLink = false,
                                                              children,
                                                              childrenCls = 'pl-11 mt-2',
                                                              onSend,
                                                            }) => {
  const inputRef = useRef<inputAreaRef>(null);
  const upload = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [star, setStar] = useState<number>();
  const [emojiShow, setEmojiShow] = useState<boolean>(false);
  const [linkAddShow, setLinkAddShow] = useState<boolean>(false);

  const [fileList, setFileList] = useState<fileUploadResp[]>(imgs);
  const [hrefs, setHrefs] = useState<inputLinkParams[]>(links);

  const onSendClick = () => {
    const p = {
      value: inputRef?.current?.getValue(),
    } as commentInputResult;
    if (fileList?.length) {
      p.imgs = fileList;
    }
    if (showStar) {
      p.star = star;
    }
    if (showLink) {
      p.links = hrefs;
    }

    onSend(p);
  };

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

  const areaAttr = useMemo(() => {
    return {
      ...inputAttr,
      initValue: value || inputAttr?.initValue,
    };
  }, [value, inputAttr]);

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

  const onLinkRemoveFunc = async (item: inputLinkParams) => {
    if (onLinkRemove) {
      try {
        const b = await onLinkRemove(item)
        if (!b) {
          return
        }
      } catch (e) {
        console.error("删除链接出错", item)
        return
      }
    }

    const index = hrefs.findIndex((b) => b?.href == item?.href);
    if (index >= 0) {
      hrefs.splice(index, 1);
      setHrefs([...hrefs]);
    }

  };

  const onLinkAdd = async (item: inputLinkParams) => {
    console.log('链接新增', item);
    setHrefs([...hrefs, item]);
  };

  const renderEmoji = useMemo(() => {
    return <EmojiView onSelect={onEmojiSelect} showBorder={false}/>;
  }, []);

  return (
    <div>
      <div className={'flex gap-1'}>
        <div
          className={`flex-shrink-0 border-2 box-content rounded-full overflow-hidden ${classNames(
            logoCls,
          )}`}
        >
          <Lmg src={avatar} useBk alt={'头像'}/>
        </div>
        <div className={'flex-grow'}>
          <Spin loading={loading} block>
            <InputAreaView ref={inputRef} {...areaAttr} />

            {/*链接展示*/}
            {showLink && (
              <div className={'flex items-center flex-wrap gap-1 mt-1'}>
                {hrefs?.map((d, i) => {
                  return (
                    <div
                      key={`link_${d?.href}_${i}`}
                      className={
                        'bg-gray-200 rounded text-sm p-1 flex gap-1 items-center hover:shadow'
                      }
                    >
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 48 48"
                          className={'cursor-pointer select-none '}
                        >
                          <path
                            fill="#1976D2"
                            d="M38 14h-3c-5.514 0-10 4.486-10 10s4.486 10 10 10h3c5.514 0 10-4.486 10-10s-4.486-10-10-10m0 16h-3c-3.309 0-6-2.691-6-6s2.691-6 6-6h3c3.309 0 6 2.691 6 6s-2.691 6-6 6M13 14h-3C4.486 14 0 18.486 0 24s4.486 10 10 10h3c5.514 0 10-4.486 10-10s-4.486-10-10-10m0 16h-3c-3.309 0-6-2.691-6-6s2.691-6 6-6h3c3.309 0 6 2.691 6 6s-2.691 6-6 6"
                          />
                          <path fill="#42A5F5" d="M33 22H15a2 2 0 0 0 0 4h18a2 2 0 0 0 0-4"/>
                        </svg>
                      </div>
                      <div className={'pl-1'}>
                        <a href={d.href} title={d?.title}>
                          {d?.title || '跳转链接'}
                        </a>
                      </div>
                      <p
                        className={
                          'text-xs text-black text-opacity-30 cursor-pointer px-1 hover:bg-red-400 hover:text-white'
                        }
                        onClick={() => onLinkRemoveFunc(d)}
                      >
                        移除
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {/*图片展示*/}
            {!!fileList?.length && (
              <div className={'flex justify-start flex-wrap items-center gap-1 mt-1'}>
                {fileList?.map((d, i) => {
                  return (
                    <div key={`img${i}`} className={'border rounded'}>
                      <div
                        className={'w-10 h-10 cursor-pointer overflow-hidden'}
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
            )}

            {/*工具栏*/}
            <div className={'flex items-center mt-1 gap-1'}>
              <div title={'新增表情'}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="30"
                  height="30"
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
              </div>
              <div title={'新增图片'}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="32"
                  height="32"
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

              {showLink && (
                <div title={'新增链接'}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 48 48"
                    className={'cursor-pointer select-none transition-all hover:scale-110'}
                    onClick={() => setLinkAddShow(!linkAddShow)}
                  >
                    <path
                      fill="#1976D2"
                      d="M38 14h-3c-5.514 0-10 4.486-10 10s4.486 10 10 10h3c5.514 0 10-4.486 10-10s-4.486-10-10-10m0 16h-3c-3.309 0-6-2.691-6-6s2.691-6 6-6h3c3.309 0 6 2.691 6 6s-2.691 6-6 6M13 14h-3C4.486 14 0 18.486 0 24s4.486 10 10 10h3c5.514 0 10-4.486 10-10s-4.486-10-10-10m0 16h-3c-3.309 0-6-2.691-6-6s2.691-6 6-6h3c3.309 0 6 2.691 6 6s-2.691 6-6 6"
                    />
                    <path fill="#42A5F5" d="M33 22H15a2 2 0 0 0 0 4h18a2 2 0 0 0 0-4"/>
                  </svg>
                </div>
              )}

              {showStar && (
                <div title={'评价'}>
                  <StarRate sizeCls={'w-7 h-7'} {...starAttr} onChange={setStar}/>
                </div>
              )}
            </div>
            {linkAddShow && <LinkAddFc onSuccess={onLinkAdd}/>}
            {emojiShow && renderEmoji}
          </Spin>
        </div>
        <div className={'flex-shrink-0'}>
          <Btn info={'发送'} size={'small'} ripple onClick={onSendClick} loading={loading}/>
        </div>
      </div>
      {!!children && <div className={classNames(childrenCls)}>{children}</div>}
    </div>
  );
};
export default UserCommentInput;
