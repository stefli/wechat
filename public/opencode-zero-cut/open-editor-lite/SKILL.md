---
name: open-editor-lite
description: Use when the user asks to cut, trim, splice, caption, or export a short video with ffmpeg via OpenCode. Public minimal editor skill — NOT the Skool Editor V1 zip. Trigger phrases: "用 open-editor-lite 剪这段视频", "cut this clip", "trim dead air", "加字幕导出".
---

# open-editor-lite（公开替代剪辑技能）

> **边界**：本技能是公开可复现的最小 ffmpeg 剪辑包，**不是** Skool / nextphase 社区发放的原版 **Editor V1**。原版 Editor V1 只在 Skool（nextphase）Google Drive 发放；本包可自由复制安装。

## 何时用
- 用户给出本地短片（建议 ≤60s）并要求裁冗余、拼接、加简单字卡/字幕、导出成片。
- 一句触发：「用 open-editor-lite 剪这段视频」。

## 环境
- 需要本机已装 `ffmpeg` / `ffprobe`。
- 工作目录默认当前工程；输入放 `raw/`，输出放 `out/`。

## 工作流（按序）

1. **探片**：对输入跑 `ffprobe`，记下时长、分辨率、有无音轨。
2. **计划**：用简短时间线说明要裁哪几段、是否加片头字卡、字幕文案。先征得用户同意再动刀（若会话已 `--auto` 可直接执行）。
3. **执行**：优先调用本目录脚本：
   - `scripts/cut.sh` — 按起止秒裁一段
   - `scripts/concat.sh` — 拼接多段
   - `scripts/titlecard.sh` — 生成纯色片头字卡
   - `scripts/burn_text.sh` — 烧录底部字幕
   - `scripts/pipeline_demo.sh` — 一键：去中间死区 + 片头 + 字幕 + 导出
4. **验收**：对照下方清单；把 `ffprobe` 结果与输出路径回报用户。

## 验收清单
- [ ] 成片存在且可播放
- [ ] 时长短于原片（若任务是去冗余）
- [ ] 分辨率与原片一致（除非用户要求改）
- [ ] 字幕/字卡文案与用户给定一致
- [ ] 回报：输入路径、输出路径、原时长→新时长、用过的命令摘要

## 禁止
- 假装本技能是 Skool Editor V1。
- 对长片/复杂动效承诺「一定一次成功」——短片可跑通 ≠ 长片/复杂时间线都能 $0 搞定。
- 删除用户原片；只写 `out/`。

## 安装（读者可跟）
```bash
# 把本目录放到 OpenCode skills 路径
mkdir -p ~/.config/opencode/skills
ln -sfn /path/to/open-editor-lite ~/.config/opencode/skills/open-editor-lite
# 或直接复制
# cp -R open-editor-lite ~/.config/opencode/skills/
```
