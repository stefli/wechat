# SOURCES · 通义 Qwen4-Max

选题日期与数字以官方新闻稿和官方演示博文为准，不是独立实测。

## 官方发布
- 阿里巴巴集团新闻稿（2026年11月16日，杭州）：https://www.alibabagroup.com/zh-HK/document-2060139246777270272
  英文：https://www.alibabagroup.com/en-US/document-2060139246777270272
- 官方工作场景博文（Alibaba Cloud Community，2026年11月23日）：https://www.alibabacloud.com/blog/qwen4-max-at-work-six-real-world-scenarios-for-an-always-on-ai-teammate_603805

## 官方演示（2026-11-27 核验，可下载）
注意：稳定 CDN `https://video-intl.alicdn.com/2026/Blog/qwen4-max_industrial-professional-work.mp4`（87,970,393 B，约 275.8s）实际是 Work360 任务样本轮播，不是制造/游戏实拍，故不用作拍 01。
拍 01–06 用官方博文嵌入的淘宝 vod 演示（已切片保存，不保留完整大文件）：
- 制造/CAD（博文嵌入链 https://cloud.video.taobao.com/vod/_2C1gdOp7svOablyzucrepxxTY1cPifPkG1sPE2-82U.mp4 ，约 119.4s）：全息汽车、2D 图纸转 3D 产线、车门参数建模、切削过切校验。拍 01 入点 5.0s（t=0 为白场）。
- 专业软件/三维与游戏场景（https://cloud.video.taobao.com/vod/oS6AIP5IWIvw-HdUx1aWMsvh78P7izkIvAoRay4pgiU.mp4 ，约 84.3s）：建筑三维、游戏场景。t=0 为标题卡。
- 可玩的官方游戏演示（https://cloud.video.taobao.com/vod/oIWZ6aGtjADdWR_dGC8E_DGDrnpuWk_vU1dG1z0UD4w.mp4 ，约 52.5s）：猫咪法师游戏实机，t=0 已在场景中。

## 口播事实（均来自官方新闻稿/博文，非本片实测）
- 发布日期 2026年11月16日，杭州。
- 总参数 2.4 万亿，每 token 激活 710 亿，上下文 100 万。当时在 QwenCloud（Token Plan 与 API）提供；较小规模开放权重「将稍后发布」。
- 官方制造演示：工件编程人工用时约 475 分钟降至 24 分钟（减幅 95%）。新闻稿还写了 SANF、Pacific Union 等合作展示，口播未展开。
- 官方称可在 Unity、Unreal、Godot 中按自然语言完成场景与玩法搭建。

## 制作说明
本片只使用官方演示，没有独立跑模型或复核 475→24 分钟。此条仅写在信源与制作记录，不入口播、不进画面字幕。
