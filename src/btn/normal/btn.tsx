import React, { CSSProperties, useMemo, useRef } from 'react';
import {Spin, useRipple} from '@rtwc/ui';
import classNames from 'classnames';
import { initCls, initSchemeCls } from './initCls';

export interface BtnAttr {
  scheme?: 'filled' | 'border' | 'flat' | 'gradient' | 'relief' | 'round' | 'custom';
  size?: 'large' | 'big' | 'small' | 'little' | 'less'; // 从大向小
  icon?: React.ReactNode;
  onlyIcon?: boolean;
  type?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'white' | 'dark';
  disable?: boolean;
  block?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  info: string;
  className?: string;
  style?: CSSProperties;
  htmlType?: 'submit' | 'reset' | 'button';
  btnType?: 'button' | 'a';
  loading?: boolean;
  ripple?: boolean;
  href?: string;
  blank?: boolean;
}

const Btn: React.FC<BtnAttr> = ({
  scheme = 'filled',
  size = 'small',
  htmlType = 'button',
  icon,
  onlyIcon = false,
  type = 'info',
  className,
  block = false,
  ripple = false,
  info,
  disable = false,
  loading = false,
  btnType = 'button',
  href,
  blank = false,
  onClick,
  ...props
}) => {
  const btnRef = useRef<any>();
  useRipple(btnRef, {
    disabled: !ripple
  });
  const clickEvent = (e: any) => {
    onClick && onClick(e);
  };

  const renders = useMemo(() => {
    const cls = classNames(
      'transition-all cmp_btn',
      [!!icon && initCls.icon, block && initCls.block, disable && initCls.disable],
      scheme !== 'custom' && [
        initCls[size],
        initSchemeCls[scheme].self,
        initSchemeCls[scheme][type],
      ],
      className,
    );
    let BtnView;
    switch (btnType) {
      default:
        BtnView = (
          <button
            type={htmlType}
            aria-label={info}
            className={cls}
            disabled={disable}
            style={props.style}
            onClick={clickEvent}
            ref={btnRef}
            title={info}
          >
            {icon}
            {!onlyIcon && info}
          </button>
        );
        break;

      case 'a':
        BtnView = (
          <a
            href={href}
            target={blank ? '_blank' : '_self'}
            aria-label={info}
            className={cls}
            style={props.style}
            ref={btnRef}
            title={info}
          >
            {icon}
            {!onlyIcon && info}
          </a>
        );
        break;
    }

    if (loading) {
      return (
        <Spin loading={loading} minHeight={20}>
          {BtnView}
        </Spin>
      );
    }

    return BtnView;
  }, [props]);

  return <React.Fragment>{renders}</React.Fragment>;
};
export default Btn;
