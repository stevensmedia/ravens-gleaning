var assert = require('assert');

describe("Raven's Gleaning", function() {
	it("parses", function() {
		assert(require('./index.js'));
	});

	it("returns non-ANSI buffers unmolested", function() {
		var ravensgleaning = require('./index.js');
		var plain = Buffer.from("Hi delly ho\nNeighborino");
		console.log(plain);
		console.log(ravensgleaning.html(plain));
		assert(!ravensgleaning.html(plain).compare(plain));
	});

});
