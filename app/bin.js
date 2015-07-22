#!/usr/bin/env node
polyfill();

var findwords = require('./findwords');

var results = findwords(process.argv[2]);
var longest = 0;
for ( var i = 0; i < results.length; i++ ) {
	var len = results[i].length + 1;
	if ( len > longest ) {
		longest = len;
	}
}

var columns = Math.floor(process.stdout.columns / longest);
var columns_exact = process.stdout.columns % longest === 0;
for ( i = 0; i < results.length; i++ ) {
	process.stdout.write(padd(results[i], longest));
	if ( !columns_exact )
	if ( i % columns === 0 && i !== 0 ) {
		process.stdout.write("\r\n");
	}
}
console.log("\n" + results.length);


function padd(word, size) {
	return (" ".repeat(longest - word.length)) + word;
}

function polyfill() {
if (!String.prototype.repeat) {
	String.prototype.repeat = function(count) {
		'use strict';
		if (this == null) {
			throw new TypeError('can\'t convert ' + this + ' to object');
		}
		var str = '' + this;
		count = +count;
		if (count != count) {
			count = 0;
		}
		if (count < 0) {
			throw new RangeError('repeat count must be non-negative');
		}
		if (count == Infinity) {
			throw new RangeError('repeat count must be less than infinity');
		}
		count = Math.floor(count);
		if (str.length == 0 || count == 0) {
			return '';
		}
		// Ensuring count is a 31-bit integer allows us to heavily optimize the
		// main part. But anyway, most current (August 2014) browsers can't handle
		// strings 1 << 28 chars or longer, so:
		if (str.length * count >= 1 << 28) {
			throw new RangeError('repeat count must not overflow maximum string size');
		}
		var rpt = '';
		for (;;) {
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
	}
}
}