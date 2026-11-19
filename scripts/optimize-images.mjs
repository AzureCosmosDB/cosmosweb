import fg from "fast-glob";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const TARGET_DIRS = ["static/img", "static/assets"];
const EXTENSIONS = ["png", "jpg", "jpeg"];

const formatBytes = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
};

const toSharpOptions = (ext) => {
  if (ext === "png") {
    return { format: "png", options: { compressionLevel: 9, adaptiveFiltering: true } };
  }
  return { format: "jpeg", options: { quality: 80, mozjpeg: true } };
};

const writeVariant = async (inputBuffer, filePath, format, options) => {
  const outputPath = filePath.replace(/\.(png|jpe?g)$/i, `.${format}`);
  const outputBuffer = await sharp(inputBuffer)
    .rotate()
    [format](options)
    .toBuffer();

  await fs.writeFile(outputPath, outputBuffer);
  return { outputPath, size: outputBuffer.length };
};

const optimizeImage = async (filePath) => {
  const ext = path.extname(filePath).slice(1).toLowerCase();
  const { format, options } = toSharpOptions(ext);

  const original = await fs.readFile(filePath);
  const optimized = await sharp(original)
    .rotate()
    [format](options)
    .toBuffer();

  let finalSize = original.length;
  if (optimized.length < original.length) {
    await fs.writeFile(filePath, optimized);
    finalSize = optimized.length;
  }

  const avif = await writeVariant(optimized, filePath, "avif", {
    quality: 50,
    effort: 4,
  });
  const webp = await writeVariant(optimized, filePath, "webp", {
    quality: 75,
  });

  return {
    saved: original.length - finalSize,
    before: original.length,
    after: finalSize,
    avif,
    webp,
  };
};

const main = async () => {
  const patterns = TARGET_DIRS.map(
    (dir) => `${dir.replace(/\\/g, "/")}/**/*.+(${EXTENSIONS.join("|")})`
  );

  const files = await fg(patterns, {
    cwd: ROOT,
    onlyFiles: true,
    absolute: true,
  });

  if (files.length === 0) {
    console.log("No images found to optimize.");
    return;
  }

  let totalSaved = 0;
  let processed = 0;

  for (const file of files) {
    try {
      const result = await optimizeImage(file);
      processed += 1;
      totalSaved += result.saved;
      const relative = path.relative(ROOT, file);
      if (result.saved > 0) {
        console.log(
          `Optimized ${relative}: ${formatBytes(result.before)} → ${formatBytes(result.after)}`
        );
      }

      if (result.avif && result.webp) {
        const avifRel = path.relative(ROOT, result.avif.outputPath);
        const webpRel = path.relative(ROOT, result.webp.outputPath);
        console.log(
          `Generated ${avifRel} (${formatBytes(result.avif.size)}), ${webpRel} (${formatBytes(result.webp.size)})`
        );
      }
    } catch (error) {
      console.warn(`Skipped ${file}: ${error.message}`);
    }
  }

  console.log(
    `Done. Processed ${processed} images. Total saved: ${formatBytes(totalSaved)}.`
  );
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
