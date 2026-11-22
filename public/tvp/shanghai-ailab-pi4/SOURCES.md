# SOURCES · shanghai-ailab-pi4

一手官方来源（2026-11-22 北京时间核验）：

- 论文 arXiv https://arxiv.org/abs/2611.23144
  - `citation_date` / `citation_online_date` = 2026/11/17
  - 页面 dateline：Submitted on 17 Nov 2026
  - 题目：π⁴: A Foundation Model for 4D Scene Geometry and Motion
  - 团队：Physical Intelligence Team, Shanghai Artificial Intelligence Laboratory（上海人工智能实验室）
- 项目页 https://yyfz.github.io/pi4/ （资源版本查询串含 `v=20261116`）
- 代码仓库 https://github.com/yyfz/Pi4
  - 创建 2026-11-12T11:09:33Z
  - 最近推送 2026-11-18T04:32:55Z
- 权重 https://huggingface.co/yyfz233/Pi4
- 在线演示空间 https://huggingface.co/spaces/yyfz233/Pi4
- 相关数据集页 https://weiguangzhao.github.io/GameRealm/（不要把数据集发布说成模型本体）

官方口径摘要（按 README / 论文摘要，不成片外推）：

- 输入：未标定 RGB；单张图、无序图集合或视频。
- 一次前向同时估计几何和运动；约 0.5B 参数。
- 恢复稠密几何、相机位姿、度量尺度，以及多图输入下的 2D/3D 点轨迹和运动物体掩膜。
- 在论文给出的 16 项几何评测设置里，官方写的是 compared methods 中 overall average rank 最好；跟踪和运动分割只写成 competitive。
- 训练最多只看 64 路视图，推理可对数千张输入图做联合重建和跟踪。
- 运行环境：Linux x86-64、Python 3.11、支持 BF16 的 NVIDIA GPU、CUDA 12.6 驱动。本片只旁观官方演示，没有独立实测。

官方视频（已下载，ffprobe 成功），稳定 URL 前缀：`https://yyfz.github.io/pi4/assets/demos/`

本地目录：`/workspace/tvp_evening_20261122/media/pi4/official_demos/`

| 成片使用 | 文件 | 官方角色 | 规格 |
| --- | --- | --- | --- |
| Beat 01，入点 14.00s | `anna_local.mp4` | Figure Skating · local | 874×480，60.000s，6,873,591 B |
| Beat 02 右幅，入点 14.00s | `anna_local.mp4` | 同上结果 | 874×480 |
| Beat 02 左幅，入点 14.00s | `anna_input.mp4` | Figure Skating · input | 384×216，60s |
| Beat 03，入点 4.00s | `waterfall1_local.mp4` | Waterfall Surfing · local | 874×480，25.033s |
| Beat 04，入点 8.00s | `007_local.mp4` | Rooftop Pursuit · local | 874×480，69.820s |
| Beat 05，入点 1.00s | `robot_local.mp4` | Robot Performance · local | 874×480，19.400s |
| Beat 06，入点 2.00s | `kart_local.mp4` | Indoor Karting · local | 874×480，20.020s |

口播画面一律先装进 1920×1080（模糊填充，完整保留官方画幅），不把 874×480 或更小的输入源说成 4K。Beat 02 并排标注「官方输入 / 官方结果」。全部 1 倍速，无本地推理画面。

同目录另有 `anna_global`、`robot-folding_local`、`luxhome_local` 等官方片段，本片未作主画面使用。
