# SOURCES · 文心 5.5 Flash Preview

选题日期窗口：2026-11-23 至 2026-11-27（Asia/Shanghai）。模型发布页日期是 2026-11-11，本片纳入本窗口的直接理由是：官方当时承诺权重将于 11月25日前开源，随后权重在 Hugging Face / ModelScope 上线。本片只依据公开官方材料，没有独立跑模型，也没有本地部署。

## 主信源
- 文心官方发布页《ERNIE 5.5 Flash Preview》（中/英），标注日期 2026-11-11。https://ernie.baidu.com/zh/release/ernie-5-5-flash-preview/ 与 https://ernie.baidu.com/release/ernie-5-5-flash-preview/
- Hugging Face 仓库 `baidu/ERNIE-5.5-Flash-Preview`：`createdAt` 2026-11-23T09:00:29Z（北京时间 2026-11-23 17:00:29），`lastModified` 2026-11-24T07:17:13Z（北京时间 2026-11-24 15:17:13）。许可证为 Apache 2.0，页面写明该许可仅覆盖 Preview 权重；ERNIE 5.5 Flash Base 仍是单独许可。https://huggingface.co/baidu/ERNIE-5.5-Flash-Preview
- 官方演示视频托管于 `https://ernie-blog.cdn.bcebos.com/research-assets/ernie-5-5-flash-preview/`。

## 核实过的事实
- Preview 是基于此前 Flash Base 的首个后训练版本：总参数 280B，每 token 激活 14B，上下文 1M。
- 官方写明：这是后训练过程中的中间检查点；训练尚未结束，部分能力可能仍不足；后续会出正式版。
- 发布页当时写「权重将于 11月25日前开源」。公开中文报道按 2026年11月24日宣布正式开源；本片在口播里写成「权重随后开源」，具体日期与仓库时间戳写在本文件和 PUBLISH。
- 官方说，文中作品均由该模型在 Agent 框架中端到端完成，外部素材和工具在各段注明。本片不把这些演示说成「零工具、纯模型一键生成」。
- 鹈鹕测试：官方写 116 秒、20 种艺术风格，用 Python 代码绘制；部分场景背景由模型调用生图工具完成，再在底图上叠加动画。口播只采用「用代码画出 116 秒、穿越二十种画风」，不把生图底图说成纯手写像素。
- 武侠游戏《云岫行》：官方写在一项 11 小时的长程编码任务中，于 Unreal Engine 5.8 用 C++ 写完游戏。它是纯文本模型，看不到画面，于是把试玩问题转成可测量的代码测试。外部素材包括张家界场景和角色包。因官方 4K 演示文件超过 200MB，本片未整段下载，相关拍使用发布页其他已下载的官方演示（鹈鹕、机场、发动机、白模预演）。
- Blender 机场/飞机与法隆寺、以及科幻白模预演、W16 发动机等，均为官方发布页演示；白模预演使用了 Seedance 2.5 生成最终画面，口播未把预演说成模型单独出的实拍级成片。

## 未写进口播的边界
- CodeArena WebDev 1668 分等榜单数字来自报道与模型卡，口播未采用，以免和发布页主文口径混用。
- 本片没有独立实测，没有部署权重，也没有把 Preview 说成正式版。
