# VoiceStudio 可商用免费参考人声

> 用途：本地克隆 / TTS 评测时的参考音源清单。  
> 整理日期：2026-10-18  
> 原则：只用明确 **CC0 / CC-BY / 公共领域**；禁止未授权名人/真人克隆；Freesound 必读单条附加条款。

## 推荐主源

### 1. OwenTyme/voice-zero

- **许可证**：CC0
- **链接**：https://github.com/OwenTyme/voice-zero
- **怎么用**：仓库 `voices/` 目录；已裁到约 8–11 秒，适合零样本克隆；子目录 README 有归因（来源多为 LibriVox / Internet Archive）。
- **注意**：评测冒烟首选；文中写清「参考音为 CC0，非本人音色」。

### 2. OHF-Voice/voice-datasets（Nabu Casa）

- **许可证**：CC0（多语）
- **链接**：https://github.com/OHF-Voice/voice-datasets
- **怎么用**：含英文 joe / kathleen 等样例；页上可听可下。
- **注意**：适合多语对照冒烟。

### 3. Mozilla Common Voice

- **许可证**：CC0（公共领域放弃）
- **链接**：https://commonvoice.mozilla.org/en/datasets （亦见 Mozilla Data Collective）
- **怎么用**：选语言/版本（可先下较小 Delta Segment），解压取 MP3 片段作克隆参考。
- **注意**：禁止尝试识别说话人身份；勿整库镜像再分发；非名人库，但仍勿用于冒充真人。

### 4. LibriSpeech（源自 LibriVox）

- **许可证**：CC BY 4.0（可商用，需署名）
- **链接**：https://www.openslr.org/12/
- **怎么用**：建议先下 `dev-clean` / `test-clean`（约 300+ MB）；按说话人 ID 抽 5–30 秒清晰朗读作参考。
- **注意**：署名需带 LibriSpeech / CC BY 4.0；内容为有声书朗读，非现代口语。

### 5. LibriVox（原始有声书）

- **许可证**：公共领域（美国；他国请自查）
- **链接**：https://librivox.org/ （单本可下 MP3/ZIP）
- **示例**：https://archive.org/details/5belovedstories_ohenry_pc_librivox （O. Henry · Phil Chenevert）
- **怎么用**：搜单人朗读书，下载章节 MP3，截取干净人声段（跳过片头，约 10–30 秒）。
- **注意**：官方称可自由商用、可不署名（建议仍注明来源）；勿选名人传记旁白当「名人音色」；境外版权自查。

### 6. Freesound（仅 CC0 人声）

- **许可证**：须逐条选 **Creative Commons 0**（可商用、通常无需署名）
- **链接**：https://freesound.org/search/?q=speech+voice&f=license%3A%22Creative+Commons+0%22
- **怎么用**：登录后按条下载 WAV；优先长、干净、单人说话条。
- **注意**：部分上传者在描述里**额外禁止 AI/克隆**——描述优先于标签；避开 BY-NC；勿用名人/角色拟声。

### 7. Thorsten-Voice（Hugging Face，单说话人）

- **许可证**：CC0
- **链接**：https://huggingface.co/datasets/Thorsten-Voice/TV-44kHz-Full
- **怎么用**：从 HF 取样例 WAV（德语、男声、约 44.1 kHz），作高质量单说话人克隆基线。
- **注意**：贡献者自愿捐赠本人声音且明确开放；评测可商用，但仍勿用于欺诈性冒充。

## 备选

### LJ Speech

- **许可证**：美国公共领域
- **链接**：https://keithito.com/LJ-Speech-Dataset/
- **直链**：https://data.keithito.com/data/speech/LJSpeech-1.1.tar.bz2
- **怎么用**：经典英文女声 TTS 对照；解压后按 wavs 抽样。

## 不推荐作「真人参考」

- **Piper 试听页**（https://rhasspy.github.io/piper-samples/）：多为**合成音**，且各声线 `MODEL_CARD` 许可证不一；仅适合 TTS 对比，不适合当真人参考。
- **Coqui 生态**：已变动，勿默认可商用。

## 评测最短路径

1. 从 **voice-zero** 或 **Common Voice** 下一两段干净人声。
2. 丢进 VoiceStudio 做克隆。
3. 生成约 30 秒旁白（可接 Remotion 口播）。
4. 文中标明：参考音许可证 + 「非本人音色」。

## 中文说明

中文可商用「真人参考音」开源包很少。评测可先用 **英文 CC0** 说明工具能力，诚实写清边界。

## 总红线

- 只用明确 CC0 / CC-BY / 公共领域。
- 禁止未授权名人、网红、熟人音色克隆。
- Freesound 必读单条描述附加条款。
- 勿整库镜像再分发 Common Voice 等大数据集。
