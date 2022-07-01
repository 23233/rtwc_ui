import React, {
  CSSProperties,
  ForwardedRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';

export interface inputAreaRef {
  getValue: () => string;
  setValue: Function;
  insertEmoji: (code: string) => void;
}

export interface inputAreaParams {
  /** 默认初始值 */
  initValue?: string;
  /** 最多可输入字符 */
  maxValueSize?: number;
  /** 顶层类名 */
  className?: string;
  /** 字体相关的类名 */
  fontCls?: string;
  /** 自动高度限制style */
  heightStyle?: CSSProperties;
  placeholder?: string;
  autoFocus?: boolean;
  /** 转发的ref 不要设置 */
  cRef?: ForwardedRef<any>;
  /** 是否显示输入字数 */
  showCount?: boolean;
  /** 数字显示类名 */
  countCls?: string;
}

const InputAreaView = React.forwardRef((props: inputAreaParams, ref) => {
  return <InputArea {...props} cRef={ref} />;
});

// 通用textarea输入框
const InputArea: React.FC<inputAreaParams> = ({
  initValue = '',
  maxValueSize = 999999,
  showCount = false,
  className = 'p-1 border rounded',
  fontCls = 'text-lg leading-6',
  heightStyle = { minHeight: 100, maxHeight: '50vh' },
  placeholder = '说点什么吧',
  autoFocus = false,
  cRef,
  countCls = 'text-black text-opacity-30',
  ...props
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (initValue) {
      onSetValue(initValue);
    }
  }, []);

  const onSetValue = async (newValue: string) => {
    setValue(newValue);
    // 指针到最后去
    await inputRef.current?.focus();
    await inputRef.current?.setSelectionRange(-1, -1);
    await inputRef.current?.blur();
  };

  // 暴露给父组件的事件
  useImperativeHandle(cRef, (): inputAreaRef => {
    return {
      getValue: () => {
        return value;
      },
      setValue: onSetValue,
      insertEmoji: async (code: string) => {
        const moji = String.fromCodePoint(Number(`0x${code}`));

        // 判断是否超出 一个emoji表情是两个长度
        if (value.length + moji.length >= maxValueSize) {
          return;
        }
        const v = value.split('');
        const start = inputRef.current!.selectionStart;
        const end = inputRef.current!.selectionEnd;
        // 直接插入
        if (start === end) {
          v.splice(end, 0, moji);
        } else {
          // 删除替换
          v.splice(start, end - start, moji);
        }
        setValue(v.join(''));

        await inputRef.current?.focus();
        await inputRef.current?.setSelectionRange(
          start + moji.length,
          start + moji.length,
          inputRef.current!.selectionDirection,
        );
        await inputRef.current?.blur();
      },
    };
  });

  // 输入框内容变化
  const inputOnChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <div className={`${classNames(className)}`}>
      <div className={`relative overflow-hidden ${classNames(fontCls)}`}>
        <div className="invisible w-full break-words" style={heightStyle}>
          {value}
        </div>
        <textarea
          maxLength={maxValueSize}
          value={value}
          onChange={inputOnChange}
          autoFocus={autoFocus}
          placeholder={placeholder}
          className={
            'absolute left-0 top-0 w-full h-full z-10  resize-none box-content focus:outline-none '
          }
          ref={inputRef}
          style={{ fontSize: 'inherit', lineHeight: 'inherit' }}
        />
        {showCount && (
          <div
            className={classNames(
              `absolute z-20 bottom-0 right-1 text-right text-xs  pointer-events-none`,
              countCls,
            )}
          >
            {value.length} / {maxValueSize}
          </div>
        )}
      </div>
    </div>
  );
};
export default InputAreaView;
