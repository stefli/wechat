# PUBLISH — Microsoft Authenticator CVE-2026-80097 · 科技快播

## A · 主推版

零权限 App，也能冒充 Teams 偷工作号 Token？微软 Authenticator 安卓版经纪层曝出已修复漏洞 CVE-2026-80097，CVSS 8.6。

研究员 Ofek Levin（Enclave）公开：恶意 App 可启动可导出的 AccountChooserActivity，自填包名和签名字段，让经纪层当成 Teams，进而拿到邮件、文件、日历等 Graph 令牌。微软已在 6.2606.4246 及以上修好。

口径要分清：微软顾问写还要用户走完一次认证流；Enclave 实测称设备上已登录经纪时几乎无需额外界面。截至 10 月底暂无已知在野利用——请立刻更新，不要当谣言。

你会先去应用商店升版本，还是让 IT 用 MDM 卡最低版？

#MicrosoftAuthenticator #CVE202680097 #Android安全 #科技快播 #老李的AI江湖

## B · 一句话短版

Authenticator 安卓经纪漏洞已修：零权限 App 可冒充 Teams 拿工作号 Token。CVE-2026-80097 · CVSS 8.6 · 升到 6.2606.4246+。微软与 Enclave 对是否还需额外认证界面说法不一，暂无在野利用——先更新。

#CVE202680097 #Authenticator #科技快播 #老李的AI江湖

## C · 结构化要点版

📊 Authenticator 安卓 CVE-2026-80097：已修复，请更新

▪️ 影响：零权限恶意 App 可冒充微软一方 App（如 Teams）骗经纪层发 Token  
▪️ 后果：工作号邮件 / 文件 / 日历等 Graph 访问（测试所见）  
▪️ 编号与评分：CVE-2026-80097 · CVSS 8.6 Important · 微软 2026-09-08  
▪️ 修复：Authenticator Android **6.2606.4246+**（商店或 MDM）  
▪️ 口径：微软强调需完成认证流；Enclave PoC 称已登录经纪下几乎无额外 UI——勿混成一句  
▪️ 现状：截至 2026-10 下旬暂无已知在野利用  

已打补丁的官方 CVE，不是谣言——先升版本再说。

#MicrosoftAuthenticator #CVE202680097 #移动安全 #科技快播 #老李的AI江湖
