import fs from "fs";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";
import sharp from "sharp";

const execFileAsync = promisify(execFile);

const TEMP_DIR = path.join(process.cwd(), "temp");

if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

// ============================================================
// SUPPORTED FORMATS
// ============================================================

const SUPPORTED_FORMATS = [
  "pdf",
  "docx",
  "jpg",
  "jpeg",
  "png",
  "webp",
  "pptx",
  "xlsx",
  "txt",
];

const IMAGE_FORMATS = ["jpg", "jpeg", "png", "webp"];

const LIBREOFFICE_FORMATS = [
  "pdf",
  "docx",
  "pptx",
  "xlsx",
  "txt",
];

// ============================================================
// LIBREOFFICE PATH
// ============================================================

const getLibreOfficePath = () => {
  if (process.platform === "win32") {
    return "C:\\Program Files\\LibreOffice\\program\\soffice.exe";
  }

  return "soffice";
};

// ============================================================
// CLEANUP
// ============================================================

const cleanupFile = (filePath) => {
  try {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error("Cleanup error:", error.message);
  }
};

// ============================================================
// IMAGE CONVERSION
// ============================================================

const convertImage = async (inputPath, outputPath, format) => {
  let image = sharp(inputPath);

  switch (format) {
    case "jpg":
    case "jpeg":
      await image
        .jpeg({
          quality: 90,
        })
        .toFile(outputPath);
      break;

    case "png":
      await image
        .png({
          compressionLevel: 9,
        })
        .toFile(outputPath);
      break;

    case "webp":
      await image
        .webp({
          quality: 90,
        })
        .toFile(outputPath);
      break;

    default:
      throw new Error(`Unsupported image format: ${format}`);
  }
};

// ============================================================
// LIBREOFFICE CONVERSION
// ============================================================

const convertWithLibreOffice = async (
  inputPath,
  outputDir,
  outputFormat
) => {
  const libreOffice = getLibreOfficePath();

  const args = [
    "--headless",
    "--convert-to",
    outputFormat,
    "--outdir",
    outputDir,
    inputPath,
  ];

  console.log("Running LibreOffice:");
  console.log(libreOffice, args);

  try {
    const { stdout, stderr } = await execFileAsync(
      libreOffice,
      args,
      {
        timeout: 120000,
      }
    );

    console.log("LibreOffice stdout:", stdout);
    console.log("LibreOffice stderr:", stderr);

  } catch (error) {
    console.error("LibreOffice error:", error);

    throw new Error(
      "Document conversion failed. Make sure LibreOffice is installed on the server."
    );
  }
};

// ============================================================
// FIND GENERATED FILE
// ============================================================

const findConvertedFile = (
  outputDir,
  originalName,
  outputFormat
) => {
  const baseName = path.basename(
    originalName,
    path.extname(originalName)
  );

  const expectedFile = path.join(
    outputDir,
    `${baseName}.${outputFormat}`
  );

  if (fs.existsSync(expectedFile)) {
    return expectedFile;
  }

  // Sometimes LibreOffice changes extension casing
  const files = fs.readdirSync(outputDir);

  const match = files.find(
    (file) =>
      file.toLowerCase() ===
      `${baseName}.${outputFormat}`.toLowerCase()
  );

  if (!match) {
    return null;
  }

  return path.join(outputDir, match);
};

// ============================================================
// MAIN CONVERTER
// ============================================================

