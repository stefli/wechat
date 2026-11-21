# STATUS · pika-enact

- Composition/Deliverable: 1440×2560 true 2K · no 4K unless Justin asks
- Slug: `pika-enact`
- 工程：`/workspace/pika_enact_20261122/`
- 成片：`outputs/pika_enact_2k.mp4`
  - 45.682 s，1370 帧，1440×2560 H.264 yuv420p bt709 30 fps + AAC 48 kHz stereo
  - 23,254,736 bytes
  - SHA256 `1c45a94965ab3ac2b87344a6165a41b5a44ae0317e3619ed52831bbe23375938`
  - inode 79353，mtime 2026-11-22 01:40:30.563542686 +0800（Asia/Shanghai）
  - 响度 I=-16.2 LUFS，TP=-1.3 dBTP，LRA=3.1 LU；blackdetect 无命中
- 中间画：`outputs/pika_enact_raw_2k.mp4`（HyperFrames portrait-1440p）；成片音轨替换为 `assets/master.wav`（VO 1.0 + BGM 0.40，两遍 loudnorm I=-16 TP=-1.5）
- 旁白：云阳 `zh-CN-YunyangNeural` +14% / -1Hz（覆盖过期 CosyVoice2 克隆规定）
- 旁白审稿：一句一意；28–42 字档（第 7 句 26 字收在问句，不硬凑）；无相对时间；无消费级实时 / 独立实测 / 已对普通用户开放；未把演员指令片说成未经处理的原始实时；数字阿拉伯数字；画面解说与口播同词。已勾选。
- Beat 01：官方总览片 `01_hero_realtime_directing.mp4` 从 33.20s 1 倍速开场（Immediate 摆位落入导戏画面），非 Ken Burns。
- 第 4 拍视口标签写明 `OFFICIAL · EDITED`，对应官网“Edited for length；字幕和导演摄像头框事后加上”。
- 2026-11-22 笔误修正（仅第 4 拍）：口播与画面 `.narrative` 由「下备注」改为「下指令」，全文为「第二种是现场导演：你说话或打字给演员下指令，他们就会接着往下演。」只重生成 `voice_04`（新时长 5.352 s，旧 5.304 s），按 LEAD 0.25 / GAP 0.45 / CTA 1.50 重算时轴后重混、重渲。其他 6 句旁白文件未重出。PUBLISH.md 与封面未改。源文件中已无「下备注」。
- 封面 B 主推 + A 备选：锁定模板结构（Bebas 叠字 + 白底色块条；A 居中黄胶囊），字号按技能（EN 栈 top 300px，ZH 168px），已出 2160×2880 PNG 与 1080×1440 q90 JPG，角标安全区自检通过。底图为官方总览片 40.80s 静帧 3:4 裁切，无浏览器壳、无烧录英文字幕。本轮未重做封面。
- PUBLISH A/B/C 已写，本轮未改。SOURCES.md 已写。
- 社交未发、技能未改。GitHub Release / Pages 由本次本地发布流程接上。渲染时通过 `/workspace/tvp_next3_20261122/HF.lock` 串行。
- videoReview 区域不可用，已用抽帧 Read 核验；第 4 拍抽帧见 `outputs/qa/check05_21.20s.png`、`check06_23.60s.png`、`check07_25.80s.png`。

## Hosting
- Pages: https://stefli.github.io/wechat/tvp/pika-enact/
- Release: https://github.com/stefli/wechat/releases/tag/tvp-pika-enact
- Asset: https://github.com/stefli/wechat/releases/download/tvp-pika-enact/pika_enact_2k.mp4
- 上传的是笔误修正后的成片（SHA256 1c45a949…），不是旧的 02316afe… 版本。
