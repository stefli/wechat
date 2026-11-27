# STATUS · Sand.ai MAGI-2

- Composition/Deliverable: 1440×2560 true 2K · no 4K unless Justin asks
- 旁白审稿清单（narration_editorial）：
  - [x] 口播新闻稿，出声读得顺
  - [x] 每拍一句一意；拍 01 先回答「能拿来做什么」，没有用「某某发布了某某」开场
  - [x] 无相对时间词（今天/昨晚/刚刚）
  - [x] 无空喊「太炸裂/颠覆」，无编造可上手的一键应用
  - [x] 数字与规格可在 SOURCES.md 找到对应官方表述
  - [x] TTS：edge-tts zh-CN-YunyangNeural，+14%，-1Hz；未使用 CosyVoice / 克隆
  - [x] 一稿双用只约束 `.narrative` 与 VO；上区中文是提炼标题，不与口播逐字重复
- 视口 §3c：拍 01 用官方 *Through Five Art Styles* 从 t=0 开场
- 第 7 拍：独立全屏关注页「关注老李的AI江湖 / 掌握最新科技资讯 / 科技快播」+ 叮声与卡面同时出现
- BGM：skill `write_news_bed`，`#music` data-volume 0.40；禁止 659 Hz sheen
- 封面：B Hypebeast 主推 + A 黄胶囊备选；母版 2160×2880 PNG + 抖音 1080×1440 JPG
- 发布：stefli/wechat Release 只挂 2K mp4；Pages 看片/下载含加速+备用+原链
- videoReview：若工具不可用，不以「已审看」交差，改用 ffprobe / 响度 / 截帧核验

## Hosting
- Pages: https://stefli.github.io/wechat/tvp/sand-ai-magi-2/
- Release: https://github.com/stefli/wechat/releases/tag/tvp-sand-ai-magi-2
- Asset: https://github.com/stefli/wechat/releases/download/tvp-sand-ai-magi-2/sand_ai_magi2_2k.mp4
- SHA256: `457cb7509d23c6587bf326c1d4fa4f0fc7daa519d6b2312fb35b28549f0bd359`
