import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const packageJsonPath = path.join(rootDir, "package.json");
const packageLockPath = path.join(rootDir, "package-lock.json");
const pnpmLockPath = path.join(rootDir, "pnpm-lock.yaml");

function getNextVersion(version, releaseType) {
 const [majorText = "0", minorText = "0", patchText = "0"] = version.split(".");
 let major = Number.parseInt(majorText,10);
 let minor = Number.parseInt(minorText,10);
 let patch = Number.parseInt(patchText,10);

 if ([major, minor, patch].some((value) => Number.isNaN(value) || value <0)) {
 throw new Error(`Unsupported version format: ${version}`);
 }

 switch (releaseType) {
 case "major":
 major +=1;
 minor =0;
 patch =0;
 break;
 case "minor":
 minor +=1;
 patch =0;
 break;
 case "patch":
 default:
 patch +=1;
 break;
 }

 return `${major}.${minor}.${patch}`;
}

const releaseType = process.argv[2] ?? "patch";

if (!["patch", "minor", "major"].includes(releaseType)) {
 throw new Error(`Unsupported release type: ${releaseType}. Use patch, minor, or major.`);
}

const packageJson = JSON.parse(await readFile(packageJsonPath, "utf8"));
const packageLock = JSON.parse(await readFile(packageLockPath, "utf8"));
const nextVersion = getNextVersion(packageJson.version, releaseType);

packageJson.version = nextVersion;
packageLock.version = nextVersion;

if (packageLock.packages?.[""]) {
 packageLock.packages[""].version = nextVersion;
}

await writeFile(packageJsonPath, `${JSON.stringify(packageJson, null,2)}\n`, "utf8");
await writeFile(packageLockPath, `${JSON.stringify(packageLock, null,2)}\n`, "utf8");

try {
 const pnpmLock = await readFile(pnpmLockPath, "utf8");
 const updatedPnpmLock = pnpmLock.replace(
  /^version:\s+['"]?[^'"\n]+['"]?/m,
  `version: ${nextVersion}`,
 );
 await writeFile(pnpmLockPath, updatedPnpmLock, "utf8");
} catch {
 // ignore if pnpm lockfile does not exist
}

process.stdout.write(`Bumped ${releaseType} version to ${nextVersion}\n`);
