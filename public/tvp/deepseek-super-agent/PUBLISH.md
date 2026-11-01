# PUBLISH — DeepSeek Super-agent

## A · 主推版

DeepSeek 昨晚公开了一套 Super-agent 设计，还开源了研究原型——不是发正式产品，是把路子摊开给工程界看。

10月31日晚，DeepSeek Harness 团队公开《Super-agent 设计探索》，并同天开源研究原型 dsh-superagent-prototype（MIT）。目标很直白：一直在线，能同时干多件事，还会自己找活干；出问题还能自愈。调度、缓存、存算分离、Watchdog 这些操作系统思路，被搬进了 Agent 架构。

开源仓库面向单个 GitHub 仓库的主动编程助手：听 GitHub（可选飞书），开自己的会话目录干活，常以 PR 回信；人缺席的事项进面板。文章强调：公开适配版 ≠ 内部系统 ≠ 文章全量设计，也不是正式产品。

初步实验（模拟场景）：一半任务约 12.4 分钟、百分之九十五约 15.7 分钟内完成，明显更稳；直通能少约三成分派决定与大量 token；批处理把单决定从 6.4 秒摊到 1.6 秒。几道开放问题还在——别当发版成绩单。

系统先把会话调度扛住，人就能腾出手去拍板、去验收。你会不会在自己的仓库里试这个原型？

#DeepSeek #SuperAgent #Harness #Agent架构 #开源 #科技快播 #老李的AI江湖

## B · 一句话短版

DeepSeek 昨晚：公开 Super-agent 设计 + 开源研究原型（非正式产品）；一直在线、能同时干多件事、还会自己找活；上面分活下面干活；实验一半约十二分钟出头、九五约十六分钟内；模拟场景，别当发版成绩单。

#DeepSeek #SuperAgent #科技快播 #老李的AI江湖

## C · 结构化要点版

📊 DeepSeek Super-agent：设计探索 + 研究原型

▪️ 时间：2026-10-31 晚（智东西 11/1 报道）  
▪️ 文章：《Super-agent 设计探索：迈向更自主的 Agent 系统》（Harness 团队）  
▪️ 开源：deepseek-ai/dsh-superagent-prototype · MIT · 非正式产品  
▪️ 定位：连续 / 高效 / 主动 / 持久；OS 思想进 Agent  
▪️ 五模块：双层架构 · 事件驱动 · 异步多信道 · 存算分离 · 外部 Watchdog  
▪️ 原型：单仓主动编程助手；听 GitHub（+可选飞书）；面板标出需人处理项  
▪️ 实验（模拟/初步）：完成中位 12.4 min · 完成九五 15.7 min；直通省分派 token；批处理 6.4s→1.6s  
▪️ 边界：公开适配 ≠ 内部 ≠ 文章；四道开放问题未解

一句话：不是发 App，是让系统先扛住会话调度，人腾出手去拍板验收。

#DeepSeek #SuperAgent #Harness #科技快播 #老李的AI江湖
