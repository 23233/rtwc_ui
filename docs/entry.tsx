import React, {useEffect} from "react";
import {loadInitStyle} from '@rtwc/ui';

export default () => {
  useEffect(()=>{
    loadInitStyle()
  },[])
  return (
    <h1>hello world</h1>
  )
};
