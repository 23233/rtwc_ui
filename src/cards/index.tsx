import React, {useCallback, useMemo} from 'react';
import classNames from "classnames";
import {fileUploadResp} from "@rtwc/ui";

export interface autoCardItem {
  _id: string
  href?: string
  title?: string
  desc?: string
  preview?: fileUploadResp
}

export interface autoCardAlignGridViewParams {
  /** 数组列表 如果item有href字段则渲染为a标签 */
  data: Array<autoCardItem>
  /** warp类名 */
  className?: string
  itemNormalCls?: string
  itemBigCls?: string
  titleCls?: string
  descCls?: string
  onClick?: (item: autoCardItem) => void
}


const AutoCardAlignGridView: React.FC<autoCardAlignGridViewParams> = ({
                                                                        data = [],
                                                                        className = "px-2 my-1",
                                                                        itemNormalCls = "h-24 md:h-32 lg:h-36 xl:h-40",
                                                                        itemBigCls = "h-28 md:h-36 lg:h-40 xl:h-44",
                                                                        titleCls = "text-sm md:text-lg xl:text-2xl truncate font-bold",
                                                                        descCls = "text-xs md:text-sm text-opacity-90 truncate",
                                                                        onClick,
                                                                      }) => {

  const renderItem = useCallback((d: autoCardItem, big?: boolean) => {

    const bgStyle = (d?.preview?.origin || d?.preview?.thumbnail) ? {
      background: `url("${d?.preview?.thumbnail || d?.preview?.origin}")no-repeat`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    } : {}

    const content = (
      <div
        className={classNames("rounded-lg flex justify-center items-center px-1", big ? itemBigCls : itemNormalCls)}
        style={bgStyle}
      >
        <div
          className={
            'w-full  text-black text-center bg-white bg-opacity-20 p-1 md:p-2 rounded  hover:scale-105 hover:bg-opacity-80 transition-all '
          }
        >
          <div>
            <p className={classNames(titleCls)}>{d?.title}</p>
            {
              !!d?.desc &&
              <p className={classNames(descCls)}>{d?.desc}</p>
            }
          </div>

        </div>
      </div>
    )

    if (d?.href) {
      return (
        <a key={d?._id} href={d?.href} title={d?.title} aria-label={d?.title} className={"block"}>
          {content}
        </a>
      )
    }
    return (
      <div key={d?._id} onClick={() => onClick && onClick(d)} className={"cursor-pointer"}>
        {content}
      </div>
    )


  }, [])

  const renders = useMemo(() => {
    const twoMod = data.length % 2
    const threeMod = data.length % 3
    const fiveMod = data.length % 5
    const sevenMod = data.length % 7
    const gapCls = "gap-1"
    let gridCls = "grid-cols-2 xl:grid-cols-4"
    // 在2的情况下没有余数
    if (!twoMod) {
      if (data.length < 4) {
        gridCls = "grid-cols-2"
      }
    }
    // 在三的情况下没有余数
    if (!threeMod) {
      gridCls = "grid-cols-3"
    }

    // 在5的情况下没有余数
    if (!fiveMod) {
      gridCls = "grid-cols-3"
      return (
        <div>
          <div className={`grid grid-cols-2  ${classNames(className, gapCls)}`}>
            {renderItem(data[0], true)}
            {renderItem(data[1], true)}
          </div>
          <div className={`grid ${classNames(gridCls, gapCls, className)} `}>
            {data.slice(2).map((d: any) => {
              return renderItem(d)
            })}
          </div>
        </div>

      )
    }

    if (!sevenMod) {
      gridCls = "grid-cols-3"
      return (
        <div>
          <div className={`grid grid-cols-2  ${classNames(className, gapCls)}`}>
            {renderItem(data[0], true)}
            {renderItem(data[1], true)}
          </div>
          <div className={`grid ${classNames(gridCls, gapCls, className)} `}>
            {data.slice(2, data.length - 2).map((d: any) => {
              return renderItem(d)
            })}
          </div>
          <div className={`grid grid-cols-2  ${classNames(className, gapCls)}`}>
            {renderItem(data[data.length - 2], true)}
            {renderItem(data[data.length - 1], true)}
          </div>


        </div>

      )
    }


    return (
      <div className={`grid ${classNames(gridCls, gapCls, className)}`}>
        {data.map((d: any) => {
          return renderItem(d)
        })}
      </div>
    )

  }, [data])


  return <React.Fragment>
    {renders}
  </React.Fragment>;
};
export default AutoCardAlignGridView;
