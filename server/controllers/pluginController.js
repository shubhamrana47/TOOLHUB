import fs from "fs";
import path from "path";
import { ZipArchive } from "archiver";

import { createPluginFiles } from "../services/pluginGenerator.js";
import { createSlug } from "../utils/pluginHelpers.js";

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
        message: "Plugin requirement is required",
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
// GENERATE WORDPRESS PLUGIN
// =========================================================

export const generatePlugin = async (
  req,
  res
) => {

  try {

    // =====================================================
    // GET REQUEST DATA
    // =====================================================

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
      "Requirement:",
      requirement
    );

    console.log(
      "Features:",
      features
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
      createSlug(
        String(pluginName).trim()
      );

    console.log(
      "Plugin slug:",
      slug
    );

    // =====================================================
    // VALIDATE SLUG
    // =====================================================

    if (!slug) {

      return res.status(400).json({
        success: false,
        message:
          "Invalid plugin name",
      });

    }

    // =====================================================
    // CREATE PLUGIN FILES
    // =====================================================

    const pluginFiles =
      createPluginFiles(
        String(pluginName).trim(),
        String(requirement).trim(),
        Array.isArray(features)
          ? features
          : []
      );

    console.log(
      "Plugin files created:"
    );

    console.log(
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

    console.log(
      "ZIP path:",
      zipPath
    );

    // =====================================================
    // REMOVE OLD ZIP
    // =====================================================

    if (
      fs.existsSync(zipPath)
    ) {

      try {

        fs.unlinkSync(zipPath);

        console.log(
          "Old ZIP removed"
        );

      } catch (error) {

        console.error(
          "Could not remove old ZIP:",
          error
        );

      }

    }

    // =====================================================
    // CREATE OUTPUT STREAM
    // =====================================================

    const output =
      fs.createWriteStream(
        zipPath
      );

    // =====================================================
    // CREATE ZIP ARCHIVE
    // ARCHIVER 8.x API
    // =====================================================

    const archive =
      new ZipArchive({
        zlib: {
          level: 9,
        },
      });

    // =====================================================
    // OUTPUT STREAM ERROR
    // =====================================================

    output.on(
      "error",
      (error) => {

        console.error(
          "ZIP output error:",
          error
        );

        if (
          !res.headersSent
        ) {

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

        if (
          !res.headersSent
        ) {

          return res.status(500).json({
            success: false,
            message:
              "Plugin ZIP creation failed",
          });

        }

      }
    );

    // =====================================================
    // ZIP WARNING
    // =====================================================

    archive.on(
      "warning",
      (warning) => {

        console.warn(
          "Archive warning:",
          warning
        );

      }
    );

    // =====================================================
    // ZIP COMPLETE
    // =====================================================

    output.on(
      "close",
      () => {

        try {

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

          if (
            !res.headersSent
          ) {

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

        } catch (error) {

          console.error(
            "ZIP completion error:",
            error
          );

          if (
            !res.headersSent
          ) {

            return res.status(500).json({

              success: false,

              message:
                "Plugin ZIP completed but response failed",

            });

          }

        }

      }
    );

    // =====================================================
    // CONNECT ARCHIVE TO OUTPUT
    // =====================================================

    archive.pipe(
      output
    );

    // =====================================================
    // ADD PLUGIN FILES TO ZIP
    // =====================================================

    Object.entries(
      pluginFiles
    ).forEach(
      ([filePath, content]) => {

        console.log(
          "Adding file:",
          filePath
        );

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

    console.log(
      "Finalizing ZIP..."
    );

    await archive.finalize();

  } catch (error) {

    console.error(
      "================================="
    );

    console.error(
      "Plugin generation error:"
    );

    console.error(
      error
    );

    console.error(
      "================================="
    );

    if (
      !res.headersSent
    ) {

      return res.status(500).json({

        success: false,

        message:
          error.message ||
          "Plugin generation failed",

      });

    }

  }

};