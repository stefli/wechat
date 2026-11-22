# STATUS · shanghai-ailab-pi4

- Composition/Deliverable: 1440×2560 true 2K · no 4K unless Justin asks
- Slug: `shanghai-ailab-pi4`
- 工程：`/workspace/shanghai_ailab_pi4_20261122/`
- 选题 brief：`/workspace/tvp_evening_20261122/BRIEFS.md` 与 `briefs.json`
- 成片：`outputs/shanghai_ailab_pi4_2k.mp4`
  - 51.904 s，1557 帧，1440×2560 H.264 yuv420p bt709 30 fps + AAC 48 kHz stereo ~195 kb/s
  - 48,973,940 bytes
  - SHA256 `45a5a950915c2604ad6dc685d709a199a92844e5c47d7b7a3f60e5fe52bf1a8d`
  - inode 208406，mtime 2026-11-22 20:27:02.748836342 +0800（Asia/Shanghai）
  - 响度 I=-16.15 LUFS，TP=-1.49 dBTP，LRA=3.00 LU；blackdetect 无命中
- 中间画：`outputs/shanghai_ailab_pi4_raw_2k.mp4`（HyperFrames portrait-1440p，flock `/workspace/tvp_evening_20261122/HF.lock`）；成片音轨替换为 `assets/master.wav`（VO 1.0 + BGM 0.40，两遍 loudnorm I=-16 TP=-1.5）
- 旁白：云阳 `zh-CN-YunyangNeural` +14% / -1Hz（覆盖过期 CosyVoice2 克隆规定）
- 旁白审稿：一句一意；无相对时间；不把 874×480 源说成 4K；不声称本地跑通；几何平均排名最高限定在论文 16 项几何评测的对比方法里；跟踪只写成有竞争力；数字阿拉伯数字；画面解说与口播同词；headline-zh 为当拍口播原词。已勾选。时长按口播 51.904 s，未硬凑。
- Beat 01：官方结果演示 `anna_local.mp4`（874×480）从 14.00 秒 1 倍速开场，花样滑冰带轨迹，非 Ken Burns、非静图。
- Beat 02：同一时刻官方输入 `anna_input.mp4`（384×216）与官方结果并排，字标「官方输入 / 官方结果」。
- 其余拍：waterfall1_local @ 4.00s；007_local @ 8.00s；robot_local @ 1.00s；kart_local @ 2.00s。全部先装进 1920×1080 模糊填充，完整保留官方画幅。
- 封面 B 主推 + A 备选：锁定模板结构（Bebas 叠字 PI4 / 4D SCENE；A 居中黄胶囊），字号按技能（EN 栈 top 300px，ZH 168px），已出 2160×2880 PNG 与 1080×1440 q90 JPG。A 把滑冰人物和轨迹放在未移动的黄胶囊上方。
  - B PNG `posters/publish_test/cover_B_hypebeast_3_4.png` 3,891,985 B SHA256 `4e703116c692e698ba07d90792acb254c9bd6544e34b5eb31d9135b22af80d3c`
  - B JPG `posters/douyin_upload/cover_B_shanghai-ailab-pi4_1080x1440_q90.jpg` 237,071 B SHA256 `5014743462edb6b5153cc6f6d4547ab05942c39ba714c5ae1520caa13021f558`
  - A PNG `posters/publish_test/cover_A_yellow_tape_3_4.png` 2,413,851 B SHA256 `0a120cf0f6241ac6cd69fa84d7b21b362a097394007da76ed0e2d78a059151e2`
  - A JPG `posters/douyin_upload/cover_A_shanghai-ailab-pi4_1080x1440_q90.jpg` 202,327 B SHA256 `47e8ee6dfedb8b6d8f0251e44e4850bf79fd8c9143e5d1badda039b6f2d6e8d2`
- PUBLISH A/B/C 已写。SOURCES.md 已写。
- videoReview 未在已安装工具里找到可用接口，未假装看过成片；QA 为 ffprobe + 响度 + 抽帧 Read。抽帧：`outputs/qa/`。
- 制作阶段未推仓；本次仅托管本选题，不改稿件库脚本/状态/PAT，不社交发布。第 3 题仍不足，未扩展搜索、未硬做。渲染锁已释放。

## Hosting
- Pages: https://stefli.github.io/wechat/tvp/shanghai-ailab-pi4/
- Release: https://github.com/stefli/wechat/releases/tag/tvp-shanghai-ailab-pi4
- Asset: https://github.com/stefli/wechat/releases/download/tvp-shanghai-ailab-pi4/shanghai_ailab_pi4_2k.mp4
- 发布内容仅新增本选题；视频保持原字节和SHA256，未改稿件库功能。
