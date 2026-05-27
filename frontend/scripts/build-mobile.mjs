import { execSync } from "node:child_process";

process.env.CAPACITOR_BUILD = "true";

execSync("next build", { stdio: "inherit", env: process.env });
execSync("node scripts/prepare-capacitor.mjs", { stdio: "inherit", env: process.env });
