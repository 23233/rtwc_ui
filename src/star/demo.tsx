import React, { useRef, useState } from 'react';
import { StarRate } from '@rtwc/ui';

const index = (): any => {
  return (
    <div>
      <div>
        可操作的
        <StarRate active={4} onChange={(now) => console.log('当前选择', now)} />
      </div>
      <div>
        禁止操作的
        <StarRate disable />
      </div>
      <div>
        大尺寸的
        <StarRate sizeCls={'w-10 h-10'} />
      </div>
    </div>
  );
};

export default index;
