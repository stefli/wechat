# SOURCES · 商汤 SenseNova U1.6

选题日期以官方页面为准，不是独立实测。

## 官方发布
- 中文新闻：https://www.sensetime.com/cn/news/sensenova-u1-6-open-source-20261124-1152 （2026-11-24 发布并开源）
- 英文新闻：https://www.sensetime.com/en/news/sensenova-u1-6-open-source-20261126-1454
- 产品页：https://sensenova.ai/u1-6-lite
- 发布机构：商汤科技 SenseTime / SenseNova。

## 官方演示（可下载 mp4，2026-11-28 核验）
- Self-Correction 海报：https://sensenova.ai/u1-6-lite/assets/en/correction-poster.mp4 （3,731,299 B，14.000s，1920×1080，有声）
- 对照：https://sensenova.ai/u1-6-lite/assets/en/correction-compare_1452.mp4 （8,085,162 B，14.000s）
- 另有官方 movie_cards、rock_collage、shanghai_21、strawberry_23 同目录 mp4。Hugging Face 有备份。

## 分镜入点
- 拍 01：海报片 3.0s。t=0 是白底提示条「Create a vintage movie poster」，属片头空镜；3.0s 已出带错字「LLICATION」的首稿，是最抓眼、也最贴钩子的开场。
- 拍 02：movie_cards 4.0s，信息卡界面，交代产品身份。
- 拍 03：海报片 6.0s，放大错字并给出修正指令。
- 拍 04：shanghai_21 4.0s，信息图自修正，对应官方训练重点。
- 拍 05：海报片 10.0s，已改成「A PLACE WHERE THE TIME DOESN'T EXIST」。
- 拍 06：strawberry_23 4.0s，另一张带文字的官方海报。

## 口播事实（均来自官方，非本片实测）
- 日期：2026年11月24日发布并开源。
- 流程：先按提示出首稿，再对照提示检查，发现错字、乱码或编号不对就改出一版。
- 自修正主要针对信息图训练；官方写在部分其他画面里同样能用。
- UltraTextBench：开启自修正后 86.04 → 92.28；内部观感评分比 U1.5 Lite 高约一成。
- 8B（八十亿参数）权重开源；官方写已接入小浣熊、Seko、Kapi 相机、ComfyUI。

## 制作说明
本片只使用上述官方演示，没有独立部署或复测模型。此条仅写在信源与制作记录，不入口播、不进画面字幕。
