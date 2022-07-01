import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';

export interface starRateParams {
  /** 星星总数 */
  count?: number;
  /** 点亮多少个 */
  active?: number;
  /** 星星尺寸类名 */
  sizeCls?: string;
  /** 星星颜色点亮类名 */
  lightCls?: string;
  /** 星星颜色未点亮类名 */
  normalCls?: string;
  disable?: boolean;
  onChange?: (nowActive: number) => void;
}

const StarRate: React.FC<starRateParams> = ({
  count = 5,
  active = 0,
  sizeCls = 'w-5 h-5',
  lightCls = 'text-yellow-400',
  normalCls = 'text-gray-300 dark:text-gray-500',
  disable = false,
  onChange,
}) => {
  const [fill, setFill] = useState<number>(active);

  useEffect(() => {
    setFill(active);
  }, [active]);

  useEffect(() => {
    onChange && onChange(fill);
  }, [fill]);

  const renderStar = (light?: boolean) => {
    return (
      <svg
        className={`${classNames(
          light
            ? [lightCls, disable ? '' : 'cursor-pointer']
            : [normalCls, disable ? '' : ['hover:' + lightCls, 'cursor-pointer']],
          sizeCls,
          'select-none',
        )}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    );
  };

  const onStarClick = (index: number) => {
    if (disable) return;
    let n = index + 1;
    // 取消注释支持点击反选
    // if (n == fill) {
    //   n -= 1
    // }
    setFill(n);
  };

  const renderStars = useMemo(() => {
    return Array(count)
      .fill(0)
      .map((d, i) => {
        const light = i < fill;
        return (
          <div key={i} onClick={() => onStarClick(i)}>
            {renderStar(light)}{' '}
          </div>
        );
      });
  }, [fill, count]);

  return <div className={'flex items-center'}>{renderStars}</div>;
};
export default StarRate;
