import React, {useRef, useState} from 'react';
import {inputAreaRef, InputAreaView} from '@rtwc/ui';
import {Btn} from '@rtwc/ui';

const index = (): any => {
  const inputRef = useRef<inputAreaRef>(null);
  const [value, setValue] = useState<string>()

  return (
    <div>
      <div className={'mb-2 flex gap-1 '}>
        <Btn
          info={'主动设置内容'}
          size={"less"}
          onClick={() => inputRef.current?.setValue('设置一下主动显示的文字啊')}
        />
        <Btn
          info={'设置受控内容'}
          size={"less"}
          onClick={() => setValue('设置受控的value同步模式')}
        />
        <Btn info={'设置一个emoji'} onClick={() => inputRef.current?.insertEmoji('1F602')} size={"less"}/>
        <Btn info={'主动获取输入框内容'} onClick={() => alert(inputRef.current?.getValue())} size={"less"}/>
      </div>
      <InputAreaView showCount ref={inputRef}
                     onChange={(newValue => console.log("新的value", newValue))}
                     onBlur={(newValue => console.log("焦点移开", newValue))}
                     value={value}
      />
    </div>
  );
};

export default index;
