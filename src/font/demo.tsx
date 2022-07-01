import React from 'react';
import { SimpleTitle } from '@rtwc/ui';

const index: React.FC = () => (
  <div className={'m-2'}>
    <SimpleTitle text={'标题内容'} />
    <div className={'my-2'}>
      <SimpleTitle text={'标题内容'} desc={'加了描述内容'} />
    </div>
    <div className={'my-2'}>
      <SimpleTitle text={'标题内容'}>
        <p className={'mb-0'}>子内容在右侧</p>
      </SimpleTitle>
    </div>
  </div>
);

export default index;
