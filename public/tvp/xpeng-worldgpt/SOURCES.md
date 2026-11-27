# SOURCES · XPENG WorldGPT

选题日期窗口：2026-11-23 至 2026-11-27（Asia/Shanghai）。本片只依据公开官方材料，没有独立跑模型。

## 主信源
- 小鹏汽车新闻稿《XPENG UNVEILS WORLDGPT…》，标注日期 2026-11-24。https://www.xpeng.com/pressroom/news/01a20bcf44b3a1e838d68a02a2110153
- 官方演示页 WorldGPT · One world action model for everything that moves。https://worldgpt-1.github.io/
- 演示视频：`https://worldgpt-1.github.io/media/<id>.mp4` 与 `<id>_gt.mp4`（真实记录对照）。页面写明共 32 条，六种机体；大约第一秒是真实镜头，之后是模型预测。

## 核实过的事实
- WorldGPT 属于小鹏图灵世界模型（Turing World Model）系列，用同一套权重学习汽车、船只、无人机、单臂机器人、双臂机器人和人形机器人。
- 给定大约一秒的摄像机输入和一条指令，模型可以生成场景如何演变的视频、规划完成任务所需动作，并用自然语言解释理由。
- 架构表述：云端教师模型，再蒸馏到各机体端侧学生模型。动作本身不能跨机体共用，像素可以。
- 截至 2026年11月12日，官方称在自动驾驶、机器人操作、视觉理解和视频生成的公开评测中拿下 12 项第一。单臂操作 50 项任务平均成功率写成 95.2%，为所列已发表模型中最高。自动驾驶包括 NAVSIM v2 等。这些数字以新闻稿为准，本片未复现评测。
- 官方演示页写 “To our knowledge it is the first model to do all of this across land, water and air。” 技术报告 “coming soon”。
- 本片没有独立实测。

## 每拍视口素材（均为官方演示页可下载 mp4）
1. `tl_hum_football.mp4` 入点 3.50s。人形/灵巧手递橄榄球，带预测轨迹，最抓眼，作拍 01 开场。
2. `tl_car_auxr01.mp4` 入点 3.00s。车辆前视与规划路径。
3. `tl_drone_orbit.mp4` 入点 2.00s。无人机机体。
4. `tl_ark_oven.mp4` 入点 2.00s。双臂/操作场景。
5. `tl_arm_sushi.mp4` 入点 2.00s。单臂操作。
6. 官方预测 `tl_car_auxr01.mp4` 与真实记录 `tl_car_auxr01_gt.mp4` 左右对照，入点 3.00s，标签「模型预测 / 真实记录」。用于说明「大约第一秒是真实镜头，后面是预测」。

素材按 1920×1080 信箱（模糊补边）裁进视口。
