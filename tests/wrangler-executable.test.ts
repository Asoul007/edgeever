import { expect, test } from "bun:test";
import { resolve } from "node:path";

const root = resolve(import.meta.dir, "..");

test("deploy doctor detects the installed Wrangler executable", () => {
  const result = Bun.spawnSync({
    cmd: [process.execPath, "scripts/cloudflare-deploy.mjs", "doctor"],
    cwd: root,
    env: process.env,
  });

  expect(result.stdout.toString()).toContain("[ok] Wrangler");
}, 20_000);

test("Wrangler wrapper starts the installed executable", () => {
  const result = Bun.spawnSync({
    cmd: [process.execPath, "scripts/run-wrangler.mjs", "--version"],
    cwd: root,
    env: process.env,
  });

  expect(result.exitCode).toBe(0);
});

test("Wrangler wrapper preserves command arguments", () => {
  const result = Bun.spawnSync({
    cmd: [
      process.execPath,
      "scripts/run-wrangler.mjs",
      "d1",
      "migrations",
      "apply",
      "--help",
    ],
    cwd: root,
    env: process.env,
  });

  expect(result.exitCode).toBe(0);
});
