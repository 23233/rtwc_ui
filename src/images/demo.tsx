import React from 'react';
import {Lmg} from '@rtwc/ui';

const index: React.FC = () => {
  const img =
    'https://static.rycsg.com/cat_tr/t2915193789/2021-12-02/2565116b5d2d80366935d95c51690261_t.jpg';
  const origin =
    'https://static.rycsg.com/cat_tr/t2915193789/2021-12-02/2565116b5d2d80366935d95c51690261.jpg';

  return (
    <div className={'m-2'}>
      <div>普通图片加载</div>

      <Lmg src={img} alt={'图片'}/>

      <div className={'my-2'}>背景图片模式</div>

      <div className={'h-24'}>
        <Lmg src={img} useBk/>
      </div>

      <div className={'my-2'}>背景图片设置size为contain</div>

      <div className={'h-24'}>
        <Lmg src={img} useBk bgSize={'contain'}/>
      </div>

    </div>
  );
};

export default index;
