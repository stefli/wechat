#!/usr/bin/env python3
"""Rebuild the article listing from public/<slug>/index.html.

Writes the same page to public/index.html and pages/index.html (they are
mirrors). Styles live in public/index.css and are copied to pages/index.css
so the mirror stays styled. publish.sh calls this after syncing a slug.

Date: a publication date in the article (meta, <time>, <title>, or a byline
such as 发布于 / 写于 / 日期：). Dates that only appear inside the body
(spreadsheet examples, someone else's log) are not when the piece was
written. If none is present, use the earliest git commit that added
public/<slug>/, shown in Asia/Shanghai as YYYY-MM-DD. A file that is not
in git yet (a slug just copied by publish.sh) falls back to its mtime.
"""

from __future__ import annotations

import html
import re
import shutil
import subprocess
import sys
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
PAGES_INDEX = ROOT / "pages" / "index.html"
PUBLIC_CSS = PUBLIC / "index.css"
PAGES_CSS = ROOT / "pages" / "index.css"
SHANGHAI = ZoneInfo("Asia/Shanghai")

CHROME_HEADINGS = {
    "推荐标题",
    "标题备选",
    "封面",
    "标题",
    "备选标题",
    "复制推荐标题",
}

DATE_RE = re.compile(
    r"(20[12]\d)\s*[-/.年]\s*(\d{1,2})\s*[-/.月]\s*(\d{1,2})\s*日?"
)
BYLINE_RE = re.compile(
    r"(?:发布于|发表于|写于|更新日期|发布日期|成文日期|日期)\s*[:：]?\s*"
    + DATE_RE.pattern
)
META_DATE_RE = re.compile(
    r"(?:property|name)\s*=\s*[\"']"
    r"(?:date|pubdate|article:published_time|article:published|"
    r"og:published_time|dc\.date|dcterms\.(?:created|date))"
    r"[\"']",
    re.I,
)


def esc(text: str) -> str:
    return html.escape(text, quote=True)


def strip_tags(fragment: str) -> str:
    text = re.sub(r"<br\s*/?>", " ", fragment, flags=re.I)
    text = re.sub(r"<[^>]+>", "", text)
    text = html.unescape(text)
    text = text.replace("\xa0", " ")
    return re.sub(r"\s+", " ", text).strip()


def clean_title(text: str) -> str:
    text = re.sub(r"^复制到公众号\s*[｜|]\s*", "", text)
    text = re.sub(r"^[·.\s—\-]+", "", text).strip()
    return text


def meaningful_heading(text: str) -> bool:
    text = clean_title(text)
    if len(text) < 4:
        return False
    if text in CHROME_HEADINGS:
        return False
    if re.fullmatch(r"[·.\s—\-]+", text):
        return False
    return True


def extract_title(raw: str, slug: str) -> str:
    # Prefer 推荐标题 (#rec) — hero/short h1 labels are chrome, not the lead title.
    rec = re.search(
        r"<p\b[^>]*\bid=[\"']rec[\"'][^>]*>(.*?)</p>",
        raw,
        flags=re.I | re.S,
    )
    if rec:
        title = clean_title(strip_tags(rec.group(1)))
        if meaningful_heading(title):
            return title
    for fragment in re.findall(r"<h1\b[^>]*>(.*?)</h1>", raw, flags=re.I | re.S):
        title = clean_title(strip_tags(fragment))
        if meaningful_heading(title):
            return title
    titled = re.search(r"<title\b[^>]*>(.*?)</title>", raw, flags=re.I | re.S)
    if titled:
        title = clean_title(strip_tags(titled.group(1)))
        if meaningful_heading(title):
            return title
    for tag in ("h2", "h3"):
        for fragment in re.findall(
            rf"<{tag}\b[^>]*>(.*?)</{tag}>", raw, flags=re.I | re.S
        ):
            title = clean_title(strip_tags(fragment))
            if meaningful_heading(title):
                return title
    return slug


def _norm_date(year: str, month: str, day: str) -> str | None:
    y, m, d = int(year), int(month), int(day)
    if not (1 <= m <= 12 and 1 <= d <= 31):
        return None
    try:
        datetime(y, m, d)
    except ValueError:
        return None
    return f"{y:04d}-{m:02d}-{d:02d}"


def _first_date(text: str) -> str | None:
    match = DATE_RE.search(text)
    if not match:
        return None
    return _norm_date(*match.groups())


def visible_text(raw: str) -> str:
    text = re.sub(
        r"data:image/[a-zA-Z0-9.+-]+;base64,[A-Za-z0-9+/=\s]+",
        " ",
        raw,
    )
    text = re.sub(r"<script\b[^>]*>.*?</script>", " ", text, flags=re.I | re.S)
    text = re.sub(r"<style\b[^>]*>.*?</style>", " ", text, flags=re.I | re.S)
    text = re.sub(r"<br\s*/?>", "\n", text, flags=re.I)
    text = re.sub(r"</p>", "\n", text, flags=re.I)
    text = re.sub(r"<[^>]+>", " ", text)
    return html.unescape(text)


