var words;

function init() {
	if ( words === undefined ) {
		words = require('fs').readFileSync(__dirname + "/lowercase.txt", "utf8");
	}
}

function find(pattern) {
	init();
	return words.match(new RegExp("^" + pattern + "$", "img")) || [];
}

module.exports = find;