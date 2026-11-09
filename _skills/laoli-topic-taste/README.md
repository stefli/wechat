# laoli-topic-taste

> Laoli skills series · `laoli-topic-taste`  
> Repo: https://github.com/stefli/laoli-topic-taste

**老李选题偏好与自动开做** — 按 Justin 在新闻捕手的**真实点名证据**筛题，并支持未来培训 / 早间自动开做。

## 这是什么
- 运行时技能：从小时报、晨汇总、选题池打分，自动先开快播或图文实测。  
- 培训包：`TRAINING_TOPICS.md`（题材热度信号）+ `BLOGGERS.md`（盯梢账号）。  
- **不是**「大厂+开源」口头两句概括；以池表与小时报为准。

## 和 laoli-topic-pool 的关系
| 仓 | 职责 |
|----|------|
| [laoli-topic-pool](https://github.com/stefli/laoli-topic-pool) | 公众号选题**任务池**状态机（catcher-NN、日更约 2 篇） |
| **laoli-topic-taste**（本仓） | **怎么挑**：点名口味、快播/图文分流、培训题材与博主盯梢 |

成稿仍交 [laoli-review](https://github.com/stefli/laoli-review)；竖屏成片走 [laoli-tvp](https://github.com/stefli/laoli-tvp)。

## Install
1. Clone 到 agent skills / workflows 目录。  
2. 打开 `SKILL.md`（frontmatter `name` / `description` 决定加载时机）。  
3. 培训或自动筛题时同时 Read `TRAINING_TOPICS.md`、`BLOGGERS.md`。

Local source id（本 box）：`skill-1794260975574`

## Layout
```
SKILL.md
TRAINING_TOPICS.md
BLOGGERS.md
README.md
```

## Series
Part of **[laoli-skills](https://github.com/stefli/laoli-skills)** — shared skill pack for Justin / 老李的AI江湖 agents.

## License
Private workflow for the owner unless noted otherwise. Do not publish secrets; paths use placeholders where needed.

## GitHub location (temporary mirror)

Dedicated repo `stefli/laoli-topic-taste` could not be created (token lacks `createRepository`). Until then this tree is mirrored at:

https://github.com/stefli/wechat/tree/main/_skills/laoli-topic-taste

`_skills/` is **not** part of GitHub Pages (`public/`).
