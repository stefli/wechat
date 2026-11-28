# SOURCES · 地平线 HoloBrain-0.5

选题日期以官方页面为准。数字、能力与演示均来自官方，不是独立实测。本条制作说明只写在信源与制作记录，不入口播、不进画面字幕。

## 官方发布
- 官方新闻稿页面日期 2026-11-25，正文写「11月24日，地平线机器人实验室发布」：https://www.horizon.auto/news/product/489
- 项目页：https://horizonrobotics.github.io/holobrain-0.5-homepage/
- 代码：https://github.com/HorizonRobotics/HoloBrain
- 这是 HoloBrain 路线上的公开迭代（新闻稿回顾 2025-12 发布、2026-02 开源 HoloBrain-0），本条新闻事件是 0.5。

## 官方演示（可下载 mp4，2026-11-28 核验）
- Unitree G1 开冰箱取饮料：https://horizonrobotics.github.io/holobrain-0.5-homepage/assets/videos/g1-retrieve-drink.mp4 （9,557,451 B，18.833s，1280×720，H264；未检出音轨；左上角官方标 X2）
- 移动双臂按电梯：https://horizonrobotics.github.io/holobrain-0.5-homepage/assets/videos/mobiledual-elevator.mp4 （12,278,773 B，16.633s，1920×1080，H264；未检出音轨）
- 项目片：https://horizonrobotics.github.io/holobrain-0.5-homepage/assets/videos/holobrain-film-v29.mp4 （28,896,653 B，65.200s，1920×1080，H264+AAC）。t=0 是标题卡，前半多为方法图与拼贴，不用作拍 01。
- 扎带固定、打包外卖、DROID 工业臂等同目录官方任务 mp4。部分画面带官方倍速标记。

## 分镜入点
- 拍 01：G1 开冰箱取饮料 0.0s。开场已是人形机器人走向冰箱的完整实拍，不用项目片标题卡。
- 拍 02：移动双臂按电梯 0.0s。墙面有 Welcome Horizon Robotics，交代发布方，并展示另一类本体。
- 拍 03：项目片 20.0s。官方训练数据拼贴，对应十五类身体与超 1 万小时。
- 拍 04：扎带固定官方任务（源片约 2s 起的切片），对应双臂长程精细操作。
- 拍 05：droid.mp4 0.0s。官方用公开 DROID 数据演示迁到另一只工业臂；画面有官方 X20 倍速标记，分辨率较低，仍是官方可下载演示。
- 拍 06：打包外卖 8.0s。实验室双臂任务，收在「研究模型，不是即用成品」。

## 口播事实（均来自官方，非本片实测）
- 日期：新闻页 2026-11-25，正文写 11月24日发布。
- 共享以关节为中心的三维具身表示，配合 UniURDF 对齐本体；预训练覆盖 15 类本体；真机 5,704.3 小时、仿真 3,470.3 小时、人类演示 831.9 小时，合计超过 1 万小时。
- AgileX Piper / Piper-X 上 30 项长程精细操作；同一模型迁移到 Unitree G1、移动双臂与 Franka（Franka 仅用公开 DROID 后训练，未用目标环境与目标任务数据）。
- 权重 Apache-2.0；这是跨本体研究模型，不是买来就能换身体即用的成品。

## 与目录差异
目录已有 RoboRSI-27B、WorldGPT、Foundation Phantom MKII。本片卖「一个模型跨多种身体」，不要做成「又一只手会干活」。
