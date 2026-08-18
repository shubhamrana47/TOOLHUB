import React, { useState } from "react";

const Websiteaudit = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [audit, setAudit] = useState(null);
  const [error, setError] = useState("");

  // =========================================================
  // RUN AUDIT
  // =========================================================

  const runAudit = async () => {
    if (!url.trim()) {
      setError("Please enter a website URL.");
      return;
    }

    setError("");
    setAudit(null);
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/audit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: url.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            data.error ||
            "Audit failed."
        );
      }

      setAudit(data);
    } catch (err) {
      console.error(err);

      setError(
        err?.message ||
          "Unable to connect to the audit server."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // HELPERS
  // =========================================================

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString();
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 50) return "Needs Improvement";
    return "Poor";
  };

  return (
    <div className="min-h-screen bg-[#f6f8fc] text-[#101828]">
      <main>

        {/* ===================================================
            HERO
        =================================================== */}

        <section className="border-b border-[#e8ecf3] bg-white">
          <div
            className="
              mx-auto
              max-w-[980px]
              px-6
              py-[75px]
              text-center
              sm:py-[90px]
            "
          >

            {/* BADGE */}

            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-2 text-xs font-bold text-blue-700">
              <span className="text-amber-500">
                ✦
              </span>

              AI Website SEO Audit
            </div>

            {/* TITLE */}

            <h2 className="mt-5 text-[38px] font-extrabold leading-[1.05] tracking-[-2px] text-gray-900 sm:text-5xl md:text-[62px]">
              Analyze Your Website
              <span className="text-blue-600">
                {" "}In Seconds
              </span>
            </h2>

            {/* DESCRIPTION */}

            <p className="mx-auto mt-5 max-w-[720px] text-sm leading-7 text-gray-500 sm:text-base md:text-[17px]">
              Check SEO, performance, security, technical SEO
              and Core Web Vitals with ToolHub Website Audit.
            </p>

            {/* SEARCH */}

            <div
              className="
                mx-auto
                mt-9
                flex
                max-w-[800px]
                flex-col
                gap-2.5
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-2
                shadow-[0_10px_30px_rgba(16,24,40,0.08)]
                md:flex-row
              "
            >

              {/* INPUT */}

              <div className="flex flex-1 items-center gap-2.5 px-3.5">

                <span className="text-lg">
                  🔗
                </span>

                <input
                  type="text"
                  value={url}
                  onChange={(e) =>
                    setUrl(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      runAudit();
                    }
                  }}
                  placeholder="Enter website URL e.g. https://example.com"
                  className="
                    h-[52px]
                    w-full
                    border-0
                    bg-transparent
                    text-sm
                    text-gray-800
                    outline-none
                    placeholder:text-gray-400
                  "
                />

              </div>

              {/* BUTTON */}

              <button
                onClick={runAudit}
                disabled={loading}
                className="
                  flex
                  h-[52px]
                  min-w-[185px]
                  items-center
                  justify-center
                  gap-2.5
                  rounded-xl
                  border-0
                  bg-blue-600
                  px-5
                  text-sm
                  font-bold
                  text-white
                  transition
                  hover:bg-blue-700
                  disabled:cursor-wait
                  disabled:opacity-70
                "
              >

                {loading ? (
                  <>
                    <span
                      className="
                        h-[17px]
                        w-[17px]
                        animate-spin
                        rounded-full
                        border-2
                        border-white/40
                        border-t-white
                      "
                    />

                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze Website

                    <span className="text-lg">
                      →
                    </span>
                  </>
                )}

              </button>

            </div>

            {/* ERROR */}

            {error && (
              <div className="mx-auto mt-4 max-w-[800px] rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-left text-sm text-rose-700">
                ⚠️ {error}
              </div>
            )}

            {/* FEATURES */}

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-500">
              <span>✓ SEO Analysis</span>
              <span>✓ PageSpeed</span>
              <span>✓ Security</span>
              <span>✓ Core Web Vitals</span>
            </div>

          </div>
        </section>

        {/* ===================================================
            LOADING
        =================================================== */}

        {loading && (
          <section className="mx-auto max-w-[1240px] px-6 py-12">

            <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">

              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                Analyzing Website...
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Checking SEO, PageSpeed, security and website performance.
              </p>

              <div className="mx-auto mt-6 h-1.5 max-w-[420px] overflow-hidden rounded-full bg-gray-200">
                <div className="h-full w-[60%] animate-pulse rounded-full bg-blue-600" />
              </div>

            </div>

          </section>
        )}

        {/* ===================================================
            RESULTS
        =================================================== */}

        {audit && !loading && (
          <section className="mx-auto max-w-[1240px] px-6 py-14 pb-20">

            {/* =================================================
                RESULT HEADER
            ================================================= */}

            <div className="mb-7 flex flex-col justify-between gap-3 md:flex-row md:items-end">

              <div>

                <span className="text-[11px] font-extrabold tracking-[1.5px] text-blue-600">
                  AUDIT RESULT
                </span>

                <h2 className="mt-1.5 text-2xl font-bold text-gray-900 sm:text-3xl">
                  Website Audit Report
                </h2>

                <a
                  href={audit.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1.5 inline-block break-all text-xs text-gray-500 transition hover:text-blue-600"
                >
                  {audit.url}
                </a>

              </div>

              <div className="text-xs text-gray-400">
                {formatDate(
                  audit.meta?.analyzedAt
                )}
              </div>

            </div>

            {/* =================================================
                SCORE CARDS
            ================================================= */}

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">

              {/* OVERALL */}

              <div className="flex min-h-[190px] flex-col items-center gap-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:flex-row lg:col-span-1">

                <ScoreCircle
                  score={audit.score}
                />

                <div>

                  <span className="text-[11px] font-extrabold tracking-[1px] text-gray-400">
                    OVERALL SCORE
                  </span>

                  <h3 className="mt-1.5 text-xl font-bold text-gray-900">
                    {getScoreLabel(
                      audit.score
                    )}
                  </h3>

                  <p className="mt-1.5 text-xs text-gray-400">
                    Overall website health score
                  </p>

                </div>

              </div>

              {/* SEO */}

              <ScoreCard
                icon="🔍"
                label="SEO SCORE"
                score={
                  audit.seo?.score || 0
                }
                description="On-page SEO analysis"
              />

              {/* PERFORMANCE */}

              <ScoreCard
                icon="⚡"
                label="PERFORMANCE"
                score={
                  audit.performance?.available
                    ? audit.performance.score
                    : null
                }
                description="Google PageSpeed"
              />

              {/* SECURITY */}

              <ScoreCard
                icon="🛡️"
                label="SECURITY"
                score={
                  audit.security?.score || 0
                }
                description="Security checks"
              />

            </div>

            {/* =================================================
                SEO OVERVIEW
            ================================================= */}

            <SectionTitle
              kicker="ON-PAGE ANALYSIS"
              title="SEO Overview"
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

              {/* TITLE */}

              <DataCard
                title="Page Title"
                badge={
                  audit.seo?.title !==
                  "Missing"
                    ? "Found"
                    : "Missing"
                }
                badgeType={
                  audit.seo?.title !==
                  "Missing"
                    ? "good"
                    : "danger"
                }
              >

                <h3 className="mt-5 text-base font-semibold leading-6 text-gray-800">
                  {audit.seo?.title ||
                    "Missing"}
                </h3>

                <p className="mt-2 text-xs text-gray-400">
                  Length:{" "}
                  {audit.seo?.titleLength ||
                    0}{" "}
                  characters
                </p>

              </DataCard>

              {/* META DESCRIPTION */}

              <DataCard
                title="Meta Description"
                badge={
                  audit.seo
                    ?.metaDescription !==
                  "Missing"
                    ? "Found"
                    : "Missing"
                }
                badgeType={
                  audit.seo
                    ?.metaDescription !==
                  "Missing"
                    ? "good"
                    : "danger"
                }
              >

                <p className="mt-5 max-w-[95%] text-sm leading-6 text-gray-600">
                  {audit.seo
                    ?.metaDescription ||
                    "Missing"}
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  Length:{" "}
                  {audit.seo
                    ?.metaDescriptionLength ||
                    0}{" "}
                  characters
                </p>

              </DataCard>

              {/* H1 */}

              <DataCard
                title="H1 Heading"
                badge={`${audit.seo?.h1Count || 0} Found`}
                badgeType={
                  audit.seo?.h1Count === 1
                    ? "good"
                    : "warning"
                }
              >

                <h3 className="mt-5 text-base font-semibold leading-6 text-gray-800">
                  {audit.seo?.h1 ||
                    "Missing"}
                </h3>

              </DataCard>

              {/* IMAGES */}

              <DataCard
                title="Images & ALT Attributes"
                badge={`${audit.seo?.images || 0} Total`}
                badgeType="info"
              >

                <div className="mt-5 flex items-center gap-3">

                  <strong className="text-3xl font-bold text-red-600">
                    {audit.seo
                      ?.missingAlt || 0}
                  </strong>

                  <span className="text-sm text-gray-500">
                    Images Missing ALT Text
                  </span>

                </div>

              </DataCard>

            </div>

            {/* =================================================
                SEO REPORT
            ================================================= */}

            <SectionTitle
              kicker="SEO REPORT"
              title="SEO Health Report"
              description="Detailed analysis of important on-page SEO elements found on your website."
            />

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

              {/* REPORT HEADER */}

              <div className="flex flex-col justify-between gap-3 border-b border-gray-100 bg-gradient-to-r from-white to-blue-50 px-6 py-5 sm:flex-row sm:items-center">

                <div>

                  <h3 className="text-lg font-bold text-gray-900">
                    SEO Checklist
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    Review the key SEO signals detected during the audit.
                  </p>

                </div>

                <div className="rounded-lg border border-blue-100 bg-white px-4 py-2 text-xs font-bold text-blue-600 shadow-sm">
                  SEO Score:{" "}
                  {audit.seo?.score || 0}/100
                </div>

              </div>

              {/* REPORT ROWS */}

              <div>

                {/* SEO TITLE */}

                <ReportRow
                  title="SEO Title"
                  description="Checks whether your website has a valid and descriptive page title."
                  value={
                    audit.seo?.title &&
                    audit.seo.title !==
                      "Missing"
                      ? audit.seo.title
                      : "SEO title is missing"
                  }
                  status={
                    audit.seo?.title &&
                    audit.seo.title !==
                      "Missing"
                      ? "good"
                      : "danger"
                  }
                  statusText={
                    audit.seo?.title &&
                    audit.seo.title !==
                      "Missing"
                      ? "Present"
                      : "Missing"
                  }
                />

                {/* META DESCRIPTION */}

                <ReportRow
                  title="Meta Description"
                  description="Checks whether a meta description is available and whether its length is reasonable."
                  value={
                    audit.seo
                      ?.metaDescription &&
                    audit.seo
                      .metaDescription !==
                      "Missing"
                      ? audit.seo
                          .metaDescription
                      : "Meta description is missing"
                  }
                  status={
                    audit.seo
                      ?.metaDescription &&
                    audit.seo
                      .metaDescription !==
                      "Missing"
                      ? "good"
                      : "danger"
                  }
                  statusText={
                    audit.seo
                      ?.metaDescription &&
                    audit.seo
                      .metaDescription !==
                      "Missing"
                      ? "Present"
                      : "Missing"
                  }
                />

                {/* ALT ATTRIBUTES */}

                <ReportRow
                  title="ALT Attributes"
                  description="Checks whether website images contain alternative text for accessibility and SEO."
                  value={
                    audit.seo?.images
                      ? `${audit.seo.missingAlt || 0} of ${audit.seo.images} images are missing ALT text`
                      : "No image information available"
                  }
                  status={
                    audit.seo?.missingAlt ===
                    0
                      ? "good"
                      : "warning"
                  }
                  statusText={
                    audit.seo?.missingAlt ===
                    0
                      ? "Optimized"
                      : "Needs Attention"
                  }
                />

                {/* H1 */}

                <ReportRow
                  title="H1 Heading"
                  description="Checks the primary heading structure of the page."
                  value={
                    audit.seo?.h1Count ===
                    1
                      ? audit.seo?.h1 ||
                        "One H1 heading found"
                      : `${audit.seo?.h1Count || 0} H1 headings found`
                  }
                  status={
                    audit.seo?.h1Count ===
                    1
                      ? "good"
                      : "warning"
                  }
                  statusText={
                    audit.seo?.h1Count ===
                    1
                      ? "Good"
                      : "Review"
                  }
                />

                {/* CANONICAL */}

                <ReportRow
                  title="Canonical URL"
                  description="Checks whether the page defines a canonical URL."
                  value={
                    audit.seo?.canonical &&
                    audit.seo
                      .canonical !==
                      "Missing"
                      ? audit.seo
                          .canonical
                      : "Canonical URL is missing"
                  }
                  status={
                    audit.seo?.canonical &&
                    audit.seo
                      .canonical !==
                      "Missing"
                      ? "good"
                      : "warning"
                  }
                  statusText={
                    audit.seo?.canonical &&
                    audit.seo
                      .canonical !==
                      "Missing"
                      ? "Present"
                      : "Missing"
                  }
                />

                {/* ROBOTS */}

                <ReportRow
                  title="Robots"
                  description="Checks whether robots information is available for search engine crawling."
                  value={
                    audit.seo?.robots ||
                    "Robots information not detected"
                  }
                  status={
                    audit.seo?.robots
                      ? "good"
                      : "warning"
                  }
                  statusText={
                    audit.seo?.robots
                      ? "Detected"
                      : "Review"
                  }
                />

                {/* GOOGLE KEYWORD PLANNER */}

                {/* <ReportRow
                  title="Google Keyword Planner"
                  description="Keyword Planner is an external Google Ads research tool, so its usage cannot be reliably detected from website HTML."
                  value="Cannot be determined from the website"
                  status="info"
                  statusText="Not Verifiable"
                  last
                /> */}

              </div>

            </div>

            {/* =================================================
                KEYWORD PLANNER EXPLANATION
            ================================================= */}

            {/* <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50/60 p-6">

              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                  🔎
                </div>

                <div>

                  <h3 className="text-sm font-bold text-gray-900">
                    About Google Keyword Planner
                  </h3>

                  <p className="mt-1.5 max-w-[850px] text-sm leading-6 text-gray-600">
                    Google Keyword Planner is used outside the
                    website to research search volume, keyword
                    competition and keyword ideas. Because this
                    information is stored in Google Ads rather
                    than the website's HTML, an SEO crawler
                    cannot reliably determine whether it was
                    used.
                  </p>

                  <span className="mt-3 inline-flex rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-blue-700 shadow-sm">
                    Status: Not Verifiable
                  </span>

                </div>

              </div>

            </div> */}

            {/* =================================================
                PERFORMANCE
            ================================================= */}

            <SectionTitle
              kicker="GOOGLE PAGESPEED"
              title="Performance Overview"
              description="Core Web Vitals and speed metrics"
              rightContent={
                <div className="hidden rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 sm:block">
                  ⚡ PageSpeed Insights
                </div>
              }
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

              <MetricCard
                title="LCP"
                value={
                  audit.performance?.lcp
                }
                description="Largest Contentful Paint"
              />

              <MetricCard
                title="INP"
                value={
                  audit.performance?.inp
                }
                description="Interaction to Next Paint"
              />

              <MetricCard
                title="CLS"
                value={
                  audit.performance?.cls
                }
                description="Cumulative Layout Shift"
              />

              <MetricCard
                title="FCP"
                value={
                  audit.performance?.fcp
                }
                description="First Contentful Paint"
              />

              <MetricCard
                title="TTFB"
                value={
                  audit.performance?.ttfb
                }
                description="Time to First Byte"
              />

              <MetricCard
                title="Speed Index"
                value={
                  audit.performance?.speedIndex
                }
                description="Visual loading speed"
              />

            </div>

            {/* =================================================
                SECURITY
            ================================================= */}

            <SectionTitle
              kicker="WEBSITE PROTECTION"
              title="Security Overview"
              description="Website security checks"
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

              <SecurityCard
                title="HTTPS Enabled"
                value={
                  audit.security?.https ||
                  false
                }
              />

              <SecurityCard
                title="SSL Certificate"
                value={
                  audit.security?.ssl ||
                  false
                }
              />

              <SecurityCard
                title="Security Headers"
                value={
                  audit.security?.headers ||
                  false
                }
              />

            </div>

            {/* =================================================
                SECURITY HEADERS
            ================================================= */}

            <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-6">

              <div className="flex items-center justify-between border-b border-gray-100 pb-5">

                <div>

                  <h3 className="text-base font-bold text-gray-900">
                    Security Headers
                  </h3>

                  <p className="mt-1 text-xs text-gray-400">
                    Recommended HTTP security headers
                  </p>

                </div>

                <div className="text-xl font-extrabold text-blue-600">
                  {audit.security
                    ?.enabledCount || 0}
                  /
                  {audit.security
                    ?.totalHeaders || 5}
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2">

                <HeaderStatus
                  name="Content-Security-Policy"
                  enabled={
                    audit.security
                      ?.securityHeaders
                      ?.contentSecurityPolicy ||
                    false
                  }
                />

                <HeaderStatus
                  name="Strict-Transport-Security"
                  enabled={
                    audit.security
                      ?.securityHeaders
                      ?.strictTransportSecurity ||
                    false
                  }
                />

                <HeaderStatus
                  name="X-Content-Type-Options"
                  enabled={
                    audit.security
                      ?.securityHeaders
                      ?.xContentTypeOptions ||
                    false
                  }
                />

                <HeaderStatus
                  name="X-Frame-Options"
                  enabled={
                    audit.security
                      ?.securityHeaders
                      ?.xFrameOptions ||
                    false
                  }
                />

                <HeaderStatus
                  name="Referrer-Policy"
                  enabled={
                    audit.security
                      ?.securityHeaders
                      ?.referrerPolicy ||
                    false
                  }
                />

              </div>

            </div>

            {/* =================================================
                ISSUES
            ================================================= */}

            <SectionTitle
              kicker="ACTION REQUIRED"
              title="Issues & Recommendations"
            />

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">

              {audit.issues?.length > 0 ? (
                audit.issues.map(
                  (issue, index) => (
                    <IssueItem
                      key={index}
                      type={issue.type}
                      level={issue.level}
                      text={issue.text}
                    />
                  )
                )
              ) : (
                <div className="p-8 text-center text-sm text-gray-500">
                  No issues detected.
                </div>
              )}

            </div>

            {/* =================================================
                FOOTER INFO
            ================================================= */}

            <div className="mt-9 flex flex-col gap-3 border-t border-gray-200 pt-5 text-xs text-gray-400 sm:flex-row sm:gap-8">

              <div>
                Status Code:

                <strong className="ml-1.5 text-gray-600">
                  {audit.meta?.statusCode ||
                    "—"}
                </strong>
              </div>

              <div>
                Server:

                <strong className="ml-1.5 text-gray-600">
                  {audit.meta?.server ||
                    "Not detected"}
                </strong>
              </div>

              <div>
                Strategy:

                <strong className="ml-1.5 text-gray-600">
                  {audit.performance
                    ?.strategy ||
                    "Desktop"}
                </strong>
              </div>

            </div>

          </section>
        )}

      </main>
    </div>
  );
};

