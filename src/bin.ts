#!/usr/bin/env node

import { polyfill } from './polyfill';
import { EOL } from 'node:os';
import { findwords } from './findwords';

polyfill();

const results = findwords(process.argv[2]);
let longest = 0;
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
    if (!columns_exact)
      if (i % columns === 0 && i !== 0) {
        process.stdout.write(EOL);
      }
  }
  console.log('\n' + results.length);
} else {
  for (const word of results) {
    process.stdout.write(word);
    process.stdout.write(EOL);
  }
}

function padd(word: string) {
  return ' '.repeat(longest - word.length) + word;
}
