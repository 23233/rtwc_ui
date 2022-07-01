import React, { useRef, useState } from 'react';
import { UserCommentInput } from '@rtwc/ui';
import { fileUploadResp, commentInputResult } from '@rtwc/ui';

const index = (): any => {
  const onSend = (values: commentInputResult) => {
    console.log('发送', values);
  };

  const onFileUpload = async (files: File[]): Promise<fileUploadResp[]> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() >= 0.5) {
          resolve([
            {
              origin:
                'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
            },
          ]);
          return;
        }
        reject('网络错误上传失败或者大小超出限制');
      }, 2000);
    });
  };

  return (
    <div>
      <UserCommentInput
        avatar={'https://resok.cn/img/photo-1522202176988-66273c2fd55f.jpeg'}
        onSend={onSend}
        value={'dsfijwijefijweffghhrhrt'}
        inputAttr={{
          showCount: true,
        }}
        imgs={[
          {
            origin: 'https://resok.cn/img/photo-1522202176988-66273c2fd55f.jpeg',
          },
        ]}
        onFileUpload={onFileUpload}
        showStar
        starAttr={{
          active: 3,
        }}
        showLink
        links={[
          {
            title: '日天',
            href: 'https://www.baidu.com',
          },
        ]}
      >
        <UserCommentInput
          avatar={'https://resok.cn/img/photo-1522202176988-66273c2fd55f.jpeg'}
          onSend={onSend}
          value={'dsfijwijefijweffghhrhrt'}
          inputAttr={{
            showCount: true,
          }}
          imgs={[
            {
              origin: 'https://resok.cn/img/photo-1522202176988-66273c2fd55f.jpeg',
            },
          ]}
          onFileUpload={onFileUpload}
          showStar
          starAttr={{
            active: 3,
          }}
          showLink
          links={[
            {
              title: '日天',
              href: 'https://www.baidu.com',
            },
          ]}
        />
      </UserCommentInput>
    </div>
  );
};

export default index;
