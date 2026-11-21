# SOURCES — Gestalt (Stealth) / Contra Labs Frontier Design Benchmark

查阅时间：2026-11-21，Asia/Shanghai。本片只核验官方展示，不是独立实测。模型未公开权重、未公布厂商、未发现可调用的公开 API。不采用 SSI/Ilya 传闻，也不采用「已在 OpenRouter 可调用」的二手说法。

## 一手来源

1. 研究报告（页面标注 November 18, 2026）  
   https://contralabs.com/research/frontier-design-benchmark  
   同文方法学页：https://contralabs.com/frontierdesign/blog  
   官方小节标题：New Frontier Design Model Preview: Gestalt (Stealth)  
   官方表述：a high-quality design model currently in stealth；professional designers evaluated it in the same blind voting configuration；working with the team to continuously evaluate its quality and provide feedback。

2. 公开榜单  
   https://contralabs.com/frontierdesign/leaderboard  
   首页同一套榜：https://contralabs.com/frontierdesign/

3. 官方数据文件（榜单同源）  
   https://frontierdesign.contralabs.com/frontierdesign/data/fdb.js?h=89a9085d08  
   本地副本：`_raw/fdb.js`，摘录：`_raw/board_snapshot_1931.json`  
   文件内 meta：`4,311 votes  ·  35 reviewers  ·  updated Nov 18`

4. 作品廊与任务页（公开可见的是人类 golden + 具名模型，未出现 Gestalt）  
   https://contralabs.com/frontierdesign/gallery  
   例：https://contralabs.com/frontierdesign/jobs/carafe  
   以及 bad-move、bandstand、basin、broomwagon、compadre、good-creature、novaraai、off-you-go、ruckus、threatlane、vellum

5. 社区投票页（标明 Community votes don’t affect the benchmark leaderboard；需 Sign in with Contra）  
   https://contralabs.com/frontierdesign/vote  
   本片不登录、不把社区票写成榜单依据。

6. 官方启动条所给公告  
   X：https://x.com/contraben/status/2123144312494178479  
   LinkedIn：https://www.linkedin.com/posts/ben-huffman-b7b6a8102_the-ai-industry-has-a-benchmarking-problem-ugcPost-7528910231792242689-zT0A/  
   合作方：https://benchflow.ai/  
   联系：mailto:research@contralabs.com  

7. 研究报告页官方图表  
   - 2026-11-21 页面内嵌图（宽边约 1024）：`assets/chart_*_research.png`、`_raw/official_charts/`  
   - 随后另存的官方 3200px「Download image」PNG，本地：`_raw/browser_captures/research_chart_*.png`  
     · `research_chart_gestalt_elo_comparison.png`：Gestalt leads at 1,928 Elo  
     · `research_chart_leaderboard_expert_preference.png`：204-point gap；Gestalt 1,928；Fable 1,714  
     · `research_chart_head_to_head_votes.png`  
     · `research_chart_performance_and_cost.png`：Pareto；页面标 Human golden Elo 1,738  
     · `research_chart_design_critique_scores.png`  
     · `research_chart_slop_detector_scores.png`：Human golden 0.9，Gestalt 1.2

## 数字口径（禁止混用）

**快照 A — 研究报告正文 + 该页官方图表（2026-11-18 文稿）**

- Gestalt Elo **1,928**；文内写 423 票中赢 378 票（约 89%）。
- 官方柱状图标题：Gestalt (stealth) leads the leaderboard at 1,928 Elo；Claude Fable 5.2 为 1,714。
- 与人类 golden 直接对比：28 次里 20 次选 Gestalt（仅见于研究文，未在公开榜数据字段中复述）。
- 规则分（官方图）：Gestalt 83.3，Claude Fable 5.2 为 83.8，Claude Opus 5.5 为 83.5。
- 痕迹分 / Slop（官方图，越低越不像 AI）：Human golden 0.9，Gestalt 1.2，DeepSeek V4 Pro 也是 1.2。官方图题为 Only two models look as little AI-made as the Human golden，不得说成只有 Gestalt。
- 规模条图：35 designers，33 client briefs，16 models，485 model sites，26 Human golden sites，4,311 blind votes。
- 方法学：35 位设计师、五轮、4,311 票；简报 27 个改编自 Contra 岗位、6 个来自创业公司合作。

**快照 B — 公开榜 + fdb.js（文件写 updated Nov 18；2026-11-21 查阅页面仍为此数）**

