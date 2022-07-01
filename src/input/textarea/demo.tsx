import React, { useRef, useState } from 'react';
import { inputAreaRef, InputAreaView } from '@rtwc/ui';
import { Btn } from '@rtwc/ui';

const index = (): any => {
  const inputRef = useRef<inputAreaRef>(null);

  return (
    <div>
      <div className={'mb-2 flex gap-1 '}>
        <Btn
          info={'主动设置内容'}
          onClick={() => inputRef.current?.setValue('设置一下主动显示的文字啊')}
        />
        <Btn info={'设置一个emoji'} onClick={() => inputRef.current?.insertEmoji('1F602')} />
        <Btn info={'主动获取输入框内容'} onClick={() => alert(inputRef.current?.getValue())} />
      </div>
      <InputAreaView showCount ref={inputRef} />
    </div>
  );
};

export default index;
