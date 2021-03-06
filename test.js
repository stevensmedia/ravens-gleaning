var assert = require('assert');
var expect = require('expect.js')

const preamble = '<span style="color:#c0c0c0;background-color:#000000;">';
const post = '</span>';

describe("Raven's Gleaning", function() {
	it("parses", function() {
		expect(require).withArgs('./index.js').to.not.throwException();
	});

	it("returns non-ANSI buffers unmolested", function() {
		var ravensgleaning = require('./index.js');
		var plain ="Hi delly ho\nNeighborino";
		var html = ravensgleaning.html(plain);
		expect(html).to.eql(preamble + plain + post);
	});

	it("handles reset", function() {
		var ravensgleaning = require('./index.js');
		var plain = "\033[1mBold\033[0mReset";
		var html = ravensgleaning.html(plain);
		expect(html).to.eql(preamble + post + '<span style="font-weight:bold;color:#ffffff;background-color:#000000;">Bold</span>' + preamble + "Reset" + post);
	});

	it("handles mushlog", function() {
		var ravensgleaning = require('./index.js');
		var plain = "\033[1mBold\033[0mReset";
		var html = ravensgleaning.html(plain, true);
		expect(html).to.eql('<span style="font-weight:bold;color:#ffffff;background-color:#000000;">Bold</span>' + "Reset");
	});

	it("handles bold", function() {
		var ravensgleaning = require('./index.js');
		var plain = "\033[1mBold";
		var html = ravensgleaning.html(plain);
		expect(html).to.eql(preamble + post + '<span style="font-weight:bold;color:#ffffff;background-color:#000000;">Bold</span>');
	});

	it("handles underscore", function() {
		var ravensgleaning = require('./index.js');
		var plain = "\033[4mUnderscore";
		var html = ravensgleaning.html(plain);
		expect(html).to.eql(preamble + post + '<span style="text-decoration:underline;color:#c0c0c0;background-color:#000000;">Underscore</span>');
	});

	it("handles blink", function() {
		var ravensgleaning = require('./index.js');
		var plain = "\033[5mBlink";
		var html = ravensgleaning.html(plain);
		expect(html).to.eql(preamble + post +'<span style="text-decoration:blink;color:#c0c0c0;background-color:#000000;">Blink</span>');
	});

	it("handles reverse", function() {
		var ravensgleaning = require('./index.js');
		var plain = "\033[7mReverse";
		var html = ravensgleaning.html(plain);
		expect(html).to.eql(preamble + post + '<span style="color:#000000;background-color:#c0c0c0;">Reverse</span>');
	});

	it("handles foreground color", function() {
		var ravensgleaning = require('./index.js');
		var plain = "\033[30mBlack";
		var html = ravensgleaning.html(plain);
		expect(html).to.eql(preamble + post + '<span style="color:#000000;background-color:#000000;">Black</span>');
	});

	it("handles background color", function() {
		var ravensgleaning = require('./index.js');
		var plain = "\033[47mWhite";
		var html = ravensgleaning.html(plain);
		expect(html).to.eql(preamble + post + '<span style="color:#c0c0c0;background-color:#c0c0c0;">White</span>');
	});

	it("handles 256 color foreground codes", function() {
		var ravensgleaning = require('./index.js');
		var plain = "\033[1;38;5;56mP\033[0;1;38;5;99molk";
		var html = ravensgleaning.html(plain);
		expect(html).to.eql(preamble + post + '<span style="font-weight:bold;color:#5f00d7;background-color:#000000;">P</span><span style="font-weight:bold;color:#875fff;background-color:#000000;">olk</span>');
	});

	it("handles 256 color background codes", function() {
		var ravensgleaning = require('./index.js');
		var plain = "\033[1;48;5;56mP\033[0;1;48;5;99molk";
		var html = ravensgleaning.html(plain);
		expect(html).to.eql(preamble + post + '<span style="font-weight:bold;color:#ffffff;background-color:#5f00d7;">P</span><span style="font-weight:bold;color:#ffffff;background-color:#875fff;">olk</span>');
	});

	it("escapes special characters", function() {
		var ravensgleaning = require('./index.js');
		var plain = "\033[47m<html span=\"\">";
		var html = ravensgleaning.html(plain);
		expect(html).to.eql(preamble + post + '<span style="color:#c0c0c0;background-color:#c0c0c0;">&lt;html span=&quot;&quot;&gt;</span>');
	});



});
