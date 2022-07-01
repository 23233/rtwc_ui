import React, { useRef, useState } from 'react';
import { fileUploadResp, InlineReplyInput, inlineReplyInputResult } from '@rtwc/ui';

const index = (): any => {
  const onSend = (values: inlineReplyInputResult) => {
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
      <p>普通无图片</p>
      <InlineReplyInput onSend={onSend} />
      <p>带头像</p>
      <InlineReplyInput
        onSend={onSend}
        avatar={'https://resok.cn/img/photo-1522202176988-66273c2fd55f.jpeg'}
      />
      <p>带图片</p>
      <InlineReplyInput
        onSend={onSend}
        avatar={'https://resok.cn/img/photo-1522202176988-66273c2fd55f.jpeg'}
        onFileUpload={onFileUpload}
      />
      <p>内嵌</p>
      <InlineReplyInput
        onSend={onSend}
        avatar={'https://resok.cn/img/photo-1522202176988-66273c2fd55f.jpeg'}
        onFileUpload={onFileUpload}
      >
        <InlineReplyInput
          onSend={onSend}
          avatar={'https://resok.cn/img/photo-1522202176988-66273c2fd55f.jpeg'}
        />
      </InlineReplyInput>
      <p>默认值</p>
      <InlineReplyInput
        onSend={onSend}
        avatar={'https://resok.cn/img/photo-1522202176988-66273c2fd55f.jpeg'}
        onFileUpload={onFileUpload}
        value={'聚合物色if解耦围殴机房'}
        imgs={[
          {
            origin: 'https://resok.cn/img/photo-1522202176988-66273c2fd55f.jpeg',
          },
        ]}
      />
      <p>回复他人</p>
      <InlineReplyInput
        onSend={onSend}
        replyUserName={'赵日天的14个字符怎么办'}
        replyContent={'吉登斯of几万IE哦吉登斯of几万IE哦吉登斯of几万IE哦图片拍图片啊啊'}
      />
    </div>
  );
};

export default index;
