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
		expect(html).to.eql('<span style="font-style:bold;color:#ffffff;background-color:#000000;">Bold</span>');
	});

	it("handles underscore", function() {
		var ravensgleaning = require('./index.js');
		var plain = "\033[4mUnderscore";
		var html = ravensgleaning.html(plain);
		expect(html).to.eql('<span style="text-decoration:underline;color:#c0c0c0;background-color:#000000;">Underscore</span>');
	});

	it("handles blink", function() {
		var ravensgleaning = require('./index.js');
		var plain = "\033[5mBlink";
		var html = ravensgleaning.html(plain);
		expect(html).to.eql('<span style="text-decoration:blink;color:#c0c0c0;background-color:#000000;">Blink</span>');
	});

	it("handles reverse", function() {
		var ravensgleaning = require('./index.js');
		var plain = "\033[7mReverse";
		var html = ravensgleaning.html(plain);
		expect(html).to.eql('<span style="color:#000000;background-color:#c0c0c0;">Reverse</span>');
	});

	it("handles foreground color", function() {
		var ravensgleaning = require('./index.js');
		var plain = "\033[30mBlack";
		var html = ravensgleaning.html(plain);
		expect(html).to.eql('<span style="color:#000000;background-color:#000000;">Black</span>');
	});

	it("handles background color", function() {
		var ravensgleaning = require('./index.js');
		var plain = "\033[47mWhite";
		var html = ravensgleaning.html(plain);
		expect(html).to.eql('<span style="color:#c0c0c0;background-color:#c0c0c0;">White</span>');
	});
});
