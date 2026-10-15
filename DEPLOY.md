# Deploy status (2026-10-15 Asia/Shanghai)

## Live trial URL (Netlify Drop anonymous)
- Site: https://super-monstera-140875.netlify.app/
- COPY page (phone): https://super-monstera-140875.netlify.app/gpui-rust-printer-agent/
- Password (Netlify Drop default): see `deploy-claim.json` / CLI output (`My-Drop-Site`)
- **Claim within ~1 hour** or the anonymous site may be deleted:
  - Open claim URL in `deploy-claim.json`, or
  - `netlify claim --site <site_id> --token <drop_token>` after `netlify login`

## Private source
- Cursor Origin (internal): https://origin.cursor.com/bluemarlinai/wechat-copy-kit.git
  - Created empty; **git push needs Origin credentials** (clone without auth failed).
  - Local history staged at `/workspace/wechat-copy-kit` (pages + public + scripts).
- GitHub: **not connected** (`cursor-github` needsAuth; `gh` not logged in). Cannot create `stefli/wechat-copy-pages` until user connects GitHub / sets `GH_TOKEN`.

## Recommended permanent setup (parent / Justin)
1. Connect GitHub in Cursor (or `gh auth login` / `GH_TOKEN`) → create **private** repo `wechat-copy-kit` → push `/workspace/wechat-copy-kit`.
2. Claim the Netlify site (or create permanent Netlify site + `NETLIFY_AUTH_TOKEN` + `NETLIFY_SITE_ID`).
3. Per article: `scripts/publish.sh <slug>` with env tokens set.

## Cloudflare / Vercel / Surge
- No CF/Vercel/Surge tokens or logins on this box — skipped.
