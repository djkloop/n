import { readFile } from "node:fs/promises";
import path from "node:path";
import { getBuildInfo } from "./version-utils.mjs";

const rootDir = process.cwd();
const packageJsonPath = path.join(rootDir, "package.json");
const packageJson = JSON.parse(await readFile(packageJsonPath, "utf8"));
const buildInfo = getBuildInfo(packageJson.version, rootDir);

process.stdout.write(`${JSON.stringify(buildInfo, null,2)}\n`);
