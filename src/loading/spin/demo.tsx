import React, { useEffect, useState } from 'react';
import { Spin } from '@rtwc/ui';

const index: React.FC = () => {
  const [dl, setDl] = useState<boolean>(false);

  useEffect(() => {
    let i = 0;
    const r = setInterval(() => {
      i++;
      setDl(!!(i % 2));
    }, 3000);
    return () => {
      clearInterval(r);
    };
  }, []);

  return (
    <div className={'m-2'}>
      <h3 className={'mb-2'}>可以设置size</h3>

      <div>
        <Spin loading size={'large'} block>
          <h3>large尺寸</h3>
        </Spin>
        <Spin loading size={'normal'} block>
          <h3>normal默认尺寸</h3>
        </Spin>
        <Spin loading size={'small'} block>
          <h3>small小尺寸</h3>
        </Spin>
        <Spin loading size={'less'} block>
          <h3>less最小尺寸</h3>
        </Spin>
      </div>

      <div className={'my-2'}>自定义尺寸 建议最小高度为30</div>
      <Spin loading customSize={20}>
        <h3 className={'mb-0'}>这是高度的内容</h3>
      </Spin>

      <div className={'my-2'}>多行内链flex模式</div>

      <div className={'flex items-center gap-1'}>
        <div className={'w-24 flex-shrink-0'}>左侧内容</div>
        <div className={'flex-grow'}>
          <Spin loading={dl} size={'small'} block>
            <h3>居中的内容</h3>
          </Spin>
        </div>
        <div className={'flex-shrink-0'}>右侧内容</div>
      </div>

      <div className={'my-2'}>inline模式</div>

      <div>
        <Spin loading size={'small'}>
          <h3>内链1</h3>
        </Spin>
        <Spin loading size={'small'}>
          <h3>内链2</h3>
        </Spin>
      </div>
      <div className={'my-2'}>自定义颜色</div>

      <div>
        <Spin loading size={'small'} customColor={'green'}>
          <h3>叶片的颜色</h3>
        </Spin>

        <Spin loading size={'small'} customBgColor={'rgba(0,0,0,0.7)'}>
          <h3>
            背景的颜色背景的颜色背景的颜色背景的颜色背景的颜色背景的颜色背景的颜色背景的颜色背景的颜色背景的颜色背景的颜色背景的颜色背景的颜色
          </h3>
        </Spin>
      </div>
    </div>
  );
};

export default index;