// =========================================================
// SCORE CIRCLE
// =========================================================

const ScoreCircle = ({ score }) => {
  const safeScore = Math.min(
    Math.max(score || 0, 0),
    100
  );

  return (
    <div
      className="
        relative
        flex
        h-[110px]
        w-[110px]
        shrink-0
        items-center
        justify-center
        rounded-full
      "
      style={{
        background: `conic-gradient(
          #2563eb ${safeScore * 3.6}deg,
          #e8eefc ${safeScore * 3.6}deg
        )`,
      }}
    >

      <div className="absolute inset-[6px] flex items-center justify-center rounded-full bg-white">

        <div className="text-center">

          <strong className="block text-[27px] font-bold text-gray-900">
            {score || 0}
          </strong>

          <small className="text-[11px] text-gray-400">
            /100
          </small>

        </div>

      </div>

    </div>
  );
};

// =========================================================
// SCORE CARD
// =========================================================

const ScoreCard = ({
  icon,
  label,
  score,
  description,
}) => {

  const hasScore =
    score !== null &&
    score !== undefined;

  const getColor = () => {

    if (!hasScore) {
      return "text-gray-300";
    }

    if (score >= 80) {
      return "text-green-600";
    }

    if (score >= 50) {
      return "text-amber-600";
    }

    return "text-red-600";
  };

  return (
    <div className="flex min-h-[190px] flex-col justify-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-lg">
        {icon}
      </div>

      <span className="text-[11px] font-extrabold tracking-[1px] text-gray-400">
        {label}
      </span>

      <strong
        className={`mt-2 text-4xl font-bold ${getColor()}`}
      >
        {hasScore ? score : "—"}
      </strong>

      <p className="mt-1.5 text-xs text-gray-400">
        {description}
      </p>

    </div>
  );
};

