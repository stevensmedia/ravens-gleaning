const CSI1 = "".codePointAt(0);
const CSI2 = "[".codePointAt(0);
module.exports = {
	html: function(buf) {
		var ret = "";
		var offset = 0;
		do {
			var byte = buf.readUInt8(offset);
			if(byte == CSI1) {
				
			}
			ret += String.fromCodePoint(byte);
		} while(++offset < buf.length);
		return ret;
	}
};
