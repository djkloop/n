import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { getBuildInfo } from "./version-utils.mjs";

const rootDir = process.cwd();
const packageJsonPath = path.join(rootDir, "package.json");
const packageLockPath = path.join(rootDir, "package-lock.json");

const packageJson = JSON.parse(await readFile(packageJsonPath, "utf8"));
const packageLock = JSON.parse(await readFile(packageLockPath, "utf8"));
const syncedVersion = getBuildInfo(packageJson.version, rootDir).buildVersion;

packageJson.version = syncedVersion;
packageLock.version = syncedVersion;

if (packageLock.packages?.[""]) {
 packageLock.packages[""].version = syncedVersion;
}

await writeFile(packageJsonPath, `${JSON.stringify(packageJson, null,2)}\n`, "utf8");
await writeFile(packageLockPath, `${JSON.stringify(packageLock, null,2)}\n`, "utf8");

process.stdout.write(`Synced package version to ${syncedVersion}\n`);
