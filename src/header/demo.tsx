import React from 'react';
import { Header } from '@rtwc/ui';

const index: React.FC = () => {
  return (
    <div className={'m-2'}>
      <div className={"py-2"}>支持浮动 设置即可</div>
      <Header title={'浮动的header'} />

      <div className={'mt-2'}>
        <Header title={'不浮动的header'} />

        <Header title={'不浮动的header'}>
          <button>右侧</button>
        </Header>

        <Header title={'一行截断的header'} truncate />
        <Header title={'不显示分享'} showShare={false} />
      </div>
    </div>
  );
};

export default index;
