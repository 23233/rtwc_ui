import React, { useMemo } from 'react';
import classNames from 'classnames';

const spinSize = {
  large: '50px',
  normal: '30px',
  small: '20px',
  less: '15px',
};

export interface SpinAttr {
  loading?: boolean;
  size?: 'large' | 'normal' | 'small' | 'less';
  customSize?: number;
  customColor?: string;
  customBgColor?: string;
  zIndex?: number;
  className?: string;
  block?: boolean;
  children?: React.ReactNode;

  [key: string]: any;
}

const Spin: React.FC<SpinAttr> = ({
  loading,
  size = 'normal',
  zIndex = 50,
  customSize,
  customColor,
  customBgColor,
  block = false,
  children,
  className = '',
}) => {
  const customStyle = useMemo(() => {
    let s = {} as any;
    if (customSize) {
      s['--spin-size'] = customSize + 'px';
    } else {
      s['--spin-size'] = spinSize[size];
    }
    if (customColor) {
      s['--spin-color'] = customColor;
    }
    if (customBgColor) {
      s['--spin-bg-color'] = customBgColor;
    }
    return s;
  }, [customSize, customColor, customBgColor]);

  const renderSpin = useMemo(() => {
    if (loading) {
      return (
        <div
          className="absolute left-0 top-0 h-full w-full flex justify-center items-center"
          style={{ zIndex: zIndex }}
        >
          <div
            className={'relative block rounded-full'}
            style={{
              width: 'var(--spin-size)',
              height: 'var(--spin-size)',
              backgroundColor: 'var(--spin-bg-color)',
            }}
          >
            <div
              className={'block box-border w-0 h-0 border-solid'}
              style={{
                margin: 'calc(var(--spin-size) * 0.1406)',
                borderWidth: 'calc(var(--spin-size) / 2.8125)',
                borderRadius: '50%',
                borderColor: 'var(--spin-color) transparent var(--spin-color) transparent',
                animation: 'spin-loading 1.2s infinite',
              }}
            />
          </div>
        </div>
      );
    }
  }, [loading]);

  return (
    <React.Fragment>
      <div
        className={classNames(
          'relative overflow-hidden',
          loading ? `spinWarp ${size}` : '',
          block ? 'block' : 'inline-block',
          className,
        )}
        style={{
          '--spin-size': '30px',
          '--spin-color': '#1288f6',
          '--spin-bg-color': 'rgba(0, 0, 0, 0.01)',
          minHeight: 'var(--spin-size)',
          ...customStyle,
        }}
      >
        {children}
        {renderSpin}
        <div className={'absolute left-0 top-0 w-full h-full'} style={{ zIndex: 49 }} />
      </div>
    </React.Fragment>
  );
};
export default Spin;
