import React, { useState } from 'react';
import { EmojiView, EmojiItem } from '@rtwc/ui';

const index: React.FC = () => {
  const [select, setSelect] = useState<EmojiItem>();

  const onSelect = (d: EmojiItem) => {
    setSelect(d);
  };

  return (
    <div className={'m-2'}>
      <EmojiView onSelect={onSelect} />
      <div>当前选择:{select?.code}</div>

      <EmojiView onSelect={onSelect} className={'gap-1 text-xl'} />
    </div>
  );
};

export default index;
