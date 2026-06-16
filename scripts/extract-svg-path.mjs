import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const svgPath = path.join(__dirname, "../src/assets/svg/tire_rotation_icon.svg");
const outPath = path.join(__dirname, "../src/assets/svg/tireRotationPath.ts");
const svg = fs.readFileSync(svgPath, "utf8");
const match = svg.match(/d="([^"]+)"/);

if (!match) {
  throw new Error("Path not found in SVG");
}

fs.writeFileSync(
  outPath,
  `export const tireRotationPath = ${JSON.stringify(match[1])};\n`,
);

console.log(`Wrote ${outPath} (${match[1].length} chars)`);
