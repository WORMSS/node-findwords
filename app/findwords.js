var words;

function init() {
  if (words === undefined) {
    words = require('fs').readFileSync(__dirname + '/lowercase.txt', 'utf8').replace(/\r\n/g, '\n');
  }
}

function find(pattern, wordsList) {
  if (!wordsList) {
    init();
    wordsList = words;
  } else if (Array.isArray(wordsList)) {
    wordsList = wordsList.join('\n');
  }
  return wordsList.match(new RegExp('^' + pattern + '$', 'img')) || [];
}

module.exports = find;
