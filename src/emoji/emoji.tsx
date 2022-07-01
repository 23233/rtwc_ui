import React, { useMemo } from 'react';
import { EmojiItem } from '@rtwc/ui';
import emojiList from './emojiList';
import classNames from 'classnames';

export interface EmojiAttr {
  className?: string;
  onSelect: (params: EmojiItem) => void;
  showBorder?: boolean;
  activeCls?: string;
}

const EmojiView: React.FC<EmojiAttr> = ({
  showBorder = true,
  onSelect,
  className = 'gap-2 p-2 text-2xl',
  activeCls = 'hover:scale-110 active:scale-110',
}) => {
  const select = (e: any, d: EmojiItem) => {
    // 阻止冒泡
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    // 发起事件
    onSelect(d);
  };

  const renders = useMemo(() => {
    return (
      <React.Fragment>
        {emojiList.map((d, i) => (
          <div
            key={`${d.code}${i}`}
            aria-label={d.label}
            title={d.label}
            className={classNames(
              'select-none transition-all cursor-pointer text-center',
              activeCls,
            )}
            onClick={(e) => select(e, d)}
          >
            {d.show}
          </div>
        ))}
      </React.Fragment>
    );
  }, []);

  return (
    <React.Fragment>
      <div className={`${classNames('grid grid-cols-8', showBorder ? 'border-t' : '', className)}`}>
        {renders}
      </div>
    </React.Fragment>
  );
};
export default EmojiView;
