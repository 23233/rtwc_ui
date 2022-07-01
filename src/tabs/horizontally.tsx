import React, {CSSProperties, useCallback, useEffect, useRef, useState} from 'react';
import classnames from "classnames";

export interface TabItem {
  id: string | number;
  label: string;
  icon?: React.ReactNode;
  jumpHref?: string; // 如果有这个则渲染为A标签且跳过click事件
  [key: string]: any;
}

export interface HorizontalTabAttr {
  current?: TabItem;
  defaultCurrent?: TabItem;
  items: Array<TabItem>;
  extra?: React.ReactNode;
  onReplaceClick?: (item: TabItem) => void; // 当前选中点击
  onChange?: (item: TabItem) => void;
  linkRender?: boolean; // 如果有这个则渲染为A标签且跳过click事件
  className?: string
  style?: CSSProperties
}

// tailwind需要引入 https://www.npmjs.com/package/tailwind-scrollbar-hide 这个插件

// 可横向滚动的tab
const HorizontallyTabs: React.FC<HorizontalTabAttr> = ({
                                                         current,
                                                         items,
                                                         defaultCurrent,
                                                         linkRender = false,
                                                         className,
                                                         style,
                                                         ...props
                                                       }) => {
  const [value, setValue] = useState<TabItem>();
  const warpRef = useRef<HTMLDivElement>(null);

  const gotoItem = (id: string | number) => {
    // 滚动过去
    const index = items?.findIndex((b) => b.id === id);
    if (index >= 0) {
      const el = warpRef.current?.children?.[index];
      el?.scrollIntoView({
        inline: 'center',
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  };

  useEffect(() => {
    if (defaultCurrent) {
      setValue(defaultCurrent);
    }
  }, []);

  useEffect(() => {
    setValue(current);
    if (current?.id) {
      gotoItem(current?.id || '');
    }
  }, [current]);

  const onClick = (item: TabItem) => {
    if (value?.id === item.id) {
      props?.onReplaceClick && props.onReplaceClick(item);
      return;
    }
    props?.onChange && props.onChange(item);
    setValue(item);
  };

  const renderItem = useCallback(
    (d: TabItem) => {
      const active = value?.id === d.id;
      return (
        <React.Fragment>
          <div
            className={`transition-all h-7 text-base flex justify-center items-center ${
              active ? 'text-black font-bold' : 'text-gray-400'
            }`}
          >
            {d?.icon}
            <p>{d.label}</p>
          </div>
          {d?.desc && (
            <p className={`text-xs ${active ? 'text-black opacity-80' : 'text-gray-200'}`}>
              {d.desc}
            </p>
          )}
        </React.Fragment>
      );
    },
    [value],
  );

  return (
    <div className="relative flex">
      <div className={`flex overflow-x-auto flex-grow items-center ${classnames("scrollbar-hide",className)}`} ref={warpRef}>
        {items?.map((d) => {
          if (linkRender) {
            return (
              <a
                href={d?.jumpHref}
                title={d.label}
                key={d.id}
                onClick={() => onClick(d)}
                className={`flex-shrink-0 block px-1 box-border border-b-2 ${
                  value?.id === d.id ? ' border-blue-400' : 'border-transparent'
                }`}
              >
                {renderItem(d)}
              </a>
            );
          }
          return (
            <div
              key={d.id}
              className={`flex-shrink-0  px-1 box-border border-b-2 ${
                value?.id === d.id ? ' border-blue-400' : 'border-transparent'
              }`}
              onClick={() => onClick(d)}
            >
              {renderItem(d)}
            </div>
          );
        })}
      </div>
      {props?.extra ? <div className="flex-shrink-0 flex items-center">{props.extra}</div> : null}
    </div>
  );
};
export default HorizontallyTabs;
