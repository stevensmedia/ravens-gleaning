var assert = require('assert');

describe("Raven's Gleaning", function() {
	it("parses", function() {
		assert(require('./index.js'));
	});

	it("returns non-ANSI strings unmolested", function() {
		var ravensgleaning = require('./index.js');
		var plain = "Hi delly ho\nNeighborino";
		assert(ravensgleaning.html(plain) == plain);
	});

});
