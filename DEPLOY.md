# Deploy status (2026-10-15 CST / Asia/Shanghai)

## Live trial URL (Netlify Drop, anonymous)
- Listing: https://super-monstera-140875.netlify.app/
- **COPY (phone):** https://super-monstera-140875.netlify.app/gpui-rust-printer-agent/
- Site password (Netlify Drop default): `My-Drop-Site` — phone browser will ask once
- Claim before **~11:20 CST 2026-10-15** (≈1h after deploy) or the site may be deleted
- Claim details: `/workspace/wechat-copy-kit/deploy-claim.json` (gitignored)

## Private / internal source
- **Cursor Origin (internal, empty remote):** `https://origin.cursor.com/bluemarlinai/wechat-copy-kit.git`
  - Created via cursor-origin; visibility=internal
  - Local content committed under `/workspace/wechat-copy-kit` (pages/public/scripts)
  - `git push` blocked: no Origin HTTPS credentials on box
- **GitHub:** not available — `cursor-github` status `needsAuth`; `gh` not logged in; no `GH_TOKEN`
  - Cannot create private `stefli/wechat-copy-*` until Justin connects GitHub in Cursor

## Cloudflare / Vercel / Surge
Skipped — no tokens/CLI logins on this box.

## Publish next articles
```bash
# after claiming Netlify + setting tokens:
export NETLIFY_AUTH_TOKEN=...
export NETLIFY_SITE_ID=fbd80c91-e78e-4547-b426-ad3e66288579
/workspace/wechat-copy-kit/scripts/publish.sh <slug>

# or anonymous again (new claimable site):
/workspace/wechat-copy-kit/scripts/publish.sh <slug>
```
Expects `/workspace/reviews/<slug>/COPY-standalone.html` (self-contained data-URI OK).
