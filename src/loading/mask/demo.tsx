import React, {useEffect, useState} from 'react';
import {MaskLoading} from '@rtwc/ui';

const index: React.FC = () => {
  const [process, setProcess] = useState<number>(1);

  useEffect(() => {
    const b = setInterval(() => {
      setProcess(process + 1);
    }, 100);
    return () => {
      clearInterval(b);
    };
  }, [process]);

  return (
    <div className={'m-2'}>
      <div>可相对 可浮动</div>

      <div className={'relative h-24'}>
        <MaskLoading visible msg={'内容'} percent={process}/>
        里面有字可以看到
      </div>

      <div className={'relative h-24 mt-2'}>
        <MaskLoading visible msg={'自定义颜色'} percent={process} lineColorCls={"bg-blue-500"}/>
        里面有字可以看到
      </div>

    </div>
  );
};

export default index;
