import React, { CSSProperties, useMemo } from 'react';
import classNames from 'classnames';
import { Lmg } from '../index';

export interface userSimpleViewParams {
  nickName?: string;
  avatar?: string;
  href?: string;
  className?: string;
  style?: CSSProperties;
  logoSlot?: React.ReactNode;
  logoRender?: React.ReactNode;
  nameRender?: React.ReactNode;
  descExtra?: React.ReactNode;
  rightExtra?: React.ReactNode;
  userLogoCls?: string;
  onUserClick?: (from: 'avatar' | 'name') => void;
}

const UserSimpleView: React.FC<userSimpleViewParams> = ({
  nickName,
  avatar,
  href,
  className,
  style,
  logoSlot,
  logoRender,
  nameRender,
  descExtra,
  rightExtra,
  onUserClick,
  userLogoCls = 'w-10 h-10',
}) => {
  const userNickNameRender = useMemo(() => {
    const infoRender = (
      <p
        onClick={() => onUserClick && onUserClick('name')}
        className={'text-sm text-black text-opacity-80 cursor-pointer truncate'}
        title={nickName}
      >
        {nickName}
      </p>
    );

    if (href) {
      return (
        <a href={href} title={nickName}>
          {infoRender}
        </a>
      );
    }
    return infoRender;
  }, [nickName, href]);

  const onUserLogoClick = () => {
    if (href) {
      window.location.href = href;
      return;
    }
    onUserClick && onUserClick('avatar');
  };

  return (
    <React.Fragment>
      <div className={classNames('flex items-center gap-1', className)} style={style}>
        <div className={'flex-shrink-0 relative'}>
          {!!logoRender ? (
            logoRender
          ) : (
            <div
              className={`cursor-pointer overflow-hidden rounded-full ${classNames(userLogoCls)}`}
              title={nickName}
              onClick={onUserLogoClick}
            >
              <Lmg src={avatar || ''} useBk />
            </div>
          )}
          {logoSlot}
        </div>

        <div className={'flex-grow'}>
          {nameRender ? nameRender : userNickNameRender}
          {descExtra}
        </div>
        <div className={'flex-shrink-0'}>{rightExtra}</div>
      </div>
    </React.Fragment>
  );
};
export default UserSimpleView;
