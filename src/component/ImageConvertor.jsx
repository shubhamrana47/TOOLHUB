import React, { useRef, useState } from "react";
import {
  Upload,
  Image as ImageIcon,
  Download,
  X,
  RefreshCw,
  FileImage,
} from "lucide-react";

const ImageConverter = () => {
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [outputFormat, setOutputFormat] = useState("webp");
  const [quality, setQuality] = useState(0.9);
  const [convertedUrl, setConvertedUrl] = useState("");
  const [convertedSize, setConvertedSize] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [converting, setConverting] = useState(false);
  const [error, setError] = useState("");

  // =========================================================
  // FILE SELECTION
  // =========================================================

  const handleFile = (selectedFile) => {
    setError("");
    setConvertedUrl("");
    setConvertedSize(null);

    if (!selectedFile) return;

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/bmp",
      "image/gif",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      setError(
        "Unsupported image format. Please upload PNG, JPG, JPEG, WEBP, BMP or GIF."
      );
      return;
    }

    setFile(selectedFile);

    const url = URL.createObjectURL(selectedFile);
    setPreview(url);
  };

  // =========================================================
  // INPUT CHANGE
  // =========================================================

  const handleInputChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  // =========================================================
  // DRAG EVENTS
  // =========================================================

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files?.[0];

    if (droppedFile) {
      handleFile(droppedFile);
    }
  };

  // =========================================================
  // CONVERT IMAGE
  // =========================================================

  const convertImage = () => {
    if (!file) return;

    setConverting(true);
    setError("");
    setConvertedUrl("");

    const img = new Image();

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");

        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");

        if (!ctx) {
          throw new Error("Your browser does not support canvas.");
        }

        // JPG/JPEG doesn't support transparent backgrounds.
        // Fill the canvas with white before drawing.
        if (
          outputFormat === "jpg" ||
          outputFormat === "jpeg"
        ) {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(img, 0, 0);

        let mimeType = "image/webp";

        if (outputFormat === "png") {
          mimeType = "image/png";
        }

        if (
          outputFormat === "jpg" ||
          outputFormat === "jpeg"
        ) {
          mimeType = "image/jpeg";
        }

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              setError("Image conversion failed.");
              setConverting(false);
              return;
            }

            const url = URL.createObjectURL(blob);

            setConvertedUrl(url);
            setConvertedSize(blob.size);
            setConverting(false);
          },
          mimeType,
          quality
        );
      } catch (err) {
        console.error(err);
        setError("Something went wrong while converting the image.");
        setConverting(false);
      }
    };

    img.onerror = () => {
      setError("Unable to read this image.");
      setConverting(false);
    };

    img.src = preview;
  };

  // =========================================================
  // DOWNLOAD
  // =========================================================

  const downloadImage = () => {
    if (!convertedUrl || !file) return;

    const originalName = file.name.substring(
      0,
      file.name.lastIndexOf(".")
    );

    const extension =
      outputFormat === "jpeg"
        ? "jpg"
        : outputFormat;

    const link = document.createElement("a");

    link.href = convertedUrl;
    link.download = `${originalName}-converted.${extension}`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // =========================================================
  // REMOVE IMAGE
  // =========================================================

  const removeImage = () => {
    setFile(null);
    setPreview("");
    setConvertedUrl("");
    setConvertedSize(null);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =========================================================
  // FORMAT FILE SIZE
  // =========================================================

  const formatSize = (bytes) => {
    if (!bytes) return "0 KB";

    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-10 text-center">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
            <FileImage className="h-8 w-8 text-blue-600" />
          </div>

          <h1 className="text-3xl font-black tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
            Image Converter
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg">
            Convert PNG, JPG, JPEG, WEBP and other image formats
            quickly and securely. Your images are processed directly
            in your browser.
          </p>

        </div>

        {/* =====================================================
            UPLOAD AREA
        ===================================================== */}

        {!file && (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer rounded-3xl border-2 border-dashed p-10 text-center transition sm:p-16 ${
              dragActive
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 bg-gray-50 hover:border-blue-400 hover:bg-blue-50/40"
            }`}
          >

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-sm">
              <Upload className="h-9 w-9 text-blue-600" />
            </div>

            <h2 className="mt-6 text-xl font-bold text-gray-900">
              Drag & Drop your image here
            </h2>

            <p className="mt-2 text-gray-500">
              or click to browse from your device
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {["PNG", "JPG", "JPEG", "WEBP", "BMP", "GIF"].map(
                (format) => (
                  <span
                    key={format}
                    className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-500 shadow-sm"
                  >
                    {format}
                  </span>
                )
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/bmp,image/gif"
              onChange={handleInputChange}
              className="hidden"
            />

          </div>
        )}

        {/* =====================================================
            ERROR
        ===================================================== */}

        {error && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {/* =====================================================
            IMAGE WORKSPACE
        ===================================================== */}

        {file && (
          <div className="grid gap-6 lg:grid-cols-2">

            {/* PREVIEW */}

            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-5 sm:p-6">

              <div className="mb-5 flex items-center justify-between">

                <div>
                  <h2 className="font-bold text-gray-900">
                    Original Image
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {file.name}
                  </p>
                </div>

                <button
                  onClick={removeImage}
                  className="rounded-xl p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                  title="Remove image"
                >
                  <X className="h-5 w-5" />
                </button>

              </div>

              <div className="flex min-h-[300px] items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-white p-4">
                <img
                  src={preview}
                  alt="Original"
                  className="max-h-[400px] max-w-full object-contain"
                />
              </div>

              <div className="mt-4 flex items-center justify-between rounded-xl bg-white px-4 py-3">

                <span className="text-sm text-gray-500">
                  Original size
                </span>

                <span className="text-sm font-bold text-gray-900">
                  {formatSize(file.size)}
                </span>

              </div>

            </div>

            {/* SETTINGS */}

            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

              <h2 className="text-xl font-bold text-gray-900">
                Conversion Settings
              </h2>

              {/* FORMAT */}

              <div className="mt-7">

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Convert to
                </label>

                <select
                  value={outputFormat}
                  onChange={(e) => {
                    setOutputFormat(e.target.value);
                    setConvertedUrl("");
                  }}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="png">PNG</option>
                  <option value="jpg">JPG</option>
                  <option value="jpeg">JPEG</option>
                  <option value="webp">WEBP</option>
                </select>

              </div>

              {/* QUALITY */}

              {outputFormat !== "png" && (
                <div className="mt-7">

                  <div className="mb-3 flex items-center justify-between">

                    <label className="text-sm font-semibold text-gray-700">
                      Quality
                    </label>

                    <span className="text-sm font-bold text-blue-600">
                      {Math.round(quality * 100)}%
                    </span>

                  </div>

                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={quality}
                    onChange={(e) =>
                      setQuality(Number(e.target.value))
                    }
                    className="w-full accent-blue-600"
                  />

                  <div className="mt-2 flex justify-between text-xs text-gray-400">
                    <span>Smaller file</span>
                    <span>Higher quality</span>
                  </div>

                </div>
              )}

              {/* INFO */}

              <div className="mt-7 rounded-2xl bg-blue-50 p-4">

                <div className="flex gap-3">

                  <ImageIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />

                  <div>
                    <p className="text-sm font-semibold text-blue-900">
                      Private & secure
                    </p>

                    <p className="mt-1 text-xs leading-5 text-blue-700">
                      Your image is converted directly on your
                      device. It is not uploaded to our server.
                    </p>
                  </div>

                </div>

              </div>

              {/* CONVERT */}

              {!convertedUrl && (
                <button
                  onClick={convertImage}
                  disabled={converting}
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {converting ? (
                    <>
                      <RefreshCw className="h-5 w-5 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-5 w-5" />
                      Convert Image
                    </>
                  )}
                </button>
              )}

              {/* DOWNLOAD */}

              {convertedUrl && (
                <div className="mt-7">

                  <div className="mb-4 rounded-2xl border border-green-200 bg-green-50 p-4">

                    <p className="text-sm font-bold text-green-700">
                      Conversion complete!
                    </p>

                    <div className="mt-2 flex justify-between text-xs text-green-600">
                      <span>Output size</span>
                      <span className="font-bold">
                        {formatSize(convertedSize)}
                      </span>
                    </div>

                  </div>

                  <button
                    onClick={downloadImage}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-bold text-white transition hover:bg-blue-700"
                  >
                    <Download className="h-5 w-5" />
                    Download Image
                  </button>

                  <button
                    onClick={convertImage}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3.5 font-bold text-gray-700 transition hover:bg-gray-50"
                  >
                    <RefreshCw className="h-5 w-5" />
                    Convert Again
                  </button>

                </div>
              )}

            </div>

          </div>
        )}

        {/* =====================================================
            FEATURES
        ===================================================== */}

        <div className="mt-12 grid gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <Upload className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="mt-3 font-bold text-gray-900">
              Easy Upload
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Drag and drop or select an image.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <RefreshCw className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="mt-3 font-bold text-gray-900">
              Fast Conversion
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Convert images instantly in your browser.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <Download className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="mt-3 font-bold text-gray-900">
              Instant Download
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Download your converted image immediately.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ImageConverter;