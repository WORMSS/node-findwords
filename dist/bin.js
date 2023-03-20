#!/usr/bin/env node
import {
  findwords
} from "./chunk-7LLYILYO.js";

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
import { EOL } from "os";
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
        process.stdout.write(EOL);
      }
    }
  }
  console.log("\n" + results.length);
} else {
  for (const word of results) {
    process.stdout.write(word);
    process.stdout.write(EOL);
  }
}
function padd(word) {
  return " ".repeat(longest - word.length) + word;
}
