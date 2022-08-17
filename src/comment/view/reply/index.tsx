import React, { useCallback, useMemo } from 'react';
import { commentViewBaseParams, ImgListAutoRender } from '@rtwc/ui';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { Btn, Spin } from '@rtwc/ui';

export interface commentReplyUserParams {
  /** 用户昵称 */
  nickName: string;
  /** 用户主页跳转地址 */
  href?: string;
}

export interface commentReplyParams extends commentViewBaseParams {
  fromUser: commentReplyUserParams;
  toUser?: commentReplyUserParams;
  userCls?: string;
  onUserClick?: (toUser: boolean) => void;
  /** 下级元素可以重复自己 */
  children?: React.ReactNode;
  /** 下级元素父级包裹类名 */
  childrenCls?: string;
}

const CommentReplyView: React.FC<commentReplyParams> = ({
  value,
  imgs = [],
  like = 0,
  update_time,
  fromUser,
  toUser,
  showDelete = false,
  loading = false,
  userCls = 'w-14 md:w-16 lg:w-20 xl:w-24',
  onUserClick,
  onDelete,
  onReport,
  onLike,
  onReply,
  contentExtra,
  children,
  childrenCls = 'pl-4 mt-1',
}) => {
  const likeMsg = useMemo(() => {
    if (like > 999) {
      return '999+';
    }
    return like;
  }, [like]);

  const userNickNameCb = useCallback((u: commentReplyUserParams, to = false) => {
    const infoRender = (
      <p
        onClick={() => onUserClick && onUserClick(to)}
        className={
          'text-sm text-black text-opacity-70 hover:text-opacity-80 cursor-pointer truncate'
        }
        title={u?.nickName}
      >
        {u?.nickName}
      </p>
    );

    if (u?.href) {
      return (
        <a href={u?.href} title={u?.nickName} className={'block'}>
          {infoRender}
        </a>
      );
    }
    return infoRender;
  }, []);

  return (
    <div>
      <Spin block loading={loading}>
        <div className={'flex gap-0.5'}>
          <div className={classNames('flex-shrink-0', userCls)}>
            {userNickNameCb(fromUser, false)}
            {!!toUser && (
              <React.Fragment>
                <div className={'text-xs text-black text-opacity-30'}>---回复---</div>
                {userNickNameCb(toUser, true)}
              </React.Fragment>
            )}

            <div className={'flex flex-wrap gap-2'}>
              {showDelete && (
                <div
                  title={'删除'}
                  className={
                    'text-black transition-all text-opacity-30 hover:text-opacity-80 cursor-pointer select-none text-xs text-center '
                  }
                  onClick={() => onDelete && onDelete()}
                >
                  删除
                </div>
              )}

              {!!onReport && (
                <div
                  title={'举报'}
                  className={
                    'text-black transition-all text-opacity-30 hover:text-opacity-80 cursor-pointer select-none text-xs text-center '
                  }
                  onClick={() => onReport()}
                >
                  举报
                </div>
              )}
            </div>
          </div>
          <div className={'flex-grow'}>
            {!!value && <p className={'text-black text-opacity-95 text-base leading-5'}>{value}</p>}
            {!!imgs?.length && (
              <div className={'mt-1'}>
                <ImgListAutoRender
                  imgs={imgs}
                  imgHeightCls={'h-20 md:h-24 lg:h-28'}
                  imgSplitHeightCls={'h-20 md:h-24 lg:h-28'}
                />
              </div>
            )}

            {/*操作栏*/}
            <div className={'flex justify-between items-center'}>
              {!!update_time && (
                <p className={'text-sm text-black text-opacity-60'}>
                  {dayjs(update_time).format('YYYY-MM-DD HH:mm:ss')}
                </p>
              )}
              {!!onReply && <Btn info={'回复'} size={'less'} scheme={'flat'} onClick={onReply} />}
            </div>
            {contentExtra}
          </div>
          <div className={'flex-shrink-0 px-1'}>
            <div
              title={'喜欢'}
              onClick={() => onLike && onLike()}
              className={'text-center cursor-pointer select-none '}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 48 48"
                className={'mx-auto'}
              >
                <path
                  fill="#FF3D00"
                  d="M32.635 8A10.37 10.37 0 0 0 24 12.597 10.37 10.37 0 0 0 15.365 8C9.641 8 5 12.598 5 18.269 5 28.487 21.15 33.411 24 40c2.85-6.589 19-11.428 19-21.731C43 12.598 38.359 8 32.635 8"
                />
              </svg>
              {like > 0 && <div className={'text-xs text-black text-opacity-80'}>{likeMsg}</div>}
            </div>
          </div>
        </div>
      </Spin>
      {!!children && <div className={classNames(childrenCls)}>{children}</div>}
    </div>
  );
};
export default CommentReplyView;
