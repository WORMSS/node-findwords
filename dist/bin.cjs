#!/usr/bin/env node
"use strict";

// src/polyfill.ts
function polyfill() {
  if (!String.prototype.repeat) {
    String.prototype.repeat = function(count) {
      "use strict";
      if (this == null) {
        throw new TypeError("can't convert " + this + " to object");
      }
      var str = "" + this;
      count = +count;
      if (count != count) {
        count = 0;
      }
      if (count < 0) {
        throw new RangeError("repeat count must be non-negative");
      }
      if (count == Infinity) {
        throw new RangeError("repeat count must be less than infinity");
      }
      count = Math.floor(count);
      if (str.length == 0 || count == 0) {
        return "";
      }
      if (str.length * count >= 1 << 28) {
        throw new RangeError("repeat count must not overflow maximum string size");
      }
      var rpt = "";
      for (; ; ) {
        if ((count & 1) == 1) {
          rpt += str;
        }
        count >>>= 1;
        if (count == 0) {
          break;
        }
        str += str;
      }
      return rpt;
    };
  }
}

// src/bin.ts
var import_node_os = require("os");

// src/index.ts
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

// src/bin.ts
polyfill();
var results = findwords(process.argv[2]);
var longest = 0;
if (process.stdout.isTTY) {
  for (let i = 0; i < results.length; i++) {
    const len = results[i].length + 1;
    if (len > longest) {
      longest = len;
    }
  }
  let columns = Math.floor(process.stdout.columns / longest);
  let columns_exact = process.stdout.columns % longest === 0;
  for (let i = 0; i < results.length; i++) {
    process.stdout.write(padd(results[i]));
    if (!columns_exact) {
      if (i % columns === 0 && i !== 0) {
        process.stdout.write(import_node_os.EOL);
      }
    }
  }
  console.log("\n" + results.length);
} else {
  for (const word of results) {
    process.stdout.write(word);
    process.stdout.write(import_node_os.EOL);
  }
}
function padd(word) {
  return " ".repeat(longest - word.length) + word;
}