export const convertDocument = async (req, res) => {
  let inputPath = null;
  let outputPath = null;

  try {
    console.log("====================================");
    console.log("DOCUMENT CONVERSION REQUEST");
    console.log("====================================");

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a file.",
      });
    }

    const { from, to } = req.body;

    console.log("Original file:", req.file.originalname);
    console.log("From:", from);
    console.log("To:", to);

    if (!from || !to) {
      cleanupFile(req.file.path);

      return res.status(400).json({
        success: false,
        message: "Source and target formats are required.",
      });
    }

    const sourceFormat = from.toLowerCase();
    const targetFormat = to.toLowerCase();

    // ========================================================
    // FORMAT VALIDATION
    // ========================================================

    if (!SUPPORTED_FORMATS.includes(sourceFormat)) {
      cleanupFile(req.file.path);

      return res.status(400).json({
        success: false,
        message: `Unsupported source format: ${sourceFormat}`,
      });
    }

    if (!SUPPORTED_FORMATS.includes(targetFormat)) {
      cleanupFile(req.file.path);

      return res.status(400).json({
        success: false,
        message: `Unsupported target format: ${targetFormat}`,
      });
    }

    // Same format
    if (
      sourceFormat === targetFormat ||
      (sourceFormat === "jpg" && targetFormat === "jpeg") ||
      (sourceFormat === "jpeg" && targetFormat === "jpg")
    ) {
      cleanupFile(req.file.path);

      return res.status(400).json({
        success: false,
        message: "Source and target formats must be different.",
      });
    }

    inputPath = req.file.path;

    const originalName = req.file.originalname;

    const baseName = path.basename(
      originalName,
      path.extname(originalName)
    );

    const outputFileName = `${baseName}.${targetFormat}`;

    outputPath = path.join(TEMP_DIR, outputFileName);

    // ========================================================
    // IMAGE → IMAGE
    // ========================================================

    if (
      IMAGE_FORMATS.includes(sourceFormat) &&
      IMAGE_FORMATS.includes(targetFormat)
    ) {
      console.log("Using Sharp image conversion...");

      await convertImage(
        inputPath,
        outputPath,
        targetFormat
      );
    }

    // ========================================================
    // IMAGE → PDF
    // ========================================================

    else if (
      IMAGE_FORMATS.includes(sourceFormat) &&
      targetFormat === "pdf"
    ) {
      console.log("Converting image → PDF...");

      const pdfOutput = path.join(
        TEMP_DIR,
        `${baseName}.pdf`
      );

      await sharp(inputPath)
        .flatten({
          background: "#ffffff",
        })
        .jpeg({
          quality: 95,
        })
        .toBuffer()
        .then(async (buffer) => {
          // Create a very simple PDF using Sharp is not supported.
          // We use LibreOffice for image → PDF.
        });

      await convertWithLibreOffice(
        inputPath,
        TEMP_DIR,
        "pdf"
      );

      outputPath = findConvertedFile(
        TEMP_DIR,
        originalName,
        "pdf"
      );
    }

    // ========================================================
    // DOCUMENT → IMAGE
    // ========================================================

    else if (
      LIBREOFFICE_FORMATS.includes(sourceFormat) &&
      IMAGE_FORMATS.includes(targetFormat)
    ) {
      console.log("Using LibreOffice document → image...");

      await convertWithLibreOffice(
        inputPath,
        TEMP_DIR,
        targetFormat === "jpg"
          ? "jpg"
          : targetFormat
      );

      outputPath = findConvertedFile(
        TEMP_DIR,
        originalName,
        targetFormat
      );
    }

    // ========================================================
    // DOCUMENT → DOCUMENT
    // ========================================================

    else if (
      LIBREOFFICE_FORMATS.includes(sourceFormat) &&
      LIBREOFFICE_FORMATS.includes(targetFormat)
    ) {
      console.log(
        "Using LibreOffice document conversion..."
      );

      await convertWithLibreOffice(
        inputPath,
        TEMP_DIR,
        targetFormat
      );

      outputPath = findConvertedFile(
        TEMP_DIR,
        originalName,
        targetFormat
      );
    }

    // ========================================================
    // UNSUPPORTED
    // ========================================================

    else {
      cleanupFile(inputPath);

      return res.status(400).json({
        success: false,
        message: `Conversion from ${sourceFormat.toUpperCase()} to ${targetFormat.toUpperCase()} is not currently supported.`,
      });
    }

    // ========================================================
    // CHECK OUTPUT
    // ========================================================

    if (!outputPath || !fs.existsSync(outputPath)) {
      cleanupFile(inputPath);

      return res.status(500).json({
        success: false,
        message:
          "Conversion completed but output file was not created.",
      });
    }

    console.log("Conversion successful:");
    console.log(outputPath);

    // ========================================================
    // SEND FILE
    // ========================================================

    res.download(
      outputPath,
      outputFileName,
      (error) => {
        cleanupFile(inputPath);
        cleanupFile(outputPath);

        if (error) {
          console.error(
            "Download error:",
            error.message
          );
        }
      }
    );

  } catch (error) {
    console.error(
      "Document conversion error:",
      error
    );

    cleanupFile(inputPath);
    cleanupFile(outputPath);

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Document conversion failed.",
    });
  }
};