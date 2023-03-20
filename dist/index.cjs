"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  findwords: () => findwords
});
module.exports = __toCommonJS(src_exports);
var import_node_fs = require("fs");
var import_node_path = require("path");
var words;
function init() {
  if (words === void 0) {
    words = (0, import_node_fs.readFileSync)((0, import_node_path.join)(__dirname, "lowercase.txt"), "utf8").replace(/\r\n/g, "\n");
  }
}
function findwords(pattern, wordsList) {
  if (!wordsList) {
    init();
    wordsList = words;
  } else if (Array.isArray(wordsList)) {
    wordsList = wordsList.join("\n");
  }
  return wordsList.match(new RegExp("^" + pattern + "$", "img")) || [];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  findwords
});
