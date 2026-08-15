import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT_FOLDER_ID = "18JdFqta4h4QgNFicew97P_OCL3qv3vbT";
export const ROOT_TITLE = "INSTA CHANNEL ARCHIVE";
const profileOrder = ["SANGYEON", "JACOB", "YOUNGHOON", "HYUNJAE", "JUYEON", "KEVIN", "Q", "CHANGMIN", "SUNWOO", "ERIC", "HAKNYEON", "NEW"];

function dateCode(value, fallback = "") {
  const match = String(value).match(/^(\d{6})/u);
  if (match) return Number(`20${match[1]}`);
  const time = Date.parse(fallback);
  if (Number.isNaN(time)) return 0;
  const date = new Date(time);
  return Number(`${date.getUTCFullYear()}${String(date.getUTCMonth() + 1).padStart(2, "0")}${String(date.getUTCDate()).padStart(2, "0")}`);
}

function compactMedia(node) {
  const kind = node.mimeType.startsWith("image/") ? "image" : node.mimeType.startsWith("audio/") ? "audio" : node.mimeType.startsWith("video/") ? "video" : "other";
  const date = dateCode(node.name, node.modifiedTime);
  const value = String(date).padStart(8, "0");
  return { id: node.id, kind, mimeType: node.mimeType, date, year: Number(value.slice(0, 4)), month: Number(value.slice(4, 6)) };
}

function displayName(value) { return value.replace(/^\d+\.\s*/u, "").replace(/\s*\([^)]*\)\s*$/u, "").trim(); }
function orderOf(name) { const upper = name.toUpperCase(); const index = profileOrder.findIndex((value) => upper.startsWith(value)); return index < 0 ? 999 : index; }

export function normalizeArchive(raw) {
  const topFolders = raw.nodes.filter((node) => node.type === "folder" && node.path.length === 1);
  const profiles = topFolders.map((folder) => ({
    id: folder.id,
    name: displayName(folder.name),
    media: raw.nodes.filter((node) => node.type !== "folder" && node.path[1] === folder.name).map(compactMedia).sort((a, b) => b.date - a.date),
  })).sort((a, b) => orderOf(a.name) - orderOf(b.name) || a.name.localeCompare(b.name));
  return { generatedAt: raw.generatedAt, sourceFolderId: ROOT_FOLDER_ID, profiles };
}

export async function writeNormalized(raw, outputFile) {
  const target = outputFile instanceof URL ? fileURLToPath(outputFile) : outputFile;
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, `${JSON.stringify(normalizeArchive(raw))}\n`, "utf8");
}