// =========================================================
// SECTION TITLE
// =========================================================

const SectionTitle = ({
  kicker,
  title,
  description,
  rightContent,
}) => {

  return (
    <div className="mt-14 mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

      <div>

        <span className="text-[11px] font-extrabold tracking-[1.5px] text-blue-600">
          {kicker}
        </span>

        <h2 className="mt-1 text-2xl font-bold text-gray-900">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm text-gray-500">
            {description}
          </p>
        )}

      </div>

      {rightContent}

    </div>
  );
};

// =========================================================
// DATA CARD
// =========================================================

const DataCard = ({
  title,
  badge,
  badgeType = "info",
  children,
}) => {

  const badgeClasses = {
    good:
      "bg-green-50 text-green-700",

    warning:
      "bg-amber-50 text-amber-700",

    danger:
      "bg-rose-50 text-rose-700",

    info:
      "bg-blue-50 text-blue-700",
  };

  return (
    <div className="min-h-[165px] rounded-2xl border border-gray-200 bg-white p-[22px]">

      <div className="flex items-center justify-between gap-3 text-[13px] font-bold text-gray-600">

        <span>
          {title}
        </span>

        <span
          className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold ${
            badgeClasses[badgeType]
          }`}
        >
          {badge}
        </span>

      </div>

      {children}

    </div>
  );
};

// =========================================================
// SEO REPORT ROW
// =========================================================

const ReportRow = ({
  title,
  description,
  value,
  status,
  statusText,
  last = false,
}) => {

  const statusClasses = {
    good:
      "bg-green-50 text-green-700 border-green-100",

    warning:
      "bg-amber-50 text-amber-700 border-amber-100",

    danger:
      "bg-rose-50 text-rose-700 border-rose-100",

    info:
      "bg-blue-50 text-blue-700 border-blue-100",
  };

  const iconClasses = {
    good:
      "bg-green-100 text-green-600",

    warning:
      "bg-amber-100 text-amber-600",

    danger:
      "bg-rose-100 text-rose-600",

    info:
      "bg-blue-100 text-blue-600",
  };

  return (
    <div
      className={`flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between ${
        !last
          ? "border-b border-gray-100"
          : ""
      }`}
    >

      <div className="flex min-w-0 items-start gap-3">

        <div
          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-black ${
            iconClasses[status]
          }`}
        >
          {status === "good"
            ? "✓"
            : status === "danger"
            ? "!"
            : status === "warning"
            ? "!"
            : "i"}
        </div>

        <div className="min-w-0">

          <h4 className="text-sm font-bold text-gray-900">
            {title}
          </h4>

          <p className="mt-1 max-w-[700px] text-xs leading-5 text-gray-400">
            {description}
          </p>

          <p className="mt-2 break-words text-sm font-medium text-gray-700">
            {value}
          </p>

        </div>

      </div>

      <span
        className={`shrink-0 self-start rounded-full border px-3 py-1.5 text-[10px] font-extrabold sm:self-center ${
          statusClasses[status]
        }`}
      >
        {statusText}
      </span>

    </div>
  );
};

