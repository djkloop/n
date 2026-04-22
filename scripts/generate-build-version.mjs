import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { getBuildInfo } from "./version-utils.mjs";

const rootDir = process.cwd();
const packageJsonPath = path.join(rootDir, "package.json");
const outputDir = path.join(rootDir, "src", "generated");
const outputPath = path.join(outputDir, "build-info.json");

const packageJson = JSON.parse(await readFile(packageJsonPath, "utf8"));
const buildInfo = getBuildInfo(packageJson.version, rootDir);

await mkdir(outputDir, { recursive: true });
await writeFile(outputPath, `${JSON.stringify(buildInfo, null,2)}\n`, "utf8");

process.stdout.write(`Generated build version ${buildInfo.buildVersion}\n`);
