var assert = require('assert');
var expect = require('expect.js')

describe("Raven's Gleaning", function() {
	it("parses", function() {
		expect(require).withArgs('./index.js').to.not.throwException();
	});

	it("returns non-ANSI buffers unmolested", function() {
		var ravensgleaning = require('./index.js');
		var plain ="Hi delly ho\nNeighborino";
		var html = ravensgleaning.html(plain);
		expect(html).to.eql(plain);
	});

});
