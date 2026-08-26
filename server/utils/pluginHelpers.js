// =========================================================
// CREATE SLUG
// =========================================================

export function createSlug(name) {
  return String(name || "custom-plugin")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// =========================================================
// SAFE PHP FUNCTION NAME
// =========================================================

export function safeFunctionName(name) {
  let slug = createSlug(name)
    .replace(/-/g, "_");

  if (!slug) {
    slug = "custom_plugin";
  }

  if (/^[0-9]/.test(slug)) {
    slug = "plugin_" + slug;
  }

  return slug;
}

// =========================================================
// ESCAPE PHP
// =========================================================

export function escapePHP(value) {
  return String(value || "")
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'");
}

// =========================================================
// ESCAPE HTML
// =========================================================

export function escapeHTML(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}