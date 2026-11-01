# PUBLISH — DeepSeek Super-agent

## A · 主推版

DeepSeek 没发新产品，先把 Super-agent 的「系统层」摊开了。

10月31日晚，DeepSeek Harness 团队公开《Super-agent 设计探索》，并同天开源研究原型 dsh-superagent-prototype（MIT）。它想做的是一直在线、能并行多任务、会主动找活、出问题还能自愈的 Agent——把调度、缓存、存算分离、Watchdog 这些操作系统思路，搬进 Agent 架构。

开源仓库面向单个 GitHub 仓库的主动编程助手：听 GitHub（可选飞书），开自己的会话目录干活，常以 PR 回信；人缺席的事项进面板。文章强调：公开适配版 ≠ 内部系统 ≠ 文章全量设计，也不是正式产品。

初步合成实验：Super-agent 任务完成 p50 12.4 分钟、p95 15.7 分钟，明显稳过单 Session+Subagent；直通省 Router 约三成决定与大量 token；批处理把单决定推理从 6.4 秒摊到 1.6 秒。合成负载、四道开放问题还在——别当发版结论。

系统层接管会话调度后，人更该上移到决策和验收。你会不会在自己的仓库里试这个原型？

#DeepSeek #SuperAgent #Harness #Agent架构 #开源 #科技快播 #老李的AI江湖

## B · 一句话短版

DeepSeek 10/31：公开 Super-agent 设计 + 开源研究原型（非正式产品）；一直在线/并行/主动/持久；Router+Worker；实验 p50 12.4 分 / p95 15.7 分；合成负载仅供参考。

#DeepSeek #SuperAgent #科技快播 #老李的AI江湖

## C · 结构化要点版

📊 DeepSeek Super-agent：设计探索 + 研究原型

▪️ 时间：2026-10-31 晚（智东西 11/1 报道）  
▪️ 文章：《Super-agent 设计探索：迈向更自主的 Agent 系统》（Harness 团队）  
▪️ 开源：deepseek-ai/dsh-superagent-prototype · MIT · 非正式产品  
▪️ 定位：连续 / 高效 / 主动 / 持久；OS 思想进 Agent  
▪️ 五模块：双层架构 · 事件驱动 · 异步多信道 · 存算分离 · 外部 Watchdog  
▪️ 原型：单仓主动编程助手；听 GitHub（+可选飞书）；面板标出需人处理项  
▪️ 实验（合成/初步）：p50 12.4 min · p95 15.7 min；直通省 Router token；批处理 6.4s→1.6s  
▪️ 边界：公开适配 ≠ 内部 ≠ 文章；四道开放问题未解

一句话：不是发 App，是把「系统层接管会话」这条路摊开给工程界看。

#DeepSeek #SuperAgent #Harness #科技快播 #老李的AI江湖
