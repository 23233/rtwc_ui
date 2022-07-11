import React, {CSSProperties} from 'react';
import classNames from "classnames";

interface p {
  viewClassName?: string
  viewStyle?: CSSProperties
  onClick?: () => void
  placeholder?: string
  allowEdit?: boolean
}

const ShowAndEditForNoShow: React.FC<p> = ({
                                             allowEdit = false,
                                             viewClassName,
                                             viewStyle,
                                             onClick,
                                             placeholder,
                                           }) => {
  return <React.Fragment>
    <div
      className={`relative rounded border border-gray-200 p-1 transition-all  ${classNames(viewClassName, allowEdit ? "cursor-pointer hover:border-gray-400 hover:shadow" : "")}`}
      style={viewStyle}
      onClick={() => onClick && onClick()}
    >
      {placeholder || <p className={"text-black text-opacity-50 text-sm"}>暂无内容</p>}

      {allowEdit && (
        <React.Fragment>
          <div
            className={
              'absolute top-0 right-0 z-10 text-xs transition-all bg-white px-2 text-gray-400 pointer-events-none'
            }
            style={{
              transform: "translate(-10px,-10px)"
            }}
          >
            点击修改
          </div>
        </React.Fragment>
      )}
    </div>
  </React.Fragment>;
};
export default ShowAndEditForNoShow;
