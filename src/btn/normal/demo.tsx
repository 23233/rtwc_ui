import React, { useState } from 'react';
import { Btn, Icons } from '@rtwc/ui';

const index = (): any => {
  const [loading, setLoading] = useState<boolean>(true);
  const typeList = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'white',
    'dark',
  ];
  const schemeList = ['filled', 'border', 'flat', 'gradient', 'relief', 'round'];

  return (
    <div>
      <div className={'mx-1'}>
        <div className={'flex gap-1'}>
          <Btn info={'默认按钮'} />
          <Btn info={'自定义类名 加了阴影'} className={'shadow-lg '} />
          <Btn
            info={'自定义样式'}
            scheme={'custom'}
            ripple
            className={'p-1 border rounded text-xs'}
          />
        </div>

        {schemeList.map((b) => (
          <div key={b}>
            <p className={'text-xl mb-1'}>类型:{b}</p>
            <div className={'flex gap-1 flex-wrap'}>
              {typeList.map((t) => (
                <Btn
                  key={`${b}${t}`}
                  // @ts-ignore
                  type={t}
                  // @ts-ignore
                  scheme={b}
                  info={t}
                />
              ))}
            </div>
          </div>
        ))}

        <div className={'mt-2'}>
          <Btn info={'点击波纹特效'} ripple />

          <Btn info={'块级按钮'} block className={'mt-2'} />
          <Btn info={'禁用模式'} disable className={'mt-2'} />
          <div className={'flex'}>
            <Btn info={'加载中'} loading={loading} className={'mt-2'} />
            <Btn info={'切换加载状态'} className={'mt-2'} onClick={() => setLoading(!loading)} />
          </div>
        </div>

        <div className={'mt-2'}>
          <Btn info={'最小尺寸'} size={'less'} />
          <Btn info={'一般性尺寸'} size={'little'} className={'mx-1'} />
          <Btn info={'默认尺寸'} className={'mt-2 mx-1'} size={'small'} />
          <Btn info={'大尺寸'} className={'mt-2 mx-1'} size={'big'} />
          <Btn info={'超大尺寸'} className={'mt-2 mx-1'} size={'large'} />
        </div>
        <div className={'mt-2'}>
          <Btn icon={<Icons type={'plus'} />} info={'有图标'} size={'less'} />

          <Btn
            icon={<Icons type={'plus'} />}
            info={'仅图标'}
            onlyIcon
            size={'less'}
            className={'mt-2'}
          />
        </div>

        <div className={'mt-2'}>
          <Btn btnType={'a'} info={'a标签'} href={'/search'} />
          <Btn btnType={'a'} blank info={'a标签新开页'} href={'/search'} />
        </div>
      </div>
    </div>
  );
};

export default index;
