import React, { useMemo } from 'react';
import classNames from 'classnames';

export interface SkeletonAttr {
  loading?: boolean;
  type?: 'page' | 'avatar' | 'article';
  line?: number;
  showPd?: boolean;
  className?: string;

  [key: string]: any;
}

const Skeleton: React.FC<SkeletonAttr> = ({
  loading,
  type,
  line = 15,
  showPd = true,
  className,
  children,
}) => {
  const avatarRender = useMemo(
    () => (
      <div className="flex items-center justify-between">
        <div className="rounded-full bg-gray-200 w-10 h-10 flex-shrink-0" />
        <div className="flex-grow">
          <div className={'pl-2'}>
            <div className="mt-2 h-4 bg-gray-200 " />
            <div className="mt-2 h-4 bg-gray-200 " />
          </div>
        </div>
      </div>
    ),
    [],
  );

  const renders = useMemo(() => {
    if (type === 'page') {
      const newsLine = new Array(line).fill(0);
      return (
        <div className="page-wrap">
          {newsLine.map((d, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={`sk_page${i}`} className="bg-gray-200 h-4 mt-4" />
          ))}
        </div>
      );
    } else if (type === 'avatar') {
      return avatarRender;
    } else if (type === 'article') {
      return (
        <div>
          {avatarRender}
          <div className="w-full mt-2 h-4 bg-gray-200 " />
          <div className="w-full mt-2 h-4 bg-gray-200 " />
          <div className="w-full mt-2 h-4 bg-gray-200 " />
          <div className="w-2/3 mt-2 h-4 bg-gray-200 " />
        </div>
      );
    }
    return (
      <div className="">
        <div className="h-4 bg-gray-200  w-full" />
        <div className="h-4 mt-1 bg-gray-200  w-full" />
      </div>
    );
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <div className={`sk-wrap animate-pulse ${classNames(className, showPd ? 'p-4' : '')}`}>{renders}</div>
      ) : (
        children
      )}
    </React.Fragment>
  );
};
export default Skeleton;
