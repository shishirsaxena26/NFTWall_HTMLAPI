import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Input and output base folders
const inputDir = path.join(__dirname, "containers");     // <-- your source folder
const outputDir = path.join(__dirname, "optimized"); // <-- output folder

// Recursively get all .png files
function getAllPngFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);

    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            results = results.concat(getAllPngFiles(filePath));
        } else if (path.extname(filePath).toLowerCase() === ".png") {
            results.push(filePath);
        }
    });

    return results;
}

// Ensure directory exists
function ensureDirectoryExistence(filePath) {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) return true;
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

// Compress a single PNG
async function compressImage(inputPath, outputPath) {
    ensureDirectoryExistence(outputPath);

    await sharp(inputPath)
        .png({ compressionLevel: 9 })
        .toFile(outputPath);

    console.log("Compressed:", outputPath);
}

// Main
(async () => {
    const files = getAllPngFiles(inputDir);
    console.log(`Found ${files.length} PNG files.`);

    for (const file of files) {
      console.log("Processing:", file);
        //const relativePath = path.relative(inputDir, file);
        //const outputPath = path.join(outputDir, relativePath);
        //await compressImage(file, outputPath);
    }

    console.log("✅ All PNG files compressed!");
})();
