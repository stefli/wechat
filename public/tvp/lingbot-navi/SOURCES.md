# SOURCES · 蚂蚁灵波 LingBot-Navi

选题日期以官方页面为准。数字、能力与演示均来自官方，不是独立实测。本条制作说明只写在信源与制作记录，不入口播、不进画面字幕。

## 官方发布
- 项目页：https://technology.robbyant.com/lingbot-navi
- 代码：https://github.com/Robbyant/lingbot-navi/
- 英文官方新闻稿（Business Wire，2026-11-26）：https://www.businesswire.com/news/home/20261126690702/en/Robbyant-Open-Sources-LingBot-Map-2.0-and-LingBot-Navi-Enabling-Long-Term-Spatial-Memory-and-Autonomous-Navigation-for-Robots
- 发布机构：Robbyant（蚂蚁集团旗下具身公司）开源导航模型 LingBot-Navi，并同期开源 LingBot-Map 2.0。

## 官方演示（可下载 mp4，2026-11-28 核验）
- 导航主片（项目页 aria-label「LingBot‑Navi navigation demonstration」）：https://gw.alipayobjects.com/v/huamei_uhyrai/afts/file/LzFhQJ3KjZ8AAAAAjOAAAAgADsbiAQJr （215,727,959 B，160.120s，1920×1080，H264+AAC）
- 能力/场景片：https://gw.alipayobjects.com/v/huamei_uhyrai/afts/file/QieZQpNAj_8AAAAAg5AAAAgADsbiAQJr （60,250,333 B，30.000s，1920×1080，H264；未检出音轨）
- 第三支官方页内嵌片：https://gw.alipayobjects.com/v/huamei_uhyrai/afts/file/M_bASqJhf_IAAAAAhRAAAAgADsbiAQJr （85,117,444 B，100.067s，2560×1440，H264；未检出音轨）

## 分镜入点
- 拍 01：导航主片 15.0s。t=0 是压暗标题卡「LingBot-Navi」，属片头；15s 同时出现自然语言指令 “Deliver the gift box to the front desk.”、状态 Exploring、空间记忆点云，以及「1X Speed, Fully Autonomous Operation」。
- 拍 02：主片 90.0s。蚂蚁集团标识与语言指令同框，字幕写 Memory-driven navigation。
- 拍 03：主片 25.0s。官方示意图：在未见过的环境里主动探索并建立空间记忆。
- 拍 04：主片 40.0s。官方「Spatial Memory-Part A」三维记忆图。
- 拍 05：能力片 8.0s。官方数据图出现 511 Scenes / 7 Domains。项目页口播采用训练 475 个、留出 36 个（475+36=511）；不以 511 当作单独训练数。
- 拍 06：主片 70.0s。新任务「查看洗手间旁电梯是否可用」，叠加已有空间记忆分区，并标出 Status: Unavailable。

## 口播事实（均来自官方，非本片实测）
- 日期：2026年11月26日开源；同期开源地图模型。
- 面向带空间记忆的场景导航；能力包括语言接地、图像定位、探索、路径预测。
- 把位置与视觉内容结成三维标记，再交给局部规划执行。
- 训练场景 475 个，留出场景 36 个。
- 这是开源导航与地图工具；换了全新场地仍要先建立空间记忆。

## 与目录差异
目录已有小鹏 WorldGPT、NVIDIA Alpamayo、SenseNova-RoboRSI-27B。本片卖「同一场地的空间记忆可跨任务复用」，不是另一支规划或操作模型。
