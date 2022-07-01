import React from 'react';
import classNames from 'classnames';
import classnames from "classnames";

export interface MaskLoadingAttr {
  msg: string;
  visible: boolean;
  percent?: number
  fixed?: boolean;
  bgCls?: string;
  textCls?: string;
  warpCls?: string;
  zIndex?: number;
  lineHeight?: number,
  lineColorCls?: string
}

const MaskLoading: React.FC<MaskLoadingAttr> = ({
                                                  msg,
                                                  visible,
                                                  fixed,
                                                  bgCls = 'bg-black bg-opacity-70',
                                                  textCls = 'font-bold text-white',
                                                  zIndex = 50,
                                                  warpCls = '',
                                                  percent = 0,
                                                  lineHeight = 5,
                                                  lineColorCls = "bg-green-500",
                                                  ...props
                                                }) => {
  if (visible) {
    return (
      <div
        className={`transition-all left-0 top-0 h-full w-full overflow-hidden flex justify-center items-center ${classNames(
          fixed ? 'fixed' : 'absolute',
          warpCls,
        )}`}
        style={{zIndex: zIndex} as any}
      >
        <div
          className={classNames(
            'absolute left-0 top-0 z-0 w-full h-full pointer-events-none',
            bgCls,
          )}
        />
        <div className={classNames('relative w-full px-2 mb-4')}>
          <h5 className={classNames('text-xl mb-1 text-center truncate', textCls)}>{msg}</h5>

          <div className="w-full bg-gray-200 rounded-lg overflow-hidden">
            <div className={`transition-all ${classnames(lineColorCls)}`}
                 style={{
                   width: Math.min(percent, 100) + "%",
                   height: lineHeight
                 }}/>
          </div>

        </div>
      </div>
    );
  }
  return null;
};
export default MaskLoading;
