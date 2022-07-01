import React, {useEffect, useMemo, useState} from 'react';

export interface ToggleItem {
  name: string;
  icon?: React.ReactNode

  [key: string]: any;
}

export interface ToggleAttr {
  items?: Array<ToggleItem>;
  onChange?: (params: ToggleItem) => void;
  size?: 'normal' | 'large' | 'small';
  defaultSelect?: ToggleItem;
}

export const defaultToggleItems = [
  {
    name: '是',
  },
  {
    name: '否',
  },
] as Array<ToggleItem>;

// 滑块二选一
const Toggle: React.FC<ToggleAttr> = ({
                                        items,
                                        onChange,
                                        size = 'normal',
                                        defaultSelect,
                                      }) => {


  const nowItems = useMemo(() => {
    if (items) {
      return items
    }
    return defaultToggleItems
  }, [items])


  const [select, setSelect] = useState<ToggleItem>();

  useEffect(() => {
    if (defaultSelect) {
      setSelect(defaultSelect);
    }
  }, [defaultSelect]);

  const changeSelect = (d: ToggleItem) => {
    setSelect(d);
  };

  useEffect(() => {
    if (select) {
      onChange && onChange(select);
    }
  }, [select]);

  let cls = 'text-sm';
  if (size === 'normal') {
    cls = 'text-base';
  } else if (size === 'large') {
    cls = 'text-lg';
  }

  return (
    <React.Fragment>
      <div
        className={`bg-gray-100 border-gray-100 ${cls} text-gray-400 leading-none border-2 rounded-full inline-flex`}
      >
        {nowItems.map((d, i) => {
          const active = select?.name === d.name;
          let c = 'rounded-l-full';
          if (i % 2) {
            c = 'rounded-r-full';
          }
          let fullCls = `inline-flex items-center transition-colors duration-300 ease-in  outline-none ${c} px-4 py-2`;
          if (active) {
            fullCls += ' bg-white rounded-full text-blue-600 shadow';
          }
          return (
            <button
              key={d.name}
              onClick={() => changeSelect(d)}
              className={fullCls}
            >
              {d?.icon}
              <span>{d.name}</span>
            </button>
          );
        })}
      </div>
    </React.Fragment>
  );
};
export default Toggle;
