import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const packageJsonPath = path.join(rootDir, "package.json");
const packageLockPath = path.join(rootDir, "package-lock.json");

function getNextVersion(version) {
 const [majorText = "0", minorText = "0", patchText = "0"] = version.split(".");
 let major = Number.parseInt(majorText,10);
 let minor = Number.parseInt(minorText,10);
 let patch = Number.parseInt(patchText,10);

 if ([major, minor, patch].some((value) => Number.isNaN(value) || value <0)) {
 throw new Error(`Unsupported version format: ${version}`);
 }

 patch +=1;

 if (patch >=100) {
 patch =0;
 minor +=1;
 }

 if (minor >=100) {
 minor =0;
 major +=1;
 }

 return `${major}.${minor}.${patch}`;
}

const packageJson = JSON.parse(await readFile(packageJsonPath, "utf8"));
const packageLock = JSON.parse(await readFile(packageLockPath, "utf8"));
const nextVersion = getNextVersion(packageJson.version);

packageJson.version = nextVersion;
packageLock.version = nextVersion;

if (packageLock.packages?.[""]) {
 packageLock.packages[""].version = nextVersion;
}

await writeFile(packageJsonPath, `${JSON.stringify(packageJson, null,2)}\n`, "utf8");
await writeFile(packageLockPath, `${JSON.stringify(packageLock, null,2)}\n`, "utf8");

process.stdout.write(`Bumped version to ${nextVersion}\n`);
