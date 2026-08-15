import assert from "node:assert/strict";
import test from "node:test";
import { normalizeArchive } from "../scripts/archive-tools.mjs";

test("normalizes dynamic Instagram Channel profiles and YYMMDD dates", () => {
  const root = "INSTA CHANNEL ARCHIVE";
  const younghoon = "YOUNGHOON (영훈)";
  const jacob = "JACOB (제이콥)";
  const future = "FUTURE PROFILE (새 프로필)";
  const archive = normalizeArchive({ generatedAt: "2026-08-10T00:00:00.000Z", nodes: [
    { id: "y", name: younghoon, type: "folder", path: [root] },
    { id: "j", name: jacob, type: "folder", path: [root] },
    { id: "f", name: future, type: "folder", path: [root] },
    { id: "y1", name: "260302 Voice Message.mp4", type: "file", mimeType: "video/mp4", path: [root, younghoon] },
    { id: "j1", name: "260314 (1).jpg", type: "file", mimeType: "image/jpeg", path: [root, jacob] },
    { id: "f1", name: "260601 post.jpg", type: "file", mimeType: "image/jpeg", path: [root, future] },
  ] });
  assert.deepEqual(archive.profiles.map((profile) => profile.name), ["JACOB", "YOUNGHOON", "FUTURE PROFILE"]);
  assert.equal(archive.profiles[0].media[0].month, 3);
  assert.equal(archive.profiles[1].media[0].kind, "video");
  assert.equal(archive.profiles[1].media[0].year, 2026);
});
