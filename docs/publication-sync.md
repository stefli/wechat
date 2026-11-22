# 稿件库发布状态：GitHub 统一源 + 用户自行配置 PAT

图文 https://stefli.github.io/wechat/ 与科技快播 https://stefli.github.io/wechat/tvp/ 共用 `publication-state/status.json`。**不是 OAuth 登录，不依赖 Supabase 或回调服务器。** 用户明确选择了各浏览器自行配置 PAT；维护者的发布凭证从未嵌入网页、预填或传给用户设备。

## 用户首次设置

1. 自行在 GitHub 创建 fine-grained PAT：资源所有者 stefli，仅仓库 stefli/wechat，Contents 读写，Metadata 自动只读。不需要 Actions/Workflows/Administration。建议短有效期。
2. 手机、电脑各自打开任一稿件库的「发布状态设置 · GitHub PAT」，在密码框输入自己的 PAT，点「验证并连接」。不通过聊天提交 PAT。
3. 默认只保存当前标签页 sessionStorage，会话结束可能需重填；明确勾选「记住」才写 localStorage。**均非加密，同源脚本/扩展/XSS 可读取。** `stefli.github.io` 同源其他页面也有该风险。可以断开/清除凭证，不清旧状态和待同步。
4. 配置失效 401/403 会提示重新配置，不会误报保存成功。连接先验证用户 stefli 和账号仓库 push 权限，细分 PAT 的 Contents 写能力仍以实际保存结果为准。

更完整说明：[网页版使用与安全](https://stefli.github.io/wechat/publication-sync-help.html)。日常不需要导入导出。

## 持久化与并发

- 浏览器直接请求官方 `api.github.com`，授权只放请求头。没有第三方 JavaScript，PAT 不放 URL、状态 JSON、分析日志、导出备份或 git 文件。
- 状态键为 `[articles|tvp, slug, platform]`。每条为 value/revision/operationId，保留三态和历史日期。
- 每次单平台写先重新读取 JSON 和 Contents SHA，合并一个键后 PUT。SHA 409 重读后重试；同平台语义版本变更要求确认，不用整库旧快照覆盖。初次创建的 422 仅在确认 SHA 已变化时重试。
- 写失败/离线保留 localStorage 待同步队列，不能报告已同步。前台每 20 秒/回到前台/恢复网络刷新，支持手动刷新。读走 API/no-store，不等待 Pages 部署。
- 同浏览器标签页通过 Web Locks 串行化整个 cache read-modify-write + 网络确认，storage 事件刷新其他标签页。旧浏览器不支持时禁用修改，防止无锁覆盖。
- 原始 `laoli-library-status-v1` 在成功连接后先原样备份再迁移，不改写/删除。默认未发不覆盖有效远端；已发/不发与远端不同逐项确认。未访问设备只能等它自己打开并连接后迁移，不声称已提前读到。
- 仅导出白名单内状态缓存及旧数据备份，不导出凭证。正文只读，不触碰社交发布。

## Pages 部署控制

现有本地发布凭证仅有 repo scope，没有 workflow scope。不扩大授权、不更改 workflow。
GitHub transport **只允许一个 `publication-state/<name>.json` 状态文件写入**；这类 API 提交使用固定消息 `state: update one publication platform [skip actions]`，避免状态写入触发 Pages。普通内容提交消息不包含该标记，原有 main push 内容部署照常；本地 git 钩子仍正常执行，不使用 --no-verify。

官方依据：https://docs.github.com/en/actions/managing-workflow-runs/skipping-workflow-runs
注意该标记仅适用于 push/pull_request 工作流；当前 Pages 是 push main。未来若增加其他触发器需复查。状态分支若未来受必需 checks 保护，跳过检查可能导致 Pending，届时应重新评估方案。

## 测试

无安装依赖即可执行：

```sh
node --test tests/publication-sync/*.test.mjs
```

涵盖模拟 GitHub/本地 HTTP：两客户端双向状态与日期、不同平台并发合并、同平台冲突、丢失确认重试、离线重启恢复、旧状态备份/默认忽略、401/403、凭证会话默认/明确记住/清除、镜像资源一致及全部 89 TVP/78 图文保留。

真实 GitHub Contents API 通过本地内存凭证、独立 storage 客户端在隔离测试分支验证；未把凭证放入浏览器，也不是实际手机/电脑配置证明。测试文件清理 HTTP200 后 GET404。真实未授权写返回401；真实403未诱发，只有模拟覆盖。

测试与候选工作目录：`/workspace/publish_status_sync_20261122/`（不属于公开站点）。生产线上版本通过正常本地 git 提交/推送，后续部署证据由任务结果单记录。

## 安全边界

这是公开仓；状态/日期及 git 历史公开，不放私人备注。Contents 读写权限是整仓级别，不是 GitHub 文件级 ACL。路径限制只是这个客户端的功能约束，不能抵御 token 本身泄露。建议最小授权、短有效期、可信设备；有疑虑可撤销 PAT，浏览器缓存仍保留。
