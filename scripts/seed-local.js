const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const seedPath = path.join(root, "seed", "local.ndjson");
const text = fs.readFileSync(seedPath, "utf8");

const docs = [];
let depth = 0;
let start = -1;
let inString = false;
let escape = false;

for (let i = 0; i < text.length; i++) {
  const ch = text[i];
  if (inString) {
    if (escape) escape = false;
    else if (ch === "\\") escape = true;
    else if (ch === '"') inString = false;
    continue;
  }
  if (ch === '"') {
    inString = true;
    continue;
  }
  if (ch === "{") {
    if (depth === 0) start = i;
    depth++;
  } else if (ch === "}") {
    depth--;
    if (depth === 0 && start !== -1) {
      const raw = text.slice(start, i + 1);
      try {
        docs.push(JSON.parse(raw));
      } catch (error) {
        console.error(`Could not parse a document in seed/local.ndjson: ${error.message}`);
        process.exit(1);
      }
      start = -1;
    }
  }
}

if (depth !== 0 || inString) {
  console.error("seed/local.ndjson has an unfinished document.");
  process.exit(1);
}

if (docs.length === 0) {
  console.error("seed/local.ndjson has no documents.");
  process.exit(1);
}

fs.writeFileSync(seedPath, docs.map((doc) => JSON.stringify(doc)).join("\n") + "\n");
console.log(`Collapsed ${docs.length} documents in seed/local.ndjson`);

const sanity = path.join(root, "node_modules", ".bin", "sanity");
const result = spawnSync(
  sanity,
  ["dataset", "import", "seed/local.ndjson", "local", "--replace"],
  { cwd: root, stdio: "inherit" },
);

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
