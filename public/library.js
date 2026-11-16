(function () {
  "use strict";

  var LS_KEY = "laoli-library-status-v1";
  var STATES = ["unset", "published", "skip"];
  var STATE_LABEL = { unset: "未发", published: "已发", skip: "不发" };
  var PLATFORMS = {
    article: [
      { id: "weixin", label: "公众号" },
      { id: "toutiao", label: "头条" },
      { id: "xiaohongshu", label: "小红书" }
    ],
    tvp: [
      { id: "douyin", label: "抖音" },
      { id: "channels", label: "视频号" }
    ]
  };

  var kind = document.documentElement.getAttribute("data-lib") || "article";
  var platforms = PLATFORMS[kind] || PLATFORMS.article;
  var repoStatus = { articles: {}, tvp: {} };
  var localStatus = readLocal();
  var filter = "all";

  function todayShanghai() {
    return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Shanghai" });
  }

  function readLocal() {
    try {
      var raw = localStorage.getItem(LS_KEY);
      if (!raw) return { articles: {}, tvp: {} };
      var parsed = JSON.parse(raw);
      return {
        articles: parsed.articles || {},
        tvp: parsed.tvp || {}
      };
    } catch (e) {
      return { articles: {}, tvp: {} };
    }
  }

  function bucket() {
    return kind === "tvp" ? "tvp" : "articles";
  }

  function getItem(slug) {
    var b = bucket();
    var loc = (localStatus[b] || {})[slug];
    if (loc) return loc;
    return (repoStatus[b] || {})[slug] || {};
  }

  function setItem(slug, data) {
    var b = bucket();
    if (!localStatus[b]) localStatus[b] = {};
    localStatus[b][slug] = data;
    localStorage.setItem(LS_KEY, JSON.stringify(localStatus));
  }

  function platformState(item, id) {
    var rec = item && item[id];
    if (!rec) return { s: "unset", at: "" };
    if (typeof rec === "string") return { s: rec, at: "" };
    return { s: rec.s || "unset", at: rec.at || "" };
  }

  function isPending(item) {
    return platforms.some(function (p) {
      return platformState(item, p.id).s === "unset";
    });
  }

  function isLocalDirty() {
    var b = bucket();
    var loc = localStatus[b] || {};
    return Object.keys(loc).length > 0;
  }

  function shortDate(iso) {
    if (!iso || iso.length < 10) return "";
    return iso.slice(5);
  }

  function chipLabel(platform, rec) {
    var base = platform.label + " · " + STATE_LABEL[rec.s];
    if (rec.s === "published" && rec.at) return platform.label + " · " + shortDate(rec.at);
    return base;
  }

  function renderChips(host, slug) {
    var item = getItem(slug);
    host.innerHTML = "";
    host.setAttribute("data-slug", slug);
    platforms.forEach(function (p) {
      var rec = platformState(item, p.id);
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "pub-chip is-" + rec.s;
      btn.dataset.platform = p.id;
      btn.textContent = chipLabel(p, rec);
      btn.title = "点击切换：未发 → 已发 → 不发";
      btn.addEventListener("click", function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        cycle(slug, p.id);
      });
      host.appendChild(btn);
    });
  }

  function cycle(slug, platformId) {
    var item = Object.assign({}, getItem(slug));
    var rec = platformState(item, platformId);
    var next = STATES[(STATES.indexOf(rec.s) + 1) % STATES.length];
    item[platformId] = {
      s: next,
      at: next === "published" ? todayShanghai() : ""
    };
    setItem(slug, item);
    refresh();
  }

  function itemHosts() {
    if (kind === "tvp") {
      return Array.prototype.slice.call(document.querySelectorAll("article.card[data-slug]"));
    }
    return Array.prototype.slice.call(document.querySelectorAll("ul.articles li[data-slug]"));
  }

  function ensureHost(el, slug) {
    var host = el.querySelector(".pub-status");
    if (!host) {
      host = document.createElement("div");
      host.className = "pub-status";
      if (kind === "tvp") {
        var body = el.querySelector(".body") || el;
        var links = body.querySelector(".links");
        if (links) body.insertBefore(host, links);
        else body.appendChild(host);
      } else {
        el.appendChild(host);
      }
    }
    renderChips(host, slug);
  }

  function applyFilter() {
    itemHosts().forEach(function (el) {
      var slug = el.getAttribute("data-slug");
      var pending = isPending(getItem(slug));
      var hide = (filter === "pending" && !pending) || (filter === "done" && pending);
      el.classList.toggle("is-filtered", hide);
    });
    var buttons = document.querySelectorAll(".lib-filter button");
    Array.prototype.forEach.call(buttons, function (btn) {
      btn.classList.toggle("is-current", btn.getAttribute("data-filter") === filter);
    });
  }

  function counts() {
    var total = 0;
    var pending = 0;
    itemHosts().forEach(function (el) {
      total += 1;
      if (isPending(getItem(el.getAttribute("data-slug")))) pending += 1;
    });
    return { total: total, pending: pending };
  }

  function updateSummary() {
    var c = counts();
    var el = document.getElementById("lib-summary");
    if (el) {
      el.textContent = "共 " + c.total + " 篇，还有 " + c.pending + " 篇未发完。";
    }
    var dirty = document.getElementById("lib-dirty");
    if (dirty) dirty.hidden = !isLocalDirty();
  }

  function refresh() {
    itemHosts().forEach(function (el) {
      ensureHost(el, el.getAttribute("data-slug"));
    });
    applyFilter();
    updateSummary();
  }

  function exportStatus() {
    var merged = {
      updated: todayShanghai(),
      articles: Object.assign({}, repoStatus.articles, localStatus.articles),
      tvp: Object.assign({}, repoStatus.tvp, localStatus.tvp)
    };
    var blob = new Blob([JSON.stringify(merged, null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "library-status-" + todayShanghai() + ".json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }

  function importStatus(file) {
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var parsed = JSON.parse(reader.result);
        localStatus = {
          articles: parsed.articles || {},
          tvp: parsed.tvp || {}
        };
        localStorage.setItem(LS_KEY, JSON.stringify(localStatus));
        refresh();
      } catch (e) {
        alert("这份状态文件读不出来，请检查是不是导出的 JSON。");
      }
    };
    reader.readAsText(file);
  }

  function injectChrome() {
    var header = document.querySelector("header.mast, header.top");
    if (!header) return;
    if (!header.querySelector(".lib-nav")) {
      var nav = document.createElement("nav");
      nav.className = "lib-nav";
      nav.setAttribute("aria-label", "稿件库分区");
      var articleHref = kind === "tvp" ? "../" : "./";
      var tvpHref = kind === "tvp" ? "./" : "./tvp/";
      nav.innerHTML =
        '<a href="' + articleHref + '" class="' + (kind === "article" ? "is-current" : "") + '">图文</a>' +
        '<a href="' + tvpHref + '" class="' + (kind === "tvp" ? "is-current" : "") + '">科技快播</a>';
      header.insertBefore(nav, header.firstChild);
    }
    if (!document.getElementById("lib-toolbar")) {
      var bar = document.createElement("div");
      bar.id = "lib-toolbar";
      bar.className = "lib-toolbar";
      bar.innerHTML =
        '<span class="lib-filter" role="group" aria-label="按发布状态筛选">' +
        '<button type="button" data-filter="all" class="is-current">全部</button>' +
        '<button type="button" data-filter="pending">还有未发</button>' +
        '<button type="button" data-filter="done">已齐发</button>' +
        "</span>" +
        '<button type="button" data-act="export">导出状态</button>' +
        '<button type="button" data-act="import">导入状态</button>' +
        '<input type="file" id="lib-import" accept="application/json,.json" hidden>' +
        '<span id="lib-summary" class="lib-hint"></span>' +
        '<span id="lib-dirty" class="lib-dirty" hidden>本机有改动，换设备前请先导出。</span>';
      header.appendChild(bar);
      bar.addEventListener("click", function (ev) {
        var btn = ev.target.closest("button");
        if (!btn) return;
        var f = btn.getAttribute("data-filter");
        if (f) {
          filter = f;
          applyFilter();
          return;
        }
        if (btn.getAttribute("data-act") === "export") exportStatus();
        if (btn.getAttribute("data-act") === "import") {
          document.getElementById("lib-import").click();
        }
      });
      document.getElementById("lib-import").addEventListener("change", function (ev) {
        var file = ev.target.files && ev.target.files[0];
        if (file) importStatus(file);
        ev.target.value = "";
      });
    }
  }

  function statusUrl() {
    if (kind === "tvp") return "../library-status.json";
    return "./library-status.json";
  }

  injectChrome();
  fetch(statusUrl(), { cache: "no-store" })
    .then(function (r) { return r.ok ? r.json() : {}; })
    .then(function (data) {
      repoStatus = {
        articles: (data && data.articles) || {},
        tvp: (data && data.tvp) || {}
      };
    })
    .catch(function () {})
    .then(function () { refresh(); });
})();
