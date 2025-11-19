// node_modules/tsup/assets/esm_shims.js
import path from "path";
import { fileURLToPath } from "url";
var getFilename = () => fileURLToPath(import.meta.url);
var getDirname = () => path.dirname(getFilename());
var __dirname = /* @__PURE__ */ getDirname();

// src/index.ts
import { readFileSync } from "fs";
import { join } from "path";
var words;
function init() {
  if (words === void 0) {
    words = readFileSync(join(__dirname, "lowercase.txt"), "utf8").replace(/\r\n/g, "\n");
  }
}
function findwords(pattern, wordsList) {
  if (!wordsList) {
    init();
    wordsList = words;
  } else if (Array.isArray(wordsList)) {
    wordsList = wordsList.join("\n");
  }
  return wordsList.match(new RegExp("^" + pattern + "$", "img")) ?? [""];
}

export {
  findwords
};
