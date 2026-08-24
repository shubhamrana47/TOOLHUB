import React, { useState } from "react";
import * as prettier from "prettier/standalone";

import babelParser from "prettier/plugins/babel";
import estreeParser from "prettier/plugins/estree";
import htmlParser from "prettier/plugins/html";
import cssParser from "prettier/plugins/postcss";
import markdownParser from "prettier/plugins/markdown";
import typescriptParser from "prettier/plugins/typescript";

import xmlPlugin from "@prettier/plugin-xml";

import {
  Copy,
  Check,
  Download,
  Trash2,
  Wand2,
  Code2,
} from "lucide-react";

const CodeFormatter = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [formattedCode, setFormattedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const languages = [
    {
      value: "javascript",
      label: "JavaScript",
      parser: "babel",
    },
    {
      value: "typescript",
      label: "TypeScript",
      parser: "typescript",
    },
    {
      value: "json",
      label: "JSON",
      parser: "json",
    },
    {
      value: "html",
      label: "HTML",
      parser: "html",
    },
    {
      value: "css",
      label: "CSS",
      parser: "css",
    },
    {
      value: "markdown",
      label: "Markdown",
      parser: "markdown",
    },
    {
      value: "xml",
      label: "XML",
      parser: "xml",
    },
  ];

  const getPlugins = () => {
    const plugins = [
      babelParser,
      estreeParser,
      htmlParser,
      cssParser,
      markdownParser,
      typescriptParser,
    ];

    if (language === "xml") {
      plugins.push(xmlPlugin);
    }

    return plugins;
  };

  const formatCode = async () => {
    if (!code.trim()) {
      setError("Please enter some code first.");
      setFormattedCode("");
      return;
    }

    setLoading(true);
    setError("");
    setFormattedCode("");

    try {
      const selectedLanguage = languages.find(
        (item) => item.value === language
      );

      if (!selectedLanguage) {
        throw new Error("Unsupported language selected.");
      }

      const result = await prettier.format(code, {
        parser: selectedLanguage.parser,
        plugins: getPlugins(),

        semi: true,
        singleQuote: true,
        tabWidth: 2,
        useTabs: false,
        trailingComma: "es5",
        printWidth: 80,
      });

      setFormattedCode(result);
    } catch (err) {
      console.error("Formatting error:", err);

      setError(
        err?.message ||
          "Unable to format this code. Please check your syntax."
      );

      setFormattedCode("");
    } finally {
      setLoading(false);
    }
  };

  const copyCode = async () => {
    if (!formattedCode) return;

    try {
      await navigator.clipboard.writeText(formattedCode);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Copy error:", err);
      setError("Unable to copy the formatted code.");
    }
  };

  const downloadCode = () => {
    if (!formattedCode) return;

    const extensions = {
      javascript: "js",
      typescript: "ts",
      json: "json",
      html: "html",
      css: "css",
      markdown: "md",
      xml: "xml",
    };

    const extension = extensions[language] || "txt";

    const blob = new Blob([formattedCode], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `formatted-code.${extension}`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const clearCode = () => {
    setCode("");
    setFormattedCode("");
    setError("");
    setCopied(false);
  };

  const useFormattedCode = () => {
    if (!formattedCode) return;

    setCode(formattedCode);
    setFormattedCode("");
    setError("");
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    setFormattedCode("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-white px-4 py-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
            <Code2 className="h-8 w-8 text-blue-600" />
          </div>

          <h1 className="text-4xl font-black tracking-tight text-gray-950">
            Code Formatter
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-gray-500">
            Clean, organize and format your code instantly.
            Everything runs directly in your browser.
          </p>
        </div>

        {/* Main Card */}
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:p-7">
          {/* Toolbar */}
          <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Language */}
            <div className="flex items-center gap-3">
              <label
                htmlFor="language"
                className="text-sm font-semibold text-gray-700"
              >
                Language
              </label>

              <select
                id="language"
                value={language}
                onChange={handleLanguageChange}
                className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {languages.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={clearCode}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
              >
                <Trash2 className="h-4 w-4" />
                Clear
              </button>

              <button
                type="button"
                onClick={formatCode}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Wand2 className="h-4 w-4" />

                {loading ? "Formatting..." : "Format Code"}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Editors */}
          <div className="grid gap-5 lg:grid-cols-2">
            {/* Input */}
            <div className="overflow-hidden rounded-2xl border border-gray-200">
              <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3">
                <span className="text-sm font-bold text-gray-700">
                  Input Code
                </span>

                <span className="text-xs text-gray-400">
                  {code.length} characters
                </span>
              </div>

              <textarea
                value={code}
                onChange={(event) => {
                  setCode(event.target.value);
                  setError("");
                }}
                placeholder={`Paste your ${language} code here...`}
                spellCheck="false"
                className="min-h-[500px] w-full resize-none bg-white p-5 font-mono text-sm leading-6 text-gray-800 outline-none"
              />
            </div>

            {/* Output */}
            <div className="overflow-hidden rounded-2xl border border-gray-200">
              <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3">
                <span className="text-sm font-bold text-gray-700">
                  Formatted Code
                </span>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={copyCode}
                    disabled={!formattedCode}
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Copy
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={downloadCode}
                    disabled={!formattedCode}
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </button>
                </div>
              </div>

              <textarea
                value={formattedCode}
                readOnly
                spellCheck="false"
                placeholder="Your formatted code will appear here..."
                className="min-h-[500px] w-full resize-none bg-gray-950 p-5 font-mono text-sm leading-6 text-gray-100 outline-none"
              />
            </div>
          </div>

          {/* Use formatted code */}
          {formattedCode && (
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={useFormattedCode}
                className="rounded-xl border border-blue-200 bg-blue-50 px-5 py-2.5 text-sm font-bold text-blue-600 transition hover:bg-blue-100"
              >
                Replace Input With Formatted Code
              </button>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 p-5">
            <h3 className="font-bold text-gray-900">
              ⚡ Instant Formatting
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Format your code directly in your browser without sending it to
              a server.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-5">
            <h3 className="font-bold text-gray-900">🔒 Private</h3>

            <p className="mt-2 text-sm text-gray-500">
              Your source code stays on your device.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-5">
            <h3 className="font-bold text-gray-900">📥 Download</h3>

            <p className="mt-2 text-sm text-gray-500">
              Download your formatted code as a source file.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeFormatter;