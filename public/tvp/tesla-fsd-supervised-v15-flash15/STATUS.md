# STATUS · tesla-fsd-supervised-v15-flash15

- Composition/Deliverable: 1440×2560 true 2K · no 4K unless Justin asks
- Slug：`tesla-fsd-supervised-v15-flash15`
- 工程：`/workspace/tesla_fsd_v15_flash15_20261122/`
- 这是约 15 秒新闻快播留存试验，不是把已有约 51 秒七拍成片直接交差；51 秒成片仍保留在 `/workspace/tesla_fsd_20261122/`，本工程未覆盖其输出。
- 成片：`outputs/tesla_fsd_supervised_v15_flash15_2k.mp4`
  - 17.200 s，516 帧，1440×2560 H.264 High yuv420p bt709 30 fps + AAC 48 kHz stereo
  - 13,430,741 bytes
  - SHA256 `cef2871c62a77406b760de74c7cc49c69810a99578cb6d95453ac5e7429a5fd7`
  - inode 209292，mtime 2026-11-22 23:13:08 Asia/Shanghai (UTC+8)
  - 响度 I=-16.43 LUFS，TP=-1.51 dBTP，LRA=5.40 LU；blackdetect 无命中
- 聊天预览：`outputs/tesla_fsd_supervised_v15_flash15_1080p_preview.mp4`（1080×1920 H.264 + AAC，17.2 s，5,870,378 bytes，SHA256 `2430503916247e998fcd87d5fe711ea21c3189f0fe562f94b7a850db8c75a9a2`）。真 2K 本身约 12.8–13.4 MB，预览更轻，便于聊天发送。
- 中间画：`outputs/tesla_fsd_supervised_v15_flash15_raw_2k.mp4`（HyperFrames portrait-1440p，flock `/workspace/tvp_evening_20261122/HF.lock`）；成片音轨替换为 `assets/master.wav`（VO 1.0 + BGM 0.40，18% 轻 duck，两遍 loudnorm I=-16 TP=-1.5）
- 旁白：云阳 `zh-CN-YunyangNeural` +14% / -1Hz（覆盖过期 CosyVoice2 克隆规定；与今晚 51 秒成片同一替代方案）
- 锁定口播（四句一字未改，第 1 句是「盯着开」不是「看着开」）：
  1. 屏幕画出了实时路面，人还得盯着开。
  2. 特斯拉监督版第15版，点一下就能指定去向。
  3. 这轮没宣布对中国车主开放，也不是无人出租车。
  4. 演示更好看了，先别当成已经能放手开。
- 旁白审稿：锁定稿优先于常规 28–42 字；一句一意；无相对时间；不口头说「今天发布」；不添加「太炸裂」；不复读钩子；不把 25 倍 / 9x / 7x 写入口播或可读主画面；数字阿拉伯数字；画面解说与口播同词；headline-zh 为当拍口播摘句。已勾选。时长 17.200 s，按口播 + 1.5 s CTA 未硬凑 15.00 s。
- CTA：判断句结束后约 1.5 s，只出「关注老李的AI江湖」，未拉长、未替换第 4 句。
- Beat 入点：01=16.00 夜间街区实景；02=32.00 点选停车场；03=24.00 车舱大桥；04=20.00 车舱实景。全部旁观同一条官方演示，标明 @Tesla，避开 0–3 s 黑底标题卡与约 6 s「9x safer」字卡，未用旧 Robotaxi 成片，未写成亲测。
- 视口：Cyber Inspector 顶栏 46px + 四角包角 + pagecam，无瞄准器。
- 封面 B 主推 + A 备选：锁定模板结构（Bebas 叠字 TESLA / FSD V15，EN 栈 top 300px；A 居中黄胶囊 rotate -1.5deg、border-radius 999px），ZH 168px，已出 2160×2880 PNG 与 1080×1440 q90 sRGB 4:4:4 JPG。B 中文为「特斯拉监督版 FSD / 屏幕画出实时路面 / 仍要人盯着开」。已按主页角标安全区避让。
  - B PNG `posters/publish_test/cover_B_hypebeast_3_4.png` 4,118,513 B SHA256 `da73f1ff82bdf399056c669950e38de31d095bb8ad21bc5bacacbafa96691a53`
  - B JPG `posters/douyin_upload/cover_B_tesla-fsd-supervised-v15-flash15_1080x1440_q90.jpg` 230,413 B SHA256 `fc84e2ab41129cfd58007db9c781f4d9e42a8335d8ed53a1b90ccd0efc4a6375`
  - A PNG `posters/publish_test/cover_A_yellow_tape_3_4.png` 2,550,729 B SHA256 `1884ffd4bdd7ddf633965e1e5b7c0f36fb56b1dc54835c0e0fb77b36f39c73c8`
  - A JPG `posters/douyin_upload/cover_A_tesla-fsd-supervised-v15-flash15_1080x1440_q90.jpg` 192,073 B SHA256 `34e28ccf9ef17a1da04f7fe54be84d378990b088a3ab4ff315ed553a265c3ab1`
- PUBLISH A/B/C 已写。SOURCES.md 已写（每拍对应 URL/日期，只旁观未路测）。
- HyperFrames craft 警告（照模板保留）：卡片 EN 标签约 25px 低于工具建议的 37px 阅读下限；CTA 1.50 s 低于工具建议的 2.00 s（按 Justin 1.5 s CTA 规则未拉长）。
- videoReview 未在已安装工具里找到可用接口，未假装看过成片；QA 为 ffprobe + 响度 + 抽帧 Read。抽帧：`outputs/qa/`。
- 制作阶段未推仓；本次按独立新 slug 挂 Pages/Release，不覆盖已发布的51秒选题页、Release或成片，不社交发布。渲染锁已释放。

## Hosting
- Pages: https://stefli.github.io/wechat/tvp/tesla-fsd-supervised-v15-flash15/
- Release: https://github.com/stefli/wechat/releases/tag/tvp-tesla-fsd-supervised-v15-flash15
- Asset: https://github.com/stefli/wechat/releases/download/tvp-tesla-fsd-supervised-v15-flash15/tesla_fsd_supervised_v15_flash15_2k.mp4
- 发布内容仅新增本选题；视频保持原字节和SHA256，未改稿件库功能。
