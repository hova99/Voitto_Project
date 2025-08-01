#!/usr/bin/env node

import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";

// Configuration
const MAX_WIDTH = 1200;
const WEBP_QUALITY = 80;
const OUTPUT_DIR = "public/optimized";

async function ensureDirectoryExists(dirPath) {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
    console.log(`📁 Created directory: ${dirPath}`);
  }
}

async function getImageFiles(dir, extensions = [".jpg", ".jpeg", ".png"]) {
  const files = [];

  async function scanDirectory(currentDir) {
    try {
      const items = await fs.readdir(currentDir, { withFileTypes: true });

      for (const item of items) {
        const fullPath = path.join(currentDir, item.name);

        if (item.isDirectory()) {
          // Skip node_modules and .git directories
          if (
            !["node_modules", ".git", "public/optimized"].includes(item.name)
          ) {
            await scanDirectory(fullPath);
          }
        } else if (item.isFile()) {
          const ext = path.extname(item.name).toLowerCase();
          if (extensions.includes(ext)) {
            files.push(fullPath);
          }
        }
      }
    } catch (error) {
      console.warn(
        `⚠️  Warning: Could not read directory ${currentDir}: ${error.message}`
      );
    }
  }

  await scanDirectory(dir);
  return files;
}

async function optimizeImage(inputPath) {
  try {
    const filename = path.basename(inputPath, path.extname(inputPath));
    const outputPath = path.join(OUTPUT_DIR, `${filename}.webp`);

    // Get image metadata
    const metadata = await sharp(inputPath).metadata();

    // Determine if resizing is needed
    const shouldResize = metadata.width > MAX_WIDTH;
    const resizeOptions = shouldResize
      ? { width: MAX_WIDTH, withoutEnlargement: true }
      : {};

    // Process image
    await sharp(inputPath)
      .resize(resizeOptions)
      .webp({ quality: WEBP_QUALITY })
      .toFile(outputPath);

    // Get output file size
    const outputStats = await fs.stat(outputPath);
    const inputStats = await fs.stat(inputPath);
    const compressionRatio = (
      ((inputStats.size - outputStats.size) / inputStats.size) *
      100
    ).toFixed(1);

    console.log(
      `✅ ${path.basename(inputPath)} → ${path.basename(outputPath)}`
    );
    console.log(
      `   📏 ${metadata.width}x${metadata.height}${
        shouldResize
          ? ` → ${MAX_WIDTH}x${Math.round(
              (metadata.height * MAX_WIDTH) / metadata.width
            )}`
          : ""
      }`
    );
    console.log(
      `   📦 ${(inputStats.size / 1024).toFixed(1)}KB → ${(
        outputStats.size / 1024
      ).toFixed(1)}KB (${compressionRatio}% smaller)`
    );

    return {
      success: true,
      inputPath,
      outputPath,
      originalSize: inputStats.size,
      optimizedSize: outputStats.size,
      compressionRatio: parseFloat(compressionRatio),
    };
  } catch (error) {
    console.error(
      `❌ Failed to optimize ${path.basename(inputPath)}: ${error.message}`
    );
    return {
      success: false,
      inputPath,
      error: error.message,
    };
  }
}

async function main() {
  console.log("🚀 Starting image optimization...\n");

  try {
    // Ensure output directory exists
    await ensureDirectoryExists(OUTPUT_DIR);

    // Get all image files
    console.log("🔍 Scanning for images...");
    const imageFiles = await getImageFiles(".");
    console.log(`📋 Found ${imageFiles.length} images to optimize\n`);

    if (imageFiles.length === 0) {
      console.log("✨ No images found to optimize!");
      return;
    }

    // Process images
    const results = [];
    let successCount = 0;
    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;

    for (const imagePath of imageFiles) {
      const result = await optimizeImage(imagePath);
      results.push(result);

      if (result.success) {
        successCount++;
        totalOriginalSize += result.originalSize;
        totalOptimizedSize += result.optimizedSize;
      }

      console.log(""); // Add spacing between files
    }

    // Summary
    console.log("📊 Optimization Summary:");
    console.log(
      `✅ Successfully optimized: ${successCount}/${imageFiles.length} images`
    );
    console.log(`❌ Failed: ${imageFiles.length - successCount} images`);

    if (successCount > 0) {
      const totalCompression = (
        ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize) *
        100
      ).toFixed(1);
      console.log(
        `📦 Total size reduction: ${(totalOriginalSize / 1024 / 1024).toFixed(
          2
        )}MB → ${(totalOptimizedSize / 1024 / 1024).toFixed(
          2
        )}MB (${totalCompression}% smaller)`
      );
      console.log(
        `💾 Space saved: ${(
          (totalOriginalSize - totalOptimizedSize) /
          1024 /
          1024
        ).toFixed(2)}MB`
      );
    }

    console.log(`\n🎯 Optimized images saved to: ${OUTPUT_DIR}/`);
    console.log("✨ Image optimization complete!");
  } catch (error) {
    console.error("💥 Fatal error:", error.message);
    process.exit(1);
  }
}

// Handle command line arguments
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { optimizeImage, getImageFiles };
