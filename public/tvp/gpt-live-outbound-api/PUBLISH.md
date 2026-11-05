# PUBLISH — GPT-Live 外呼电话 API GA

## A · 主推版

GPT-Live外呼API正式GA：语音智能体终于能主动拨号了。

OpenAI 工程师 Justin Uberti 宣布，GPT-Live 外呼电话接口推到正式可用：开发者用任意 SIP 中继（官方举例 Telnyx、Twilio）就能让 Live 语音智能体打出去。通话支持高清语音，还能收发按键音，方便穿过电话菜单。Greg Brockman 转发放大了这条消息。

创建会话时指定 SIP 传输、模型 gpt-live-1、号码走国际格式；官方写明外呼走 Live 接口，不走旧的 Realtime 通话创建端点。语音层刊例大约每分钟 0.05 美元，中继运营商费用另算；振铃最长三分钟，接通最长两小时。OpenAI 管智能层，电话网仍交给运营商。

你会先拿客服回访试一通，还是先接进现有 Twilio/Telnyx 中继？

#GPTLive #外呼API #OpenAI #SIP #语音智能体 #科技快播 #老李的AI江湖

## B · 一句话短版

GPT-Live外呼API正式GA：任意 SIP 中继可拨号，高清语音+双向按键音；走 Live 不走旧 Realtime 创建端点；约 $0.05/分钟+中继费。

#GPTLive #外呼API #OpenAI #科技快播 #老李的AI江湖

## C · 结构化要点版

📊 GPT-Live外呼API：正式GA，智能体能拨号

▪️ 信源：@juberti GA 帖（2026-11-05 06:01 CST）+ @gdb 转发 + OpenAI Telephony/SIP 文档  
▪️ 能力：任意 SIP 中继外呼（例 Telnyx/Twilio）· HD Voice · 双向 DTMF  
▪️ 接口：POST /v1/live/sessions · transport.type=sip · 模型 gpt-live-1 · E.164  
▪️ 边界：外呼走 Live API，不走 Realtime call-creation；振铃≤3分钟、接通≤2小时  
▪️ 价格：语音层约 $0.05/分钟（2026-09-10 博客刊例）+ 中继运营商费用另算  
▪️ 角色：OpenAI 管语音智能，PSTN 落地仍交给运营商

一句话：接好中继再接 Live，别把 OpenAI 当成电信商。

#GPTLive #外呼API #SIP #科技快播 #老李的AI江湖
