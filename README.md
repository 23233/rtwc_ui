### 组件示例 [看这里](https://23233.github.io/rtwc_ui)

- 已自动配置 action 发布到 npm 所以如果提交的 comment 备注信息匹配版本更迭规则
  - 以 `feat:` 或者`feature:` 开头 则 版本号从 `1.0.0` -> `1.1.0`
  - 以 `major:` 开头则 版本号从 `1.0.0` -> `2.0.0`
  - 若提交信息包含 `pre-alpha` `pre-beta` `pre-rc` 则 版本号从 `1.0.0` -> 1.0.0-[alpha|beta].1`
  - 若未包含以上信息 则 版本号从 `1.0.0` -> `1.0.1` 等同于执行
    - npm version patch

```shell
  # 默认配置信息
  majorWords: [ 'BREAKING CHANGE', 'major' ],
  minorWords: [ 'feat', 'minor' ],
  patchWords: null,
  preReleaseWords: [ 'pre-alpha', 'pre-beta', 'pre-rc' ]
```

