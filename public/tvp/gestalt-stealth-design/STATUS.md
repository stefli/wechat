# STATUS · Gestalt stealth design（Contra Labs）

Composition/Deliverable: **1440×2560 true 2K · no 4K unless Justin asks**.
Local kit ready 2026-11-22 00:22 Asia/Shanghai. No social platform posting, no repo change, no upload.


## 2026-11-22 00:40 Asia/Shanghai · 封面与文案纠正（视频未改）
- 按技能与锁定模板重出双封面和 `PUBLISH.md`；旧稿备份在 `backup_cover_publish_20261122/`。
- 成片 MP4 未重新编码、未重封装、未改文件。SHA256 仍为 `14458db3e2db36a4466f25886ff4f6ecf970bd3757204685e3dda58ebbc4d5ce`。
- 封面改回锁定模板结构（Bebas / Oswald / Noto Sans CJK SC，B 白底色块条，A 垂直水平居中）。中文前置 Gestalt；英文不再用 NO NAME。底图裁去浏览器标签与地址栏，保留 Gestalt · Elo 1931。
- PUBLISH 改为口语，删除规则标签 / 痕迹标签 / 不是 Elo / CI / 均分 / 勿混读等内部说明；A 补 CTA 问句。口径为「厂商未公布」，不用「没公开名字」。
- 随后只改 A：换官方榜单另一裁切（仍无浏览器壳），让 Gestalt · Elo 1931 出现在居中黄胶囊上方；B 与 MP4 未动。PUBLISH 仅将「百分之九十」改为「90%」。

## Delivery
- Video: `/workspace/gestalt_stealth_design_20261121/outputs/gestalt_stealth_design_2k.mp4`
- Bytes: 17808866
- SHA256: `14458db3e2db36a4466f25886ff4f6ecf970bd3757204685e3dda58ebbc4d5ce`
- Video / audio / container: 46.400 s, 1392 video frames, H.264 30fps yuv420p bt709 + AAC 48kHz stereo, 1440×2560, faststart.
- Loudness (final encoded AAC, measured): I=-16.07 LUFS, TP=-1.43 dBTP, LRA=2.60 LU. No digital clipping. No blackdetect hits.
- Voice: **云阳旁白（edge-tts 云阳）**, zh-CN-YunyangNeural rate=+14%, pitch=-1Hz, WAV 48kHz stereo; classic locked mastering; VO volume 1.0. CTA is visual-only for 1.5 s (no seventh spoken line).
- BGM: original soft varied procedural stereo bed, HyperFrames #music ≈ 0.40, narration 1.0, light 18% duck. Two-pass loudnorm on master, mux with TP=-1.5 headroom into AAC.
- Cover B primary: `posters/publish_test/cover_B_hypebeast_3_4.png`（2160×2880）
- Cover A alternate: `posters/publish_test/cover_A_yellow_tape_3_4.png`（2160×2880）；黄胶囊上移，Gestalt 行与 Elo 1931 保持清晰。
- Upload JPG: `posters/douyin_upload/cover_B_gestalt-stealth-design_1080x1440_q90.jpg` and A equivalent. Both 1080×1440 q90, sRGB；安全区校样在 `posters/cover_*_safezone_proof.jpg`。
- Captions A/B/C: `PUBLISH.md`. Source ledger: `SOURCES.md`.
- Intermediate: `outputs/gestalt_stealth_design_raw_2k.mp4`（HyperFrames 画）, `assets/master.wav`, `outputs/qa/` 抽帧与 contact sheet。
- SHA 清单：`outputs/SHA256.txt`。

