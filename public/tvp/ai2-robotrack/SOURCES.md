# SOURCES · Ai2 RoboTrack

选题日期以官方页面为准，不是独立实测。

## 官方发布
- 项目页：https://robotrack.allen.ai/
- 官方博客：https://allenai.org/blog/robotrack
- Hugging Face 官方博客：https://huggingface.co/blog/allenai/robotrack （Published November 23, 2026）
- 发布机构：Allen Institute for AI（Ai2），合作单位含华盛顿大学、北卡罗来纳大学教堂山分校（见项目页作者单位）。

## 官方演示（可下载 mp4，2026-11-27 核验）
- 湿实验室移液真机：https://stream.mux.com/uvgkCxD00Om2KX31bc2t27y00AKIP501gBu/high.mp4 （13,327,515 B，47.680s，1920×1080，有声）。官方 HF 博文嵌入。
- 基准点轨迹总览：https://stream.mux.com/7nGWOnYYYq52slujbsQta5IRZBomGg6C/high.mp4 （12,926,539 B，23.300s，1920×1080）。

## 分镜入点
- 拍 01：移液片 6.0s。t=0 已有画面，但任务栏仍空、左机位尚未对准；6.0s 已对准满管取液，是最抓眼的开场。
- 拍 02–03、05–06：同一官方移液片不同入点（含遮挡取液、向空管注入）。
- 拍 04：基准总览 0.0s，六路真实操作与点轨迹。

## 口播事实（均来自官方，非本片实测）
- 日期：2026年11月23日。
- 点跟踪：给定一帧上的点，随后跟踪该物理点，被挡住时标记，再现身时找回。
- RoboTrack-15M：约 1500 万条仿真点轨迹，用于训练；RoboTrack-Bench：307 段真实操作视频、2522 条人工核验轨迹。
- 湿实验室移液：一次遥操作示范后，用跟踪点对齐试管再复现动作。20 组布局成功 17 次（清晰视野 10/10，遮挡 7/10）。对照：SAM 3 为 8/20，RAFT 为 5/20。
- 官方局限：长遮挡、小物体、再现身仍可能失败。

## 制作说明
本片只使用上述官方演示，没有在实验室独立复现，也没有本地部署模型。此条仅写在信源与制作记录，不入口播、不进画面字幕。
