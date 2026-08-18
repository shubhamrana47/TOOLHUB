// =========================================================
// SEO ANALYSIS
// =========================================================

import {
  getText,
  getAttr,
} from "./auditHelpers.js";

export function analyzeSEO($, pageUrl) {
  const title = getText($, "title");

  const metaDescription = getAttr(
    $,
    'meta[name="description"]',
    "content"
  );

  const canonical = getAttr(
    $,
    'link[rel="canonical"]',
    "href"
  );

  const robots = getAttr(
    $,
    'meta[name="robots"]',
    "content"
  );

  const h1Count = $("h1").length;

  const h2Count = $("h2").length;

  const h1 = getText($, "h1");

  const images = $("img").length;

  let imagesMissingAlt = 0;

  $("img").each((index, element) => {
    const alt = $(element).attr("alt");

    if (
      alt === undefined ||
      alt.trim() === ""
    ) {
      imagesMissingAlt++;
    }
  });

  // =====================================================
  // LINKS
  // =====================================================

  let internalLinks = 0;
  let externalLinks = 0;

  const currentHost =
    new URL(pageUrl).hostname;

  $("a[href]").each((index, element) => {
    const href = $(element).attr("href");

    if (!href) return;

    try {
      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:")
      ) {
        return;
      }

      const absoluteUrl =
        new URL(href, pageUrl);

      if (
        absoluteUrl.hostname ===
        currentHost
      ) {
        internalLinks++;
      } else {
        externalLinks++;
      }
    } catch {
      // Ignore invalid URLs
    }
  });

  // =====================================================
  // SEO SCORE
  // =====================================================

  let score = 100;

  if (!title) {
    score -= 20;
  } else if (
    title.length < 30 ||
    title.length > 60
  ) {
    score -= 10;
  }

  if (!metaDescription) {
    score -= 20;
  } else if (
    metaDescription.length < 120 ||
    metaDescription.length > 160
  ) {
    score -= 10;
  }

  if (h1Count === 0) {
    score -= 15;
  }

  if (h1Count > 1) {
    score -= 5;
  }

  if (!canonical) {
    score -= 10;
  }

  if (imagesMissingAlt > 0) {
    score -= Math.min(
      15,
      imagesMissingAlt * 2
    );
  }

  score = Math.max(0, score);

  return {
    score,

    title: title || "Missing",

    titleLength: title.length,

    metaDescription:
      metaDescription || "Missing",

    metaDescriptionLength:
      metaDescription.length,

    h1: h1 || "Missing",

    h1Count,

    h2Count,

    canonical:
      canonical || "Missing",

    robots:
      robots || "Not specified",

    images,

    missingAlt:
      imagesMissingAlt,

    links: {
      internal: internalLinks,
      external: externalLinks,
    },
  };
}

// =========================================================
// SECURITY ANALYSIS
// =========================================================

export function analyzeSecurity(
  response,
  url
) {
  const headers =
    response.headers || {};

  const https =
    url.startsWith("https://");

  const securityHeaders = {
    contentSecurityPolicy:
      !!headers[
        "content-security-policy"
      ],

    strictTransportSecurity:
      !!headers[
        "strict-transport-security"
      ],

    xContentTypeOptions:
      !!headers[
        "x-content-type-options"
      ],

    xFrameOptions:
      !!headers[
        "x-frame-options"
      ],

    referrerPolicy:
      !!headers[
        "referrer-policy"
      ],
  };

  const enabledCount =
    Object.values(
      securityHeaders
    ).filter(Boolean).length;

  const score = Math.round(
    (
      (enabledCount +
        (https ? 1 : 0)) /
      6
    ) * 100
  );

  return {
    score,

    https,

    ssl: https,

    headers:
      enabledCount >= 3,

    securityHeaders,

    enabledCount,

    totalHeaders: 5,
  };
}