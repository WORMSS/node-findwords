import { readFileSync } from 'node:fs';
import { join } from 'node:path';

let words: string;

function init() {
  if (words === undefined) {
    words = readFileSync(join(__dirname, 'lowercase.txt'), 'utf8').replace(/\r\n/g, '\n');
  }
}

export function findwords(pattern: string, wordsList?: string): RegExpMatchArray {
  if (!wordsList) {
    init();
    wordsList = words;
  } else if (Array.isArray(wordsList)) {
    wordsList = wordsList.join('\n');
  }
  return wordsList.match(new RegExp('^' + pattern + '$', 'img')) ?? [''];
}
