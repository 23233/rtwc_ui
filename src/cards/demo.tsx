import React, {useRef, useState} from 'react';
import {AutoCardAlignGridView, autoCardItem} from "@rtwc/ui";

const index = (): any => {

  const baseItem = (title: string, desc: string) => {
    return {
      _id: Math.floor(Math.random() * 1000 + 1).toString(),
      title,
      href: Math.random() > 0.5 ? "https://www.baidu.com" : null,
      preview: {
        thumbnail: "https://static.rycsg.com/cat_tr/t2915193789/2021-12-02/2565116b5d2d80366935d95c51690261_t.jpg"
      },
      desc,
    } as autoCardItem
  }

  const data = [
    baseItem("第一个123123", "有描述有描述有描述有描述有描述有描述有描述"),
    baseItem("第二个123123", "无描述无描述无描述"),
    baseItem("第三个123123", "有描述"),
    baseItem("第4个123123", "就这吧"),
    baseItem("第5个123123", ""),
    baseItem("第6个123123", ""),
    baseItem("第7个123123", ""),
    baseItem("第8个123123", ""),
    baseItem("第9个123123", ""),
  ] as Array<autoCardItem>

  return (
    <div>
      <p>两个</p>
      <AutoCardAlignGridView data={data.slice(0, 2)}/>
      <p>三个</p>
      <AutoCardAlignGridView data={data.slice(0, 3)}/>

      <p>5个</p>
      <AutoCardAlignGridView data={data.slice(0, 5)}/>

      <p>7条</p>
      <AutoCardAlignGridView data={data.slice(0, 7)}/>
      <p>8条</p>
      <AutoCardAlignGridView data={data.slice(0, 8)}/>
      <p>9条</p>
      <AutoCardAlignGridView data={data.slice(0, 9)}/>
    </div>
  );
};

export default index;
