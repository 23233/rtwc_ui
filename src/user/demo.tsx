import React, { useRef, useState } from 'react';
import { Lmg, SimpleTitle, UserSimpleView } from '@rtwc/ui';

const index = (): any => {
  const avatar =
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png';
  const name = '金丝豆腐较为';
  return (
    <div>
      <SimpleTitle text={'正常模式'} className={'my-1'} />
      <UserSimpleView
        avatar={
          'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png'
        }
        nickName={name}
      />

      <SimpleTitle text={'自定义'} className={'my-1'} />
      <UserSimpleView
        logoRender={
          <div className={`cursor-pointer overflow-hidden rounded-full w-10 h-10`}>
            <Lmg src={avatar} useBk />
          </div>
        }
        nameRender={
          <p
            className={'text-base text-black text-opacity-80 cursor-pointer truncate'}
            title={name}
          >
            自定义名称渲染
          </p>
        }
        descExtra={
          <p className={'text-sm text-black text-opacity-60'}>名称描述啊阿萨德飞机为肌肤</p>
        }
        rightExtra={
          <p className={'text-sm text-black text-opacity-80 cursor-pointer truncate'} title={name}>
            自定义右侧渲染
          </p>
        }
      />

      <SimpleTitle text={'无头像'} className={'my-1'} />
      <UserSimpleView logoRender={<p />} nickName={'sdfjiwjief'} />
    </div>
  );
};

export default index;
