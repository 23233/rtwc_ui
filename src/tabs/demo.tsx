import React, {useEffect, useState} from 'react';
import {HorizontallyTabs,TabItem} from '@rtwc/ui';

const index: React.FC = () => {
  const tabs = [
    {
      label: '标签1',
      id: 'tab1',
    },
    {
      label: '标签2',
      id: 'tab2',
    },
  ] as Array<TabItem>;

  const more = [
    ...tabs,
    ...Array(11)
      .fill(0)
      .map((b, i) => {
        return {
          label: `标签${i + 5}`,
          id: `tab${i + 5}`,
        };
      }),
  ];

  const [item, setItem] = useState<TabItem>(tabs[0]);


  return (
    <div className={'m-2'}>
      <div>非受控的</div>

      <HorizontallyTabs items={tabs}/>

      <div className={'my-2'}>受控的</div>

      <HorizontallyTabs items={tabs} current={item} onChange={setItem}/>

      <div className={'my-2'}>当前选中的:{item?.label}</div>

      <div className={'my-2'}>可设置额外的按钮</div>
      <HorizontallyTabs
        items={tabs}
        extra={<button>额外按钮</button>}
      />

      <div className={'my-2'}>设置为当前不可见标签会自动滚动过去</div>
      <HorizontallyTabs items={more} current={item} onChange={setItem}/>

      <button onClick={()=> setItem(more[more.length - 4])}>设置为标签12</button>

      <div className={'my-2'}>可以设置为a标签</div>

      <HorizontallyTabs items={more} current={item} onChange={setItem} linkRender/>


    </div>
  );
};

export default index;
