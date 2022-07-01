import {defineConfig} from 'dumi';

// git仓库名称
let storeName = 'rtwc_ui';
export default defineConfig({
  title: 'react tailwind css纯组件库',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  // more config: https://d.umijs.org/config
  // base和publicPath 主要作用于github page访问
  base: '/' + storeName,
  publicPath: '/' + storeName + '/', // 打包文件时，引入地址生成 publicPath/xxx.js
  // 因为目前 babel打包的情况下无法正常运行postcss 所以注入tailwind 方便查看demo
  // 持续追踪 https://github.com/umijs/father/issues/265
  styles: ['https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css']
});
