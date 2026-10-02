var fs = require("fs");

function readEnv(name) {
  if (process.env[name]) return process.env[name];

  var text;
  try {
    text = fs.readFileSync(".env", "utf8");
  } catch (error) {
    return "";
  }

  var lines = text.split("\n");
  for (var i = 0; i < lines.length; i++) {
    var trimmed = lines[i].trim();
    if (!trimmed || trimmed.charAt(0) === "#") continue;
    var eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    if (trimmed.slice(0, eq) === name) return trimmed.slice(eq + 1).trim();
  }

  return "";
}

module.exports = {
  api: {
    projectId: readEnv("NEXT_PUBLIC_PROJECT_ID"),
    dataset: readEnv("NEXT_PUBLIC_SANITY_DATASET") || "production",
  },
};
