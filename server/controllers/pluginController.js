import fs from "fs";
import path from "path";
import * as archiverModule from "archiver";

import { createPluginFiles } from "../services/pluginGenerator.js";
import { createSlug } from "../utils/pluginHelpers.js";

// =========================================================
// ARCHIVER
// =========================================================

const archiver =
  archiverModule.default || archiverModule;

// =========================================================
// DOWNLOAD DIRECTORY
// =========================================================

const downloadsDir = path.join(
  process.cwd(),
  "downloads"
);

if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir, {
    recursive: true,
  });
}

// =========================================================
// ANALYZE PLUGIN
// =========================================================

export const analyzePlugin = (req, res) => {
  try {
    const {
      pluginName,
      requirement,
      features,
    } = req.body;

    // -----------------------------------------------------
    // VALIDATE PLUGIN NAME
    // -----------------------------------------------------

    if (
      !pluginName ||
      !String(pluginName).trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Plugin name is required",
      });
    }

    // -----------------------------------------------------
    // VALIDATE REQUIREMENT
    // -----------------------------------------------------

    if (
      !requirement ||
      !String(requirement).trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Plugin requirement is required",
      });
    }

    // -----------------------------------------------------
    // FEATURES
    // -----------------------------------------------------

    const selectedFeatures =
      Array.isArray(features)
        ? features
        : [];

    // -----------------------------------------------------
    // RESPONSE
    // -----------------------------------------------------

    return res.json({
      success: true,

      message:
        "Requirement analyzed successfully",

      data: {
        pluginName:
          String(pluginName).trim(),

        requirement:
          String(requirement).trim(),

        features:
          selectedFeatures,
      },
    });

  } catch (error) {

    console.error(
      "Analyze plugin error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Requirement analysis failed",
    });
  }
};

// =========================================================
// GENERATE PLUGIN
// =========================================================

export const generatePlugin = async (
  req,
  res
) => {

  try {

    const {
      pluginName,
      requirement,
      features,
    } = req.body;

    console.log(
      "================================="
    );

    console.log(
      "Plugin generation request received"
    );

    console.log(
      "Plugin Name:",
      pluginName
    );

    console.log(
      "================================="
    );

    // =====================================================
    // VALIDATE PLUGIN NAME
    // =====================================================

    if (
      !pluginName ||
      !String(pluginName).trim()
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Plugin name is required",
      });

    }

    // =====================================================
    // VALIDATE REQUIREMENT
    // =====================================================

    if (
      !requirement ||
      !String(requirement).trim()
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Plugin requirement is required",
      });

    }

    // =====================================================
    // CREATE SLUG
    // =====================================================

    const slug =
      createSlug(pluginName);

    console.log(
      "Plugin slug:",
      slug
    );

    // =====================================================
    // CREATE PLUGIN FILES
    // =====================================================

    const pluginFiles =
      createPluginFiles(
        pluginName,
        requirement,
        Array.isArray(features)
          ? features
          : []
      );

    console.log(
      "Plugin files created:",
      Object.keys(pluginFiles)
    );

    // =====================================================
    // ZIP PATH
    // =====================================================

    const zipPath =
      path.join(
        downloadsDir,
        `${slug}.zip`
      );

    // =====================================================
    // REMOVE OLD ZIP
    // =====================================================

    if (
      fs.existsSync(zipPath)
    ) {

      fs.unlinkSync(zipPath);

      console.log(
        "Old ZIP removed"
      );

    }

    // =====================================================
    // CREATE OUTPUT STREAM
    // =====================================================

    const output =
      fs.createWriteStream(
        zipPath
      );

    // =====================================================
    // CREATE ARCHIVE
    // =====================================================

    const archive =
      archiver(
        "zip",
        {
          zlib: {
            level: 9,
          },
        }
      );

    // =====================================================
    // OUTPUT ERROR
    // =====================================================

    output.on(
      "error",
      (error) => {

        console.error(
          "ZIP output error:",
          error
        );

        if (!res.headersSent) {

          return res.status(500).json({
            success: false,
            message:
              "Could not create plugin ZIP",
          });

        }

      }
    );

    // =====================================================
    // ARCHIVE ERROR
    // =====================================================

    archive.on(
      "error",
      (error) => {

        console.error(
          "Archive error:",
          error
        );

        if (!res.headersSent) {

          return res.status(500).json({
            success: false,
            message:
              "Plugin ZIP creation failed",
          });

        }

      }
    );

    // =====================================================
    // ZIP COMPLETE
    // =====================================================

    output.on(
      "close",
      () => {

        const size =
          archive.pointer();

        console.log(
          "================================="
        );

        console.log(
          "ZIP created successfully"
        );

        console.log(
          "ZIP:",
          zipPath
        );

        console.log(
          "Size:",
          size,
          "bytes"
        );

        console.log(
          "Files:",
          Object.keys(
            pluginFiles
          ).length
        );

        console.log(
          "================================="
        );

        if (!res.headersSent) {

          return res.json({

            success: true,

            message:
              "WordPress plugin generated successfully",

            downloadUrl:
              `/downloads/${slug}.zip`,

            fileCount:
              Object.keys(
                pluginFiles
              ).length,

            size,
          });

        }

      }
    );

    // =====================================================
    // CONNECT ARCHIVE TO OUTPUT
    // =====================================================

    archive.pipe(output);

    // =====================================================
    // ADD FILES TO ZIP
    // =====================================================

    Object.entries(
      pluginFiles
    ).forEach(
      ([filePath, content]) => {

        archive.append(
          content,
          {
            name: filePath,
          }
        );

      }
    );

    // =====================================================
    // FINALIZE ZIP
    // =====================================================

    await archive.finalize();

  } catch (error) {

    console.error(
      "================================="
    );

    console.error(
      "Plugin generation error:",
      error
    );

    console.error(
      "================================="
    );

    if (!res.headersSent) {

      return res.status(500).json({

        success: false,

        message:
          error.message ||
          "Plugin generation failed",

      });

    }

  }

};