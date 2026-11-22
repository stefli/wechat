# STATUS · foundation-phantom-mkii

- Composition/Deliverable: 1440×2560 true 2K · no 4K unless Justin asks
- Slug: `foundation-phantom-mkii`
- 工程：`/workspace/foundation_phantom_mkii_20261122/`
- 选题 brief：`/workspace/tvp_evening_20261122/BRIEFS.md` 与 `briefs.json`
- 成片：`outputs/foundation_phantom_mkii_2k.mp4`
  - 48.568 s，1457 帧，1440×2560 H.264 yuv420p bt709 30 fps + AAC 48 kHz stereo ~193 kb/s
  - 17,555,417 bytes
  - SHA256 `9b5ee9c43a2453a1e11d4732f00d7e0c794d0705af31933af45794f232f8bbee`
  - inode 208876，mtime 2026-11-22 20:16:44.475569413 +0800（Asia/Shanghai）
  - 响度 I=-16.2 LUFS，TP=-1.4 dBTP，LRA=2.5 LU；blackdetect 无命中
- 中间画：`outputs/foundation_phantom_mkii_raw_2k.mp4`（HyperFrames portrait-1440p）；成片音轨替换为 `assets/master.wav`（VO 1.0 + BGM 0.40，两遍 loudnorm I=-16 TP=-1.5）
- 旁白：云阳 `zh-CN-YunyangNeural` +14% / -1Hz（覆盖过期 CosyVoice2 克隆规定）
- 旁白审稿：一句一意；无相对时间；无独立实测 / 已量产 / 已开售 / 世界最强；数字阿拉伯数字；画面解说与口播同词；headline-zh 为当拍口播原词。已勾选。
- Beat 01：官方负重测试 `binsta_OWDZNaJmOG.mp4` 从 84.00 秒 1 倍速开场（机器人持杠铃），非 Ken Burns、非静图。
- Beat 02：同一段官方测试 39.00 秒起，画面是秤上 203。
- 封面 B 主推 + A 备选：锁定模板结构（Bebas 叠字；A 居中黄胶囊），字号按技能（EN 栈 top 300px，ZH 168px），已出 2160×2880 PNG 与 1080×1440 q90 JPG，角标安全区自检通过。A 把头和胸灯放在未移动的黄胶囊上方。
- PUBLISH A/B/C 已写。SOURCES.md 已写。
- videoReview 未在已安装工具里找到可用接口，未假装看过成片；QA 为 ffprobe + 响度 + 抽帧 Read。
- 本步未推仓、未改稿件库脚本/状态/PAT、未改技能、未自动送成片评审、未社交发布。渲染锁：`/workspace/tvp_evening_20261122/HF.lock`。

## Hosting
- Pages: https://stefli.github.io/wechat/tvp/foundation-phantom-mkii/
- Release: https://github.com/stefli/wechat/releases/tag/tvp-foundation-phantom-mkii
- Asset: https://github.com/stefli/wechat/releases/download/tvp-foundation-phantom-mkii/foundation_phantom_mkii_2k.mp4
- 发布内容仅新增本选题；视频保持原字节和SHA256，未改稿件库功能。
