# SOURCES · Sand.ai MAGI-2

选题日期窗口：2026-11-23 至 2026-11-27（Asia/Shanghai）。本片只依据公开官方材料，没有独立跑模型，也没有付费试用。

## 主信源
- Sand.ai 官方研究博客《MAGI-2: A 480B Frontier Video Generation Model》，标注日期 2026-11-24。https://sand.ai/blog/magi-2/
- 官方展示视频托管于 `https://static.magi.world/media/website/`（博客页面内嵌 mp4）。

## 核实过的事实（写进口播与字卡的，均来自上述博客）
- MAGI-2 是相对 2026 年 8 月 MAGI-2 Preview 的完整旗舰：主干从约 114B 扩到 480B，一次激活从约 6B 到约 28B（约 5.8% 稀疏），预训练数据大约扩大 3 倍到 4T token。
- 生成规格：最长 30 秒、1080p、25 fps，原生音视频（对白口型、拟音、环境声、音乐）。
- 全参考：单次原生请求最多 20 个素材（最多 10 张图、5 段视频、5 段音频）。
- 支持精密时间线/切镜控制，以及针对已有视频的局部编辑。
- Artificial Analysis Video Arena v2.1 四任务均分：预览版 998.5 → MAGI-2 1150.3，+151.8。四任务为 I2V、I2V-Silent、T2V-Silent、T2V。
- 官方写明的局限：极端高速运动可能出现轨迹或连续性瑕疵；中远景 2D 动画细碎运动可能过滑；复杂声景层次与物理真实感仍有提升空间；后训练中保持预训练泛化仍是研究课题。
- 官方表示随后将开源 MAGI-2 并发布完整技术报告；截至本片制作时，权重尚未开放。本片没有独立实测。

## 未写进口播的边界
- 媒体报道的每秒成本、国产芯片适配、API 定价等，官方博客未作为可核报价给出，本片不用。
- 「今天发布」一类相对时间词禁止出现。

## 每拍视口素材
1. 官方展示 *Through Five Art Styles*（`styles.mp4`，入点 0.00s）。连续单镜头、多种画风过渡，条件来自包括《星夜》《睡莲》《大碗岛的星期日下午》等经典画作。最抓眼，作拍 01 开场。
2. 官方展示 *From “Preview” to “MAGI-2”*（`preview_to_flagship.mp4`，入点 0.00s）。
3. 官方展示 *Into the Giant Flower World*（`flower.mp4`，入点 0.00s）。多参考锁定角色与三处花境。
4. 官方展示 *Precision Timeline & Shot-Cut Control*（`timeline.mp4`，入点 0.00s）。
5. 官方「After RL」对照之一 *Attic Workshop*（`attic_after_rl.mp4`，入点 2.00s）。用于说明后训练与 1080p 放大后的成片观感，不是本片实测。
6. 官方展示 *Boat dialogue*（`boat_dialogue.mp4`，入点 0.00s）。

所有素材均为官方页面可下载 mp4，按 1920×1080 信箱（模糊补边）裁进视口，未把素材伪称为 4K。
