import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const srcIndex = path.join(root, "index.html");
const outDir = path.join(root, "dist", "client");
const dstIndex = path.join(outDir, "index.html");

if (!fs.existsSync(srcIndex)) {
  console.error(`[copy-index-html] Missing ${srcIndex}`);
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });
fs.copyFileSync(srcIndex, dstIndex);
console.log(`[copy-index-html] Copied index.html -> ${path.relative(root, dstIndex)}`);
