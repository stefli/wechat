# STATUS · tesla-fsd-supervised-v15

- Composition/Deliverable: 1440×2560 true 2K · no 4K unless Justin asks
- Slug: `tesla-fsd-supervised-v15`
- 工程：`/workspace/tesla_fsd_20261122/`
- 成片：`outputs/tesla_fsd_supervised_v15_2k.mp4`
  - 50.938 s，1528 帧，1440×2560 H.264 yuv420p bt709 30 fps + AAC 48 kHz stereo ~195 kb/s
  - 36,615,974 bytes
  - SHA256 `d726e1bb078583e1316f263997e75bb0ac98b837735d09fd3f720fa0f3e49ea4`
  - inode 209171，mtime 2026-11-22 21:22:56.665562958 +0800（Asia/Shanghai）
  - 响度 I=-16.14 LUFS，TP=-1.48 dBTP，LRA=2.40 LU；blackdetect 无命中
- 中间画：`outputs/tesla_fsd_supervised_v15_raw_2k.mp4`（HyperFrames portrait-1440p，flock `/workspace/tvp_evening_20261122/HF.lock`）；成片音轨替换为 `assets/master.wav`（VO 1.0 + BGM 0.40，18% 轻 duck，两遍 loudnorm I=-16 TP=-1.5）
- 旁白：云阳 `zh-CN-YunyangNeural` +14% / -1Hz（覆盖过期 CosyVoice2 克隆规定）
- 旁白审稿：一句一意；无相对时间；日期按官方公告换算北京时间 2026-11-22，不称 11月21日开始推送；25 倍因缺对比基线已删除，不以官方片 9x / 网站 7x 入可读主画面；数字阿拉伯数字；画面解说与口播同词；headline-zh 为当拍口播原词。已勾选。时长 50.938 s，按口播未硬凑。
- Beat 01：官方演示从 16.00 秒 1 倍速开场（夜间街区实景视图），避开 0–3 s 黑底标题卡。
- 封面 B 主推 + A 备选：锁定模板结构（Bebas 叠字 TESLA / FSD V15；A 居中黄胶囊），字号按技能（EN 栈 top 300px，ZH 168px），已出 2160×2880 PNG 与 1080×1440 q90 JPG。底图为官方实景视图 4K 静帧，A 把路面放在未移动的黄胶囊上方。
  - B PNG `posters/publish_test/cover_B_hypebeast_3_4.png` 4,123,790 B SHA256 `00fd4e25acce7314458b7d1b1dd082d039d74fc6c87b66df58272601d6e2d602`
  - B JPG `posters/douyin_upload/cover_B_tesla-fsd-supervised-v15_1080x1440_q90.jpg` 229,476 B SHA256 `be1e19f3b55dccbafa6092c2d1d96d30abdb18f2ae9cc5e779589a4d47474db9`
  - A PNG `posters/publish_test/cover_A_yellow_tape_3_4.png` 2,550,729 B SHA256 `1884ffd4bdd7ddf633965e1e5b7c0f36fb56b1dc54835c0e0fb77b36f39c73c8`
  - A JPG `posters/douyin_upload/cover_A_tesla-fsd-supervised-v15_1080x1440_q90.jpg` 192,073 B SHA256 `34e28ccf9ef17a1da04f7fe54be84d378990b088a3ab4ff315ed553a265c3ab1`
- PUBLISH A/B/C 已写。SOURCES.md 已写（每拍对应 URL/日期，只旁观未路测）。
- videoReview 未在已安装工具里找到可用接口，未假装看过成片；QA 为 ffprobe + 响度 + 抽帧 Read。抽帧：`outputs/qa/`。
- 制作阶段未推仓；本次仅托管本选题，不改稿件库脚本/状态/PAT，不社交发布。渲染锁已释放。

## Hosting
- Pages: https://stefli.github.io/wechat/tvp/tesla-fsd-supervised-v15/
- Release: https://github.com/stefli/wechat/releases/tag/tvp-tesla-fsd-supervised-v15
- Asset: https://github.com/stefli/wechat/releases/download/tvp-tesla-fsd-supervised-v15/tesla_fsd_supervised_v15_2k.mp4
- 发布内容仅新增本选题；视频保持原字节和SHA256，未改稿件库功能。
