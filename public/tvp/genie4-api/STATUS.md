# STATUS · Project Genie 开放入口（slug: genie4-api）

Composition/Deliverable: **1440×2560 true 2K · no 4K unless Justin asks**
Local kit ready 2026-11-21 22:44 Asia/Shanghai. GitHub 发布未执行，不代发社交平台。

## Delivery (local only)
- Video: `/workspace/project_genie_api_20261121/outputs/project_genie_api_2k.mp4`
- Bytes: 33505992
- SHA256: `df1cfe6aa5e3e490b1990bf43d40470465eb1edf58a55ba02cbdedf8bbebba8a`
- Duration: 47.000000 s；视频 1410 帧，H.264 1440×2560 30fps；AAC 48kHz stereo
- Loudness (final encoded AAC, measured): I=-16.16 LUFS, TP=-1.00 dBTP, LRA=2.80 LU。无数字削波。
- Voice: **云阳旁白（edge-tts 云阳）**，system python3，zh-CN-YunyangNeural rate=+14% pitch=-1Hz，WAV 48kHz stereo；经典锁定母线在 gen_voice.py。未使用 CosyVoice2 / 克隆声。
- BGM: 原创程序化配乐 gen_music.py（seed 2026111819），模态铺底 + 稀疏拨弦，段落音色与密度有变化，无硬电子打击循环。HyperFrames music 0.40，旁白 1.0，约18%轻侧链。
- Cover B 主推: posters/publish_test/cover_B_hypebeast_3_4.png
- Cover A 备选: posters/publish_test/cover_A_yellow_tape_3_4.png
- 上传 JPG: posters/douyin_upload/cover_B_genie4-api_1080x1440_q90.jpg 与 A 对应文件（1080×1440 q90 4:4:4 sRGB）；母版 PNG 2160×2880
- 文案: PUBLISH.md；信源: SOURCES.md；本地选题页: pages_payload/
- 本地打包: project_genie_api_publish_kit.zip

## Checks
- [x] 六句口播默读顺畅，一拍一意，约28–42字（第5句27汉字，专名使时长仍约6.6s）
- [x] 每拍英文专名≤2；无架构黑话、时间码口播、OBSERVER DESK 等制作术语
- [x] 无相对时效文案（今天/今日/昨晚/刚刚/眼下/到目前为止/TODAY/JUST NOW/NOW）
- [x] headline-zh 为口播逐字短句；narrative 为完整口播原文
- [x] 六拍新闻 + 1.5s CTA；0.25s lead、约0.45s 拍间隙
- [x] 仅云阳，未使用克隆音色
- [x] 核心角度是11月18–19日新开放和API入口，不是模型再首发；未复读10月27日旧片
- [x] 官博 “Following yesterday’s Genie 4 launch” 未被写成模型首发编年
- [x] Beat 01 为蚂蚁官片动态开场（3.50s入点，先绿后紫），不是 keyart / 静图 / 人物背影
- [x] 720P/24fps 按模型官方输出规格书写，未与下载官片 2156×1212 编码混淆
- [x] 未把 Genie 3 能力写成 Genie 4；未报免费全球或具体价格
- [x] Cyber Inspector 圆角框、四包角、46px 顶栏、pagecam inset；无中央瞄准器
- [x] 每新闻拍恰好两卡；平台 1380–1920 逻辑像素留空；t=0 到 CTA 抽帧已看，无黑帧
- [x] HyperFrames lint 0 errors / 0 warnings；check overall OK
- [x] 未生成4K临时片；研究原件未移动/删除
- [x] 使用共享 HF.lock，未终止他人进程
- [x] 未改动共享 git 检出，未重试认证；Gemini 提交 836124d 仍保留在历史中
- [ ] 真人手机外放抽听未执行

## Non-blocking residuals
- HF 建议 CTA 至少约2.6s，本任务明确 1.5s，按 1.5s 交付。
- HF 提醒 CTA 字号约33px，低于37px阅读阈值；不影响主标题、口播解说和卡片主值。
- 只旁观官方演示，未核账号是否已开通。

## Hosting
- Pages: https://stefli.github.io/wechat/tvp/genie4-api/
- Release: https://github.com/stefli/wechat/releases/tag/tvp-genie4-api
- Asset: https://github.com/stefli/wechat/releases/download/tvp-genie4-api/project_genie_api_2k.mp4


