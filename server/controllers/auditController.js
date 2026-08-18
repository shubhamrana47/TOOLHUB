import axios from "axios";
import * as cheerio from "cheerio";

import {
  normalizeUrl,
} from "../utils/auditHelpers.js";

import {
  analyzeSEO,
  analyzeSecurity,
} from "../utils/auditAnalyzers.js";

// =========================================================
// PAGESPEED INSIGHTS
// =========================================================

async function getPerformanceData(url) {
  try {
    // -------------------------------------------------------
    // API KEY
    // -------------------------------------------------------

    const apiKey =
      process.env.PAGESPEED_API_KEY_1 ||
      process.env.PAGESPEED_API_KEY_2;

    if (!apiKey) {
      console.warn(
        "⚠️ PageSpeed API key is missing"
      );

      return {
        available: false,

        score: 0,
        accessibilityScore: 0,

        lcp: "API Required",
        inp: "API Required",
        cls: "API Required",
        fcp: "API Required",
        ttfb: "API Required",
        speedIndex: "API Required",

        strategy: "desktop",

        status: "api_required",

        message:
          "PAGESPEED_API_KEY_1 or PAGESPEED_API_KEY_2 is missing",
      };
    }

    // -------------------------------------------------------
    // API ENDPOINT
    // -------------------------------------------------------

    const endpoint =
      "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

    console.log(
      `⚡ Running PageSpeed audit: ${url}`
    );

    // -------------------------------------------------------
    // API REQUEST
    // -------------------------------------------------------

    const response =
      await axios.get(endpoint, {
        params: {
          url,
          key: apiKey,

          strategy: "desktop",

          category: [
            "performance",
            "accessibility",
            "best-practices",
            "seo",
          ],
        },

        timeout: 120000,
      });

    // -------------------------------------------------------
    // LIGHTHOUSE DATA
    // -------------------------------------------------------

    const lighthouse =
      response.data?.lighthouseResult;

    if (!lighthouse) {
      throw new Error(
        "PageSpeed API returned no Lighthouse data"
      );
    }

    const audits =
      lighthouse.audits || {};

    const categories =
      lighthouse.categories || {};

    // =======================================================
    // SCORE HELPER
    // =======================================================

    const convertScore = (score) => {
      if (
        typeof score !== "number"
      ) {
        return 0;
      }

      return Math.round(
        score * 100
      );
    };

    // =======================================================
    // PERFORMANCE SCORE
    // =======================================================

    const performanceScore =
      convertScore(
        categories
          ?.performance
          ?.score
      );

    // =======================================================
    // ACCESSIBILITY SCORE
    // =======================================================

    const accessibilityScore =
      convertScore(
        categories
          ?.accessibility
          ?.score
      );

    // =======================================================
    // METRIC HELPER
    // =======================================================

    const getMetric = (
      auditId
    ) => {
      const audit =
        audits?.[auditId];

      if (!audit) {
        return "—";
      }

      // Lighthouse display value
      if (
        audit.displayValue
      ) {
        return audit.displayValue;
      }

      // Lighthouse numeric value
      if (
        typeof audit.numericValue ===
        "number"
      ) {
        return String(
          Math.round(
            audit.numericValue
          )
        );
      }

      return "—";
    };

    // =======================================================
    // LCP
    // =======================================================

    const lcp =
      getMetric(
        "largest-contentful-paint"
      );

    // =======================================================
    // INP
    // =======================================================

    let inp =
      getMetric(
        "interaction-to-next-paint"
      );

    /*
      Lighthouse may not always return the INP audit.

      When it is unavailable, try PageSpeed's
      loadingExperience / CrUX data.
    */

    if (
      inp === "—" ||
      !inp
    ) {
      const loadingExperience =
        response.data
          ?.loadingExperience;

      const inpData =
        loadingExperience
          ?.metrics
          ?.INTERACTION_TO_NEXT_PAINT;

      if (
        inpData &&
        typeof inpData.percentile ===
          "number"
      ) {
        inp =
          `${inpData.percentile} ms`;
      }
    }

    // =======================================================
    // CLS
    // =======================================================

    const cls =
      getMetric(
        "cumulative-layout-shift"
      );

    // =======================================================
    // FCP
    // =======================================================

    const fcp =
      getMetric(
        "first-contentful-paint"
      );

    // =======================================================
    // TTFB
    // =======================================================

    let ttfb =
      getMetric(
        "server-response-time"
      );

    /*
      Sometimes TTFB is available through
      the loading experience data.
    */

    if (
      ttfb === "—" ||
      !ttfb
    ) {
      const loadingExperience =
        response.data
          ?.loadingExperience;

      const ttfbData =
        loadingExperience
          ?.metrics
          ?.EXPERIMENTAL_TIME_TO_FIRST_BYTE;

      if (
        ttfbData &&
        typeof ttfbData.percentile ===
          "number"
      ) {
        ttfb =
          `${ttfbData.percentile} ms`;
      }
    }

    // =======================================================
    // SPEED INDEX
    // =======================================================

    const speedIndex =
      getMetric(
        "speed-index"
      );

    // =======================================================
    // LOG RESULTS
    // =======================================================

    console.log(
      "✅ PageSpeed completed:",
      {
        performanceScore,
        accessibilityScore,
        lcp,
        inp,
        cls,
        fcp,
        ttfb,
        speedIndex,
      }
    );

    // =======================================================
    // RETURN
    // =======================================================

    return {
      available: true,

      score:
        performanceScore,

      accessibilityScore,

      lcp,
      inp,
      cls,
      fcp,
      ttfb,
      speedIndex,

      strategy: "desktop",

      status: "active",

      message:
        "PageSpeed data loaded successfully",
    };

  } catch (error) {
    console.error(
      "❌ PageSpeed Error:"
    );

    console.error(
      error.response?.data ||
        error.message
    );

    return {
      available: false,

      score: 0,
      accessibilityScore: 0,

      lcp: "API Error",
      inp: "API Error",
      cls: "API Error",
      fcp: "API Error",
      ttfb: "API Error",
      speedIndex: "API Error",

      strategy: "desktop",

      status: "error",

      message:
        error.response?.data
          ?.error?.message ||
        error.message ||
        "PageSpeed API request failed",
    };
  }
}

