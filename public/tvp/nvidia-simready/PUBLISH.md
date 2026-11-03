# PUBLISH — NVIDIA SimReady Central：不是空壳模型

## A · 主推版

不是空壳模型——带碰撞和质量，就能直接仿真。英伟达上线了 SimReady Central。

2026年10月21日，NVIDIA 在 Hugging Face 官宣开源库 **SimReady Central**：面向物理 AI 训练环境和 AI 工厂数字孪生的仿真就绪 OpenUSD 资产，起步 **2000+** 套，**免费、免登录（ungated）**。

库里有机械臂和夹爪、仓配设备、机架、冷却设施等。关键点：SimReady 不等于好看网格。CAD 只是起点，还要补碰撞几何、质量、摩擦、关节结构与限位、语义标签，以及仿真需要的材料/传感器属性。规格靠 SimReady Foundation 画像和校验工具卡住。

发现方式：NVIDIA USD Search 自然语言检索；HF 侧也接了带仿真元数据的索引搜索。示范场景包括 Isaac Sim / PhysX 里的机械臂抓取，以及机柜+散热布局比对与净空检查。OEM 贡献路径已开：Vertiv、多家机器人厂商、家电与道具等可走提交通道。

社区有人点过目录规模大约两千五百多顶层、总容量约四百多 GB——那是二次文件统计，口播仍以官方「2000+」为准。很多包标 CC-BY-4.0，但许可证可能因贡献方而异，用前务必逐包看 LICENSE。

你会先下载一套机械臂练抓取，还是先拖机柜搭数字孪生？

#SimReady #NVIDIA #OpenUSD #IsaacSim #科技快播 #老李的AI江湖 #物理AI #数字孪生

## B · 一句话短版

英伟达开源 SimReady Central：2000+ 仿真就绪资产，免费免登录；不是空壳模型，带碰撞/质量/关节就能仿真；可自然语言搜，抓取与机柜布局都有示范。用前逐包看 LICENSE。

#SimReady #NVIDIA #OpenUSD #科技快播 #老李的AI江湖

## C · 结构化要点版

📊 NVIDIA SimReady Central：仿真就绪开源资产库

▪️ 官宣：2026-10-21 Hugging Face 博客（NVIDIA）  
▪️ 定位：物理 AI 训练环境 + AI 工厂数字孪生起步库  
▪️ 规模：官方 2000+ 套 · 免费 · ungated  
▪️ 格式：SimReady OpenUSD（非仅漂亮网格）  
▪️ 物理：碰撞 / 质量 / 摩擦 / 关节限位 / 语义标签  
▪️ 发现：USD Search 自然语言 + HF 索引元数据  
▪️ 示范：Isaac 抓取 · 机柜散热布局比对  
▪️ 边界：许可证逐包核对；社区文件数/体积为二次统计  

别从空壳网格重头补物理——先领现成零件开练。

#SimReady #NVIDIA #OpenUSD #IsaacSim #科技快播 #老李的AI江湖
