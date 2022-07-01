import React, {useState} from 'react';
import {defaultToggleItems, Toggle, ToggleItem} from '@rtwc/ui';

const index: React.FC = () => {
  const [select, setSelect] = useState<ToggleItem>();

  return (
    <div className={'m-2'}>
      <div className={'my-2'}>当前选择:{select?.name}</div>
      <Toggle onChange={setSelect}/>

      <div className={'my-2'}>设置默认值</div>

      <Toggle defaultSelect={defaultToggleItems[1]}/>


    </div>
  );
};

export default index;
