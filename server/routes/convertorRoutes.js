import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import {
  convertDocument,
} from "../controllers/converterController.js";

const router = express.Router();

const uploadDir = path.join(
  process.cwd(),
  "temp"
);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, {
    recursive: true,
  });
}

// ============================================================
// MULTER CONFIG
// ============================================================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      `${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}${path.extname(file.originalname)}`;

    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize: 25 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowedExtensions = [
      ".pdf",
      ".docx",
      ".jpg",
      ".jpeg",
      ".png",
      ".webp",
      ".pptx",
      ".xlsx",
      ".txt",
    ];

    const extension = path
      .extname(file.originalname)
      .toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      return cb(
        new Error(
          "Unsupported file type."
        )
      );
    }

    cb(null, true);
  },
});

// ============================================================
// POST /api/converter/convert
// ============================================================

router.post(
  "/convert",
  upload.single("file"),
  convertDocument
);

export default router;