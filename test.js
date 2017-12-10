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

	it("handles bold", function() {
		var ravensgleaning = require('./index.js');
		var plain = "\033[1mBold";
		var html = ravensgleaning.html(plain);
		expect(html).to.eql('<span style="font-style:bold;color:#7f7f7f;background-color:#000000;">Bold</span>');
	});
});
