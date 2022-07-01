import React, { CSSProperties, useEffect, useMemo, useState } from 'react';

export interface LmgProps {
  src: string;
  origin?: string; // 原图
  alt?: string;
  className?: string;
  style?: CSSProperties;
  useBk?: boolean; // 使用背景模式
  bgPosition?: string; // 背景定位
  bgSize?: string;
  loadingMinSize?: number;
  loadingClassName?: string;
  onClick?: (e: React.MouseEvent) => void;
}

// loading img 简写Lmg
const Lmg: React.FC<LmgProps> = ({
  loadingMinSize = 60,
  src,
  alt,
  style = {},
  onClick,
  className,
  useBk = false,
  bgPosition = 'center center',
  bgSize = 'cover',
  loadingClassName = 'w-full h-full flex items-center justify-center',
  ...props
}) => {
  const [success, setSuccess] = useState<boolean>(false);
  const [mount, setMount] = useState<boolean>(false);

  // ssr 不执行useEffect
  useEffect(() => {
    setMount(true);

    if (src) {
      const image = new Image();
      image.src = src;
      image.onload = (): void => {
        setSuccess(true);
        if (src.startsWith('blob:')) {
          try {
            window.URL.revokeObjectURL(src);
          } catch (e) {
            console.error('释放文件失败');
          }
        }
      };
      image.onerror = (e: any): void => {
        console.error(`加载图片${src}出错`, e);
      };
    }
  }, [src]);

  const clickFunc = (e: React.MouseEvent) => {
    onClick && onClick(e);
  };

  const renderItem = useMemo(() => {
    if (success) {
      if (useBk) {
        return (
          <div
            className={`h-full ${className || ''}`}
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: bgSize,
              backgroundPosition: bgPosition,
              backgroundRepeat: 'no-repeat',
              ...style,
            }}
            title={alt}
            onClick={clickFunc}
          />
        );
      }
      return (
        <img
          src={src}
          alt={alt}
          title={alt}
          className={className || ''}
          style={style}
          onClick={clickFunc}
        />
      );
    }
    return (
      <div className={loadingClassName} style={{ minHeight: loadingMinSize }}>
        <svg className="animate-spin h-5 w-5 text-gray-200" viewBox="0 0 24 24">
          <circle
            className="opacity-20"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-80"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    );
  }, [props]);

  return (
    <React.Fragment>
      {!mount ? <img src={src} alt={alt} title={alt} className={'hidden'} /> : renderItem}
    </React.Fragment>
  );
};
export default Lmg;