// =========================================================
// METRIC CARD
// =========================================================

const MetricCard = ({
  title,
  value,
  description,
}) => {

  const isError =
    !value ||
    value === "API Error" ||
    value === "—" ||
    value === "API Required";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-[22px]">

      <div className="flex items-center justify-between gap-3">

        <span className="text-sm font-extrabold text-gray-800">
          {title}
        </span>

        <span
          className={`
            rounded-md
            px-2
            py-1
            text-[9px]
            font-extrabold
            ${
              isError
                ? "bg-orange-50 text-orange-700"
                : "bg-green-50 text-green-700"
            }
          `}
        >
          {isError
            ? "API Required"
            : "Available"}
        </span>

      </div>

      <strong
        className={`
          mt-[18px]
          block
          font-bold
          ${
            isError
              ? "text-xl text-gray-300"
              : "text-[28px] text-blue-600"
          }
        `}
      >
        {value || "—"}
      </strong>

      <p className="mt-1.5 text-xs text-gray-400">
        {description}
      </p>

    </div>
  );
};

// =========================================================
// SECURITY CARD
// =========================================================

const SecurityCard = ({
  title,
  value,
}) => {

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-[22px]">

      <div
        className={`
          flex
          h-[45px]
          w-[45px]
          shrink-0
          items-center
          justify-center
          rounded-xl
          font-black
          ${
            value
              ? "bg-green-50 text-green-600"
              : "bg-red-50 text-red-600"
          }
        `}
      >
        {value ? "✓" : "!"}
      </div>

      <div>

        <h3 className="text-sm font-bold text-gray-900">
          {title}
        </h3>

        <span
          className={`
            mt-1
            inline-block
            text-[11px]
            font-bold
            ${
              value
                ? "text-green-600"
                : "text-red-600"
            }
          `}
        >
          {value
            ? "Enabled"
            : "Check Required"}
        </span>

      </div>

    </div>
  );
};

