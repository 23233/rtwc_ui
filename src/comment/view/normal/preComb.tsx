import React, {useMemo} from 'react';
import {commentViewBaseParams, userSimpleViewParams} from '@rtwc/ui';
import CommentView from './index';

export interface commentPreCombUserParams extends userSimpleViewParams {
  /** 用户描述 */
  desc?: string;
  /** 用户认证信息 */
  verify?: string;
  /** 用户 头像昵称或者验证信息点击 */
  onUserClick?: (from: 'avatar' | 'name' | 'verify') => void;
}

export interface commentPreCombParams extends commentViewBaseParams {
  /** 用户基本信息 */
  userAttr: commentPreCombUserParams;
  /** 回复数量 大于0会显示展开 */
  replyCount?: number;
  /** 展开回复事件 */
  onOpenReply?: () => void;
  /** 认证信息点击 */
  onVerify?: () => void;
  /** 下级元素可以重复自己 */
  children?: React.ReactNode;
}

const CommentPreCombView: React.FC<commentPreCombParams> = ({...props}) => {
  const onVerifyClick = () => {
    if (props?.onVerify) {
      props?.onVerify();
      return;
    }
  };

  const userExtra = useMemo(() => {
    return (
      <div className={'flex gap-1'}>
        {!!props?.userAttr?.desc && (
          <p className={'text-black text-opacity-60 hover:text-opacity-90 text-sm '}>
            {props?.userAttr?.desc}
          </p>
        )}
      </div>
    );
  }, [props]);

  const verifyExtra = useMemo(() => {
    if (!!props?.userAttr?.verify) {
      return (
        <div
          className={'cursor-pointer absolute -left-1 -top-1 z-20'}
          title={props?.userAttr?.verify}
          onClick={onVerifyClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20" height="20">
            <path
              fill="#4caf50"
              d="M44 24c0-2.909-1.653-5.448-4.066-6.73.659-2.511.017-5.303-1.943-7.262a7.493 7.493 0 0 0-5.321-2.192c-.653 0-1.306.083-1.941.25C29.448 5.653 26.909 4 24 4s-5.448 1.653-6.73 4.066a7.64 7.64 0 0 0-1.941-.25 7.5 7.5 0 0 0-5.321 2.192c-1.959 1.959-2.602 4.75-1.943 7.262C5.653 18.552 4 21.091 4 24s1.653 5.448 4.066 6.73c-.659 2.511-.017 5.303 1.943 7.262a7.498 7.498 0 0 0 5.321 2.192c.653 0 1.306-.083 1.941-.25C18.552 42.347 21.091 44 24 44s5.448-1.653 6.73-4.066a7.64 7.64 0 0 0 1.941.25 7.5 7.5 0 0 0 5.321-2.192c1.959-1.959 2.602-4.75 1.943-7.262C42.347 29.448 44 26.909 44 24z"
            />
            <path
              fill="#fff"
              d="m22 32.829-7.414-7.415 2.828-2.828L22 27.171l9.586-9.585 2.828 2.828z"
            />
          </svg>
        </div>
      );
    }
  }, [props]);

  const replyExtra = useMemo(() => {
    if (props?.replyCount) {
      return (
        <div
          className={
            'text-black text-opacity-60 hover:text-opacity-80 text-sm cursor-pointer select-none flex gap-1'
          }
          onClick={props?.onOpenReply}
        >
          <div>--</div>
          <div>{props?.replyCount}条回复</div>
          <div>--</div>
        </div>
      );
    }
  }, [props]);

  return (
    <CommentView
      {...props}
      userAttr={{
        ...props.userAttr,
        descExtra: userExtra,
        logoSlot: verifyExtra,
      }}
      contentExtra={replyExtra}
    />
  );
};
export default CommentPreCombView;
