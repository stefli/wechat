# PUBLISH — GitHub 密钥防护升级：AI 识别无固定格式密钥并拦截推送

## A · 主推版

GitHub 推送保护升级了：密钥拦截不再只靠固定格式。

10月28日 Changelog 宣布，新分类器与微软应用科学合作，会看代码上下文识别疑似密钥，即使没有已知模板也能在推送路径拦截。仓库要先打开推送保护和 AI 密钥扫描，再启用「拦截 AI 检出密钥」。早报显示，能拦到密钥的推送数量翻了一倍以上。

目前是公开预览，面向 GHSP / GHAS；推送路径的 AI 拦截会消耗 AI 额度，默认关闭。

你会不会给关键仓库立刻打开这项拦截？

#GitHub #SecretScanning #PushProtection #密钥扫描 #科技快播 #老李的AI江湖

## B · 一句话短版

GitHub 10/28：推送保护扩展到 AI 识别无固定格式密钥；需已开推送保护+AI 扫描；早报拦截推送数翻倍以上；公开预览 / GHSP·GHAS / 消耗 AI 额度。

#GitHub #PushProtection #科技快播 #老李的AI江湖

## C · 结构化要点版

📊 GitHub 推送保护：Beyond Regex · AI 拦密钥

▪️ 发布：2026-10-28（GitHub Changelog）  
▪️ 新能力：上下文分类器，可拦无固定格式疑似密钥  
▪️ 合作：Microsoft Applied Sciences  
▪️ 启用前提：推送保护 + AI-detected secrets 均已开启  
▪️ 早报：拦到密钥的推送数量翻倍以上  
▪️ 边界：公开预览；需 GHSP/GHAS；推送路径 AI 拦截消耗 AI credits；默认关  
▪️ 路径：Settings → Secret Protection → Block AI-detected secrets

一句话：固定格式不够用了，GitHub 把 AI 密钥检测推进了推送拦截。

#GitHub #SecretScanning #PushProtection #科技快播 #老李的AI江湖
