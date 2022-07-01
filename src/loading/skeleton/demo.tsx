import React, { useEffect, useState } from 'react';
import { Skeleton } from '@rtwc/ui';

const index: React.FC = () => {
  const [show, setShow] = useState<boolean>(true);



  return (
    <div className={'m-2'}>
      <div>页面级加载</div>
      <Skeleton type={'page'} loading={show}>
        页面加载完成...
      </Skeleton>

      <div className={'my-2'}>头像</div>
      <Skeleton type={'avatar'} loading={show}>
        头像加载完成...
      </Skeleton>

      <div className={'my-2'}>头像+信息+内容形</div>

      <Skeleton type={'article'} loading={show}>
        头像+信息+内容加载完成...
      </Skeleton>

      <div className={'my-2'}>可指定行数 仅page支持</div>
      <Skeleton type={'page'} loading={show} line={4}>
        行数加载完成
      </Skeleton>
    </div>
  );
};

export default index;
