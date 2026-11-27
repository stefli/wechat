# SOURCES · 智谱 GLM-5.4

选题日期窗口：2026-11-23 至 2026-11-27（Asia/Shanghai）。本片只依据公开官方材料，没有独立跑模型，也没有付费试用。

## 主信源
- Z.ai 官方研究博客《GLM-5.4: Toward Generalized Coding with Our First Loop Transformer》，标注日期 2026-11-23。https://z.ai/blog/glm-5.4
- 智谱官网新闻稿同步刊载，文中演示视频上传时间均为 2026-11-23。https://www.zhipuai.cn/zh/news/164
- 官方演示视频托管于 `https://z-ai-bj.oss-cn-beijing.aliyuncs.com/prompts-rich-media-resources/5.4-blog/`，由官方博客 JS 直接引用。

## 核实过的事实（写进口播与字卡的，均来自上述博客）
- GLM-5.4 是智谱第一个建立在 Loop Transformer（循环变压器）上的旗舰模型。博客写它把已预训练的基座改造成循环结构，而不是从零预训练循环模型。
- 架构：循环 GLM-5 基座中的 28 层，迭代两轮。官方把参数规模写成 750B。
- 官方表述：智力水平可与 2T–3T 参数量级的模型相比；这是官方自己的对照口径，本片不改写成独立评测结论。
- 博客展示四类 Generalized Coding 演示，均为官方自称端到端由模型用代码完成：
  1. Scaling Coding to Video：自述音乐视频 *Hello World*（`27570_1795400681.mp4`）
  2. Scaling Coding to Engineering：在 FreeCAD 中做工程级六轴机械臂（`1517_1795370530(原视频).mp4`）
  3. Scaling Coding to Games：完整游戏，含角色移动、物理、地图、战斗与美术（`a2b99f0a783fafdbfdd9b6b19d104595_raw.mp4`，本片只截取官方片断，不保存完整大文件）
  4. Scaling Coding to 3D：用纯数学几何和自定义 GLSL 着色器从零生成交互式三维观鸟（`331_1795422567_raw.mp4`）
- 博客写明局限：模型容易陷入过长的 “marathon thinking” 反复思考；这种长时间反思和自我纠正会提高准确率，但也是明确写出的短板。
- 权重：官方写计划在完成必要的安全加固后负责任地开源；API 页面标注 Coming Soon。本片制作时权重尚未开放。
- 推理速度是官方基础设施数字：空闲时段最高约 200 tokens/s，高峰约 70–80 tokens/s。本片未写入口播，以免听成独立实测。

## 未写进口播的边界
- 博客里 30B 对照实验、门控更新、混合 KV cache、稀疏注意力索引复用等机制细节，只留在本文件和画面需要时的字卡，不编造成可上手的消费级产品。
- 音乐视频官方未在这段文字里展开配乐是否全部由本模型生成；只采用博客标题口径「self-narrated music video」。
- 本片没有独立实测，也没有使用 Z.ai Chat / ZCode 试用。