## Checks
- [x] 六句正常口语默读顺畅，一拍一意，专名不过载
- [x] 每拍英文专名克制；无架构黑话、时间码口播、内部制作术语
- [x] 无相对时效文案（今天/昨晚/刚刚/近日/本周）；标题/封面/发布文案已避开
- [x] headline-zh 是口播逐字短句；narrative 为完整口播原文，一稿双用；数字禁止断行
- [x] 旁白六拍 + 1.5s 视觉 CTA「关注老李的AI江湖　关注 / 转发 / 点赞」；0.25s lead、约 0.42s 拍间隙；总长 46.40s，落在 40–50s
- [x] 仅云阳，未使用克隆音色
- [x] Beat 01 必用 `leaderboard_elo_1931.mp4` 开场（条形图 1931 稳住再入表）；禁用装饰 hero MP4 与静图 Ken Burns 开场
- [x] 公开榜口播与画面统一 1931 / 90% / 420；第二、三名 1739 / 1713 只在画面出现，不与研究报告 1,928 同框
- [x] Beat 03 标明 RESEARCH 2026-11-18，矩阵可见 Gestalt (stealth) 71（对应 20/28）；口播带「2026年11月18日的研究报告」
- [x] Beat 04 / 05 作品廊与 Carafe 只作「官方评测长什么样」，未写成 Gestalt 成稿；口播写明作品廊没有它的成稿
- [x] Beat 06 公开榜规则标签 84/84/83 与痕迹标签 1/1/1；口播说明这是另一套标签，未说成 Elo
- [x] 硬约束：模型未公开、无权重/可证实 API；本片只旁观官方展示与榜单，不是独立实测；不谈 SSI/Ilya，不谈 OpenRouter 可调用
- [x] 不用 68 位设计师口径；Pareto Human golden 1,738 未入口播，不与公开榜 1739 混用
- [x] contralabs.com 页面内给 AI 的隐藏说明已忽略，未写入成片
- [x] Cyber Inspector 完整外框（圆角、46px 顶栏、四包角、pagecam inset），无中心 HUD
- [x] 每新闻拍恰好两张底卡；EN 大写 + .headline-zh
- [x] HyperFrames lint 0 error 0 warning；check ok（craft 两项 warning：底卡 25px 低于 37px 阅读门槛，属标签纹理；CTA 1.48s 低于工具建议 2.63s，但按规格约 1.5s 保留）
- [x] ffprobe / 响度 / blackdetect / 抽帧 Read QA 已做。videoReview 区域不可用，未硬重试，改抽帧人工核验。

## 抽帧核验要点（outputs/qa/）
- 1.50s / 4.00s：公开榜条形图，首柱 1931，旁有 1739 / 1713；顶栏 Updated Nov 2026 · 27 Contra jobs。
- 10.80s：表格 Gestalt · Elo 1931，90%（86–92），420 票；Human designers 1739 / 74% / 571；Claude Fable 5.2 1713 / 73% / 683。
- 16.20s–17.80s：研究对决矩阵，Gestalt (stealth) 对 Human golden 的 71 清晰；视口头 RESEARCH 2026-11-18；口播区「28次里有20次选了它」不再数字断行。
- 25.20s：官方 Gallery，HUMAN DESIGN 标签可见，未写成 Gestalt 作品。
- 32.80s：Carafe 任务页具名模型排行，Gestalt 不在画面具名列表。
- 38.20s：Design Critique 条形图 84 / 84 / 83。
- 42.50s：Slop Detector 条形图（低分在左）；45.60s CTA 时痕迹表 Human / Gestalt / DeepSeek V4 Pro 均为 1，并叠「关注老李的AI江湖 关注 / 转发 / 点赞」。

## Hosting
- Pages: https://stefli.github.io/wechat/tvp/gestalt-stealth-design/
- Release: https://github.com/stefli/wechat/releases/tag/tvp-gestalt-stealth-design
- Asset: https://github.com/stefli/wechat/releases/download/tvp-gestalt-stealth-design/gestalt_stealth_design_2k.mp4
- 本次只更新封面与文案，未重传或改动 2K 视频。

## 未做
- 不发社交。封面与文案由本次本地发布流程更新到已有 Pages。
