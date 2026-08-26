import { useState } from "react";
import {
  Sparkles,
  Check,
  Plus,
  AlertTriangle,
  Rocket,
  FileCode2,
  Settings,
  Database,
  Code2,
  Mail,
  ShoppingCart,
  LayoutDashboard,
  FileText,
  Download,
  RotateCcw,
  Brain,
  Lightbulb,
  Wrench,
  ArrowDownToLine,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const PluginBuilder = () => {
  const [pluginName, setPluginName] = useState("");
  const [requirement, setRequirement] = useState("");

  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const [plan, setPlan] = useState(null);

  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const features = [
    {
      name: "Admin Dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Database",
      icon: Database,
    },
    {
      name: "Shortcode",
      icon: Code2,
    },
    {
      name: "REST API",
      icon: Settings,
    },
    {
      name: "Email Notifications",
      icon: Mail,
    },
    {
      name: "WooCommerce Support",
      icon: ShoppingCart,
    },
    {
      name: "Custom Post Type",
      icon: FileCode2,
    },
    {
      name: "Settings Page",
      icon: Settings,
    },
  ];

  const toggleFeature = (feature) => {
    setSelectedFeatures((previous) => {
      if (previous.includes(feature)) {
        return previous.filter((item) => item !== feature);
      }

      return [...previous, feature];
    });
  };

  const createSlug = (name) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const analyzeRequirement = async () => {
    setError("");
    setSuccess("");
    setPlan(null);

    if (!pluginName.trim()) {
      setError("Please enter your plugin name.");
      return;
    }

    if (!requirement.trim()) {
      setError("Please describe what your plugin should do.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/plugin/analyze`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pluginName: pluginName.trim(),
            requirement: requirement.trim(),
            features: selectedFeatures,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success || !result.data) {
        throw new Error(
          result.message || "Plugin analysis failed."
        );
      }

      const data = result.data;

      const finalFeatures =
        data.features && data.features.length > 0
          ? data.features
          : [
              "Admin Dashboard",
              "Settings Page",
              "Shortcode",
            ];

      const slug = createSlug(data.pluginName);

      setPlan({
        pluginName: data.pluginName,
        description: data.requirement,
        features: finalFeatures,
        files: [
          `${slug}.php`,
          "includes/class-admin.php",
          "includes/class-frontend.php",
          "assets/css/style.css",
          "assets/js/script.js",
          "readme.txt",
          "uninstall.php",
        ],
      });

      setSuccess("Requirement successfully analyzed.");
    } catch (error) {
      console.error("Analyze error:", error);

      setError(
        "Backend se connection nahi ho raha. Make sure server localhost:5000 par running hai."
      );
    } finally {
      setLoading(false);
    }
  };

  const generatePlugin = async () => {
    setError("");
    setSuccess("");

    if (!plan) {
      setError(
        "Please analyze your plugin requirement first."
      );
      return;
    }

    setGenerating(true);

    try {
      const response = await fetch(
        `${API_URL}/api/plugin/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pluginName: plan.pluginName,
            requirement: plan.description,
            features: plan.features,
          }),
        }
      );

      const result = await response.json();

      if (
        !response.ok ||
        !result.success ||
        !result.downloadUrl
      ) {
        throw new Error(
          result.message || "Plugin generation failed."
        );
      }

      const downloadUrl = `${API_URL}${result.downloadUrl}`;

      const link = document.createElement("a");

      link.href = downloadUrl;
      link.download = `${createSlug(
        plan.pluginName
      )}.zip`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setSuccess(
        `Plugin generated successfully! ${
          result.fileCount || plan.files.length
        } files created. Download started.`
      );
    } catch (error) {
      console.error("Plugin generation error:", error);

      setError(
        "Plugin generate nahi ho paya. Please check that the backend server is running."
      );
    } finally {
      setGenerating(false);
    }
  };

  const resetGenerator = () => {
    setPluginName("");
    setRequirement("");
    setSelectedFeatures([]);
    setPlan(null);
    setError("");
    setSuccess("");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">

      {/* ================= HEADER ================= */}

      {/* <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] w-[92%] max-w-7xl items-center justify-between">

          <div className="text-2xl font-extrabold tracking-tight text-slate-900">
            WP
            <span className="text-blue-600">AI</span>{" "}
            Builder
          </div>

          <nav className="flex items-center gap-7">
            <a
              href="#generator"
              className="hidden text-sm font-semibold text-slate-500 transition hover:text-blue-600 sm:block"
            >
              Generator
            </a>

            <a
              href="#features"
              className="hidden text-sm font-semibold text-slate-500 transition hover:text-blue-600 sm:block"
            >
              Features
            </a>

            <button
              type="button"
              onClick={() =>
                alert("Login system will be added next.")
              }
              className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
            >
              Login
            </button>
          </nav>
        </div>
      </header> */}

      {/* ================= HERO ================= */}

      <section className="mx-auto w-[92%] max-w-5xl px-5 pb-14 pt-20 text-center sm:pt-24">

        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-[10px] font-extrabold tracking-[1.5px] text-blue-600">
          <Sparkles size={13} />
          AI POWERED WORDPRESS DEVELOPMENT
        </div>

        <h1 className="text-4xl font-black leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Build Your Custom
          <span className="block bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text pt-1 text-transparent">
            WordPress Plugin
          </span>
          with AI
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
          Describe what you need and let AI create your
          custom WordPress plugin automatically.
        </p>
      </section>

      {/* ================= GENERATOR ================= */}

      <main
        id="generator"
        className="mx-auto w-[92%] max-w-5xl pb-20"
      >

        {/* ================= REQUIREMENT CARD ================= */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_15px_45px_rgba(27,36,59,0.06)] sm:p-9">

          <div className="mb-8">
            <span className="text-[10px] font-extrabold tracking-[1.3px] text-blue-600">
              STEP 01
            </span>

            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
              Describe Your Plugin
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Tell us what type of WordPress plugin you
              want to create.
            </p>
          </div>

          {/* Plugin Name */}

          <div className="mb-6">
            <label
              htmlFor="plugin-name"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              Plugin Name *
            </label>

            <input
              id="plugin-name"
              type="text"
              placeholder="Example: Smart Appointment Booking"
              value={pluginName}
              onChange={(event) =>
                setPluginName(event.target.value)
              }
              className="h-[50px] w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* Requirement */}

          <div className="mb-7">
            <label
              htmlFor="plugin-requirement"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              Describe Your Requirements *
            </label>

            <textarea
              id="plugin-requirement"
              rows={7}
              placeholder="Example: I need an appointment booking plugin where users can select a date and time. Admin should see all bookings in the WordPress dashboard and receive email notifications..."
              value={requirement}
              onChange={(event) =>
                setRequirement(event.target.value)
              }
              className="min-h-[155px] w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* Features */}

          <div className="mb-7">
            <label className="mb-3 block text-sm font-bold text-slate-700">
              Choose Features You Need
            </label>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => {
                const isActive =
                  selectedFeatures.includes(feature.name);

                const Icon = feature.icon;

                return (
                  <button
                    type="button"
                    key={feature.name}
                    onClick={() =>
                      toggleFeature(feature.name)
                    }
                    className={`flex min-h-[52px] items-center gap-2.5 rounded-xl border px-3 text-left text-xs font-semibold transition ${
                      isActive
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-slate-200 bg-slate-50 text-slate-600 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50/50"
                    }`}
                  >
                    <span
                      className={`flex h-7 w-7 min-w-7 items-center justify-center rounded-lg ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {isActive ? (
                        <Check size={14} />
                      ) : (
                        <Icon size={14} />
                      )}
                    </span>

                    {feature.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Error */}

          {error && (
            <div className="mb-5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
              <AlertTriangle size={17} />
              {error}
            </div>
          )}

          {/* Success */}

          {success && (
            <div className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-600">
              <Check size={17} />
              {success}
            </div>
          )}

          {/* Analyze */}

          <button
            type="button"
            disabled={loading}
            onClick={analyzeRequirement}
            className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 px-5 text-sm font-extrabold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/25 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Analyzing Requirement...
              </>
            ) : (
              <>
                <Sparkles size={17} />
                Analyze with AI
              </>
            )}
          </button>
        </div>

        {/* ================= PLAN CARD ================= */}

        {plan && (
          <div className="mt-7 animate-[fadeIn_0.4s_ease] rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_15px_45px_rgba(27,36,59,0.06)] sm:p-9">

            {/* Plan Header */}

            <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row">
              <div>
                <span className="text-[10px] font-extrabold tracking-[1.3px] text-emerald-600">
                  STEP 02
                </span>

                <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
                  Your Plugin Plan
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Review your plugin requirements before
                  generating the ZIP file.
                </p>
              </div>

              <div className="flex h-fit items-center gap-1.5 self-start rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-extrabold text-emerald-600">
                <Check size={14} />
                Ready
              </div>
            </div>

            {/* Plan Info */}

            <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <span className="mb-1.5 block text-[9px] font-extrabold tracking-wider text-slate-400">
                  PLUGIN NAME
                </span>

                <strong className="block break-words text-sm text-slate-700">
                  {plan.pluginName}
                </strong>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <span className="mb-1.5 block text-[9px] font-extrabold tracking-wider text-slate-400">
                  FILES
                </span>

                <strong className="block text-sm text-slate-700">
                  {plan.files.length} Files
                </strong>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <span className="mb-1.5 block text-[9px] font-extrabold tracking-wider text-slate-400">
                  FEATURES
                </span>

                <strong className="block text-sm text-slate-700">
                  {plan.features.length} Features
                </strong>
              </div>

            </div>

            {/* Description */}

            <div className="mb-5 rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="mb-2 text-sm font-bold text-slate-800">
                Plugin Requirement
              </h3>

              <p className="text-sm leading-6 text-slate-500">
                {plan.description}
              </p>
            </div>

            {/* Grid */}

            <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* Features */}

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="mb-4 text-sm font-bold text-slate-800">
                  Included Features
                </h3>

                <ul>
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 border-b border-slate-100 py-2.5 text-xs text-slate-600 last:border-0"
                    >
                      <Check
                        size={14}
                        className="text-blue-600"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Files */}

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="mb-4 text-sm font-bold text-slate-800">
                  Plugin Files
                </h3>

                <ul>
                  {plan.files.map((file) => (
                    <li
                      key={file}
                      className="flex items-center gap-2 border-b border-slate-100 py-2.5 font-mono text-xs text-slate-600 last:border-0"
                    >
                      <FileText
                        size={14}
                        className="min-w-[14px] text-blue-500"
                      />
                      <span className="break-all">
                        {file}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Generate */}

            <button
              type="button"
              disabled={generating}
              onClick={generatePlugin}
              className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 px-5 text-sm font-extrabold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/25 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {generating ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Generating Plugin...
                </>
              ) : (
                <>
                  <Rocket size={17} />
                  Generate WordPress Plugin
                </>
              )}
            </button>

            {/* Reset */}

            <button
              type="button"
              onClick={resetGenerator}
              className="mt-3 flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700"
            >
              <RotateCcw size={15} />
              Start New Plugin
            </button>
          </div>
        )}
      </main>

      {/* ================= WHY SECTION ================= */}

      <section
        id="features"
        className="mx-auto w-[92%] max-w-6xl pb-20 pt-8"
      >
        <div className="mb-9 text-center">
          <span className="text-[10px] font-extrabold tracking-[1.3px] text-blue-600">
            WHY USE OUR TOOL
          </span>

          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            From Your Idea to a Plugin
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Lightbulb size={23} />
            </div>

            <h3 className="mb-2 text-sm font-bold text-slate-800">
              Describe Your Idea
            </h3>

            <p className="text-xs leading-6 text-slate-500">
              Simply explain what you want your WordPress
              plugin to do.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Brain size={23} />
            </div>

            <h3 className="mb-2 text-sm font-bold text-slate-800">
              AI Understands
            </h3>

            <p className="text-xs leading-6 text-slate-500">
              AI analyzes your requirements and creates a
              plugin plan.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Wrench size={23} />
            </div>

            <h3 className="mb-2 text-sm font-bold text-slate-800">
              Generate Plugin
            </h3>

            <p className="text-xs leading-6 text-slate-500">
              Generate WordPress plugin files
              automatically.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <ArrowDownToLine size={23} />
            </div>

            <h3 className="mb-2 text-sm font-bold text-slate-800">
              Download & Install
            </h3>

            <p className="text-xs leading-6 text-slate-500">
              Download the ZIP file and install it directly
              into WordPress.
            </p>
          </div>

        </div>
      </section>

      {/* ================= FOOTER ================= */}

      <footer className="border-t border-slate-200 bg-white px-5 py-7 text-center">
        <p className="text-xs text-slate-400">
          © 2026 WP AI Builder. Build WordPress plugins
          faster with AI.
        </p>
      </footer>

    </div>
  );
};

export default PluginBuilder;