def date_from_html(raw: str) -> tuple[str, str] | None:
    """Return (YYYY-MM-DD, source) when the article states its own date."""
    for meta in re.findall(r"<meta\b[^>]*>", raw, flags=re.I):
        if META_DATE_RE.search(meta):
            found = _first_date(html.unescape(meta))
            if found:
                return found, "meta"
    for tag in re.findall(r"<time\b[^>]*>", raw, flags=re.I):
        found = _first_date(html.unescape(tag))
        if found:
            return found, "time"
    titled = re.search(r"<title\b[^>]*>(.*?)</title>", raw, flags=re.I | re.S)
    if titled:
        found = _first_date(strip_tags(titled.group(1)))
        if found:
            return found, "title"
    for fragment in re.findall(r"<h1\b[^>]*>(.*?)</h1>", raw, flags=re.I | re.S):
        found = _first_date(strip_tags(fragment))
        if found:
            return found, "h1"
    byline = BYLINE_RE.search(visible_text(raw))
    if byline:
        found = _norm_date(*byline.groups()[-3:])
        if found:
            return found, "byline"
    return None


def git_added_at(slug: str) -> datetime | None:
    """Earliest commit that added public/<slug>/, or None if untracked."""
    path = f"public/{slug}"
    try:
        added = subprocess.run(
            [
                "git",
                "-C",
                str(ROOT),
                "log",
                "--full-history",
                "--diff-filter=A",
                "--format=%aI",
                "--",
                path,
            ],
            check=False,
            capture_output=True,
            text=True,
        )
    except OSError:
        return None
    stamps = []
    if added.returncode == 0:
        stamps = [line.strip() for line in added.stdout.splitlines() if line.strip()]
    if not stamps:
        try:
            any_commit = subprocess.run(
                [
                    "git",
                    "-C",
                    str(ROOT),
                    "log",
                    "--full-history",
                    "--format=%aI",
                    "--",
                    path,
                ],
                check=False,
                capture_output=True,
                text=True,
            )
        except OSError:
            return None
        if any_commit.returncode != 0:
            return None
        stamps = [
            line.strip() for line in any_commit.stdout.splitlines() if line.strip()
        ]
    parsed = []
    for stamp in stamps:
        try:
            parsed.append(datetime.fromisoformat(stamp))
        except ValueError:
            continue
    if not parsed:
        return None
    return min(parsed)


def collect() -> list[dict]:
    rows = []
    for entry in sorted(PUBLIC.iterdir()):
        article = entry / "index.html"
        if not entry.is_dir() or not article.is_file():
            continue
        raw = article.read_text(encoding="utf-8", errors="replace")
        slug = entry.name
        title = extract_title(raw, slug)
        html_date = date_from_html(raw)
        if html_date:
            date, source = html_date
            sort_at = datetime.fromisoformat(date).replace(
                hour=12, tzinfo=SHANGHAI
            )
        else:
            added = git_added_at(slug)
            if added is None:
                added = datetime.fromtimestamp(article.stat().st_mtime, SHANGHAI)
                source = "mtime"
            else:
                source = "git"
            sort_at = added.astimezone(SHANGHAI)
            date = sort_at.strftime("%Y-%m-%d")
        rows.append(
            {
                "slug": slug,
                "title": title,
                "date": date,
                "sort_at": sort_at,
                "source": source,
            }
        )
    rows.sort(key=lambda row: (-row["sort_at"].timestamp(), row["slug"]))
    return rows


def render(rows: list[dict]) -> str:
    items = []
    for row in rows:
        items.append(
            "\n".join(
                [
                    "    <li>",
                    f'      <a class="row" href="./{esc(row["slug"])}/">',
                    f'        <time datetime="{esc(row["date"])}">{esc(row["date"])}</time>',
                    f'        <span class="title">{esc(row["title"])}</span>',
                    f'        <span class="slug">{esc(row["slug"])}</span>',
                    "      </a>",
                    "    </li>",
                ]
            )
        )
    body = "\n".join(items)
    count = len(rows)
    return f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <meta name="robots" content="noindex,nofollow"/>
  <meta name="color-scheme" content="light dark"/>
  <title>文稿索引 · WeChat COPY</title>
  <link rel="stylesheet" href="./index.css"/>
</head>
<body>
  <div class="wrap">
    <header class="mast">
      <p class="kicker">WeChat COPY</p>
      <h1>文稿索引</h1>
      <p class="lead">共 {count} 篇，按日期排列，新的在前。点进去可在手机上复制标题和正文。</p>
    </header>
    <ul class="articles">
{body}
    </ul>
  </div>
</body>
</html>
"""


def mirror_css() -> None:
    if not PUBLIC_CSS.is_file():
        print(f"missing {PUBLIC_CSS.relative_to(ROOT)}", file=sys.stderr)
        raise SystemExit(1)
    PAGES_CSS.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(PUBLIC_CSS, PAGES_CSS)


def main() -> int:
    rows = collect()
    if not rows:
        print("no public/<slug>/index.html articles", file=sys.stderr)
        return 1
    page = render(rows)
    out = PUBLIC / "index.html"
    out.write_text(page, encoding="utf-8")
    PAGES_INDEX.parent.mkdir(parents=True, exist_ok=True)
    PAGES_INDEX.write_text(page, encoding="utf-8")
    mirror_css()
    for row in rows:
        print(f"{row['date']}\t{row['source']}\t{row['slug']}\t{row['title']}")
    print(
        f"wrote {out.relative_to(ROOT)} and {PAGES_INDEX.relative_to(ROOT)}; "
        f"copied {PUBLIC_CSS.relative_to(ROOT)} to {PAGES_CSS.relative_to(ROOT)}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
