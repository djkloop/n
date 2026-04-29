import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const src = path.join(__dirname, "..", "public");
const dest = path.join(__dirname, "..", ".next", "standalone", "public");

if (fs.existsSync(src)) {
  fs.cpSync(src, dest, { recursive: true });
  console.log("Copied public files to standalone output");
} else {
  console.log("No public directory found, skipping");
}