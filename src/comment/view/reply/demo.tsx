import React, { useRef, useState } from 'react';
import { SimpleTitle } from '@rtwc/ui';
import { CommentReplyView } from '@rtwc/ui';

const index = (): any => {
  const user = {
    avatar:
      'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
    nickName: '用户昵称',
  };
  const toUser = {
    avatar: 'https://resok.cn/img/photo-1522202176988-66273c2fd55f.jpeg',
    nickName: 'toUser记得是覅我',
  };

  return (
    <div>
      <SimpleTitle text={'全功能包含示例'} />
      <CommentReplyView
        fromUser={user}
        toUser={toUser}
        value={'我技术都放假我饿我技术都放假我饿我技术都放假我饿'}
        imgs={[
          {
            origin: 'https://resok.cn/img/photo-1522202176988-66273c2fd55f.jpeg',
          },
          {
            origin: 'https://resok.cn/img/photo-1522202176988-66273c2fd55f.jpeg',
          },
          {
            origin: 'https://resok.cn/img/photo-1522202176988-66273c2fd55f.jpeg',
          },
          {
            origin: 'https://resok.cn/img/photo-1522202176988-66273c2fd55f.jpeg',
          },
        ]}
        like={10}
        onLike={() => alert('喜欢点击')}
        showDelete
        onDelete={() => alert('删除点击')}
        onReply={() => alert('回复点击')}
        onReport={() => alert('举报点击')}
        update_time={'2022-6-27 21:38:35'}
      />
      <SimpleTitle text={'无回复'} />
      <CommentReplyView
        fromUser={user}
        value={'我技术都放假我饿我技术都放假我饿我技术都放假我饿'}
        imgs={[
          {
            origin: 'https://resok.cn/img/photo-1522202176988-66273c2fd55f.jpeg',
          },
          {
            origin: 'https://resok.cn/img/photo-1522202176988-66273c2fd55f.jpeg',
          },
          {
            origin: 'https://resok.cn/img/photo-1522202176988-66273c2fd55f.jpeg',
          },
          {
            origin: 'https://resok.cn/img/photo-1522202176988-66273c2fd55f.jpeg',
          },
        ]}
        like={10}
      />
      <SimpleTitle text={'无图片'} />
      <CommentReplyView
        fromUser={user}
        value={'我技术都放假我饿我技术都放假我饿我技术都放假我饿'}
        like={10}
        showDelete
        onReport={() => alert('举报点击')}
      />
    </div>
  );
};

export default index;
