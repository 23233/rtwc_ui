import {RefObject, useEffect} from 'react';

const ANIMATION_LENGTH = 700;
const RIPPLE_SIZE = 100;
const RIPPLE_COLOR = 'rgba(0, 0, 0, 0.3)';


export interface RippleOptions {
  disabled?: boolean;
  rippleColor?: string;
  animationLength?: number;
  rippleSize?: number;
  excludedRefs?: RefObject<HTMLElement>[];
}

interface RippleEvent {
  clientX?: number;
  clientY?: number;
  target: EventTarget | null;
}

const defaultEvent: Required<RippleEvent> = {
  clientX: 0,
  clientY: 0,
  target: null,
};

const createRipple = (element: HTMLElement, options?: RippleOptions) => (e?: RippleEvent) => {
  const isExcluded = (options?.excludedRefs || []).some(
    (ref) =>
      (!!ref.current && ref.current.contains(e?.target as Node)) ||
      ref.current?.isSameNode(e?.target as Node),
  );

  if (isExcluded) {
    return;
  }

  const clientX = e?.clientX || defaultEvent.clientX;
  const clientY = e?.clientY || defaultEvent.clientY;

  const {height, width, top, left} = element.getBoundingClientRect();
  const x = clientX - left;
  const y = clientY - top;

  const rippleSize = Math.min(height, width, options?.rippleSize || RIPPLE_SIZE);

  const positionTop = clientX ? y - rippleSize / 2 : rippleSize / 2 - height / 2;
  const positionLeft = clientY ? x - rippleSize / 2 : width / 2 - rippleSize / 2;

  const span = document.createElement('span');

  span.style.cssText = `
    top: ${positionTop}px;
    left: ${positionLeft}px;
    position: absolute;
    border-radius: 50%;
    background-color: ${options?.rippleColor || RIPPLE_COLOR};
    pointer-events: none;
    width: ${rippleSize}px;
    height: ${rippleSize}px;
    animation: use-ripple-animation ${options?.animationLength || ANIMATION_LENGTH}ms ease-in;
  `;

  element.appendChild(span);

  let isRemove = false
  span.addEventListener('animationend', () => {
    !isRemove && element.removeChild(span);
    isRemove = true
  });

  // 再定时 即时没有动画也移除
  setTimeout(() => {
    !isRemove && element.removeChild(span)
    isRemove = true
  }, 1500)


};

const useRipple = (ref?: RefObject<HTMLElement>, options?: RippleOptions): any => {
  useEffect(() => {

    if (!ref?.current) {
      return
    }
    if (options?.disabled) {
      return
    }
    const element = ref.current;
    const elementPosition = getComputedStyle(element).getPropertyValue('position');

    element.style.position =
      elementPosition === 'static' || !elementPosition ? 'relative' : elementPosition;
    element.style.overflow = 'hidden';

    const ripple = createRipple(element, options);

    const keyboardRipple = (e: KeyboardEvent): void => {
      if (e.key === 'Enter' || e.key === ' ') {
        ripple();
      }
    };

    element.addEventListener('mousedown', ripple);
    element.addEventListener('keydown', keyboardRipple);

    // eslint-disable-next-line consistent-return
    return () => {
      element.removeEventListener('mousedown', ripple);
      element.removeEventListener('keydown', keyboardRipple);
    };
  }, [options]);
};

export default useRipple;
