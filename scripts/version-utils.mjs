import { execFileSync } from "node:child_process";

export function getBaseMajor(version) {
 const [majorText = "1"] = version.split(".");
 const major = Number.parseInt(majorText,10);

 if (Number.isNaN(major) || major <0) {
 throw new Error(`Unsupported version format: ${version}`);
 }

 return major;
}

export function getCommitCount(rootDir) {
 try {
 const output = execFileSync("git", ["rev-list", "--count", "HEAD"], {
 cwd: rootDir,
 encoding: "utf8",
 }).trim();
 const commitCount = Number.parseInt(output,10);
 return Number.isNaN(commitCount) ?0 : commitCount;
 } catch {
 return0;
 }
}

export function getGitCommit(rootDir) {
 try {
 return execFileSync("git", ["rev-parse", "--short", "HEAD"], {
 cwd: rootDir,
 encoding: "utf8",
 }).trim();
 } catch {
 return null;
 }
}

export function getVersionFromCommitCount(baseMajor, commitCount) {
if (Number.isNaN(commitCount) || commitCount <0) {
throw new Error(`Invalid commit count: ${commitCount}`);
}

const patch = commitCount %100;
const minor = Math.floor(commitCount /100) %100;
const major = baseMajor + Math.floor(commitCount /10000);

return `${major}.${minor}.${patch}`;
}

export function getBuildInfo(packageVersion, rootDir) {
 const baseMajor = getBaseMajor(packageVersion);
 const commitCount = getCommitCount(rootDir);
 const gitCommit = getGitCommit(rootDir);

 return {
 packageVersion,
 buildVersion: getVersionFromCommitCount(baseMajor, commitCount),
 gitCommit,
 commitCount,
 };
}
