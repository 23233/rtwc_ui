import React, {useCallback, useMemo} from 'react';
import {fileUploadResp} from '@rtwc/ui';
import {Lmg} from '@rtwc/ui';
import classNames from 'classnames';

export interface ImgListAutoRenderParams {
  imgs: fileUploadResp[];
  alt?: string;
  /** 图片默认高度类名  */
  imgHeightCls?: string;
  /** 图片上下分割高度类名 推荐两种高度设置一致  */
  imgSplitHeightCls?: string;
  onClick?: (d: fileUploadResp) => void;
}

const ImgListAutoRender: React.FC<ImgListAutoRenderParams> = ({
                                                                imgs,
                                                                alt,
                                                                imgHeightCls = 'h-32 md:h-36 lg:h-42',
                                                                imgSplitHeightCls = 'h-32 md:h-36 lg:h-42',
                                                                onClick,
                                                              }) => {
  const itemClick = (d: fileUploadResp) => {
    if (onClick) {
      onClick(d);
      return;
    }
  };

  const Item = useCallback((d: fileUploadResp, i: number, cls: string) => {
    return (
      <div key={`${d.origin}_${i}`} className={cls}>
        <Lmg
          src={d?.thumbnail || d?.origin}
          useBk
          alt={alt || '图片'}
          className={'cursor-pointer'}
          onClick={() => itemClick(d)}
        />
      </div>
    );
  }, []);

  const simpleRender = useCallback(
    (mid: fileUploadResp[], top?: fileUploadResp, bottom?: fileUploadResp, splitCls?: string) => {
      const defaultSplitCls = 'grid-cols-3';
      return (
        <div className={`rounded-lg overflow-hidden`}>
          {!!top && Item(top, -1, classNames(imgSplitHeightCls, 'mb-1'))}
          <div className={`grid gap-1 ${classNames(splitCls || defaultSplitCls)}`}>
            {mid.map((d, i) => {
              return Item(d, i, imgHeightCls);
            })}
          </div>
          {!!bottom && Item(bottom, 999, classNames(imgSplitHeightCls, 'mt-1'))}
        </div>
      );
    },
    [],
  );

  const renderContent = useMemo(() => {
    if (imgs?.length) {
      const l = imgs.length;
      if (l <= 9) {
        switch (l) {
          case 1:
            return simpleRender(imgs, undefined, undefined, 'grid-cols-1');
          case 2:
            return simpleRender(imgs, undefined, undefined, 'grid-cols-2');
          case 4:
          case 7:
            return simpleRender(imgs.slice(1, imgs.length), imgs[0]);
          case 5:
          case 8:
            return simpleRender(imgs.slice(1, imgs.length - 1), imgs[0], imgs[imgs.length - 1]);
        }
      }
      const ys = l % 3;
      if (ys) {
        return simpleRender(imgs.slice(1, imgs.length), imgs[0]);
      }
      return simpleRender(imgs, undefined, undefined, 'grid-cols-3');
    }
  }, []);

  return <React.Fragment>{renderContent}</React.Fragment>;
};
export default ImgListAutoRender;