// =========================================================
// DATA SOURCES
// =========================================================

function getDataSources(
  performance
) {
  return [
    {
      id: "seo",

      name: "SEO Analyzer",

      icon: "search",

      description:
        "Title, Meta, H1, Canonical and Robots analysis",

      status: "Active",

      statusType: "active",

      details:
        "On-page HTML analysis",
    },

    {
      id: "crawler",

      name: "Website Crawler",

      icon: "globe",

      description:
        "Pages, Images, Links and ALT attribute analysis",

      status: "Active",

      statusType: "active",

      details:
        "Crawler analysis",
    },

    {
      id: "pagespeed",

      name:
        "Google PageSpeed Insights",

      icon: "zap",

      description:
        "LCP, INP, CLS, FCP and performance metrics",

      status:
        performance?.available
          ? "Active"
          : "API Required",

      statusType:
        performance?.available
          ? "active"
          : "api",

      details:
        performance?.available
          ? "Performance API connected"
          : "PageSpeed API unavailable",
    },

    {
      id: "security",

      name: "Security Scanner",

      icon: "shield",

      description:
        "HTTPS, SSL and security headers analysis",

      status: "Active",

      statusType: "active",

      details:
        "Security analysis",
    },
  ];
}

// =========================================================
// WEBSITE AUDIT CONTROLLER
// =========================================================

