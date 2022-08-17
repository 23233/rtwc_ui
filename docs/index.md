---
hero:
  title: rtwc_ui
  desc: 纯粹的tailwind 私有业务ui库 仅存放tailwind ui展示 不包含任何js交互逻辑
  actions:
    - text: 快捷跳转
      link: /cmp

---


<code src="./entry.tsx" />

其他库引用的时候一定要记得导入 `base.css` 
```typescript
import "@rtwc/ui/lib/base.css"
```
```typescript
// 或者使用js初始化
import {loadInitStyle} from '@rtwc/ui';
loadInitStyle()
```
