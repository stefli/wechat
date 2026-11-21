# Project Genie 开放入口 · source ledger

Angle locked: 2026-11-18 / 2026-11-19 access and API entry updates. This is not a model debut film. An earlier research-preview short exists at `/workspace/genie4_world_model` (2026-10-27). This piece does not retell that launch.

## Primary sources (verified this run)
1. https://blog.google/innovation-and-ai/models-and-research/google-deepmind/genie-4-now-available-project-genie/
   Official date 2026-11-18; converted publication time 2026-11-19 02:00 Asia/Shanghai.
   Quoted: rolling out a new Project Genie experience to eligible Google AI Ultra subscribers; eligible Ultra subscribers can try the new experience, Google AI Pro members can join the waitlist on the same page; still tackling camera latency, intricate physical interactions, real-time audio precision, and long-term scene permanence.
2. https://blog.google/innovation-and-ai/technology/developers-tools/genie-4-in-gemini-api/
   Official date 2026-11-19; converted publication time 2026-11-20 01:00 Asia/Shanghai.
   Quoted: available for developers through the Gemini API (via the Interactions API) and Google AI Studio; generating continuous 720p worlds at 24fps with synchronized native audio; keyboard controls alongside live text prompts to change weather, lighting, objects, or events.

Chronology caution: the API post contains the phrase “Following yesterday’s Genie 4 launch.” That wording can be confused with the older research preview. This film only states the dated access updates above. It does not invent a first-release chronology, and it does not call 11月18日 a model debut.

720p / 24fps is the official model output specification, not the encoding of the downloaded official videos (2156×1212, typically 30fps). The finished film is 1440×2560.

Not claimed: free or global access; a specific API price (the post tells readers to review pricing, but this script does not invent a number); SynthID as a guarantee of accuracy; Genie 3 capabilities (3-minute sessions, world chaining, 360 panorama / Petra) as Genie 4 features. Observer only; no account login or hands-on test.

## Official footage (copied, not moved or deleted)
Research originals remain in `/workspace/tvp_new_20261121/research/genie4-api/`.
- ants: https://storage.googleapis.com/gweb-uniblog-publish-prod/original_videos/resized_ants_tBlKUGA.mp4
  Local copy `assets/ants.mp4`. 2156×1212, 14.000s, 30fps.
- create flow: https://storage.googleapis.com/gweb-uniblog-publish-prod/original_videos/resized_Create_Flow_Y8D7l7t.mp4
  Local copy `assets/create_flow.mp4`. 2156×1212, 23.390s, 30000/1001 fps.
- Villa Giallo: https://storage.googleapis.com/gweb-uniblog-publish-prod/original_videos/resized_Villa_Giallo.mp4
  Local copy `assets/villa.mp4`. 2156×1212, 16.900s, 30fps.
The API social keyart / title bumper (`Genie 4 now available in the Gemini API…`, person in a car) was inspected and is not used in Beat 01 or as a hook.

## Beat in/out
1. ants 3.500–8.700: live ant-hill world, still green at inpoint, shifts to purple with camera motion. Frame-tuned from a 5fps strip starting 2.8s; color change begins ~4.4–4.8s. Not a still, not keyart, not a person from behind.
2. create_flow 0.400–5.800: official “what do you want to create” entry UI and world thumbnails. Supports the 11月18–19 access-update line; not a fabricated calendar graphic.
3. create_flow 6.000–13.200: Earth / spacewalk official canvas with live prompt sidebar. Developer path and 720P/24fps cards are sourced to the API article, not read off this clip’s encode.
4. create_flow 15.000–21.800: official ship arrival over Earth after the in-world prompt. Opens on the ship already entering frame (tuned from a 2fps strip at 13–23s).
5. villa 0.500–6.700: official “Villa Giallo” gothic-manor walk. Eligibility (Ultra / Pro waitlist) is sourced to the 11月18日 article; this clip is not a paywall screenshot.
6. villa 8.800–15.600: continued official manor; last live frame held 1.5s under the CTA. Limitations (latency, physics, not a complete game engine) are sourced to the official research-caveat paragraph.

Clips are mildly retimed to narration length. That is editorial timing, not a performance benchmark. No invented third-party UIs.

## Other assets
Cover A/B background: official ants frame at 5.400s (purple mound, ants visible). Fonts: locally installed Anton, Oswald (Google Fonts) and Noto Sans SC.
Music: original procedural score `gen_music.py`, seed 2026111819; modal pads, sparse plucked figures, changing register, no commercial recording, no hard percussion loop.
Voice: 云阳旁白（edge-tts 云阳）; system python3; zh-CN-YunyangNeural, rate=+14%, pitch=-1Hz; classic master chain in gen_voice.py; 48 kHz stereo WAV. No CosyVoice2 / cloned voice.
