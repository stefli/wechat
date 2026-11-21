# STATUS · OBSBOT Tail Air 2

Composition/Deliverable: **1440×2560 true 2K · no 4K unless Justin asks**.
Local kit ready 2026-11-22 Asia/Shanghai. No social posting, no skill edits. GitHub Release / Pages handled in this local publish run.

## Delivery
- Video: `/workspace/obsbot_tail_air_2_20261122/outputs/obsbot_tail_air_2_2k.mp4`
- Bytes: 38563867
- SHA256: `f047b7b7f760af6d81910939be47d93fc7c29b00e1667448d3d2bf9bcebe7609`
- Video / audio / container: 44.014 s, 1320 video frames, H.264 30fps 1440×2560 + AAC 48kHz stereo.
- Loudness (final encoded AAC, measured): I=-16.16 LUFS, TP=-1.18 dBTP, LRA=3.20 LU. No digital clipping.
- Voice: **云阳旁白（edge-tts 云阳）**, system python3, zh-CN-YunyangNeural rate=+14%, pitch=-1Hz, WAV 48kHz stereo; classic locked mastering filter in gen_voice.py.
- BGM: original warm pad + plucked figures + light bass, harmonic/register variation, no harsh repeating percussion. HyperFrames `#music` 0.40, narration 1.0, light 18% duck. Two-pass loudnorm on master, mux with AAC.
- Cover B primary: `posters/publish_test/cover_B_hypebeast_3_4.png` (2160×2880). Upload JPG: `posters/douyin_upload/cover_B_obsbot-tail-air-2_1080x1440_q90.jpg`.
- Cover A alternate: `posters/publish_test/cover_A_yellow_tape_3_4.png`. Upload JPG: `posters/douyin_upload/cover_A_obsbot-tail-air-2_1080x1440_q90.jpg`.
- Covers truly reused the locked templates at `/workspace/opus_video_demos/posters/templates/publish_test/cover_B_hypebeast.html` and `cover_A_yellow_tape.html` (fonts, white bar, pill capsule). Skill typography / safe-zone: stack top 300px, ZH 168px; A ZH pinned to the bottom grass so the camera is not covered by the capsule. Hero still is official n38 auto-leveling 1.2s, no browser chrome.
- Captions A/B/C: `PUBLISH.md`. Source ledger: `SOURCES.md`.

## Checks
- [x] 七句口语默读顺畅，一拍一意，专名不过载；数字用阿拉伯数字
- [x] 每拍英文专名≤2；无架构黑话、时间码口播、内部制作术语
- [x] 无相对时效文案（今天/昨晚/刚刚/近日/本周）
- [x] headline-zh 为口播短摘（8–14字量级）；narrative 为完整口播原文，一稿双用
- [x] 旁白七拍 + 1.5s CTA「关注老李的AI江湖　关注 / 转发 / 点赞」；0.25s lead、约0.42s拍间隙
- [x] 仅云阳，未使用克隆音色
- [x] 拍01用官方商店片 `store_ptzr_vertical_auto_leveling.mp4`（实机入画 + 竖拍翻转），禁止静图 Ken Burns 开场
- [x] 其余拍均为官方演示不同入点（暗光成像、Tracking 2.0、动物跟踪、横竖切换、自动水平、Launchpad、多人跟踪）
- [x] Cyber Inspector 圆角边框、四包角、46px顶栏与 pagecam inset；无中央瞄准器
- [x] 每拍恰好两卡；平台 1380–1920 逻辑像素留空；抽帧已看
- [x] 未说无条件 13 档 / 205 分钟；未混入 Tail 2 ADV；非 NDI 标价未编造
- [x] 本片只旁观官方演示，没有开箱实测
- [x] HyperFrames lint 0 errors / 0 warnings；check overall OK
- [x] 最终 1320 帧完整编码；CTA 末帧已检查
- [x] 双封面左上/右下平台角标遮挡模拟已看
- [x] 使用共享 `/workspace/tvp_next3_20261122/HF.lock`，不终止别人的进程
- [ ] 真人手机外放抽听未执行（本执行器未声称做过主观听感验收）

## Non-blocking automated notes
- HF craft `text_below_floor`：英文卡标签（如 OFFICIAL LAUNCH）约 25px，与既往成片相同；主标题、headline-zh、解说与卡值已视觉检查。
- HF CTA 建议 ≥2s，与本任务明确的约 1.5s 冲突，按 1.5s 交付。
- 第三方下载代理可能变化；永久保留官方原链。

## Hosting
- Pages: https://stefli.github.io/wechat/tvp/obsbot-tail-air-2/
- Release: https://github.com/stefli/wechat/releases/tag/tvp-obsbot-tail-air-2
- Asset: https://github.com/stefli/wechat/releases/download/tvp-obsbot-tail-air-2/obsbot_tail_air_2_2k.mp4
- 社交未发。GitHub Release / Pages 由本次本地发布流程接上。
