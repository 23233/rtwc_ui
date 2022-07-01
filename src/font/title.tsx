import React from 'react';

export interface SimpleTitleAttr {
  text: string | React.ReactNode;
  desc?: string;
  descOnClick?: () => void;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

// 简单的标题 左侧色块
const SimpleTitle: React.FC<SimpleTitleAttr> = ({
                                                  className = '',
                                                  children,
                                                  descOnClick,
                                                  ...props
                                                }) => {
  return (
    <React.Fragment>
      <div
        className={`px-2 border-solid border-0 border-l-4 border-blue-400 flex justify-between items-center rounded-sm ${className}`}
      >
        <div
          onClick={(e) => props?.onClick && props.onClick(e)}
          className="text-lg flex-shrink-0"
        >
          {props.text}
        </div>
        {!!props?.desc && (
          <div
            className="flex-grow text-right pl-2"
            onClick={() => descOnClick && descOnClick()}
          >
            <p className={"text-xs text-gray-400 "}>
              {props.desc}
            </p>
          </div>
        )}
        {children}
      </div>
    </React.Fragment>
  );
};
export default SimpleTitle;