// =========================================================
// SECURITY HEADER STATUS
// =========================================================

const HeaderStatus = ({
  name,
  enabled,
}) => {

  return (
    <div className="flex items-center justify-between border-b border-gray-100 px-2.5 py-4">

      <div className="flex items-center gap-2">

        <span
          className={`
            flex
            h-[22px]
            w-[22px]
            items-center
            justify-center
            rounded-full
            text-[11px]
            font-black
            ${
              enabled
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }
          `}
        >
          {enabled ? "✓" : "!"}
        </span>

        <span className="text-[13px] text-gray-600">
          {name}
        </span>

      </div>

      <span
        className={`
          text-[11px]
          font-bold
          ${
            enabled
              ? "text-green-600"
              : "text-red-600"
          }
        `}
      >
        {enabled
          ? "Enabled"
          : "Missing"}
      </span>

    </div>
  );
};

// =========================================================
// ISSUE ITEM
// =========================================================

const IssueItem = ({
  type,
  level,
  text,
}) => {

  const styles = {
    danger: {
      icon:
        "bg-red-100 text-red-600",
    },

    warning: {
      icon:
        "bg-amber-100 text-amber-600",
    },

    success: {
      icon:
        "bg-green-100 text-green-600",
    },
  };

  const currentStyle =
    styles[type] ||
    styles.warning;

  return (
    <div className="flex items-center gap-3.5 border-b border-gray-100 px-5 py-[18px] last:border-b-0">

      <div
        className={`
          flex
          h-[34px]
          w-[34px]
          shrink-0
          items-center
          justify-center
          rounded-full
          font-black
          ${currentStyle.icon}
        `}
      >
        {type === "success"
          ? "✓"
          : "!"}
      </div>

      <div>

        <strong className="text-[10px] font-extrabold uppercase tracking-[1px] text-gray-500">
          {level}
        </strong>

        <p className="mt-0.5 text-[13px] text-gray-600">
          {text}
        </p>

      </div>

    </div>
  );
};

export default Websiteaudit;