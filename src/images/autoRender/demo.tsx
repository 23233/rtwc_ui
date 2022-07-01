import React, { useRef, useState } from 'react';
import { ImgListAutoRender } from '@rtwc/ui';

const index = (): any => {
  return (
    <div>
      {Array(10)
        .fill(0)
        .map((d, i) => {
          const k = i + 1;
          return (
            <div key={k}>
              <p>{k}张图片</p>
              <ImgListAutoRender
                imgs={Array(k)
                  .fill(0)
                  .map((d) => {
                    return {
                      origin: 'https://resok.cn/img/photo-1522202176988-66273c2fd55f.jpeg',
                      // thumbnail:"https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png"
                    };
                  })}
              />
            </div>
          );
        })}
    </div>
  );
};

export default index;
