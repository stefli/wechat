# wechat-copy-kit

Private history + publishable static COPY pages for WeChat 公众号 (title/body copy on phone).

## Layout
- `pages/<slug>/COPY-standalone.html` — canonical standalone (data-URI images)
- `public/<slug>/index.html` — same file renamed for static hosts
- `scripts/publish.sh` — sync one slug into `public/` then deploy
- `scripts/build-index.py` — rebuild the homepage from each `public/<slug>/index.html` (title + date, newest first) and write the same file to `public/index.html` and `pages/index.html`. `publish.sh` runs it after a sync; run it alone with `python3 scripts/build-index.py`

## Status
See DEPLOY.md for live URL and blockers.
