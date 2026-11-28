# SOURCES · 上海人工智能实验室 Sage-Interaction

选题日期以官方页面为准。数字、能力与演示均来自官方，不是独立实测。本条制作说明只写在信源与制作记录，不入口播、不进画面字幕。

## 官方发布
- 仓库 README News「[2026-11-23] We release Sage-Interaction」：https://github.com/InternLM/Sage-Interaction
- Hugging Face 创建时间 2026-11-23T05:49:27.000Z（约合北京时间 13:49）：https://huggingface.co/internlm/Sage-Interaction
- 项目页：https://internlm.github.io/Sage-Interaction/
- ModelScope：https://modelscope.cn/models/Shanghai_AI_Laboratory/Sage-Interaction
- 仓库创建于 2026-11-19，以 11-23 权重与演示发布日为准。致谢写明由上海人工智能实验室支持。

## 官方演示（可下载 mp4，2026-11-28 核验）
- 项目页官方主演示：https://internlm.github.io/Sage-Interaction/assets/demo_1.mp4 （HTTP 200，video/mp4，26,203,086 B，169.870s，1920×1080，H264+AAC）
- README 同片 720p 备份：https://github.com/user-attachments/assets/5c4da4f5-a9a6-40ce-aa26-0f734e18f8bc （3,268,055 B，169.876s，1280×720，H264+AAC）

## 分镜入点
- 拍 01：官方 1080p 主片 52.0s。t=0 是产品落地页；52s 左侧「委托记录」已出现 DeepSeek V4.1 Flash「已返回」，对话区同步写出答案。
- 拍 02：主片 8.0s。界面标题「欢迎来到 Sage-Interaction」，对话已出现 “Yes, I can hear you clearly.”
- 拍 03：主片 20.0s。实时对话继续，对应全双工边看边听边说。
- 拍 04：主片 48.0s。委托记录变为 1，后台显示「处理中」，对话写 “Let me check that for you.”
- 拍 05：主片 56.0s。对话区写出完整答案，左侧委托记录为「已返回」。
- 拍 06：主片 90.0s。委托记录增加到 2，继续把新的计算题交到后台，对应「复杂题仍要交给后台」。

## 口播事实（均来自官方，非本片实测）
- 日期：2026年11月23日开源；9B（90 亿参数）全双工全模态交互模型，底座 MiniCPM-o 4.5。
- 可实时处理流式音视频并出声；被打断也能停下再接上；更长任务可委托给后台，结果再并回当前对话。官方演示里的后台模型是 DeepSeek V4.1 Flash，这是演示例子，不是唯一绑定。
- 官方对比：FD-Bench v1.5 交互质量 80.73，FD-Bench v1 轮转时延 1.29 秒。
- 权重 Apache-2.0；复杂题仍要交给后台去算。

## 与目录差异
目录已有 Claude Meetings、Gemini Mac computer use、Kyutai AURA。本片卖开源全双工语音/视频交互，加上「前台继续聊、后台把活做完」，不是再做一支会议助手或对口型生成。
