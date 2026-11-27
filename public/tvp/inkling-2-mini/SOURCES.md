# SOURCES · Inkling 2 Mini

选题日期窗口以 2026-11-23 至 2026-11-27 为主。本题官方日期是 2026-11-20，比主窗口早 3 天。纳入理由：窗口内另两支（GLM-5.4、文心 5.5 Flash Preview 开源）之外仍需补足 2–3 条合格新题；本题此前未做过科技快播；官方提供可下载的飞行模拟器与 Thinkyville 演示，画面充分，仍够新。

## 主信源
- Thinking Machines Lab 官方博文 *Introducing Inkling 2 Mini*，标注日期 Nov 20, 2026。https://thinkingmachines.ai/news/inkling-2-mini/
- 官方演示：
  - PlaneBench 飞行模拟器 `https://thinkingmachines.ai/_astro/planebench-demo3.FdsHOEHH.mp4`
  - Thinkyville 小镇 `https://thinkingmachines.ai/_astro/thinkyville.CSVNowDo.mp4`

## 核实过的事实
- Inkling 2 Mini 是循环变压器：中间层对每个 token 跑三轮，用更少的输出 token 做更多推理，尤其在需要推理质量的智能体编程任务上。
- 规模：MoE，总参数 26.4B，一次激活 3.4B；计入循环后，每个 token 的权重激活是 5.4B。口播采用「总参数 264 亿，一次激活 34 亿」；5.4B 激活量只写在本文件，以免和 3.4B 一次激活听混。
- 官方写它在总参数不到 100B 的开源权重模型里，于 DeepSWE v1.1（48.2%）和 Vals Index v2.2（46.5%）领先。这是官方对照口径，不是本片复测。
- 显存足迹约 20GB，可在消费级笔记本和桌面 AI 电脑上运行。多数权重点以 NVFP4 训练和部署，最后四层是 MXFP8。
- 官方演示：研究人员在飞行中把模型带到一台 MacBook Pro（M5 Pro，48GB）上，开飞行模式离线运行，并在几分钟内做出可玩的飞行模拟器。计时器显示实时，录像大部分以 15× 播放。本片按官方口径写「飞行模式的笔记本上，离线写出能玩的飞行模拟器」，不把 15× 录像速度说成模型生成速度。
- Thinkyville：同一个离线 MacBook 上，由 Inkling 2 Mini 驱动全部 20 个村民。
- 权重已开放，并可在 Tinker 上做推理和定制。本片没有下载权重，也没有本地运行。

## 未写进口播的边界
- 循环有利于监督（不一定要把思路写下来）。机制细节只留在本文件。
- 本片没有独立实测速度、精度或笔记本兼容性。
