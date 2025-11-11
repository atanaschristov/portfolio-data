import fs from "fs";
import path from "path";

import { PUBLIC_DIR, DATA_SRC, IMAGES_SRC } from "./consts.js";

// Create /public if missing
fs.mkdirSync(PUBLIC_DIR, { recursive: true });

// Copy folders to /public
function copyFolder(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const file of fs.readdirSync(src)) {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    const stat = fs.statSync(srcPath);
    if (stat.isDirectory()) {
      copyFolder(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
    console.log(`- ${srcPath} -> ${destPath} copied.`);
  }
}

copyFolder(DATA_SRC, path.join(PUBLIC_DIR, "data"));
copyFolder(IMAGES_SRC, path.join(PUBLIC_DIR, "images"));

console.log("✅ All Assets copied.");