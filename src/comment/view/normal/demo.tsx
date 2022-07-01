import React, { useRef, useState } from 'react';
import { SimpleTitle } from '@rtwc/ui';
import { CommentPreCombView, CommentView, InlineReplyInput, UserCommentInput } from '@rtwc/ui';

const index = (): any => {
  const user = {
    avatar:
      'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
    nickName: '用户昵称',
  };

  return (
    <div>
      <SimpleTitle text={'包含链接'} />
      <CommentView
        userAttr={user}
        links={[
          {
            title: '跳转到百度',
            href: 'https://www.baidu.com',
          },
          {
            title: '跳转到百度大风歌人更',
            href: 'https://www.baidu.com',
          },
          {
            title: '法国很多人挺好柔荑花人挺好的风格和豆腐干和',
            href: 'https://www.baidu.com',
          },
          {
            title: 'dfg',
            href: 'https://www.baidu.com',
          },
        ]}
      />
      <SimpleTitle text={'加载中'} />
      <CommentView userAttr={user} value={'zpiqodeSDK佛普外科'} loading />
      <SimpleTitle text={'纯文字'} />
      <CommentView
        userAttr={user}
        value={
          '文字内容也可以稍微的长一点看看效果怎么样文字内容也可以稍微的长一点看看效果怎么样文字内容也可以稍微的长一点看看效果怎么样文字内容也可以稍微的长一点看看效果怎么样文字内容也可以稍微的长一点看看效果怎么样'
        }
      />

      <SimpleTitle text={'纯图片'} />
      <CommentView
        userAttr={user}
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
      />

      <SimpleTitle text={'文字图片混合'} />

      <CommentView
        userAttr={user}
        value={
          '文字内容也可以稍微的长一点看看效果怎么样文字内容也可以稍微的长一点看看效果怎么样文字内容也可以稍微的长一点看看效果怎么样文字内容也可以稍微的长一点看看效果怎么样文字内容也可以稍微的长一点看看效果怎么样'
        }
        like={9999}
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
        update_time={'2022-6-27 21:38:35'}
      />

      <SimpleTitle text={'自定义传入各类node'} />
      <CommentView
        userAttr={{
          ...user,
          descExtra: (
            <p className={'text-black text-opacity-60 hover:text-opacity-90 text-sm '}>
              北京大学教授 赵日天
            </p>
          ),
          rightExtra: <span className={'text-xs'}>右侧按钮</span>,
        }}
        value={'文字'}
        like={10}
        contentExtra={
          <div
            className={
              'text-black text-opacity-60 hover:text-opacity-80 text-sm cursor-pointer select-none'
            }
          >
            -- 拥有10条回复 点击展开--
          </div>
        }
      />

      <SimpleTitle text={'用户头像点击事件跳转 用户昵称a标签跳转'} />
      <CommentView
        userAttr={{
          ...user,
          href: 'https://www.baidu.com',
        }}
        value={'传入用户的href字段即可'}
      />

      <SimpleTitle text={'显示各类操作'} />

      <CommentView
        userAttr={{ ...user, onUserClick: (f) => alert('用户' + f + '点击') }}
        value={'文字内容也可以稍微的长一点看看效果'}
        like={10}
        onLike={() => alert('喜欢点击')}
        showDelete
        onDelete={() => alert('删除点击')}
        onReply={() => alert('回复点击')}
        onReport={() => alert('举报点击')}
        update_time={'2022-6-27 21:38:35'}
      />

      <SimpleTitle text={'内嵌自己'} />
      <CommentView userAttr={user} value={'传入用户的href字段即可'}>
        <CommentView
          userAttr={{
            avatar:
              'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
            nickName: '用户昵称',
          }}
          value={'传入用户的href字段即可'}
        />
      </CommentView>
      <SimpleTitle text={'内嵌复杂评论框'} />
      <CommentView userAttr={user} value={'传入用户的href字段即可'}>
        <UserCommentInput
          avatar={
            'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png'
          }
          onSend={(values) => console.log('回复成功', values)}
        />
      </CommentView>
      <SimpleTitle text={'内嵌简单评论框'} />

      <CommentView userAttr={user} value={'传入用户的href字段即可'}>
        <InlineReplyInput onSend={(values) => console.log('回复成功', values)} />
      </CommentView>

      <SimpleTitle text={'预处理嵌入'} />

      <CommentPreCombView
        userAttr={{
          ...user,
          desc: '科学院兽医',
          verify: '北京科学院夫人ff',
        }}
        replyCount={10}
        value={'sdjifjiwefjifewjiefw'}
      />

      <SimpleTitle text={'预处理嵌入自己'} />

      <CommentPreCombView
        userAttr={{
          ...user,
          desc: '科学院兽医',
          verify: '北京科学院夫人ff',
        }}
        replyCount={10}
        value={'sdjifjiwefjifewjiefw'}
      >
        <CommentPreCombView
          userAttr={{
            ...user,
            desc: '科学院兽医',
            verify: '北京科学院夫人ff',
          }}
          replyCount={10}
          value={'sdjifjiwefjifewjiefw'}
        />
      </CommentPreCombView>
    </div>
  );
};

export default index;
