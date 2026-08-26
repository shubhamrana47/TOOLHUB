// =========================================================
// CREATE SLUG
// =========================================================

export const createSlug = (name = "") => {
  return String(name)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

// =========================================================
// SAFE PHP FUNCTION / CLASS NAME
// =========================================================

export const safeFunctionName = (name = "") => {
  let value = String(name)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

  if (!value) {
    value = "wp_ai_plugin";
  }

  if (/^[0-9]/.test(value)) {
    value = `plugin_${value}`;
  }

  return `wpai_${value}`;
};

// =========================================================
// ESCAPE PHP
// =========================================================

export const escapePHP = (value = "") => {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'")
    .replace(/\r?\n/g, " ");
};

// =========================================================
// ESCAPE HTML
// =========================================================

export const escapeHTML = (value = "") => {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};