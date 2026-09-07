import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const manifestPath = path.resolve(
  __dirname,
  "../outputs/cuims-clear-firefox/manifest.json",
);

test("Chrome manifest uses MV3 service worker with minimal permissions", async () => {
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

  assert.equal(manifest.manifest_version, 3);
  assert.equal(manifest.background?.service_worker, "background.js");
  assert.ok(!("scripts" in (manifest.background || {})));
  assert.deepEqual(manifest.permissions, ["storage"]);
  assert.deepEqual(manifest.host_permissions, ["https://students.cuchd.in/*"]);
  assert.ok(!("browser_specific_settings" in manifest));
});