export const runWebsiteAudit =
  async (req, res) => {
    try {
      // =====================================================
      // VALIDATE REQUEST
      // =====================================================

      const inputUrl =
        req.body?.url;

      if (
        !inputUrl ||
        typeof inputUrl !==
          "string"
      ) {
        return res.status(400).json({
          success: false,

          message:
            "Website URL is required",
        });
      }

      // =====================================================
      // NORMALIZE URL
      // =====================================================

      let url;

      try {
        url =
          normalizeUrl(
            inputUrl
          );
      } catch (error) {
        return res.status(400).json({
          success: false,

          message:
            "Invalid website URL",
        });
      }

      console.log(
        "======================================"
      );

      console.log(
        `🚀 Starting website audit: ${url}`
      );

      console.log(
        "======================================"
      );

      // =====================================================
      // FETCH WEBSITE
      // =====================================================

      let response;

      try {
        response =
          await axios.get(
            url,
            {
              timeout: 30000,

              maxRedirects: 5,

              headers: {
                "User-Agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/151 Safari/537.36",

                Accept:
                  "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",

                "Accept-Language":
                  "en-US,en;q=0.9",
              },

              validateStatus:
                (status) =>
                  status >= 200 &&
                  status < 500,
            }
          );
      } catch (error) {
        console.error(
          "❌ Website fetch error:",
          error.message
        );

        return res.status(500).json({
          success: false,

          message:
            "Unable to access the website",

          error:
            error.message,
        });
      }

      // =====================================================
      // CHECK RESPONSE
      // =====================================================

      if (
        !response?.data
      ) {
        return res.status(500).json({
          success: false,

          message:
            "Website returned empty response",
        });
      }

      console.log(
        `🌐 Website status: ${response.status}`
      );

      // =====================================================
      // CHEERIO
      // =====================================================

      const $ =
        cheerio.load(
          response.data
        );

      // =====================================================
      // SEO ANALYSIS
      // =====================================================

      let seo;

      try {
        seo =
          analyzeSEO(
            $,
            url
          );

        console.log(
          "✅ SEO analysis completed"
        );
      } catch (error) {
        console.error(
          "❌ SEO analysis error:",
          error.message
        );

        seo = {
          score: 0,

          title: "Missing",

          titleLength: 0,

          metaDescription:
            "Missing",

          metaDescriptionLength:
            0,

          h1: "Missing",

          h1Count: 0,

          images: 0,

          missingAlt: 0,

          canonical: "Missing",

          robots: null,
        };
      }

      // =====================================================
      // SECURITY ANALYSIS
      // =====================================================

      let security;

      try {
        security =
          analyzeSecurity(
            response,
            url
          );

        console.log(
          "✅ Security analysis completed"
        );
      } catch (error) {
        console.error(
          "❌ Security analysis error:",
          error.message
        );

        security = {
          score: 0,

          https:
            url.startsWith(
              "https://"
            ),

          ssl:
            url.startsWith(
              "https://"
            ),

          headers: false,

          enabledCount: 0,

          totalHeaders: 5,

          securityHeaders: {
            contentSecurityPolicy:
              false,

            strictTransportSecurity:
              false,

            xContentTypeOptions:
              false,

            xFrameOptions:
              false,

            referrerPolicy:
              false,
          },
        };
      }

      // =====================================================
      // PAGESPEED
      // =====================================================

      const performance =
        await getPerformanceData(
          url
        );

      // =====================================================
      // ACCESSIBILITY
      // =====================================================

      const accessibilityScore =
        performance.available
          ? performance
              .accessibilityScore
          : 0;

      // =====================================================
      // TECHNICAL SEO
      // =====================================================

      const technicalSeoScore =
        Number(
          seo?.score || 0
        );

      // =====================================================
      // PERFORMANCE SCORE
      // =====================================================

      const performanceScore =
        Number(
          performance?.score ||
            0
        );

      // =====================================================
      // SEO SCORE
      // =====================================================

      const seoScore =
        Number(
          seo?.score || 0
        );

      // =====================================================
      // SECURITY SCORE
      // =====================================================

      const securityScore =
        Number(
          security?.score || 0
        );

      // =====================================================
      // OVERALL SCORE
      // =====================================================

      let overallScore =
        Math.round(
          seoScore * 0.35 +
          performanceScore * 0.30 +
          securityScore * 0.20 +
          accessibilityScore * 0.10 +
          technicalSeoScore * 0.05
        );

      overallScore =
        Math.max(
          0,
          Math.min(
            100,
            overallScore
          )
        );

      // =====================================================
      // ISSUES
      // =====================================================

      const issues = [];

      // -----------------------------------------------------
      // ALT
      // -----------------------------------------------------

      if (
        Number(
          seo?.missingAlt || 0
        ) > 0
      ) {
        issues.push({
          type: "danger",

          level: "High",

          text:
            `${seo.missingAlt} images are missing ALT text`,
        });
      }

      // -----------------------------------------------------
      // META DESCRIPTION
      // -----------------------------------------------------

      if (
        seo?.metaDescription ===
        "Missing"
      ) {
        issues.push({
          type: "danger",

          level: "High",

          text:
            "Meta description is missing",
        });
      }

      // -----------------------------------------------------
      // META DESCRIPTION LENGTH
      // -----------------------------------------------------

      if (
        Number(
          seo?.metaDescriptionLength ||
            0
        ) > 0 &&
        (
          seo.metaDescriptionLength <
            120 ||
          seo.metaDescriptionLength >
            160
        )
      ) {
        issues.push({
          type: "warning",

          level: "Medium",

          text:
            "Meta description length needs improvement",
        });
      }

      // -----------------------------------------------------
      // TITLE
      // -----------------------------------------------------

      if (
        seo?.title ===
        "Missing"
      ) {
        issues.push({
          type: "danger",

          level: "High",

          text:
            "Page title is missing",
        });
      }

      // -----------------------------------------------------
      // H1
      // -----------------------------------------------------

      if (
        Number(
          seo?.h1Count || 0
        ) === 0
      ) {
        issues.push({
          type: "danger",

          level: "High",

          text:
            "H1 heading is missing",
        });
      }

      if (
        Number(
          seo?.h1Count || 0
        ) > 1
      ) {
        issues.push({
          type: "warning",

          level: "Medium",

          text:
            "Multiple H1 headings found",
        });
      }

      // -----------------------------------------------------
      // CANONICAL
      // -----------------------------------------------------

      if (
        seo?.canonical ===
        "Missing"
      ) {
        issues.push({
          type: "warning",

          level: "Medium",

          text:
            "Canonical URL is missing",
        });
      }

      // -----------------------------------------------------
      // SECURITY
      // -----------------------------------------------------

      if (
        securityScore < 60
      ) {
        issues.push({
          type: "warning",

          level: "Medium",

          text:
            "Some recommended security headers are missing",
        });
      }

      // -----------------------------------------------------
      // PERFORMANCE
      // -----------------------------------------------------

      if (
        performance.available &&
        performanceScore < 50
      ) {
        issues.push({
          type: "danger",

          level: "High",

          text:
            "Website performance needs significant improvement",
        });
      }

      // -----------------------------------------------------
      // PAGESPEED UNAVAILABLE
      // -----------------------------------------------------

      if (
        !performance.available
      ) {
        issues.push({
          type: "warning",

          level: "Medium",

          text:
            "PageSpeed performance data could not be loaded",
        });
      }

      // -----------------------------------------------------
      // NO ISSUES
      // -----------------------------------------------------

      if (
        issues.length === 0
      ) {
        issues.push({
          type: "success",

          level: "Good",

          text:
            "No major issues detected",
        });
      }

      // =====================================================
      // FINAL URL
      // =====================================================

      const finalUrl =
        response.request
          ?.res
          ?.responseUrl ||
        url;

      // =====================================================
      // RESPONSE
      // =====================================================

      const auditResult = {
        success: true,

        url,

        score:
          overallScore,

        // ---------------------------------------------------
        // AUDIT SUMMARY
        // ---------------------------------------------------

        audit: {
          url,

          statusCode:
            response.status,

          finalUrl,

          overallScore,

          seoScore,

          securityScore,

          performanceScore,
        },

        // ---------------------------------------------------
        // SEO
        // ---------------------------------------------------

        seo,

        // ---------------------------------------------------
        // PERFORMANCE
        // ---------------------------------------------------

        performance,

        // ---------------------------------------------------
        // SECURITY
        // ---------------------------------------------------

        security,

        // ---------------------------------------------------
        // ACCESSIBILITY
        // ---------------------------------------------------

        accessibility: {
          score:
            accessibilityScore,
        },

        // ---------------------------------------------------
        // TECHNICAL SEO
        // ---------------------------------------------------

        technicalSeo: {
          score:
            technicalSeoScore,
        },

        // ---------------------------------------------------
        // ISSUES
        // ---------------------------------------------------

        issues,

        // ---------------------------------------------------
        // DATA SOURCES
        // ---------------------------------------------------

        dataSources:
          getDataSources(
            performance
          ),

        // ---------------------------------------------------
        // META
        // ---------------------------------------------------

        meta: {
          analyzedAt:
            new Date().toISOString(),

          statusCode:
            response.status,

          contentType:
            response.headers?.[
              "content-type"
            ] || null,

          server:
            response.headers?.[
              "server"
            ] || null,
        },
      };

      // =====================================================
      // LOG FINAL RESULT
      // =====================================================

      console.log(
        "======================================"
      );

      console.log(
        "✅ WEBSITE AUDIT COMPLETED"
      );

      console.log(
        `Overall Score: ${overallScore}`
      );

      console.log(
        `SEO Score: ${seoScore}`
      );

      console.log(
        `Performance Score: ${performanceScore}`
      );

      console.log(
        `Accessibility Score: ${accessibilityScore}`
      );

      console.log(
        `Security Score: ${securityScore}`
      );

      console.log(
        `INP: ${performance.inp}`
      );

      console.log(
        "======================================"
      );

      // =====================================================
      // SEND RESPONSE
      // =====================================================

      return res.json(
        auditResult
      );

    } catch (error) {
      console.error(
        "❌ Website Audit Error:"
      );

      console.error(
        error.response?.data ||
          error.message ||
          error
      );

      return res.status(500).json({
        success: false,

        message:
          "Unable to audit this website",

        error:
          error.response?.data
            ?.error?.message ||
          error.message ||
          "Unknown audit error",
      });
    }
  };