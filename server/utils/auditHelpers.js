// =========================================================
// NORMALIZE URL
// =========================================================

export function normalizeUrl(input) {
  let url = String(input || "").trim();

  if (!url) {
    throw new Error("Website URL is required");
  }

  if (!/^https?:\/\//i.test(url)) {
    url = "https://" + url;
  }

  return new URL(url).href;
}

// =========================================================
// GET TEXT
// =========================================================

export function getText($, selector) {
  return $(selector)
    .first()
    .text()
    .replace(/\s+/g, " ")
    .trim();
}

// =========================================================
// GET ATTRIBUTE
// =========================================================

export function getAttr($, selector, attr) {
  return $(selector).first().attr(attr) || "";
}

// =========================================================
// CLEAN SEARCH CONSOLE URL
// =========================================================

export function cleanSearchConsoleUrl(url) {
  if (!url) return "";

  return url
    .replace(/^sc-domain:/i, "")
    .replace(/\/$/, "");
}