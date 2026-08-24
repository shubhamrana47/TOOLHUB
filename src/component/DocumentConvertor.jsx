import React, { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import {
  Upload,
  FileText,
  Download,
  Trash2,
  FileOutput,
  Image as ImageIcon,
} from "lucide-react";

const DocumentConverter = () => {
  const inputRef = useRef(null);

  const [files, setFiles] = useState([]);
  const [format, setFormat] = useState("pdf");
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [error, setError] = useState("");

  const formats = [
    {
      value: "pdf",
      label: "PDF",
      extensions: ".jpg, .jpeg, .png, .txt, .html",
    },
  ];

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files || []);

    setError("");
    setDownloadUrl(null);

    const validFiles = selectedFiles.filter((file) => {
      const allowed = [
        "image/jpeg",
        "image/png",
        "text/plain",
        "text/html",
      ];

      return allowed.includes(file.type);
    });

    if (validFiles.length !== selectedFiles.length) {
      setError(
        "Some files are not supported. Use JPG, JPEG, PNG, TXT or HTML."
      );
    }

    setFiles(validFiles);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setDownloadUrl(null);
  };

  const imageToDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  };

  const textToPdf = async (file, pdf) => {
    const text = await file.text();

    const lines = pdf.splitTextToSize(text, 180);

    let y = 20;

    lines.forEach((line) => {
      if (y > 280) {
        pdf.addPage();
        y = 20;
      }

      pdf.text(line, 15, y);
      y += 7;
    });
  };

  const htmlToPdf = async (file, pdf) => {
    const html = await file.text();

    const container = document.createElement("div");

    container.innerHTML = html;

    container.style.position = "fixed";
    container.style.left = "-10000px";
    container.style.top = "0";
    container.style.width = "800px";
    container.style.background = "white";
    container.style.padding = "30px";

    document.body.appendChild(container);

    try {
      await pdf.html(container, {
        x: 10,
        y: 10,
        width: 190,
        windowWidth: 800,
        autoPaging: "text",
      });
    } finally {
      document.body.removeChild(container);
    }
  };

  const convertToPdf = async () => {
    if (!files.length) {
      setError("Please select at least one file.");
      return;
    }

    setLoading(true);
    setError("");
    setDownloadUrl(null);

    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (i > 0) {
          pdf.addPage();
        }

        if (file.type.startsWith("image/")) {
          const dataUrl = await imageToDataURL(file);

          const img = new Image();

          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = dataUrl;
          });

          const pageWidth = 210;
          const pageHeight = 297;

          const margin = 10;

          const maxWidth = pageWidth - margin * 2;
          const maxHeight = pageHeight - margin * 2;

          let width = img.width;
          let height = img.height;

          const ratio = Math.min(
            maxWidth / width,
            maxHeight / height
          );

          width *= ratio;
          height *= ratio;

          const x = (pageWidth - width) / 2;
          const y = (pageHeight - height) / 2;

          pdf.addImage(
            dataUrl,
            file.type === "image/png" ? "PNG" : "JPEG",
            x,
            y,
            width,
            height
          );
        }

        else if (file.type === "text/plain") {
          await textToPdf(file, pdf);
        }

        else if (file.type === "text/html") {
          await htmlToPdf(file, pdf);
        }
      }

      const blob = pdf.output("blob");

      const url = URL.createObjectURL(blob);

      setDownloadUrl(url);
    } catch (err) {
      console.error(err);
      setError("Conversion failed. Please try another file.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFiles([]);
    setDownloadUrl(null);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-12">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-10 text-center">

          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
            <FileOutput className="h-8 w-8 text-blue-600" />
          </div>

          <h1 className="text-4xl font-black tracking-tight text-gray-950">
            Document Converter
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-gray-500">
            Convert your documents and images directly in your browser.
            No upload, no server and no API required.
          </p>

        </div>

        {/* Converter Card */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">

          {/* Format */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Convert to
            </label>

            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {formats.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {/* Upload */}
          <input
            ref={inputRef}
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.txt,.html"
            onChange={handleFileSelect}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="group flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/50 px-6 py-14 transition hover:border-blue-400 hover:bg-blue-50"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
              <Upload className="h-7 w-7 text-blue-600" />
            </div>

            <span className="text-lg font-bold text-gray-900">
              Click to upload files
            </span>

            <span className="mt-2 text-sm text-gray-500">
              JPG, JPEG, PNG, TXT or HTML
            </span>
          </button>

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Files */}
          {files.length > 0 && (
            <div className="mt-6 space-y-3">

              <div className="flex items-center justify-between">
                <h2 className="font-bold text-gray-900">
                  Selected files
                </h2>

                <button
                  onClick={reset}
                  className="text-sm font-medium text-red-500 hover:text-red-600"
                >
                  Clear all
                </button>
              </div>

              {files.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between rounded-xl border border-gray-200 p-4"
                >
                  <div className="flex min-w-0 items-center gap-3">

                    {file.type.startsWith("image/") ? (
                      <ImageIcon className="h-5 w-5 shrink-0 text-blue-500" />
                    ) : (
                      <FileText className="h-5 w-5 shrink-0 text-blue-500" />
                    )}

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-800">
                        {file.name}
                      </p>

                      <p className="text-xs text-gray-400">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFile(index)}
                    className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>

                </div>
              ))}
            </div>
          )}

          {/* Convert */}
          <button
            onClick={convertToPdf}
            disabled={!files.length || loading}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FileOutput className="h-5 w-5" />

            {loading ? "Converting..." : "Convert to PDF"}
          </button>

          {/* Download */}
          {downloadUrl && (
            <div className="mt-6 rounded-2xl bg-green-50 p-5 text-center">

              <p className="mb-4 font-semibold text-green-700">
                Your PDF is ready!
              </p>

              <a
                href={downloadUrl}
                download="converted-document.pdf"
                className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-bold text-white hover:bg-green-700"
              >
                <Download className="h-5 w-5" />
                Download PDF
              </a>

            </div>
          )}

        </div>

        {/* Privacy */}
        <div className="mt-8 text-center text-sm text-gray-400">
          🔒 Your files are processed locally in your browser and are
          not uploaded to our server.
        </div>

      </div>
    </div>
  );
};

export default DocumentConverter;