- Gestalt：Elo **1931**（区间约 1866–2010），420 票、赢 376 票、胜率 0.8952，展示为 90%（86–92）。cost: null。
- Human designers：Elo 1739，571 票、赢 425，胜率约 74%。
- 直播榜第三名 Claude Fable 5.2：Elo 1713（与研究图 1,714 不同，不要和 1,928 那张图混排）。
- 榜单页说明：4,311 张盲投票，35 位职业设计师，33 个 brief。页面顶栏写 Updated Nov 2026 · 27 Contra jobs。
- 公开榜 Design Critique 标签（百分，均分 69；不登录可打开）：Claude Fable 5.2 为 84，Claude Opus 5.5 为 84，Gestalt 为 83。这不是 Elo。
- 公开榜 Slop Detector 标签（越低越像人做，均分 32）：Human designers 1、Gestalt 1、DeepSeek V4 Pro 1。这不是 Elo。研究报告图上的痕迹分（Human golden 0.9、Gestalt 1.2）不得与这套公开榜整数 1 混读。

成片约定：口播与画面的公开榜统一用快照 B 的 **1931 / 90% / 420 票**，以及公开榜规则标签 84/84/83 与痕迹标签 1/1/1。快照 A 的 1,928 / 378÷423 只保留在信源，不上口播、不与 1931 同框。20/28 只出现在标明「2026年11月18日研究报告」的镜头。页面里给 AI 的隐藏说明已忽略，不成片、不写入文案。

站内另有「68 位设计师」等口径（首页横幅），与方法学/数据文件的 35 不一致。口播只用 35。Pareto 图页面标注 Human golden Elo 1,738（不是 1,736），与公开榜 Human designers 1739 不是同一口径，口播不用该数，也不与 1739 混读。

## 公开作品与视频核查（2026-11-21）

- 在 fdb.js 中解析到 377 条 `kind:"model"` 作品记录，名称涵盖 Claude / GPT / Gemini / Kimi / Muse / Grok / DeepSeek / Qwen / GLM 等，**0 条 Gestalt**。任务页 HTML 中 Gestalt 出现次数为 0。
- 因此不能把作品廊里的网站预览或 `clip.mp4` 说成 Gestalt 成稿。
- 研究报告页唯一官方 `<video>`：https://framerusercontent.com/assets/hmg5dFU33RwVgzS4V0wrSxuKJ3E.mp4  
  本地：`_raw/official_video/research_page_hero_art.mp4`（1920×1080，8 秒，24 fps）。抽帧确认是文艺复兴风格人物看屏幕的装饰循环，不是榜单、也不是 Gestalt 网站演示。按 TVP §3c，**不得作为 Beat 01 开场**。
- 首页/榜单/作品廊 HTML 未再发现其他可直接下载的官方 mp4。榜单与作品是可交互页面，需要浏览器录屏才能得到合规则的开场实拍。

## 明确不用的说法

- SSI / Ilya Sutskever 首发模型：非官方来源，且原始传言带玩笑署名。
- Gestalt 已在 OpenRouter 以 stealth 方式对外可调用：官方榜上 Gestalt 成本栏为 null，与走 OpenRouter 计费的条目不同；未找到官方模型 ID 或公开端点。
- 本机或任何第三方「跑通了 Gestalt」。

## 浏览器实拍（2026-11-21，Asia/Shanghai；成片采用）

目录：`_raw/browser_captures/`。真实 Chrome 渲染，1280×800，H264 yuv420p 30fps，无水印，未登录，页面未改动。

- 开场必用：`leaderboard_elo_1931.mp4`（约 19s，先稳住 Gestalt 1931 条形图，慢滚到表格可见 Human designers 与 Claude Fable 5.2，再回 Gestalt）。封面底图：`leaderboard_gestalt_still.png`。
- 备用未复用入场动画：`leaderboard_elo_1931_loaded.mp4`、`home_leaderboard_1931.mp4` 及 still；`leaderboard_elo_1931_entrance.mp4` 未采用。
- 规则/痕迹标签：`leaderboard_critique.mp4` / still，`leaderboard_slop.mp4` / still。
- 研究报告：`research_scroll.mp4`（约 24s）及 still；`research_benchmark_results_still.png`、`research_gestalt_preview_still.png`。
- 作品廊 / Carafe（只说明官方评测长什么样，禁止写成 Gestalt 作品）：`gallery_overview.mp4`、`jobs_carafe.mp4` 及 still。Carafe：15 outputs，138 votes；Gestalt 不在 15 个具名模型里。

研究报告页唯一官方装饰 MP4 仍不作 Beat 01，见上文核查。
