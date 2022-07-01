import React, { useRef } from 'react';
import { RippleView } from '@rtwc/ui';

export interface FabBtnAttr {
  onClick?: (e: React.MouseEvent) => void;
  icon?: React.ReactNode;
  title?: string;
  className?: string;
  zIndex?: number;
}

// 浮动按钮 用于新增
const FloatBtn: React.FC<FabBtnAttr> = ({
  onClick,
  className = 'bg-red-600 text-white',
  icon,
  title = '新增',
  zIndex = 100,
}) => {
  return (
    <React.Fragment>
      <div className="fixed right-2 bottom-10" style={{ zIndex }}>
        <RippleView>
          <button
            className={`w-12 h-12 rounded-full shadow  ${className || ''}`}
            onClick={(e) => onClick && onClick(e)}
            title={title}
          >
            {icon ? (
              icon
            ) : (
              <img
                src={
                  'data:image/svg+xml;base64,77u/PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5NiIgaGVpZ2h0PSI5NiIgdmlld0JveD0iMCAwIDQ4IDQ4Ij4KICA8cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMjEgNkgyNlY0MUgyMXoiIC8+CiAgPHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTTYgMjFINDFWMjZINnoiIC8+Cjwvc3ZnPgo='
                }
                alt="add"
                style={{ width: 24, height: 24 }}
                className={'mx-auto'}
              />
            )}
          </button>
        </RippleView>
      </div>
    </React.Fragment>
  );
};
export default FloatBtn;
