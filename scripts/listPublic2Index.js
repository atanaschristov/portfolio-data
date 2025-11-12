import fs from "fs";
import path from "path";

import { PUBLIC_DIR } from "./consts.js";

// Generate index.json
function listFiles(dir, baseDir) {
  return fs
    .readdirSync(dir)
    .filter(f => !f.startsWith("."))
    .map(f => {
      if (fs.statSync(path.join(dir, f)).isDirectory()) {
        return listFiles(path.join(dir, f), path.join(baseDir, f));
      } else {
        return path.join(baseDir, f);
      }
    });
}

const dataFiles = listFiles(path.join(PUBLIC_DIR, "data"), "data");
const imageFiles = listFiles(path.join(PUBLIC_DIR, "images"), "images");

const index = {
  generatedAt: new Date().toISOString(),
  data: dataFiles.flat(Infinity),
  images: imageFiles.flat(Infinity),
};

console.log("content of index:", index);
console.log("Generating public/index.json...");

fs.writeFileSync(
  path.join(PUBLIC_DIR, "index.json"),
  JSON.stringify(index, null, 2)
);

console.log("✅ public/index.json generated.");