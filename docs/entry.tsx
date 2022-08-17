import React, {useEffect} from "react";
import {Btn, loadInitStyle} from '@rtwc/ui';

export default () => {
  useEffect(()=>{
    loadInitStyle()
  },[])
  return (
    <div>
      <h1>导入初始化的style</h1>
      <Btn info={"导入"} ripple onClick={loadInitStyle} />
    </div>
  )
};
