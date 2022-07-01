import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { useRipple } from '@rtwc/ui';

export interface IconAttr {
  type: string;
  title?: string;
  prefix?: string;
  style?: CSSProperties;
  size?: number;
  className?: string;
  ripple?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

const loadIconUrl = (url: string): void => {
  const script = document.getElementById('icon-load') as HTMLScriptElement;
  if (script) {
    if (script.src === url) {
      return;
    }
    script.src = url;
  }
  load(url, 'icon-load');
};

const load = (url: string, id: string): void => {
  const scriptElem = document.createElement('script');
  scriptElem.id = id;
  scriptElem.src = url;
  document.body.appendChild(scriptElem);
};

export const ChangeIconUrl = (newUrl: string): void => {
  loadIconUrl(newUrl);
};

export const AddIconUrl = (newUrl: string): void => {
  load(newUrl, 'icon-add-' + new Date().getTime().toString());
};

const Icon: React.FC<IconAttr> = ({
  type,
  title,
  prefix = 'icon',
  style,
  size = 14,
  className,
  onClick,
  ripple = false,
}) => {
  const [init, setInit] = useState<boolean>();
  const refs = useRef<any>();
  useRipple(ripple ? refs : undefined);

  useEffect(() => {
    setInit(true);
    loadIconUrl('https://at.alicdn.com/t/font_2506983_bxxb13sody8.js');
  }, []);

  return (
    <span style={{ fontSize: size }} ref={refs} onClick={onClick} title={title}>
      {init && (
        <svg
          className={classnames('custom-icon', className)}
          aria-hidden="true"
          style={{
            width: '1em',
            height: '1em',
            overflow: 'hidden',
            verticalAlign: '-0.15em',
            fill: 'currentcolor',
            ...style,
          }}
        >
          <use xlinkHref={`#${prefix}-${type}`} />
        </svg>
      )}
    </span>
  );
};
export default Icon;
